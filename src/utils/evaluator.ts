import { MissionData, EvaluationResult } from '../types/game';

/**
 * Normalizes text for forgiving keyword matching in Bahasa Melayu:
 * lowercases, removes punctuation, trims extra spaces.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'“”’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function evaluatePupilAnswer(
  pupilAnswer: string,
  mission: MissionData
): EvaluationResult {
  const cleanAnswer = normalizeText(pupilAnswer);
  const words = cleanAnswer.split(' ').filter(w => w.length > 0);
  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      score: 1,
      matchedConcepts: [],
      missingConcepts: mission.keyConcepts.map(c => c.label),
      feedbackMessage: "Sila taipkan jawapan anda dalam ruang yang disediakan.",
      praise: "Jangan risau, cuba baca petikan sekali lagi!",
      tips: "Rujuk petikan di atas untuk mencari jawapan yang tepat.",
      wordCount: 0
    };
  }

  const matchedConcepts: string[] = [];
  const missingConcepts: string[] = [];

  mission.keyConcepts.forEach(concept => {
    // Check if any keyword or phrase from this concept is in the pupil's answer
    const hasMatch = concept.keywords.some(kw => {
      const normKw = normalizeText(kw);
      if (normKw.includes(' ')) {
        return cleanAnswer.includes(normKw);
      }
      return words.includes(normKw) || cleanAnswer.includes(normKw);
    });

    if (hasMatch) {
      matchedConcepts.push(concept.label);
    } else {
      missingConcepts.push(concept.label);
    }
  });

  // Calculate score based on mission specifics
  let score = 1;
  let praise = "Percubaan yang baik!";
  let feedbackMessage = "";
  let tips = "";

  if (mission.missionNumber === 1) {
    // Mission 1: 2 features and their uses
    // Features: roda/bergerak, kamera/gambar, antena/maklumat
    const matchedCount = matchedConcepts.length;
    if (matchedCount >= 2 && wordCount >= 6) {
      score = 3;
      praise = "🌟 Cemerlang! Jawapan kamu sangat lengkap dan tepat!";
      feedbackMessage = "Hebat! Kamu berjaya menyatakan ciri-ciri ROBI serta kegunaannya dengan jelas mengikut petikan.";
      tips = "Teruskan amalan menjawab menggunakan ayat yang gramatis!";
    } else if (matchedCount >= 1 || wordCount >= 4) {
      score = 2;
      praise = "👍 Bagus! Kamu sudah memahami sebahagian jawapan!";
      feedbackMessage = "Jawapan kamu mengandungi fakta yang betul. Pastikan kamu menyatakan sekurang-kurangnya DUA ciri beserta kegunaannya untuk markah penuh.";
      tips = "Bandingkan jawapan kamu dengan Cadangan Jawapan Saintis.";
    } else {
      score = 1;
      praise = "💪 Usaha yang murni! Mari cuba lagi.";
      feedbackMessage = "Jawapan kamu masih ringkas. Cuba sebutkan apa fungsi roda dan kamera pada badan ROBI.";
      tips = "Baca perenggan pertama dan lengkapkan jawapan kamu.";
    }
  } else if (mission.missionNumber === 2) {
    // Mission 2: Zat besi & kemerah-merahan
    const hasIron = cleanAnswer.includes('besi') || cleanAnswer.includes('zat');
    const hasRed = cleanAnswer.includes('merah') || cleanAnswer.includes('kemerah');

    if (hasIron && hasRed) {
      score = 3;
      praise = "🌟 Cemerlang! Kamu seperti saintis cilik Marikh!";
      feedbackMessage = "Tepat sekali! Kandungan zat besi dalam tanah dan batuan menjadikan Marikh kelihatan kemerah-merahan.";
      tips = "Gaya penulisan jawapan kamu sangat memuaskan!";
    } else if (hasIron || hasRed || wordCount >= 4) {
      score = 2;
      praise = "👍 Bagus! Kamu hampir mendapat jawapan penuh!";
      feedbackMessage = "Kamu telah menyebut fakta tentang Marikh. Untuk lebih sempurna, hubungkan antara kandungan 'zat besi' dengan warna 'kemerah-merahan'.";
      tips = "Lengkapkan ayat dengan menerangkan kesan zat besi terhadap tanah Marikh.";
    } else {
      score = 1;
      praise = "💪 Teruskan mencuba!";
      feedbackMessage = "Marikh dipanggil Planet Merah kerana ada mineral istimewa dalam tanahnya. Cari perkataan 'zat besi' dalam Babak 2.";
      tips = "Baca semula ayat ke-4 dalam Babak 2.";
    }
  } else if (mission.missionNumber === 3) {
    // Mission 3: Batu besar menghalang laluan
    const hasBoulder = cleanAnswer.includes('batu') || cleanAnswer.includes('besar');
    const hasBlock = cleanAnswer.includes('halang') || cleanAnswer.includes('laluan') || cleanAnswer.includes('sekat') || cleanAnswer.includes('perjalanan');

    if (hasBoulder && hasBlock) {
      score = 3;
      praise = "🌟 Syabas! Jawapan yang sangat jitu dan padat!";
      feedbackMessage = "Tepat sekali! ROBI berhadapan dengan batu besar yang menghalang laluannya semasa mengembara.";
      tips = "Penguasaan kefahaman teks kamu amat membanggakan!";
    } else if (hasBoulder || hasBlock || wordCount >= 3) {
      score = 2;
      praise = "👍 Usaha yang baik!";
      feedbackMessage = "Kamu mengenal pasti objek atau rintangan yang dihadapi. Pastikan kamu menyatakan bahawa batu besar itu menghalang laluan ROBI.";
      tips = "Gunakan perkataan 'batu besar' dan 'menghalang laluan'.";
    } else {
      score = 1;
      praise = "💪 Teruskan semangat membaca!";
      feedbackMessage = "Apakah yang tiba-tiba muncul di hadapan ROBI? Rujuk perenggan pertama Babak 3.";
      tips = "Tulis semula jawapan dengan lebih terperinci.";
    }
  } else if (mission.missionNumber === 4) {
    // Mission 4: Tindakan memeriksa kawasan dengan kamera & mencari laluan lain
    const hasCameraOrInspect = cleanAnswer.includes('kamera') || cleanAnswer.includes('periksa') || cleanAnswer.includes('tengok') || cleanAnswer.includes('imbas');
    const hasPathOrBypass = cleanAnswer.includes('laluan') || cleanAnswer.includes('sebelah') || cleanAnswer.includes('lepasi') || cleanAnswer.includes('jalan');

    if (hasCameraOrInspect && hasPathOrBypass) {
      score = 3;
      praise = "🌟 Luar biasa! Jawapan kamu sangat tepat!";
      feedbackMessage = "ROBI bertindak bijak dengan memeriksa kawasan menggunakan kamera dan mencari laluan lain di sebelah batu tersebut.";
      tips = "Penerangan kamu sangat teliti dan menepati skema soalan!";
    } else if (hasCameraOrInspect || hasPathOrBypass || wordCount >= 4) {
      score = 2;
      praise = "👍 Jawapan yang baik!";
      feedbackMessage = "Kamu telah menyatakan tindakan yang diambil oleh ROBI. Untuk jawapan terbaik, nyatakan bahawa ROBI menggunakan kamera untuk memeriksa dan mencari laluan lain.";
      tips = "Rujuk tindakan ROBI dalam Babak 3 & 4.";
    } else {
      score = 1;
      praise = "💪 Mari teliti semula petikan!";
      feedbackMessage = "ROBI tidak panik apabila terhalang, dia menggunakan peralatannya untuk mencari jalan keluar.";
      tips = "Baca apa yang ROBI lakukan menggunakan kameranya.";
    }
  } else {
    // Mission 5: Maklumat penting untuk saintis
    const hasStudy = cleanAnswer.includes('kaji') || cleanAnswer.includes('kajian') || cleanAnswer.includes('faham') || cleanAnswer.includes('selidik');
    const hasSurfaceOrLife = cleanAnswer.includes('permukaan') || cleanAnswer.includes('keadaan') || cleanAnswer.includes('hidup') || cleanAnswer.includes('kehidupan') || cleanAnswer.includes('marikh') || cleanAnswer.includes('planet');

    if (hasStudy && hasSurfaceOrLife) {
      score = 3;
      praise = "🌟 Tahniah! Jawapan kamu bertaraf saintis cilik!";
      feedbackMessage = "Maklumat ROBI sangat penting bagi membantu saintis mengkaji permukaan Marikh dan mengetahui tentang keadaan kehidupan zaman dahulu.";
      tips = "Jawapan yang sangat matang dan bernas untuk murid Tahun 4!";
    } else if (hasStudy || hasSurfaceOrLife || wordCount >= 4) {
      score = 2;
      praise = "👍 Percubaan yang memuaskan!";
      feedbackMessage = "Jawapan kamu menunjukkan pemahaman tentang tugas saintis. Lengkapkan lagi dengan menyatakan tujuan kajian saintis terhadap Marikh.";
      tips = "Nyatakan kaitan maklumat itu dengan kajian permukaan planet Marikh.";
    } else {
      score = 1;
      praise = "💪 Usaha yang murni!";
      feedbackMessage = "Mengapakah manusia memerlukan robot untuk mengkaji Marikh? Rujuk Babak 4 dan Babak 5.";
      tips = "Sebutkan bagaimana maklumat ROBI membantu kajian saintis di Bumi.";
    }
  }

  return {
    score,
    matchedConcepts,
    missingConcepts,
    feedbackMessage,
    praise,
    tips,
    wordCount
  };
}
