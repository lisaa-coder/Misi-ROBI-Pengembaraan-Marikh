import { MissionData, VocabularyWord } from '../types/game';

import heroImg from '../assets/images/hero_robi_mars_adventure_1792050514542.jpg';
import avatarImg from '../assets/images/robi_robot_avatar_1792050543020.jpg';
import boulderImg from '../assets/images/mars_boulder_canyon_1792050571122.jpg';

export const STORY_TITLE = "Robi dan Pengembaraan di Planet Marikh";
export const GAME_TITLE = "MISI ROBI: Pengembaraan di Planet Marikh";
export const TARGET_AUDIENCE = "Bahasa Melayu Tahun 4 Sekolah Rendah";

export const ROBI_AVATAR = avatarImg;

// 10 Kosa Kata Rasmi Kamus Pengembaraan
export const KAMUS_PENGEMBARAAN_10: VocabularyWord[] = [
  {
    word: "robot penjelajah",
    meaning: "Mesin kawalan jauh berteknologi tinggi yang dihantar oleh saintis untuk meneroka, menyiasat dan mengkaji kawasan baharu di planet Marikh.",
    example: "Robi ialah sebuah robot penjelajah yang dihantar oleh saintis ke planet Marikh."
  },
  {
    word: "saintis",
    meaning: "Pakar ilmu sains yang menjalankan penyelidikan, eksperimen dan kajian mendalam terhadap alam semesta serta planet Marikh.",
    example: "Saintis menerima maklumat dan gambar batuan Marikh untuk dikaji."
  },
  {
    word: "enam roda",
    meaning: "Komponen pergerakan khas pada badan Robi yang membolehkannya merentasi pelbagai bentuk muka bumi Marikh yang berbatuan dan berdebu.",
    example: "Robi mempunyai enam roda untuk bergerak melepasi kawasan Marikh."
  },
  {
    word: "kamera",
    meaning: "Alat penglihatan dan rakaman berdefinisi tinggi yang digunakan oleh Robi untuk merakam gambar kawasan sekeliling serta memeriksa laluan.",
    example: "Robi memeriksa kawasan di sekelilingnya menggunakan kamera."
  },
  {
    word: "antena",
    meaning: "Alat komunikasi khas yang digunakan untuk memancar dan menghantar isyarat data atau gambar ke stesen saintis di Bumi.",
    example: "Robi menggunakan antenanya untuk menghantar maklumat kepada saintis di Bumi."
  },
  {
    word: "zat besi",
    meaning: "Kandungan mineral semula jadi dalam batuan dan tanah yang menyebabkan permukaan planet Marikh kelihatan kemerah-merahan.",
    example: "Tanah dan batuan Marikh mengandungi zat besi yang menghasilkan warna merah."
  },
  {
    word: "tanah berdebu",
    meaning: "Lapisan permukaan tanah yang kering, gersang dan halus di planet Marikh.",
    example: "Planet Marikh kelihatan merah dan mempunyai banyak batuan serta tanah berdebu."
  },
  {
    word: "batu besar",
    meaning: "Bongkah batuan gergasi yang menjadi rintangan atau halangan di laluan pengembaraan Robi.",
    example: "Robi menemui sebuah batu besar yang menghalang laluannya."
  },
  {
    word: "maklumat",
    meaning: "Keterangan, gambar, dan data kajian penting yang dikumpulkan untuk membantu manusia memahami planet Marikh.",
    example: "Maklumat yang dihantar Robi sangat berguna untuk kajian para saintis."
  },
  {
    word: "diterokainya",
    meaning: "Kawasan luas yang dijelajahi, diselidiki, atau dibuka bagi mencari penemuan dan fakta baharu.",
    example: "Di kejauhan, Robi melihat bukit-bukit dan batuan yang masih belum diterokainya."
  }
];

export const MISSIONS: MissionData[] = [
  {
    id: 1,
    missionNumber: 1,
    babakTitle: "Babak 1: Misi Robi ke Planet Marikh",
    badgeTitle: "Pemandu Enam Roda",
    badgeDescription: "Berjaya mengenali tiga kelengkapan istimewa Robi!",
    badgeIcon: "🤖",
    passageTitle: "Misi Robi ke Planet Marikh",
    passageText: "Robi ialah sebuah robot penjelajah yang dihantar oleh saintis ke planet Marikh. Robi mempunyai enam roda untuk bergerak, kamera untuk mengambil gambar dan antena untuk menghantar maklumat ke Bumi. “Robi, bantulah kami mengkaji planet Marikh,” kata seorang saintis. “Baiklah! Saya akan menjalankan tugas ini dengan bersungguh-sungguh!” jawab Robi. Robi pun memulakan pengembaraannya ke planet yang sangat jauh dari Bumi itu.",
    highlightedKeywords: ["robot penjelajah", "enam roda", "kamera", "antena", "saintis", "planet Marikh"],
    question: "1. Berdasarkan petikan, nyatakan tiga ciri yang terdapat pada Robi.",
    officialAnswer: "Robi mempunyai enam roda, kamera dan antena.",
    keyConcepts: [
      {
        label: "Ciri 1: Enam roda",
        keywords: ["enam roda", "roda", "6 roda"],
        weight: 1
      },
      {
        label: "Ciri 2: Kamera",
        keywords: ["kamera"],
        weight: 1
      },
      {
        label: "Ciri 3: Antena",
        keywords: ["antena"],
        weight: 1
      }
    ],
    hints: [
      "Perhatikan ayat kedua dalam petikan: cari tiga peralatan utama yang ada pada badan Robi.",
      "Sebutkan ketiga-tiga ciri ini: enam roda, kamera, dan antena.",
      "Mulakan jawapan dengan ayat lengkap: 'Tiga ciri yang terdapat pada Robi ialah...'."
    ],
    vocabulary: [
      KAMUS_PENGEMBARAAN_10[0], // robot penjelajah
      KAMUS_PENGEMBARAAN_10[1], // saintis
      KAMUS_PENGEMBARAAN_10[2], // enam roda
      KAMUS_PENGEMBARAAN_10[3], // kamera
      KAMUS_PENGEMBARAAN_10[4]  // antena
    ],
    imageSrc: heroImg,
    imageAlt: "Robot penjelajah Robi bersiap sedia memulakan misi ke Marikh bersama kapal angkasa",
    stageEvent: "rover_arrival"
  },
  {
    id: 2,
    missionNumber: 2,
    babakTitle: "Babak 2: Ketibaan Robi di Planet Merah",
    badgeTitle: "Pakar Geologi Marikh",
    badgeDescription: "Berjaya membongkar rahsia warna merah dan zat besi di Marikh!",
    badgeIcon: "🪐",
    passageTitle: "Ketibaan Robi di Planet Merah",
    passageText: "Akhirnya, Robi tiba di Marikh. Planet itu kelihatan merah dan mempunyai banyak batuan serta tanah berdebu. “Wah, semuanya kelihatan berbeza daripada Bumi!” kata Robi. Marikh dikenali sebagai ‘Planet Merah’ kerana tanah dan batuannya mengandungi zat besi. Zat besi ini menyebabkan permukaan Marikh kelihatan kemerah-merahan. Robi mula bergerak sambil mengambil gambar kawasan di sekelilingnya. Dia mahu membantu saintis mengetahui lebih lanjut tentang permukaan Marikh.",
    highlightedKeywords: ["Planet Merah", "tanah berdebu", "zat besi", "kemerah-merahan", "permukaan Marikh"],
    question: "2. Mengapakah planet Marikh dikenali sebagai Planet Merah?",
    officialAnswer: "Planet Marikh dikenali sebagai Planet Merah kerana tanah dan batuannya mengandungi zat besi yang menyebabkan permukaannya kelihatan kemerah-merahan.",
    keyConcepts: [
      {
        label: "Kandungan tanah dan batuan (zat besi)",
        keywords: ["zat besi", "besi", "tanah", "batuan"],
        weight: 1
      },
      {
        label: "Kesan warna permukaan (kemerah-merahan)",
        keywords: ["kemerah-merahan", "merah", "permukaan", "kelihatan"],
        weight: 1
      }
    ],
    hints: [
      "Cari ayat yang menerangkan sebab Marikh dinamakan 'Planet Merah'.",
      "Apakah kandungan bahan galian penting dalam tanah dan batuan Marikh?",
      "Nyatakan kesan zat besi terhadap warna permukaan Marikh."
    ],
    vocabulary: [
      KAMUS_PENGEMBARAAN_10[5], // zat besi
      KAMUS_PENGEMBARAAN_10[6]  // tanah berdebu
    ],
    imageSrc: heroImg,
    imageAlt: "Permukaan Planet Marikh yang kaya dengan tanah merah dan batuan zat besi",
    stageEvent: "iron_soil_scan"
  },
  {
    id: 3,
    missionNumber: 3,
    babakTitle: "Babak 3: Halangan dalam Pengembaraan Robi",
    badgeTitle: "Penyelesai Masalah",
    badgeDescription: "Berjaya mengenal pasti halangan batu besar yang menyekat laluan!",
    badgeIcon: "🪨",
    passageTitle: "Halangan dalam Pengembaraan Robi",
    passageText: "Ketika meneruskan perjalanan, Robi menemui sebuah batu besar yang menghalang laluannya. “Oh, tidak! Bagaimanakah saya hendak melepasi batu ini?” kata Robi. Robi memeriksa kawasan di sekelilingnya menggunakan kamera. Dia menemui laluan lain di sebelah batu tersebut. Robi bergerak perlahan-lahan melalui laluan itu. Akhirnya, dia berjaya melepasi batu besar tersebut. “Berjaya! Saya perlu memeriksa keadaan sekeliling sebelum bergerak,” kata Robi dengan gembira.",
    highlightedKeywords: ["batu besar", "menghalang laluannya", "memeriksa kawasan", "kamera", "laluan lain"],
    question: "3. Apakah halangan yang dihadapi oleh Robi ketika meneruskan pengembaraannya di Marikh?",
    officialAnswer: "Robi menemui sebuah batu besar yang menghalang laluannya semasa meneruskan perjalanannya.",
    keyConcepts: [
      {
        label: "Menemui batu besar",
        keywords: ["batu besar", "batu", "boulder"],
        weight: 1
      },
      {
        label: "Menghalang laluan / perjalanan",
        keywords: ["menghalang", "laluan", "laluannya", "perjalanan", "perjalanannya", "halangan"],
        weight: 1
      }
    ],
    hints: [
      "Perhatikan ayat pertama dalam Babak 3.",
      "Apakah objek besar yang tiba-tiba berada di hadapan Robi?",
      "Nyatakan bahawa batu besar itu menghalang laluannya semasa meneruskan perjalanan."
    ],
    vocabulary: [
      KAMUS_PENGEMBARAAN_10[7] // batu besar
    ],
    imageSrc: boulderImg,
    imageAlt: "Batu besar merah menghalang laluan Robi di gaung Marikh",
    stageEvent: "boulder_bypass"
  },
  {
    id: 4,
    missionNumber: 4,
    babakTitle: "Babak 4: Penemuan Batuan dan Penghantaran Maklumat",
    badgeTitle: "Penyampai Maklumat Angkasa",
    badgeDescription: "Tahu alat antena yang digunakan Robi berhubung dengan saintis!",
    badgeIcon: "📡",
    passageTitle: "Penemuan Batuan dan Penghantaran Maklumat",
    passageText: "Semasa meneruskan perjalanan, Robi menemui banyak batuan yang menarik. Dia mengambil gambar dan mengumpulkan maklumat tentang kawasan itu. Robi kemudian menggunakan antenanya untuk menghantar maklumat kepada saintis di Bumi. Saintis menerima gambar tersebut dan mula mengkajinya. Robot penjelajah seperti Robi membantu manusia mengkaji Marikh dari jarak yang jauh. Robot ini boleh mengambil gambar, memeriksa batuan dan mengumpulkan maklumat tanpa perlu membawa manusia ke sana. “Maklumat yang dihantar Robi sangat berguna untuk kajian kami!” kata seorang saintis. Robi berasa gembira kerana tugasnya dapat membantu saintis mempelajari planet Marikh.",
    highlightedKeywords: ["kamera", "antenanya", "menghantar maklumat", "saintis di Bumi"],
    question: "4. Apakah alat yang digunakan oleh Robi untuk menghantar maklumat kepada saintis di Bumi?",
    officialAnswer: "Robi menggunakan antenanya untuk menghantar maklumat kepada saintis di Bumi.",
    keyConcepts: [
      {
        label: "Alat antena",
        keywords: ["antena", "antenanya"],
        weight: 1
      },
      {
        label: "Menghantar maklumat kepada saintis di Bumi",
        keywords: ["menghantar", "maklumat", "saintis", "bumi"],
        weight: 1
      }
    ],
    hints: [
      "Cari ayat dalam Babak 4 yang menyatakan alat untuk menghantar maklumat.",
      "Alat ini terletak di bahagian atas badan Robi.",
      "Jawab dengan ayat lengkap: 'Robi menggunakan antenanya...'."
    ],
    vocabulary: [
      KAMUS_PENGEMBARAAN_10[4], // antena
      KAMUS_PENGEMBARAAN_10[8]  // maklumat
    ],
    imageSrc: boulderImg,
    imageAlt: "Stesen penyelidikan dan penghantaran data antena Robi ke Bumi",
    stageEvent: "earth_transmission"
  },
  {
    id: 5,
    missionNumber: 5,
    babakTitle: "Babak 5: Pengembaraan Robi Masih Belum Selesai",
    badgeTitle: "Wira Penjelajah Marikh",
    badgeDescription: "Mengetahui bukit-bukit dan batuan baharu di kejauhan Marikh!",
    badgeIcon: "🚀",
    passageTitle: "Pengembaraan Robi Masih Belum Selesai",
    passageText: "Robi melihat kawasan Marikh yang luas. Di kejauhan, Robi melihat bukit-bukit dan batuan yang masih belum diterokainya. “Saya telah mengumpulkan banyak maklumat hari ini!” kata Robi. Saintis di Bumi masih ingin mengetahui sama ada Marikh pernah mempunyai keadaan yang sesuai untuk kehidupan pada zaman dahulu. Oleh itu, maklumat yang dikumpulkan oleh robot penjelajah amat penting untuk membantu mereka membuat kajian. Robi bersedia untuk meneruskan pengembaraannya. Dia akan terus mengambil gambar dan menghantar maklumat kepada saintis. “Saya berharap penemuan saya dapat membantu manusia memahami Marikh dengan lebih baik!” kata Robi dengan bersemangat.",
    highlightedKeywords: ["kawasan Marikh yang luas", "bukit-bukit dan batuan", "belum diterokainya", "kehidupan pada zaman dahulu"],
    question: "5. Apakah yang dilihat oleh Robi di kejauhan semasa memerhatikan kawasan Marikh?",
    officialAnswer: "Robi melihat bukit-bukit dan batuan yang masih belum diterokainya.",
    keyConcepts: [
      {
        label: "Bukit-bukit",
        keywords: ["bukit", "bukit-bukit"],
        weight: 1
      },
      {
        label: "Batuan / batu",
        keywords: ["batuan", "batu"],
        weight: 1
      },
      {
        label: "Belum diterokainya",
        keywords: ["belum diterokainya", "belum diterokai", "diterokainya", "diterokai"],
        weight: 1
      }
    ],
    hints: [
      "Perhatikan ayat kedua dalam Babak 5.",
      "Apakah dua objek geografi yang dilihat oleh Robi di kejauhan?",
      "Nyatakan bahawa objek-objek tersebut masih belum diterokainya."
    ],
    vocabulary: [
      KAMUS_PENGEMBARAAN_10[9] // diterokainya
    ],
    imageSrc: heroImg,
    imageAlt: "Keluasan lembah dan bukit batuan permukaan Planet Marikh yang bakal diterokai Robi",
    stageEvent: "future_exploration"
  }
];
