/**
 * Web Speech Synthesis utility for child-friendly reading assistance in Bahasa Melayu.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Find Malay or Indonesian voice if available, otherwise default
  const voices = window.speechSynthesis.getVoices();
  const malayVoice = voices.find(v => v.lang.startsWith('ms') || v.lang.startsWith('id'));
  if (malayVoice) {
    utterance.voice = malayVoice;
  }

  utterance.lang = malayVoice ? malayVoice.lang : 'ms-MY';
  utterance.rate = 0.9; // Friendly, steady reading pace for primary Year 4 pupils
  utterance.pitch = 1.05; // Cheerful, clear tone

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}
