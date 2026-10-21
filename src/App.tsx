import React, { useState, useEffect } from 'react';
import { MISSIONS, GAME_TITLE, STORY_TITLE, ROBI_AVATAR } from './data/missionsData';
import { PupilAnswerRecord, EvaluationResult, MissionData } from './types/game';
import { Header } from './components/Header';
import { MarsVisualStage } from './components/MarsVisualStage';
import { ReadingPanel } from './components/ReadingPanel';
import { QuestionBox } from './components/QuestionBox';
import { FeedbackModal } from './components/FeedbackModal';
import { GlossaryModal } from './components/GlossaryModal';
import { TeacherParentGuideModal } from './components/TeacherParentGuideModal';
import { MissionCompleteScreen } from './components/MissionCompleteScreen';
import { evaluatePupilAnswer } from './utils/evaluator';
import { playClickSound, getSoundEnabled } from './utils/audio';
import { Sparkles, Compass, ShieldCheck, ArrowRight, Play, BookOpen } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'completed'>('welcome');
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [pupilAnswers, setPupilAnswers] = useState<Record<number, string>>({});
  const [pupilRecords, setPupilRecords] = useState<PupilAnswerRecord[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [glossarySelectedWord, setGlossarySelectedWord] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundState] = useState(getSoundEnabled());
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [welcomePupilName, setWelcomePupilName] = useState('');

  const currentMission = MISSIONS[currentMissionIndex];
  const maxStars = MISSIONS.length * 3; // 15 stars

  // Calculate total stars earned so far
  const totalStars = pupilRecords.reduce((acc, curr) => acc + curr.starsEarned, 0);

  // Array of boolean completions for waypoints
  const completedMissions = MISSIONS.map(m =>
    pupilRecords.some(r => r.missionId === m.id)
  );

  const handleStartGame = () => {
    playClickSound();
    setGameState('playing');
  };

  const handleAnswerChange = (text: string) => {
    setPupilAnswers(prev => ({
      ...prev,
      [currentMission.id]: text
    }));
  };

  const handleSubmitAnswer = () => {
    setIsEvaluating(true);
    const answer = pupilAnswers[currentMission.id] || '';
    const evaluation = evaluatePupilAnswer(answer, currentMission);

    setTimeout(() => {
      setIsEvaluating(false);
      setCurrentEvaluation(evaluation);
      setIsFeedbackOpen(true);

      // Update or add pupil record
      setPupilRecords(prev => {
        const filtered = prev.filter(r => r.missionId !== currentMission.id);
        const newRecord: PupilAnswerRecord = {
          missionId: currentMission.id,
          question: currentMission.question,
          pupilAnswer: answer,
          officialAnswer: currentMission.officialAnswer,
          starsEarned: evaluation.score,
          evaluation: evaluation,
          completedAt: new Date().toISOString()
        };
        return [...filtered, newRecord];
      });
    }, 400);
  };

  const handleNextMission = () => {
    setIsFeedbackOpen(false);
    if (currentMissionIndex < MISSIONS.length - 1) {
      setCurrentMissionIndex(prev => prev + 1);
    } else {
      setGameState('completed');
    }
  };

  const handleReviseAnswer = () => {
    setIsFeedbackOpen(false);
  };

  const handleOpenGlossaryWithWord = (word: string) => {
    setGlossarySelectedWord(word);
    setIsGlossaryOpen(true);
  };

  const handleRestart = () => {
    setCurrentMissionIndex(0);
    setPupilAnswers({});
    setPupilRecords([]);
    setCurrentEvaluation(null);
    setIsFeedbackOpen(false);
    setGameState('welcome');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <Header
        totalStars={totalStars}
        maxStars={maxStars}
        currentMissionNumber={currentMission.missionNumber}
        totalMissions={MISSIONS.length}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenGlossary={() => {
          setGlossarySelectedWord(null);
          setIsGlossaryOpen(true);
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
        onJumpToSummary={pupilRecords.length > 0 ? () => setGameState('completed') : undefined}
        soundEnabled={soundEnabled}
        setSoundState={setSoundState}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* State 1: Welcome Splash */}
        {gameState === 'welcome' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-orange-500/30 bg-slate-900">
              <div className="relative aspect-[16/9] w-full max-h-[380px] overflow-hidden">
                <img
                  src={MISSIONS[0].imageSrc}
                  alt="ROBI dan Pengembaraan di Planet Marikh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bahasa Melayu Tahun 4 · Sekolah Rendah</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {GAME_TITLE}
                  </h2>
                </div>
              </div>

              {/* Briefing Text */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Selamat datang, penjelajah cilik! Mari ikuti pengembaraan hebat bersama <strong>ROBI</strong>, sebuah robot penjelajah beroda enam yang berani meneroka batuan dan rahsia di permukaan Planet Marikh.
                  </p>
                  <p>
                    Terdapat <strong>5 babak cerita berturutan</strong>. Baca setiap babak petikan dengan teliti dan jawab soalan pemahaman untuk mengumpulkan sehingga <strong>15 Bintang Misi</strong> dan dapatkan <strong>Sijil Rasmi Penjelajah Marikh</strong>!
                  </p>
                </div>

                {/* 5 Missions Preview Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {MISSIONS.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center space-y-1 hover:border-orange-500/50 transition-colors"
                    >
                      <span className="text-2xl block">{m.badgeIcon}</span>
                      <p className="text-xs font-bold text-slate-200 truncate">{m.babakTitle.split(':')[1] || m.babakTitle}</p>
                      <p className="text-[11px] text-orange-400 font-medium">Babak {m.missionNumber}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Start Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Tiada log masuk diperlukan · Mesra murid sekolah</span>
                  </div>

                  <button
                    onClick={handleStartGame}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-orange-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Mula Pengembaraan Marikh</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Active Gameplay (5 Sequential Missions) */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            {/* Top Stage: 3D-styled Cartoon Mars Environment */}
            <MarsVisualStage
              mission={currentMission}
              totalMissions={MISSIONS.length}
              currentMissionIndex={currentMissionIndex}
              completedMissions={completedMissions}
              onSelectMission={(idx) => {
                playClickSound();
                setCurrentMissionIndex(idx);
              }}
            />

            {/* Split Grid: Left = Reading Passage, Right = Original Question Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Reading Panel */}
              <ReadingPanel
                mission={currentMission}
                fontSize={fontSize}
                onWordClick={handleOpenGlossaryWithWord}
              />

              {/* Question Box */}
              <QuestionBox
                mission={currentMission}
                pupilAnswer={pupilAnswers[currentMission.id] || ''}
                onChangeAnswer={handleAnswerChange}
                onSubmitAnswer={handleSubmitAnswer}
                isEvaluating={isEvaluating}
                fontSize={fontSize}
              />
            </div>
          </div>
        )}

        {/* State 3: Final Mission Completion Screen */}
        {gameState === 'completed' && (
          <MissionCompleteScreen
            answers={pupilRecords}
            totalStars={totalStars}
            maxStars={maxStars}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Formative Feedback Modal */}
      {currentEvaluation && (
        <FeedbackModal
          isOpen={isFeedbackOpen}
          evaluation={currentEvaluation}
          mission={currentMission}
          pupilAnswer={pupilAnswers[currentMission.id] || ''}
          isLastMission={currentMissionIndex === MISSIONS.length - 1}
          onRevise={handleReviseAnswer}
          onNextMission={handleNextMission}
        />
      )}

      {/* Kamus Mini Marikh Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        selectedWord={glossarySelectedWord}
      />

      {/* Panduan Guru & Ibu Bapa Modal */}
      <TeacherParentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>
          MISI ROBI: Pengembaraan di Planet Marikh · Bahasa Melayu Tahun 4 SK/SJK · Kementerian Pendidikan Malaysia
        </p>
      </footer>
    </div>
  );
}
