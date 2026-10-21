import React, { useState, useEffect } from 'react';
import { MissionData } from '../types/game';
import { Send, Lightbulb, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';
import { playClickSound } from '../utils/audio';

interface QuestionBoxProps {
  mission: MissionData;
  pupilAnswer: string;
  onChangeAnswer: (text: string) => void;
  onSubmitAnswer: () => void;
  isEvaluating: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  mission,
  pupilAnswer,
  onChangeAnswer,
  onSubmitAnswer,
  isEvaluating,
  fontSize,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Reset error when mission changes
    setErrorMessage(null);
  }, [mission.id]);

  const textSizeClass =
    fontSize === 'normal'
      ? 'text-base sm:text-lg'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl'
      : 'text-xl sm:text-2xl';

  const wordCount = pupilAnswer.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleAudioQuestion = () => {
    playClickSound();
    if (isPlayingQuestion) {
      stopSpeaking();
      setIsPlayingQuestion(false);
    } else {
      setIsPlayingQuestion(true);
      speakText(
        mission.question,
        () => setIsPlayingQuestion(true),
        () => setIsPlayingQuestion(false),
        () => setIsPlayingQuestion(false)
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount === 0) {
      setErrorMessage("Sila taip jawapan kamu terlebih dahulu sebelum menghantar.");
      return;
    }
    setErrorMessage(null);
    onSubmitAnswer();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
        <div>
          {/* Question Header */}
          <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-xs">
                {mission.missionNumber}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Soalan Pemahaman
              </span>
            </div>

            {/* Listen Question Button */}
            <button
              type="button"
              onClick={handleAudioQuestion}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                isPlayingQuestion
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500'
              }`}
              title="Dengar soalan dibacakan"
            >
              {isPlayingQuestion ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Original Question Prompt */}
          <h3 className={`font-semibold text-slate-900 dark:text-white ${textSizeClass} mb-4 leading-snug`}>
            {mission.question}
          </h3>

          {/* Scaffolding Hints Toggle */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => { playClickSound(); setShowHints(!showHints); }}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHints ? "Sembunyikan Petunjuk" : "Perlukan Petunjuk Jawapan?"}</span>
            </button>

            {showHints && (
              <div className="mt-2.5 p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1.5 animate-fadeIn">
                <p className="font-bold flex items-center gap-1 text-amber-700 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" /> Petunjuk Saintis:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {mission.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pupil Answer Textarea */}
          <div className="relative">
            <textarea
              value={pupilAnswer}
              onChange={(e) => {
                onChangeAnswer(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              rows={4}
              placeholder="Tuliskan jawapan kamu di sini dengan ayat yang lengkap..."
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
            />

            {/* Word Count / Character indicator */}
            <div className="flex items-center justify-between mt-1 px-1 text-xs text-slate-400">
              <span>{wordCount} patah perkataan</span>
              <span>Gunakan tanda baca dan ejaan yang tepat</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-2 text-xs text-rose-500 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isEvaluating ? "Menyemak Jawapan..." : "Hantar Jawapan Misi"}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
