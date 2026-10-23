import React, { useState } from 'react';
import { playRobotBeep } from '../utils/audio';

interface RobiAvatarProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'scanning';
  speechText?: string;
  className?: string;
  interactive?: boolean;
}

export const RobiAvatar: React.FC<RobiAvatarProps> = ({
  mood = 'happy',
  speechText,
  className = '',
  interactive = true,
}) => {
  const [internalSpeech, setInternalSpeech] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const funQuotes = [
    "Bip bip! Roda saya siap meneroka Marikh!",
    "Kamera saya bersedia merakam batuan merah!",
    "Antena saya sedang menghantar isyarat ke Bumi!",
    "Kamu memang penjelajah yang hebat!",
    "Tanah Marikh kaya dengan zat besi kemerahan!",
    "Mari kita baca petikan dengan teliti bersama!"
  ];

  const handleClick = () => {
    if (!interactive) return;
    playRobotBeep();
    setIsAnimating(true);
    const randomQuote = funQuotes[Math.floor(Math.random() * funQuotes.length)];
    setInternalSpeech(randomQuote);
    setTimeout(() => setIsAnimating(false), 800);
    setTimeout(() => setInternalSpeech(null), 4000);
  };

  const currentSpeech = speechText || internalSpeech;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Comic Speech Bubble */}
      {currentSpeech && (
        <div className="absolute -top-16 z-20 max-w-xs px-3 py-2 bg-white text-slate-800 text-xs font-semibold rounded-2xl shadow-xl border-2 border-orange-400 animate-bounce">
          <p className="leading-snug text-center">{currentSpeech}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-orange-400 rotate-45" />
        </div>
      )}

      {/* 3D-styled Cute Six-Wheeled Robot ROBI */}
      <div
        onClick={handleClick}
        className={`relative cursor-pointer transition-transform duration-300 ${
          isAnimating ? 'scale-110 -rotate-3' : 'hover:scale-105'
        }`}
        title="Klik ROBI untuk berinteraksi!"
      >
        <svg
          viewBox="0 0 240 220"
          className="w-36 h-32 sm:w-44 sm:h-40 drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shadow beneath rover */}
          <ellipse cx="120" cy="205" rx="85" ry="12" fill="#000000" fillOpacity="0.35" />

          {/* Antenna Mast with signal pulses */}
          <path d="M 155 70 L 175 18" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <path d="M 163 50 L 168 45 L 163 40 L 168 35" stroke="#F97316" strokeWidth="2.5" fill="none" />
          <circle cx="177" cy="16" r="6" fill="#F97316" className="animate-pulse" />
          <circle cx="177" cy="16" r="12" fill="url(#antennaGlow)" opacity="0.6" className="animate-ping" />

          {/* Camera Arm on left mast */}
          <path d="M 75 70 L 60 40 L 52 40" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <rect x="36" y="28" width="26" height="22" rx="5" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="48" cy="39" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="46" cy="37" r="2.5" fill="#FFFFFF" />

          {/* ROBI Head / Screen Monitor */}
          <rect
            x="65"
            y="52"
            width="110"
            height="76"
            rx="24"
            fill="url(#bodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="3"
          />
          {/* Orange trim border around screen */}
          <rect
            x="73"
            y="60"
            width="94"
            height="60"
            rx="18"
            fill="url(#orangeGrad)"
          />
          {/* Inner dark LED screen */}
          <rect
            x="78"
            y="65"
            width="84"
            height="50"
            rx="14"
            fill="url(#screenGrad)"
          />

          {/* Glowing Digital Cyan Eyes */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <>
              {/* Left Eye: Happy Arc */}
              <path
                d="M 92 88 Q 102 76 112 88"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye: Happy Arc */}
              <path
                d="M 128 88 Q 138 76 148 88"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute digital blush dots */}
              <circle cx="89" cy="98" r="3.5" fill="#F43F5E" opacity="0.8" />
              <circle cx="151" cy="98" r="3.5" fill="#F43F5E" opacity="0.8" />
              {/* Happy smile mouth */}
              <path
                d="M 112 100 Q 120 106 128 100"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Thinking / Scanning circular glowing eyes */}
              <circle cx="102" cy="88" r="8" fill="#38BDF8" />
              <circle cx="100" cy="86" r="3" fill="#FFFFFF" />
              <circle cx="138" cy="88" r="8" fill="#38BDF8" />
              <circle cx="136" cy="86" r="3" fill="#FFFFFF" />
              <line x1="114" y1="102" x2="126" y2="102" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Rover Main Body Chassis */}
          <rect
            x="60"
            y="126"
            width="120"
            height="46"
            rx="12"
            fill="url(#bodyGrad)"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          {/* Orange lower trim */}
          <path
            d="M 60 152 L 180 152 L 180 162 C 180 168 174 172 168 172 L 72 172 C 66 172 60 168 60 162 Z"
            fill="url(#orangeGrad)"
          />

          {/* ROBI Badge Name */}
          <text
            x="120"
            y="146"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="14"
            fontWeight="900"
            fontFamily="'Outfit', sans-serif"
            letterSpacing="1"
          >
            Robi
          </text>

          {/* LED Headlights */}
          <circle cx="74" cy="162" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          <circle cx="166" cy="162" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />

          {/* Suspension Arm Bars */}
          <line x1="45" y1="165" x2="70" y2="160" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="168" x2="120" y2="165" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
          <line x1="170" y1="160" x2="195" y2="165" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />

          {/* SIX RUGGED ALL-TERRAIN WHEELS */}
          {/* Left front wheel (1) */}
          <g className="animate-spin-slow">
            <rect x="25" y="160" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <line x1="28" y1="170" x2="50" y2="170" stroke="#94A3B8" strokeWidth="2" />
            <line x1="28" y1="180" x2="50" y2="180" stroke="#94A3B8" strokeWidth="2" />
            <line x1="28" y1="190" x2="50" y2="190" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="39" cy="181" r="5" fill="#CBD5E1" />
          </g>

          {/* Left middle wheel (2) */}
          <g>
            <rect x="58" y="165" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <line x1="61" y1="175" x2="83" y2="175" stroke="#94A3B8" strokeWidth="2" />
            <line x1="61" y1="185" x2="83" y2="185" stroke="#94A3B8" strokeWidth="2" />
            <line x1="61" y1="195" x2="83" y2="195" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="72" cy="186" r="5" fill="#CBD5E1" />
          </g>

          {/* Left rear wheel (3) */}
          <g>
            <rect x="91" y="168" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <circle cx="105" cy="189" r="5" fill="#CBD5E1" />
          </g>

          {/* Right rear wheel (4) */}
          <g>
            <rect x="122" y="168" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <circle cx="136" cy="189" r="5" fill="#CBD5E1" />
          </g>

          {/* Right middle wheel (5) */}
          <g>
            <rect x="154" y="165" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <line x1="157" y1="175" x2="179" y2="175" stroke="#94A3B8" strokeWidth="2" />
            <line x1="157" y1="185" x2="179" y2="185" stroke="#94A3B8" strokeWidth="2" />
            <line x1="157" y1="195" x2="179" y2="195" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="168" cy="186" r="5" fill="#CBD5E1" />
          </g>

          {/* Right front wheel (6) */}
          <g>
            <rect x="187" y="160" width="28" height="42" rx="8" fill="url(#wheelGrad)" stroke="#64748B" strokeWidth="2.5" />
            <line x1="190" y1="170" x2="212" y2="170" stroke="#94A3B8" strokeWidth="2" />
            <line x1="190" y1="180" x2="212" y2="180" stroke="#94A3B8" strokeWidth="2" />
            <line x1="190" y1="190" x2="212" y2="190" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="201" cy="181" r="5" fill="#CBD5E1" />
          </g>
        </svg>
      </div>
    </div>
  );
};
