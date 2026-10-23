import React, { useState } from 'react';
import { KAMUS_PENGEMBARAAN_10 } from '../data/missionsData';
import { BookOpen, X, Search, Sparkles, Volume2, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { playClickSound, playStarChime, playRobotBeep } from '../utils/audio';
import { speakText, stopSpeaking } from '../utils/speech';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWord?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  selectedWord,
}) => {
  const [activeTab, setActiveTab] = useState<'kamus' | 'kuiz'>('kamus');
  const [searchTerm, setSearchTerm] = useState(selectedWord || '');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  if (!isOpen) return null;

  const filteredVocab = KAMUS_PENGEMBARAAN_10.filter(v =>
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpeak = (word: string, meaning: string) => {
    playClickSound();
    stopSpeaking();
    speakText(`${word}. ${meaning}`);
  };

  // Quiz question generator based on the 10 words
  const currentQuizWord = KAMUS_PENGEMBARAAN_10[quizIndex % KAMUS_PENGEMBARAAN_10.length];

  // Pick 3 options (1 correct, 2 distractors)
  const otherWords = KAMUS_PENGEMBARAAN_10.filter(w => w.word !== currentQuizWord.word);
  const shuffledOthers = [...otherWords].sort((a, b) => a.word.localeCompare(b.word));
  const options = [
    currentQuizWord.meaning,
    shuffledOthers[(quizIndex + 1) % shuffledOthers.length].meaning,
    shuffledOthers[(quizIndex + 2) % shuffledOthers.length].meaning,
  ].sort((a, b) => a.localeCompare(b));

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuizWord.meaning) {
      playStarChime();
      setQuizScore(prev => prev + 1);
    } else {
      playRobotBeep();
    }
  };

  const handleNextQuiz = () => {
    playClickSound();
    setIsAnswered(false);
    setSelectedOption(null);
    setQuizIndex(prev => (prev + 1) % KAMUS_PENGEMBARAAN_10.length);
  };

  const handleResetQuiz = () => {
    playClickSound();
    setQuizIndex(0);
    setQuizScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-500/30 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              📖
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Kamus Pengembaraan</h3>
              <p className="text-xs text-orange-100 font-medium">10 Kosa Kata Rasmi Petikan Marikh · Tahun 4</p>
            </div>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Tutup Kamus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls: Kamus vs Kuiz Kosa Kata */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/70 p-1.5 gap-1.5">
          <button
            onClick={() => { playClickSound(); setActiveTab('kamus'); }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'kamus'
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>10 Kosa Kata Pengembaraan</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('kuiz'); }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'kuiz'
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Kuiz Kosa Kata Interaktif</span>
          </button>
        </div>

        {/* TAB 1: SENARAI 10 KOSA KATA */}
        {activeTab === 'kamus' && (
          <>
            {/* Search input */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari dalam 10 kosa kata (contoh: enam roda, antena, zat besi)..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Vocab list */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
              {filteredVocab.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Tiada kosa kata ditemui untuk "{searchTerm}".
                </div>
              ) : (
                filteredVocab.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-orange-50/50 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700/60 transition-all hover:border-orange-300"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-orange-600 dark:text-orange-400 capitalize">
                          {item.word}
                        </h4>
                      </div>

                      <button
                        onClick={() => handleSpeak(item.word, item.meaning)}
                        title="Dengar sebutan & maksud"
                        className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-2 font-normal">
                      {item.meaning}
                    </p>

                    <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
                      <span className="font-semibold text-slate-500 not-italic">Contoh dalam petikan: </span>
                      "{item.example}"
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: KUIZ KOSA KATA INTERAKTIF */}
        {activeTab === 'kuiz' && (
          <div className="p-6 overflow-y-auto space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                  Soalan {quizIndex + 1} daripada {KAMUS_PENGEMBARAAN_10.length}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Skor: {quizScore} / {KAMUS_PENGEMBARAAN_10.length}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Apakah maksud perkataan berikut?</p>
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white capitalize">
                  "{currentQuizWord.word}"
                </h4>
              </div>

              {/* 3 Multiple Choice Options */}
              <div className="space-y-2.5">
                {options.map((opt, idx) => {
                  const isCorrect = opt === currentQuizWord.meaning;
                  const isChosen = selectedOption === opt;

                  let optClass = "p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all cursor-pointer ";
                  if (!isAnswered) {
                    optClass += "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50/40 text-slate-800 dark:text-slate-200";
                  } else if (isCorrect) {
                    optClass += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                  } else if (isChosen && !isCorrect) {
                    optClass += "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 line-through opacity-75";
                  } else {
                    optClass += "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-60";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswered}
                      className={`w-full flex items-start gap-3 ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 animate-fadeIn ${
                    selectedOption === currentQuizWord.meaning
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  <span>
                    {selectedOption === currentQuizWord.meaning
                      ? "🌟 Tepat sekali! Kamu memahami kosa kata ini dengan sangat baik!"
                      : "Cuba lagi! Jawapan yang tepat telah diwarnakan hijau di atas."}
                  </span>
                  <button
                    onClick={handleNextQuiz}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow transition-all shrink-0 cursor-pointer"
                  >
                    Seterusnya →
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button
                onClick={handleResetQuiz}
                className="text-xs text-slate-500 hover:text-orange-500 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mula Kuiz Dari Awal</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup Kamus
          </button>
        </div>
      </div>
    </div>
  );
};
