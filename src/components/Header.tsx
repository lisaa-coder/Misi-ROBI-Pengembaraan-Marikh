import React from 'react';
import { Volume2, VolumeX, BookOpen, HelpCircle, Star, Sparkles } from 'lucide-react';
import { playClickSound, setSoundEnabled, getSoundEnabled } from '../utils/audio';

interface HeaderProps {
  totalStars: number;
  maxStars: number;
  currentMissionNumber: number;
  totalMissions: number;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onOpenGlossary: () => void;
  onOpenGuide: () => void;
  onJumpToSummary?: () => void;
  soundEnabled: boolean;
  setSoundState: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalStars,
  maxStars,
  currentMissionNumber,
  totalMissions,
  fontSize,
  setFontSize,
  onOpenGlossary,
  onOpenGuide,
  onJumpToSummary,
  soundEnabled,
  setSoundState,
}) => {
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setSoundState(newState);
    if (newState) playClickSound();
  };

  const cycleFontSize = () => {
    playClickSound();
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  const fontSizeLabel = fontSize === 'normal' ? 'Saiz Teks: Sederhana' : fontSize === 'large' ? 'Saiz Teks: Besar' : 'Saiz Teks: Sangat Besar';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-orange-500/20 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
            <span className="font-bold text-base">🤖</span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              MISI ROBI
            </h1>
            <p className="text-[11px] text-orange-300/80 -mt-0.5 hidden sm:block whitespace-nowrap font-medium">
              Pengembaraan di Planet Marikh · Tahun 4
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => { playClickSound(); onOpenGlossary(); }}
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span>Kamus Marikh</span>
          </button>
          <button
            onClick={() => { playClickSound(); onOpenGuide(); }}
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors whitespace-nowrap"
          >
            <HelpCircle className="w-4 h-4 text-orange-400" />
            <span>Panduan Guru & Ibu Bapa</span>
          </button>
          {onJumpToSummary && (
            <button
              onClick={() => { playClickSound(); onJumpToSummary(); }}
              className="hover:text-orange-400 transition-colors whitespace-nowrap text-slate-300"
            >
              Semakan Misi
            </button>
          )}
        </nav>

        {/* Zone 3: Interactive Controls & Star Counter */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Font Size Adjuster for Year 4 Pupil Ergonomics */}
          <button
            onClick={cycleFontSize}
            title={fontSizeLabel}
            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <span className="font-serif font-bold text-sm">A</span>
            <span className="text-[10px] text-orange-400 font-mono">
              {fontSize === 'normal' ? '1x' : fontSize === 'large' ? '1.2x' : '1.4x'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Padamkan Bunyi" : "Nyalakan Bunyi"}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            aria-label="Kawalan Bunyi"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Stars Tally Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs sm:text-sm font-semibold tabular-nums shadow-inner">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{totalStars}</span>
            <span className="text-amber-400/50">/</span>
            <span className="text-amber-400/70">{maxStars}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
