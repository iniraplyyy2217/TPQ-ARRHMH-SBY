export interface DinulIslamTopic {
  id: string;
  category: 'aqidah' | 'syariah' | 'akhlak' | 'sirah';
  title: string;
  arabicTitle: string;
  summary: string;
  points: {
    title: string;
    description: string;
    dalil?: {
      arabic: string;
      meaning: string;
    };
    practiceForKids: string;
  }[];
}

export const DINUL_ISLAM_BOOK_URL = "https://repository.uin-suska.ac.id/26099/1/Buku%20Pendidikan%20Agama%20Islam%20di%20Perguruan%20Tinggi%20Umum.pdf";

export const DINUL_ISLAM_TOPICS: DinulIslamTopic[] = [
  {
    id: 'rukun-iman',
    category: 'aqidah',
    title: '6 Rukun Iman (Pondasi Keyakinan Santri)',
    arabicTitle: 'أركان الإيمان الستة',
    summary: 'Rukun Iman adalah enam tiang keyakinan dalam hati seorang muslim yang wajib diyakini dengan teguh dan diwujudkan dalam ucapan serta perbuatan santun.',
    points: [
      {
        title: '1. Iman kepada Allah SWT',
        description: 'Meyakini dengan sepenuh hati bahwa Allah itu Maha Esa, Pencipta alam semesta, Maha Melihat setiap perbuatan kita, dan tiada sekutu bagi-Nya.',
        dalil: {
          arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
          meaning: 'Katakanlah: Dialah Allah, Yang Maha Esa. (QS. Al-Ikhlas: 1)'
        },
        practiceForKids: 'Selalu bersikap jujur dan rajin beribadah karena yakin Allah selalu mengawasi kita di mana pun berada.'
      },
      {
        title: '2. Iman kepada Malaikat-Malaikat Allah',
        description: 'Meyakini adanya makhluk gaib ciptaan Allah dari cahaya yang senantiasa taat menjalankan perintah-Nya, seperti Jibril pembawa wahyu, Mikail pembagi rezeki, dan Raqib-Atid pencatat amal.',
        practiceForKids: 'Berhati-hati dalam berucap dan bertindak agar malaikat mencatat banyak kebaikan kita.'
      },
      {
        title: '3. Iman kepada Kitab-Kitab Allah',
        description: 'Meyakini bahwa Allah menurunkan kitab-kitab suci sebagai pedoman hidup manusia, dengan Al-Qur\'an sebagai kitab penyempurna dan penutup yang wajib kita baca, pelajari, dan amalkan.',
        dalil: {
          arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ',
          meaning: 'Kitab (Al-Qur\'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa. (QS. Al-Baqarah: 2)'
        },
        practiceForKids: 'Gemar mengaji di TPQ setiap sore dan malam, mencintai mushaf Al-Qur\'an.'
      },
      {
        title: '4. Iman kepada Rasul-Rasul Allah',
        description: 'Meyakini para utusan Allah yang membawa ajaran tauhid kepada umat manusia, dengan Nabi Muhammad SAW sebagai nabi dan rasul terakhir (Khatamun Nabiyyin).',
        practiceForKids: 'Meneladani sifat mulia Nabi (Siddiq, Amanah, Tabligh, Fathonah) dan rajin membaca sholawat.'
      },
      {
        title: '5. Iman kepada Hari Akhir (Kiamat)',
        description: 'Meyakini bahwa kehidupan dunia fana ini akan berakhir dan setiap manusia akan dibangkitkan untuk mempertanggungjawabkan perbuatannya di hadapan Allah SWT.',
        practiceForKids: 'Memperbanyak tabungan pahala dengan sholat, sedekah jajan, dan menolong teman.'
      },
      {
        title: '6. Iman kepada Qadha dan Qadar',
        description: 'Meyakini segala ketentuan dan takdir baik maupun takdir buruk telah ditetapkan Allah dengan penuh hikmah dan keadilan.',
        practiceForKids: 'Berikhtiar sungguh-sungguh dalam belajar, lalu bersyukur saat berhasil dan sabar tidak putus asa jika belum berhasil.'
      }
    ]
  },
  {
    id: 'rukun-islam',
    category: 'syariah',
    title: '5 Rukun Islam (Tiang Agama)',
    arabicTitle: 'أركan الإسلام الخمسة',
    summary: 'Lima amalan pokok yang menjadi rukun dalam beragama Islam, membangun ketaatan lahiriah dan batiniah bagi setiap muslim.',
    points: [
      {
        title: '1. Mengucapkan Dua Kalimat Syahadat',
        description: 'Bersaksi bahwa tidak ada sesembahan yang berhak diibadahi selain Allah dan bersaksi bahwa Nabi Muhammad adalah utusan Allah.',
        dalil: {
          arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
          meaning: 'Aku bersaksi tiada Tuhan selain Allah dan aku bersaksi Nabi Muhammad adalah utusan Allah.'
        },
        practiceForKids: 'Membiasakan lisan mengucap tauhid saat bangun tidur dan menjelang istirahat.'
      },
      {
        title: '2. Menegakkan Sholat 5 Waktu',
        description: 'Kewajiban sholat fardhu sehari semalam (Subuh, Dzuhur, Ashar, Maghrib, Isya) sebagai penghubung hamba dengan Sang Pencipta.',
        practiceForKids: 'Sholat tepat waktu ketika adzan berkumandang, belajar sholat berjamaah di masjid/musholla.'
      },
      {
        title: '3. Menunaikan Zakat',
        description: 'Mengeluarkan sebagian harta yang telah memenuhi nisab untuk dibagikan kepada yang berhak (asnaf), termasuk zakat fitrah di bulan Ramadhan.',
        practiceForKids: 'Belajar berinfaq di kotak amal TPQ setiap hari mengaji.'
      },
      {
        title: '4. Berpuasa di Bulan Ramadhan',
        description: 'Menahan diri dari lapar, dahaga, dan hal-hal yang membatalkan dari terbit fajar hingga terbenam matahari dengan niat beribadah.',
        practiceForKids: 'Berlatih puasa setengah hari hingga seharian penuh dengan gembira saat Ramadhan tiba.'
      },
      {
        title: '5. Menunaikan Ibadah Haji',
        description: 'Melaksanakan rukun haji di Baitullah Makkah bagi mereka yang mampu secara fisik, mental, dan finansial.',
        practiceForKids: 'Mengikuti manasik haji cilik bersama teman-teman TPQ dengan memakai kain ihram putih.'
      }
    ]
  },
  {
    id: 'akhlak-santri',
    category: 'akhlak',
    title: 'Adab & Akhlak Mulia Santri TPQ',
    arabicTitle: 'أدب وأخلاق طالب العلم',
    summary: 'Ilmu tanpa adab ibarat pohon tanpa buah. Santri TPQ dididik berakhlak mulia kepada orang tua, guru, sesama teman, dan lingkungan sekitar.',
    points: [
      {
        title: 'Adab kepada Kedua Orang Tua (Birrul Walidain)',
        description: 'Menyayangi ayah dan ibu, bertutur kata lemah lembut (tidak berkata "ah" atau membentak), mencium tangan sebelum berangkat mengaji, dan selalu mendoakan keduanya.',
        dalil: {
          arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
          meaning: 'Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapak. (QS. Al-Isra: 23)'
        },
        practiceForKids: 'Mencium tangan orang tua saat pamit ke TPQ dan membantu merapikan tempat tidur.'
      },
      {
        title: 'Adab kepada Ustadz & Ustadzah',
        description: 'Menghormati guru yang mengajarkan huruf hijaiyah dan Al-Qur\'an, mendengarkan penjelasan dengan tenang, tidak berbicara sendiri saat ustadz mengajar, dan mengucapkan salam.',
        practiceForKids: 'Menyapa ustadz dengan salam ramah, datang tepat waktu sebelum kelas mengaji dimulai.'
      },
      {
        title: 'Adab Terhadap Mushaf Al-Qur\'an',
        description: 'Berwudhu sebelum menyentuh Al-Qur\'an, meletakkan mushaf di tempat yang tinggi/bersih (menggunakan rekal), tidak menaruh benda lain di atas Al-Qur\'an, dan membacanya dengan khusyuk.',
        practiceForKids: 'Membawa Al-Qur\'an atau iqra dengan kedua tangan didekap di dada dengan sopan.'
      },
      {
        title: 'Adab Berteman & Bersosial',
        description: 'Menjaga persaudaraan, saling berbagi, tidak mengejek atau membully kekurangan teman, dan memaafkan jika ada perselisihan.',
        practiceForKids: 'Berbagi tempat duduk saat halaqah dan saling membantu menyimak bacaan tajwid teman.'
      }
    ]
  }
];
