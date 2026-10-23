import React, { useState, useEffect } from 'react';
import { PupilAnswerRecord, MissionData } from '../types/game';
import { MISSIONS, STORY_TITLE } from '../data/missionsData';
import { playFanfare, playClickSound } from '../utils/audio';
import { Star, Award, Printer, RotateCcw, CheckCircle, Sparkles, User, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MissionCompleteScreenProps {
  answers: PupilAnswerRecord[];
  totalStars: number;
  maxStars: number;
  onRestart: () => void;
}

export const MissionCompleteScreen: React.FC<MissionCompleteScreenProps> = ({
  answers,
  totalStars,
  maxStars,
  onRestart,
}) => {
  const [pupilName, setPupilName] = useState('Penjelajah Cilik');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    playFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  }, []);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const percentage = Math.round((totalStars / maxStars) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Misi Selesai dengan Jayanya!</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tahniah, Penjelajah Marikh!
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Kamu dan robot Robi telah berjaya menamatkan kelima-lima babak pengembaraan di Planet Merah serta menjawab semua soalan pemahaman!
        </p>
      </div>

      {/* Sijil Tamat Misi (Printable Area) */}
      <div className="relative bg-white dark:bg-slate-900 border-4 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden print:border-4 print:border-amber-600 print:shadow-none print:m-0 print:p-8">
        {/* Decorative Certificate Watermark Corners */}
        <div className="absolute top-2 left-2 text-2xl select-none opacity-40">🪐</div>
        <div className="absolute top-2 right-2 text-2xl select-none opacity-40">🚀</div>
        <div className="absolute bottom-2 left-2 text-2xl select-none opacity-40">🤖</div>
        <div className="absolute bottom-2 right-2 text-2xl select-none opacity-40">⭐</div>

        <div className="text-center space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-amber-500/10 text-amber-500 mb-1">
            <Award className="w-12 h-12 mx-auto" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-900 dark:text-amber-100 uppercase">
            Sijil Penjelajah Marikh Cilik
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Dengan ini diperakui bahawa penjelajah cilik:
          </p>

          {/* Editable Pupil Name */}
          <div className="py-2">
            {isEditingName ? (
              <div className="inline-flex items-center gap-2">
                <input
                  type="text"
                  value={pupilName}
                  onChange={(e) => setPupilName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                  className="px-4 py-1.5 text-xl sm:text-2xl font-bold text-center border-b-2 border-orange-500 bg-transparent text-orange-600 dark:text-orange-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-lg"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                title="Klik untuk menukar nama murid"
                className="inline-flex items-center gap-2 cursor-pointer group px-4 py-1 border-b-2 border-dashed border-orange-400/60 hover:border-orange-500"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                  {pupilName}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-orange-500 print:hidden">
                  (Klik untuk tukar nama)
                </span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Telah berjaya membaca petikan <strong>"{STORY_TITLE}"</strong> dan menyelesaikan 5 soalan pemahaman Bahasa Melayu Tahun 4 dengan penuh iltizam dan cemerlang.
          </p>

          {/* Score & Badges Summary */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider mb-1">
                Jumlah Bintang Diperoleh
              </span>
              <div className="text-3xl font-black text-amber-500 flex items-center justify-center gap-1.5">
                <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
                <span>{totalStars}</span>
                <span className="text-base text-amber-400/60">/ {maxStars}</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Tahap Penguasaan: {percentage}%</span>
            </div>

            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center">
              <span className="text-xs text-orange-600 dark:text-orange-400 font-bold block uppercase tracking-wider mb-1">
                Lencana Misi Terkumpul
              </span>
              <div className="flex items-center justify-center gap-1.5 text-2xl py-0.5">
                {MISSIONS.map((m) => (
                  <span key={m.id} title={m.badgeTitle}>
                    {m.badgeIcon}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">5 / 5 Lencana Dikuasai</span>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 sm:px-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tarikh: {currentDate}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800 dark:text-slate-200">Stesen Saintis Bumi & Robot Robi</p>
              <p className="text-[11px] text-slate-400">Pusat Kawalan Misi Marikh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer text-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Muat Turun Sijil</span>
        </button>

        <button
          onClick={() => { playClickSound(); onRestart(); }}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Main Semula Misi</span>
        </button>
      </div>

      {/* Detailed Mission Breakdown (5 Questions & Answers) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Semakan Penuh Jawapan Pemahaman
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analisis 5 soalan pemahaman beserta jawapan murid dan cadangan jawapan saintis
            </p>
          </div>
          <span className="text-xs font-bold text-orange-500">5 Misi Selesai</span>
        </div>

        <div className="space-y-6">
          {answers.map((item, index) => {
            const missionData = MISSIONS.find((m) => m.id === item.missionId);
            return (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-600 font-bold flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {missionData?.babakTitle}
                    </span>
                  </div>

                  {/* Stars for this mission */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= item.starsEarned
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Original Question */}
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.question}
                </p>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-400 block mb-1 uppercase text-[10px]">
                      Jawapan Murid:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 italic">
                      "{item.pupilAnswer}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1 uppercase text-[10px] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Cadangan Jawapan Saintis:
                    </span>
                    <p className="text-emerald-950 dark:text-emerald-200 font-medium">
                      "{item.officialAnswer}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
