export interface VocabularyWord {
  word: string;
  meaning: string;
  example: string;
}

export interface MissionData {
  id: number;
  missionNumber: number;
  babakTitle: string;
  badgeTitle: string;
  badgeDescription: string;
  badgeIcon: string;
  passageTitle: string;
  passageText: string;
  highlightedKeywords: string[];
  question: string;
  officialAnswer: string;
  keyConcepts: {
    label: string;
    keywords: string[];
    weight: number;
  }[];
  hints: string[];
  vocabulary: VocabularyWord[];
  imageSrc: string;
  imageAlt: string;
  stageEvent: 'rover_arrival' | 'iron_soil_scan' | 'boulder_bypass' | 'earth_transmission' | 'future_exploration';
}

export interface EvaluationResult {
  score: number; // 1, 2, or 3 stars
  matchedConcepts: string[];
  missingConcepts: string[];
  feedbackMessage: string;
  praise: string;
  tips: string;
  wordCount: number;
}

export interface PupilAnswerRecord {
  missionId: number;
  question: string;
  pupilAnswer: string;
  officialAnswer: string;
  starsEarned: number;
  evaluation: EvaluationResult;
  completedAt: string;
}
