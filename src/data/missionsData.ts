import { MissionData } from '../types/game';

import heroImg from '../assets/images/hero_robi_mars_adventure_1792050514542.jpg';
import avatarImg from '../assets/images/robi_robot_avatar_1792050543020.jpg';
import boulderImg from '../assets/images/mars_boulder_canyon_1792050571122.jpg';

export const STORY_TITLE = "ROBI dan Pengembaraan di Planet Marikh";
export const GAME_TITLE = "MISI ROBI: Pengembaraan di Planet Marikh";
export const TARGET_AUDIENCE = "Bahasa Melayu Tahun 4 Sekolah Rendah";

export const ROBI_AVATAR = avatarImg;

export const MISSIONS: MissionData[] = [
  {
    id: 1,
    missionNumber: 1,
    babakTitle: "Babak 1: Misi Baharu ROBI",
    badgeTitle: "Pemandu Enam Roda",
    badgeDescription: "Berjaya mengenali kelengkapan dan ciri istimewa robot ROBI!",
    badgeIcon: "🤖",
    passageTitle: "Misi Baharu ROBI",
    passageText: "ROBI ialah sebuah robot penjelajah yang dihantar oleh saintis ke planet Marikh. ROBI mempunyai enam roda untuk bergerak, kamera untuk mengambil gambar dan antena untuk menghantar maklumat ke Bumi. “ROBI, bantulah kami mengkaji planet Marikh,” kata seorang saintis. “Baiklah! Saya akan menjalankan tugas ini dengan bersungguh-sungguh!” jawab ROBI. ROBI pun memulakan pengembaraannya ke planet yang sangat jauh dari Bumi itu.",
    highlightedKeywords: ["robot penjelajah", "enam roda", "kamera", "antena", "saintis", "planet Marikh"],
    question: "1. Berdasarkan petikan, nyatakan dua ciri yang terdapat pada ROBI dan jelaskan kegunaannya.",
    officialAnswer: "ROBI mempunyai enam roda dan kamera. Enam roda digunakan untuk bergerak, manakala kamera digunakan untuk mengambil gambar.",
    keyConcepts: [
      {
        label: "Ciri 1 & Kegunaan (Contoh: Enam roda untuk bergerak)",
        keywords: ["enam roda", "roda", "bergerak", "berjalan"],
        weight: 1
      },
      {
        label: "Ciri 2 & Kegunaan (Contoh: Kamera untuk mengambil gambar)",
        keywords: ["kamera", "gambar", "mengambil gambar", "merakam"],
        weight: 1
      },
      {
        label: "Ciri Tambahan Sah (Contoh: Antena untuk menghantar maklumat)",
        keywords: ["antena", "maklumat", "menghantar", "bumi"],
        weight: 1
      }
    ],
    hints: [
      "Perhatikan perenggan pertama: cari apakah peralatan yang dimiliki oleh ROBI.",
      "Sebutkan sekurang-kurangnya dua daripada tiga ciri ini: enam roda, kamera, atau antena beserta fungsinya.",
      "Mulakan jawapan dengan ayat lengkap: 'Dua ciri yang terdapat pada ROBI ialah...'."
    ],
    vocabulary: [
      {
        word: "robot penjelajah",
        meaning: "Mesin kawalan jauh berteknologi tinggi yang bergerak di angkasa atau planet untuk menyiasat dan mengkaji kawasan baharu.",
        example: "ROBI ialah robot penjelajah yang berani merentasi planet Marikh."
      },
      {
        word: "antena",
        meaning: "Alat pengirim dan penerima isyarat gelombang radio dari jarak jauh merentasi angkasa lepas ke stesen Bumi.",
        example: "ROBI menggunakan antena untuk berhubung dengan saintis di Bumi."
      },
      {
        word: "saintis",
        meaning: "Pakar ilmu sains yang menjalankan penyelidikan, eksperimen, dan kajian terhadap alam semesta.",
        example: "Saintis meneliti data dan gambar yang dihantar dari Marikh."
      }
    ],
    imageSrc: heroImg,
    imageAlt: "Robot penjelajah ROBI bersiap sedia memulakan misi ke Marikh bersama kapal angkasa",
    stageEvent: "rover_arrival"
  },
  {
    id: 2,
    missionNumber: 2,
    babakTitle: "Babak 2: Tiba di Planet Merah",
    badgeTitle: "Pakar Geologi Marikh",
    badgeDescription: "Berjaya membongkar rahsia warna merah dan zat besi di Marikh!",
    badgeIcon: "🪐",
    passageTitle: "Tiba di Planet Merah",
    passageText: "Akhirnya, ROBI tiba di Marikh. Planet itu kelihatan merah dan mempunyai banyak batuan serta tanah berdebu. “Wah, semuanya kelihatan berbeza daripada Bumi!” kata ROBI. Marikh dikenali sebagai ‘Planet Merah’ kerana tanah dan batuannya mengandungi zat besi. Zat besi ini menyebabkan permukaan Marikh kelihatan kemerah-merahan. ROBI mula bergerak sambil mengambil gambar kawasan di sekelilingnya. Dia mahu membantu saintis mengetahui lebih lanjut tentang permukaan Marikh.",
    highlightedKeywords: ["Planet Merah", "tanah berdebu", "zat besi", "kemerah-merahan", "permukaan Marikh"],
    question: "2. Mengapakah planet Marikh dikenali sebagai Planet Merah?",
    officialAnswer: "Planet Marikh dikenali sebagai Planet Merah kerana tanah dan batuannya mengandungi zat besi yang menyebabkan permukaannya kelihatan kemerah-merahan.",
    keyConcepts: [
      {
        label: "Kandungan tanah dan batuan (zat besi)",
        keywords: ["zat besi", "besi", "tanah", "batuan", "batu"],
        weight: 1
      },
      {
        label: "Kesan warna permukaan (kemerah-merahan)",
        keywords: ["kemerah-merahan", "merah", "permukaan", "kelihatan"],
        weight: 1
      }
    ],
    hints: [
      "Baca bahagian yang menerangkan sebab Marikh dipanggil 'Planet Merah'.",
      "Apakah bahan mineral penting yang terkandung dalam tanah dan batuannya?",
      "Jawab dengan menyatakan kaitan antara 'zat besi' dengan warna kemerah-merahan."
    ],
    vocabulary: [
      {
        word: "zat besi",
        meaning: "Sejenis unsur mineral semula jadi yang boleh berkarat dan bertukar menjadi warna kemerahan apabila terdedah.",
        example: "Kandungan zat besi yang tinggi menjadikan debu di planet Marikh kelihatan kemerah-merahan."
      },
      {
        word: "tanah berdebu",
        meaning: "Lapisan tanah kering yang halus dan mudah berterbangan ditiup angin.",
        example: "Roda ROBI meninggalkan corak jejak di atas tanah berdebu Marikh."
      },
      {
        word: "kemerah-merahan",
        meaning: "Warna yang agak merah atau mempunyai rona kemerahan yang ketara.",
        example: "Langit petang dan bukit di Marikh kelihatan kemerah-merahan."
      }
    ],
    imageSrc: heroImg,
    imageAlt: "Permukaan Planet Marikh yang kaya dengan tanah merah dan batuan zat besi",
    stageEvent: "iron_soil_scan"
  },
  {
    id: 3,
    missionNumber: 3,
    babakTitle: "Babak 3: Batu Besar Menghalang Laluan",
    badgeTitle: "Penyelesai Masalah",
    badgeDescription: "Berjaya mengesan laluan alternatif ketika dihalang batu gergasi!",
    badgeIcon: "🪨",
    passageTitle: "Batu Besar Menghalang Laluan",
    passageText: "Ketika meneruskan perjalanan, ROBI menemui sebuah batu besar yang menghalang laluannya. “Oh, tidak! Bagaimanakah saya hendak melepasi batu ini?” kata ROBI. ROBI memeriksa kawasan di sekelilingnya menggunakan kamera. Dia menemui laluan lain di sebelah batu tersebut. ROBI bergerak perlahan-lahan melalui laluan itu. Akhirnya, dia berjaya melepasi batu besar tersebut. “Berjaya! Saya perlu memeriksa keadaan sekeliling sebelum bergerak,” kata ROBI dengan gembira.",
    highlightedKeywords: ["batu besar", "menghalang laluannya", "memeriksa kawasan", "kamera", "laluan lain"],
    question: "3. Apakah masalah yang dihadapi oleh ROBI ketika meneruskan pengembaraannya di Marikh?",
    officialAnswer: "ROBI menghadapi masalah apabila sebuah batu besar menghalang laluannya semasa meneruskan pengembaraan.",
    keyConcepts: [
      {
        label: "Halangan batu besar",
        keywords: ["batu besar", "batu", "boulder", "seketul batu"],
        weight: 1
      },
      {
        label: "Menghalang laluan / perjalanan",
        keywords: ["menghalang", "laluan", "laluannya", "menyekat", "perjalanan", "halangan"],
        weight: 1
      }
    ],
    hints: [
      "Fokus pada peristiwa cemas yang berlaku secara tiba-tiba di hadapan ROBI.",
      "Apakah objek besar yang berada tepat di hadapannya?",
      "Nyatakan kesan objek itu terhadap laluannya."
    ],
    vocabulary: [
      {
        word: "menghalang",
        meaning: "Menyekat atau menjadi rintangan yang menyebabkan pergerakan tidak dapat diteruskan secara lurus.",
        example: "Batu gergasi itu menghalang laluan robot daripada meneruskan perjalanan."
      },
      {
        word: "laluan lain",
        meaning: "Jalan alternatif atau laluan sampingan yang selamat untuk dilalui.",
        example: "ROBI mencari laluan lain di sebelah batu untuk mengelakkan bahaya."
      },
      {
        word: "memeriksa",
        meaning: "Melihat dan mengamati sesuatu kawasan dengan teliti untuk memastikan keadaan selamat.",
        example: "Sebelum bergerak laju, ROBI memeriksa keadaan sekelilingnya."
      }
    ],
    imageSrc: boulderImg,
    imageAlt: "Batu besar merah menghalang laluan ROBI di gaung Marikh",
    stageEvent: "boulder_bypass"
  },
  {
    id: 4,
    missionNumber: 4,
    babakTitle: "Babak 4: Maklumat untuk Saintis",
    badgeTitle: "Penyampai Maklumat Angkasa",
    badgeDescription: "Mengetahui tindakan bijak ROBI mengimbas dan mencari laluan selamat!",
    badgeIcon: "📡",
    passageTitle: "Maklumat untuk Saintis",
    passageText: "Semasa meneruskan perjalanan, ROBI menemui banyak batuan yang menarik. Dia mengambil gambar dan mengumpulkan maklumat tentang kawasan itu. ROBI kemudian menggunakan antenanya untuk menghantar maklumat kepada saintis di Bumi. Saintis menerima gambar tersebut dan mula mengkajinya. Robot penjelajah seperti ROBI membantu manusia mengkaji Marikh dari jarak yang jauh. Robot ini boleh mengambil gambar, memeriksa batuan dan mengumpulkan maklumat tanpa perlu membawa manusia ke sana. “Maklumat yang dihantar ROBI sangat berguna untuk kajian kami!” kata seorang saintis. ROBI berasa gembira kerana tugasnya dapat membantu saintis mempelajari planet Marikh.",
    highlightedKeywords: ["kamera", "memeriksa kawasan", "mencari laluan lain", "melepasi batu besar"],
    question: "4. Apakah yang dilakukan oleh ROBI apabila menemui batu besar yang menghalang laluannya?",
    officialAnswer: "ROBI menggunakan kamera untuk memeriksa kawasan sekeliling dan mencari laluan lain bagi melepasi batu besar tersebut.",
    keyConcepts: [
      {
        label: "Menggunakan kamera memeriksa sekeliling",
        keywords: ["kamera", "memeriksa", "sekeliling", "kawasan"],
        weight: 1
      },
      {
        label: "Mencari laluan lain / alternatif",
        keywords: ["laluan lain", "mencari laluan", "sebelah batu", "laluan"],
        weight: 1
      },
      {
        label: "Bergerak perlahan-lahan melepasi batu",
        keywords: ["melepasi", "bergerak", "perlahan-lahan", "berjaya"],
        weight: 1
      }
    ],
    hints: [
      "Perhatikan langkah demi langkah yang diambil oleh ROBI dalam Babak 3 & 4.",
      "Apakah alat yang digunakan oleh ROBI untuk meninjau kawasan itu?",
      "Apakah yang ditemuinya di sebelah batu tersebut?"
    ],
    vocabulary: [
      {
        word: "mengumpulkan maklumat",
        meaning: "Mengambil data saintifik, mencatat suhu, dan merakam keadaan batuan untuk dijadikan kajian.",
        example: "ROBI mengumpulkan maklumat batuan untuk dihantar ke Bumi."
      },
      {
        word: "jarak yang jauh",
        meaning: "Kedudukan yang beratus-ratus juta kilometer di antara Bumi dan Marikh di angkasa lepas.",
        example: "Robot membantu saintis mengkaji angkasa dari jarak yang sangat jauh."
      },
      {
        word: "kajian",
        meaning: "Penyelidikan mendalam untuk mengetahui fakta sains yang tepat.",
        example: "Saintis melakukan kajian terhadap komposisi tanah Marikh."
      }
    ],
    imageSrc: boulderImg,
    imageAlt: "Stesen penyelidikan dan penghantaran data antena ROBI ke Bumi",
    stageEvent: "earth_transmission"
  },
  {
    id: 5,
    missionNumber: 5,
    babakTitle: "Babak 5: Pengembaraan Diteruskan",
    badgeTitle: "Wira Penjelajah Marikh",
    badgeDescription: "Memahami betapa berharganya sumbangan sains ROBI untuk manusia!",
    badgeIcon: "🚀",
    passageTitle: "Pengembaraan Diteruskan",
    passageText: "ROBI melihat kawasan Marikh yang luas. Masih banyak tempat yang belum diterokainya. “Saya telah mengumpulkan banyak maklumat hari ini!” kata ROBI. Saintis di Bumi masih ingin mengetahui sama ada Marikh pernah mempunyai keadaan yang sesuai untuk kehidupan pada zaman dahulu. Oleh itu, maklumat yang dikumpulkan oleh robot penjelajah amat penting untuk membantu mereka membuat kajian. ROBI bersedia untuk meneruskan pengembaraannya. Dia akan terus mengambil gambar dan menghantar maklumat kepada saintis. “Saya berharap penemuan saya dapat membantu manusia memahami Marikh dengan lebih baik!” kata ROBI dengan bersemangat.",
    highlightedKeywords: ["kawasan yang luas", "keadaan yang sesuai untuk kehidupan", "maklumat penting", "membuat kajian", "memahami Marikh"],
    question: "5. Mengapakah maklumat yang dikumpulkan oleh ROBI penting kepada saintis di Bumi?",
    officialAnswer: "Maklumat tersebut penting kerana dapat membantu saintis mengetahui keadaan permukaan Marikh dan menjalankan kajian tentang planet tersebut.",
    keyConcepts: [
      {
        label: "Membantu mengetahui keadaan permukaan / kehidupan zaman dahulu",
        keywords: ["keadaan", "permukaan", "kehidupan", "zaman dahulu", "marikh"],
        weight: 1
      },
      {
        label: "Menjalankan kajian / memahami Marikh dengan lebih baik",
        keywords: ["kajian", "mengkaji", "memahami", "menyelidik", "membantu saintis"],
        weight: 1
      }
    ],
    hints: [
      "Mengapakah saintis di Bumi sangat memerlukan maklumat daripada ROBI?",
      "Fikirkan tentang kajian mengenai permukaan Marikh dan kemungkinan hidupan pada zaman dahulu.",
      "Gunakan kata kunci 'membantu saintis menjalankan kajian' dan 'mengetahui keadaan Marikh'."
    ],
    vocabulary: [
      {
        word: "diterokainya",
        meaning: "Dijelajahi, diselidiki, atau dibuka kawasan baharu yang belum pernah dilawati manusia.",
        example: "Masih banyak kawah dan lembah Marikh yang belum diterokainya."
      },
      {
        word: "kehidupan",
        meaning: "Kewujudan makhluk bernyawa seperti mikroorganisma, tumbuhan, atau organisma hidup.",
        example: "Saintis ingin mengkaji sama ada wujud air dan kehidupan di Marikh pada zaman dahulu."
      },
      {
        word: "bersemangat",
        meaning: "Mempunyai keazaman yang tinggi dan penuh kegembiraan untuk melakukan sesuatu tugas.",
        example: "ROBI meneruskan perjalanannya dengan penuh bersemangat."
      }
    ],
    imageSrc: heroImg,
    imageAlt: "Keluasan lembah dan pemandangan luas permukaan Planet Marikh yang bakal diterokai ROBI",
    stageEvent: "future_exploration"
  }
];
