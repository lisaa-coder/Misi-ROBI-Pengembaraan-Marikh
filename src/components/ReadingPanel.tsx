import React, { useState } from 'react';
import { MissionData } from '../types/game';
import { Volume2, VolumeX, BookOpen, CheckCircle, Lightbulb } from 'lucide-react';
import { speakText, stopSpeaking, isSpeaking } from '../utils/speech';
import { playClickSound } from '../utils/audio';

interface ReadingPanelProps {
  mission: MissionData;
  fontSize: 'normal' | 'large' | 'xlarge';
  onWordClick: (word: string) => void;
}

export const ReadingPanel: React.FC<ReadingPanelProps> = ({
  mission,
  fontSize,
  onWordClick,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const textSizeClass =
    fontSize === 'normal'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
      : 'text-xl sm:text-2xl leading-loose';

  const handleAudioToggle = () => {
    playClickSound();
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(
        `${mission.babakTitle}. ${mission.passageText}`,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Helper to highlight key words in the passage text
  const renderHighlightedPassage = () => {
    const text = mission.passageText;
    // We can highlight key terms so pupils can click to see vocabulary meaning
    const wordsToHighlight = mission.vocabulary.map(v => v.word);

    // Build regex to match terms
    const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isVocab = wordsToHighlight.some(w => w.toLowerCase() === part.toLowerCase());
      if (isVocab) {
        return (
          <button
            key={index}
            onClick={() => onWordClick(part)}
            title="Klik untuk lihat maksud perkataan"
            className="inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded-md bg-orange-500/15 text-orange-700 dark:text-orange-300 font-semibold underline decoration-orange-400 decoration-2 underline-offset-4 hover:bg-orange-500/25 transition-colors cursor-pointer"
          >
            {part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      <div>
        {/* Panel Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
              Petikan Bacaan Bahasa Melayu
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {mission.babakTitle}
            </h2>
          </div>

          {/* Audio Reading Button */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              isPlayingAudio
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Hentikan Suara</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Dengar Bacaan</span>
              </>
            )}
          </button>
        </div>

        {/* Story Text */}
        <div className={`text-slate-700 dark:text-slate-200 ${textSizeClass} font-normal transition-all`}>
          {renderHighlightedPassage()}
        </div>
      </div>

      {/* Vocabulary Helper Footnote */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-orange-500" />
          <span>Tip: Klik perkataan bergaris untuk maksud kamus sains.</span>
        </span>
        <span className="hidden sm:inline font-medium text-slate-400">Tahun 4 · SK / SJK</span>
      </div>
    </div>
  );
};
