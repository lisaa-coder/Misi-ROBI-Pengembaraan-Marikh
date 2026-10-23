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
    // Mission 1: Tiga ciri Robi (enam roda, kamera, antena)
    const hasWheels = cleanAnswer.includes('roda');
    const hasCamera = cleanAnswer.includes('kamera');
    const hasAntenna = cleanAnswer.includes('antena');
    const count = (hasWheels ? 1 : 0) + (hasCamera ? 1 : 0) + (hasAntenna ? 1 : 0);

    if (count === 3) {
      score = 3;
      praise = "🌟 Cemerlang! Jawapan kamu sangat lengkap dan tepat!";
      feedbackMessage = "Hebat! Kamu berjaya menyatakan ketiga-tiga ciri Robi iaitu enam roda, kamera dan antena mengikut petikan.";
      tips = "Teruskan amalan menjawab menggunakan ayat yang gramatis!";
    } else if (count === 2 || (count === 1 && wordCount >= 4)) {
      score = 2;
      praise = "👍 Bagus! Kamu sudah menyatakan sebahagian ciri Robi!";
      feedbackMessage = `Kamu telah menyatakan ${count} ciri Robi dengan betul. Sila pastikan kamu menyatakan ketiga-tiga ciri (enam roda, kamera dan antena) untuk markah penuh.`;
      tips = "Bandingkan jawapan kamu dengan Cadangan Jawapan Saintis.";
    } else {
      score = 1;
      praise = "💪 Usaha yang murni! Mari cuba lagi.";
      feedbackMessage = "Jawapan kamu masih belum lengkap. Cari tiga peralatan yang ada pada badan Robi dalam ayat kedua petikan.";
      tips = "Sebutkan enam roda, kamera, dan antena.";
    }
  } else if (mission.missionNumber === 2) {
    // Mission 2: Mengapakah Marikh dikenali sebagai Planet Merah? (zat besi & kemerah-merahan)
    const hasIron = cleanAnswer.includes('besi') || cleanAnswer.includes('zat');
    const hasRed = cleanAnswer.includes('merah') || cleanAnswer.includes('kemerah');

    if (hasIron && hasRed) {
      score = 3;
      praise = "🌟 Cemerlang! Kamu seperti saintis cilik Marikh!";
      feedbackMessage = "Tepat sekali! Kandungan zat besi dalam tanah dan batuan menyebabkan permukaan Marikh kelihatan kemerah-merahan.";
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
    // Mission 3: Halangan yang dihadapi oleh Robi (batu besar menghalang laluan/perjalanan)
    const hasBoulder = cleanAnswer.includes('batu') || cleanAnswer.includes('besar');
    const hasBlock = cleanAnswer.includes('halang') || cleanAnswer.includes('laluan') || cleanAnswer.includes('perjalanan') || cleanAnswer.includes('jalan');

    if (hasBoulder && hasBlock) {
      score = 3;
      praise = "🌟 Syabas! Jawapan yang sangat jitu dan padat!";
      feedbackMessage = "Tepat sekali! Robi menemui sebuah batu besar yang menghalang laluannya semasa meneruskan perjalanannya.";
      tips = "Penguasaan kefahaman teks kamu amat membanggakan!";
    } else if (hasBoulder || hasBlock || wordCount >= 3) {
      score = 2;
      praise = "👍 Usaha yang baik!";
      feedbackMessage = "Kamu mengenal pasti rintangan yang dihadapi. Pastikan kamu menyatakan bahawa batu besar itu menghalang laluan Robi.";
      tips = "Gunakan perkataan 'batu besar' dan 'menghalang laluannya'.";
    } else {
      score = 1;
      praise = "💪 Teruskan semangat membaca!";
      feedbackMessage = "Apakah yang tiba-tiba muncul di hadapan Robi? Rujuk perenggan pertama Babak 3.";
      tips = "Tulis semula jawapan dengan lebih terperinci.";
    }
  } else if (mission.missionNumber === 4) {
    // Mission 4: Alat yang digunakan untuk menghantar maklumat (antena)
    const hasAntenna = cleanAnswer.includes('antena') || cleanAnswer.includes('antenanya');

    if (hasAntenna) {
      score = 3;
      praise = "🌟 Luar biasa! Jawapan kamu sangat tepat!";
      feedbackMessage = "Tepat sekali! Robi menggunakan antenanya untuk menghantar maklumat kepada saintis di Bumi.";
      tips = "Penerangan kamu sangat jitu dan menepati skema soalan!";
    } else if (wordCount >= 2 && (cleanAnswer.includes('hantar') || cleanAnswer.includes('maklumat') || cleanAnswer.includes('bumi'))) {
      score = 2;
      praise = "👍 Hampir tepat!";
      feedbackMessage = "Kamu faham tujuan tindakan tersebut, tetapi belum menamakan alat yang digunakan. Namakan alat komunikasi yang terletak di badan Robi.";
      tips = "Rujuk perkataan 'antena' dalam Babak 4.";
    } else {
      score = 1;
      praise = "💪 Mari teliti semula petikan!";
      feedbackMessage = "Apakah alat khusus yang digunakan oleh Robi untuk memancarkan maklumat ke Bumi? Baca ayat ketiga Babak 4.";
      tips = "Alat tersebut ialah 'antena'.";
    }
  } else {
    // Mission 5: Apa yang dilihat oleh Robi di kejauhan? (bukit-bukit dan batuan yang masih belum diterokainya)
    const hasHills = cleanAnswer.includes('bukit');
    const hasRocks = cleanAnswer.includes('batuan') || cleanAnswer.includes('batu');
    const hasExplore = cleanAnswer.includes('teroka') || cleanAnswer.includes('diterokai') || cleanAnswer.includes('belum');

    if ((hasHills || hasRocks) && (hasExplore || (hasHills && hasRocks))) {
      score = 3;
      praise = "🌟 Tahniah! Jawapan kamu sangat tepat dan lengkap!";
      feedbackMessage = "Tepat sekali! Robi melihat bukit-bukit dan batuan yang masih belum diterokainya di kejauhan.";
      tips = "Jawapan yang sangat cemerlang mengikut skema soalan Tahun 4!";
    } else if (hasHills || hasRocks || hasExplore || wordCount >= 3) {
      score = 2;
      praise = "👍 Percubaan yang memuaskan!";
      feedbackMessage = "Kamu telah menyatakan sebahagian daripada pemandangan yang dilihat Robi. Nyatakan bahawa Robi melihat bukit-bukit dan batuan yang belum diterokainya.";
      tips = "Rujuk ayat kedua dalam Babak 5.";
    } else {
      score = 1;
      praise = "💪 Usaha yang murni!";
      feedbackMessage = "Apakah bentuk muka bumi yang dilihat oleh Robi di kejauhan? Baca ayat kedua dalam Babak 5.";
      tips = "Robi melihat bukit-bukit dan batuan.";
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
