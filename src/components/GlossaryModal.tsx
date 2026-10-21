import React, { useState } from 'react';
import { MISSIONS } from '../data/missionsData';
import { BookOpen, X, Search, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

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
  const [searchTerm, setSearchTerm] = useState(selectedWord || '');

  if (!isOpen) return null;

  // Flatten all unique vocabulary items across all 5 missions
  const allVocabMap = new Map<string, { word: string; meaning: string; example: string }>();
  MISSIONS.forEach(m => {
    m.vocabulary.forEach(v => {
      allVocabMap.set(v.word.toLowerCase(), v);
    });
  });

  const allVocabList = Array.from(allVocabMap.values());

  const filteredVocab = allVocabList.filter(v =>
    v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-500/30 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h3 className="text-xl font-bold">Kamus Mini Marikh</h3>
              <p className="text-xs text-orange-100">Kosa Kata Sains & Bahasa Melayu Tahun 4</p>
            </div>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari perkataan (contoh: zat besi, antena, robot)..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Vocab list */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredVocab.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Tiada perkataan ditemui untuk carian "{searchTerm}".
            </div>
          ) : (
            filteredVocab.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-orange-50/50 dark:bg-slate-800/60 border border-orange-100 dark:border-slate-700/60 transition-all hover:border-orange-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-orange-600 dark:text-orange-400">
                    {item.word}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400">Kosa Kata</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-2">
                  {item.meaning}
                </p>
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
                  <span className="font-semibold text-slate-500 not-italic">Contoh Ayat: </span>
                  "{item.example}"
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Tutup Kamus
          </button>
        </div>
      </div>
    </div>
  );
};
