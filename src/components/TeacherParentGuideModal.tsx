import React from 'react';
import { BookOpen, X, CheckCircle, Award, Target, HelpCircle } from 'lucide-react';
import { MISSIONS } from '../data/missionsData';
import { playClickSound } from '../utils/audio';

interface TeacherParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherParentGuideModal: React.FC<TeacherParentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl font-bold border border-indigo-500/30">
              👩‍🏫
            </div>
            <div>
              <h3 className="text-xl font-bold">Panduan Guru & Ibu Bapa</h3>
              <p className="text-xs text-indigo-200">Kefahaman Membaca Bahasa Melayu Tahun 4 (KSSR Semakan)</p>
            </div>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-200">
          {/* Pedagogical Alignment */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/50 space-y-2">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Fokus Pembelajaran DSKP Bahasa Melayu Tahun 4</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Modul pengembaraan ini direka khas untuk memperkukuh kemahiran membaca mekanis dan mentalis serta kemahiran menjawab soalan pemahaman secara bertulis (soalan bertumpu dan bercapah) berteraskan tema Sains, Teknologi dan Inovasi.
            </p>
            <ul className="text-xs space-y-1 list-disc list-inside text-indigo-950 dark:text-indigo-200 font-medium">
              <li>Kemahiran Membaca: 2.1.2 Membaca dan merujuk kosa kata sains berpandukan konteks petikan.</li>
              <li>Kemahiran Menulis: 3.2.2 Menghasilkan jawapan pemahaman berdasarkan soalan secara kritis dan lengkap.</li>
            </ul>
          </div>

          {/* Rubric */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Sistem Pemarkahan Bintang Misi (Rubrik Formatif)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 dark:text-amber-400 text-xs mb-1">
                  🌟🌟🌟 3 Bintang (Cemerlang)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Murid menjawab dengan ayat gramatis dan merangkumi kesemua kata kunci fakta penting yang dikehendaki skema.
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                  🌟🌟 2 Bintang (Bagus)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Murid menyatakan sebahagian fakta atau isi utama dengan betul namun boleh diperkembangkan lagi.
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-500 dark:text-slate-400 text-xs mb-1">
                  🌟 1 Bintang (Percubaan Baik)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Jawapan ringkas atau mengandungi sebahagian idea; sistem menyediakan bimbingan petunjuk untuk penambahbaikan.
                </p>
              </div>
            </div>
          </div>

          {/* Official Answer Key from PDF */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Skema Rasmi & Jawapan Cadangan (5 Babak)</span>
            </h4>
            <div className="space-y-3">
              {MISSIONS.map((m) => (
                <div key={m.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <p className="font-bold text-orange-600 dark:text-orange-400 mb-1">{m.question}</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Jawapan Rasmi: </span>
                    {m.officialAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Faham & Kembali
          </button>
        </div>
      </div>
    </div>
  );
};
