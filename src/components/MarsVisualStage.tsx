import React, { useState } from 'react';
import { MissionData } from '../types/game';
import { RobiAvatar } from './RobiAvatar';
import { playScanSound, playRobotBeep } from '../utils/audio';
import { Camera, Radio, Compass, ShieldAlert, Sparkles, Eye } from 'lucide-react';

interface MarsVisualStageProps {
  mission: MissionData;
  totalMissions: number;
  currentMissionIndex: number;
  onSelectMission?: (index: number) => void;
  completedMissions: boolean[];
}

export const MarsVisualStage: React.FC<MarsVisualStageProps> = ({
  mission,
  totalMissions,
  currentMissionIndex,
  onSelectMission,
  completedMissions,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [boulderBypassed, setBoulderBypassed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleScanAction = () => {
    playScanSound();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setBoulderBypassed(true);
      playRobotBeep();
    }, 1800);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-orange-500/30 bg-slate-950 flex flex-col">
      {/* 16:9 Aspect Ratio Container for Main Visual Scene */}
      <div className="relative w-full aspect-[16/9] min-h-[260px] sm:min-h-[340px] overflow-hidden">
        {/* Main Background 3D Image */}
        {imageLoaded && (
          <img
            src={mission.imageSrc}
            alt={mission.imageAlt}
            className="w-full h-full object-cover select-none transition-transform duration-1000 ease-out hover:scale-105"
            onError={() => setImageLoaded(false)}
            referrerPolicy="no-referrer"
          />
        )}

        {/* CSS Fallback Container if image fails or before load */}
        {!imageLoaded && (
          <div className="w-full h-full bg-gradient-to-b from-slate-950 via-red-950 to-orange-950 flex items-center justify-center p-6 text-center">
            <div className="space-y-2">
              <span className="text-4xl">🪐</span>
              <p className="text-orange-200 font-bold text-lg">{mission.passageTitle}</p>
              <p className="text-slate-400 text-xs">Pemandangan Permukaan Planet Marikh</p>
            </div>
          </div>
        )}

        {/* Atmosphere Scrim overlay for legibility & contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/40 pointer-events-none" />

        {/* Cosmic Star dust & Twinkle particles */}
        <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-2 text-xs font-medium text-orange-200/90 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 shadow-md">
          <Compass className="w-3.5 h-3.5 text-orange-400 animate-spin-slow" />
          <span>Lokasi: Planet Marikh · Koordinat Ares-4</span>
        </div>

        {/* Dynamic Scene Overlay for Mission 3: Boulder Obstacle Scanner */}
        {mission.id === 3 && (
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={handleScanAction}
              disabled={isScanning}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-600/40 border border-orange-300/40 transition-all active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{isScanning ? "Kamera Mengimbas Laluan..." : boulderBypassed ? "Laluan Selamat Ditemui!" : "Imbas Kawasan Sekeliling"}</span>
            </button>
          </div>
        )}

        {/* Mission 4: Earth Transmission Graphic */}
        {mission.id === 4 && (
          <div className="absolute top-12 right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-500/40 animate-pulse">
            <Radio className="w-4 h-4 text-cyan-400 animate-ping" />
            <span>Menghantar Data Ke Stesen Bumi...</span>
          </div>
        )}

        {/* Holographic Laser Scan Effect */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce z-30 pointer-events-none" />
        )}

        {/* Animated 3D-styled ROBI Rover Avatar on stage */}
        <div
          className={`absolute bottom-3 sm:bottom-4 left-4 sm:left-10 z-20 transition-all duration-700 ${
            boulderBypassed && mission.id === 3 ? 'translate-x-32 sm:translate-x-44' : ''
          }`}
        >
          <RobiAvatar
            mood={isScanning ? 'scanning' : boulderBypassed ? 'celebrating' : 'happy'}
            speechText={
              isScanning
                ? "Bip bip! Kamera sedang memeriksa laluan..."
                : boulderBypassed && mission.id === 3
                ? "Berjaya! Ada laluan selamat di sebelah batu!"
                : undefined
            }
          />
        </div>
      </div>

      {/* Mission Waypoint Progress Rail */}
      <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalMissions }).map((_, idx) => {
            const isCurrent = idx === currentMissionIndex;
            const isDone = completedMissions[idx];

            return (
              <button
                key={idx}
                onClick={() => onSelectMission && onSelectMission(idx)}
                title={`Misi ${idx + 1}`}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : isDone
                    ? 'bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-emerald-500/30'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <span>{isDone ? "✓" : `M${idx + 1}`}</span>
                <span className="hidden sm:inline">Babak {idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-orange-300 font-semibold flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Misi {mission.missionNumber} daripada {totalMissions}</span>
        </div>
      </div>
    </div>
  );
};
