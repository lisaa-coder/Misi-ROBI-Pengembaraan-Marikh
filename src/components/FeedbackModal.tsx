import React, { useEffect } from 'react';
import { EvaluationResult, MissionData } from '../types/game';
import { Star, CheckCircle, ArrowRight, RotateCcw, Award, Lightbulb, Compass } from 'lucide-react';
import { playStarChime, playClickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface FeedbackModalProps {
  isOpen: boolean;
  evaluation: EvaluationResult;
  mission: MissionData;
  pupilAnswer: string;
  isLastMission: boolean;
  onRevise: () => void;
  onNextMission: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  evaluation,
  mission,
  pupilAnswer,
  isLastMission,
  onRevise,
  onNextMission,
}) => {
  useEffect(() => {
    if (isOpen) {
      playStarChime();
      if (evaluation.score >= 2) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [isOpen, evaluation.score]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Laporan Keputusan Saintis</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold">
            {evaluation.praise}
          </h3>

          {/* Star Reward Rating */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`transition-all transform ${
                  starIdx <= evaluation.score
                    ? 'scale-110 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                    : 'text-white/30 scale-95'
                }`}
              >
                <Star
                  className={`w-9 h-9 sm:w-11 sm:h-11 ${
                    starIdx <= evaluation.score ? 'fill-amber-400 text-amber-300' : ''
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-orange-100 font-medium mt-1">
            {evaluation.score === 3
              ? "Tahniah! 3 Bintang Misi Diperoleh!"
              : evaluation.score === 2
              ? "Bagus! 2 Bintang Misi Diperoleh!"
              : "1 Bintang Misi Diperoleh - Teruskan Usaha!"}
          </p>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Formative Feedback Message */}
          <div className="p-4 bg-orange-50 dark:bg-slate-800/80 rounded-2xl border border-orange-200 dark:border-slate-700">
            <p className="font-semibold text-orange-950 dark:text-orange-200 leading-relaxed">
              {evaluation.feedbackMessage}
            </p>
            {evaluation.tips && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{evaluation.tips}</span>
              </p>
            )}
          </div>

          {/* Comparison Grid: Pupil Answer vs Model Answer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pupil's Answer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Jawapan Kamu
              </span>
              <p className="text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                "{pupilAnswer}"
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Panjang: {evaluation.wordCount} patah perkataan
              </div>
            </div>

            {/* Official Model Answer */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Cadangan Jawapan Saintis</span>
              </span>
              <p className="text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                "{mission.officialAnswer}"
              </p>
            </div>
          </div>

          {/* Concept Analysis Tagging */}
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Sorotan Konsep Bahasa & Sains
            </span>
            <div className="flex flex-wrap gap-2">
              {evaluation.matchedConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{concept}</span>
                </span>
              ))}
              {evaluation.missingConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium"
                >
                  Boleh ditambah: {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => { playClickSound(); onRevise(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ubah & Perbaiki Jawapan</span>
          </button>

          <button
            onClick={() => { playClickSound(); onNextMission(); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>{isLastMission ? "Lihat Sijil & Keputusan Akhir" : "Teruskan Misi Seterusnya"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
