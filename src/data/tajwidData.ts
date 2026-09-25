export interface TajwidRule {
  id: string;
  name: string;
  arabicName: string;
  category: string;
  description: string;
  letters: string[];
  howToRead: string;
  examples: {
    verse: string;
    surah: string;
    arabic: string;
    latin: string;
    explanation: string;
  }[];
}

export const TAJWID_BOOK_URL = "https://repository.uir.ac.id/5429/1/BUKU%20PANDUAN%20ILMU%20TAJWID_Dr%20Zulkarnain%20Umar.pdf";

export const TAJWID_CATEGORIES = [
  { id: 'all', title: 'Semua Bab Tajwid' },
  { id: 'nun-mati', title: 'Hukum Nun Mati & Tanwin' },
  { id: 'mim-mati', title: 'Hukum Mim Mati' },
  { id: 'qalqalah', title: 'Hukum Qalqalah' },
  { id: 'mad', title: 'Hukum Mad' },
  { id: 'makhraj', title: 'Makhorijul Huruf' },
  { id: 'alif-lam', title: 'Hukum Alif Lam (Al)' },
];

export const TAJWID_RULES: TajwidRule[] = [
  {
    id: 'izhar-halqi',
    name: 'Izhar Halqi',
    arabicName: 'إظهار حلقي',
    category: 'nun-mati',
    description: 'Apabila nun sukun (نْ) atau tanwin (ـًـٍـٌ) bertemu dengan salah satu dari 6 huruf halq (tenggorokan), maka dibaca jelas tanpa mendengung.',
    letters: ['ء (Hamzah)', 'هـ (Ha)', 'ع (\'Ain)', 'غ (Ghain)', 'ح (Ha\')', 'خ (Kha)'],
    howToRead: 'Dibaca terang dan jelas huruf nun atau tanwinnya, tidak boleh ditahan atau didengungkan.',
    examples: [
      {
        verse: 'QS. Al-Kautsar: 2',
        surah: 'Al-Kautsar',
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        latin: 'Fa shalli lirabbika wan-har',
        explanation: 'Nun sukun bertemu huruf Kha (ح) pada kata وَانْحَرْ, dibaca jelas "wan-har" tanpa dengung.'
      },
      {
        verse: 'QS. Al-Ikhlas: 4',
        surah: 'Al-Ikhlas',
        arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        latin: 'Wa lam yakul lahu kufuwan ahad',
        explanation: 'Tanwin (wawu berharakat fathatain) bertemu Hamzah (أ) pada كُفُوًا أَحَدٌ, dibaca jelas "kufuwan ahad".'
      },
      {
        verse: 'QS. Al-Qadr: 5',
        surah: 'Al-Qadr',
        arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
        latin: 'Salamun hiya hatta mathla\'il fajr',
        explanation: 'Tanwin (dhommatain) bertemu Ha (هـ) pada سَلَامٌ هِيَ, dibaca jelas "Salamun hiya".'
      }
    ]
  },
  {
    id: 'idgham-bighunnah',
    name: 'Idgham Bighunnah',
    arabicName: 'إدغام بغنة',
    category: 'nun-mati',
    description: 'Apabila nun sukun (نْ) atau tanwin bertemu dengan salah satu huruf Ya, Nun, Mim, atau Wau (ي، ن، م، و), maka dimasukkan ke huruf berikutnya disertai dengung 2 harakat.',
    letters: ['ي (Ya)', 'ن (Nun)', 'م (Mim)', 'و (Wau) - disingkat Yanmu (يَنْمُو)'],
    howToRead: 'Meleburkan bunyi nun/tanwin ke huruf berikutnya disertai ghunnah (dengung yang keluar dari rongga hidung) sepanjang 2 harakat.',
    examples: [
      {
        verse: 'QS. Al-Lahab: 1',
        surah: 'Al-Lahab',
        arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
        latin: 'Tabbat yadaa abii lahabinwwa tabb',
        explanation: 'Tanwin pada kata لَهَبٍ bertemu huruf Wau (و), dibaca melebur disertai dengung: "lahabiwwa tabb".'
      },
      {
        verse: 'QS. Al-Humazah: 2',
        surah: 'Al-Humazah',
        arabic: 'الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ',
        latin: 'Alladzii jama\'a maalanwwa \'addadah',
        explanation: 'Tanwin (fathatain) pada مَالًا bertemu huruf Wau (و), dilebur dan didengungkan: "maalanwwa".'
      },
      {
        verse: 'QS. Az-Zalzalah: 7',
        surah: 'Az-Zalzalah',
        arabic: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
        latin: 'Fa may ya\'mal mitsqaala dzarratin khairay yarah',
        explanation: 'Nun sukun bertemu Ya (ي) pada فَمَنْ يَعْمَلْ, dibaca "Fa may ya\'mal" dengan dengung.'
      }
    ]
  },
  {
    id: 'idgham-bilaghunnah',
    name: 'Idgham Bilaghunnah',
    arabicName: 'إدغام بلا غنة',
    category: 'nun-mati',
    description: 'Apabila nun sukun atau tanwin bertemu huruf Lam (ل) atau Ra (ر), dimasukkan secara sempurna tanpa didengungkan.',
    letters: ['ل (Lam)', 'ر (Ra)'],
    howToRead: 'Memasukkan bunyi nun mati/tanwin ke huruf Lam atau Ra tanpa dengung (tidak ditahan di hidung).',
    examples: [
      {
        verse: 'QS. Al-Ikhlas: 4',
        surah: 'Al-Ikhlas',
        arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        latin: 'Wa lam yakul-lahuu kufuwan ahad',
        explanation: 'Nun mati pada يَكُنْ bertemu Lam (ل), langsung masuk menjadi "yakul-lahuu" tanpa dengung.'
      },
      {
        verse: 'QS. Al-Humazah: 1',
        surah: 'Al-Humazah',
        arabic: 'وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ',
        latin: 'Wailul-likulli humazatil-lumazah',
        explanation: 'Tanwin pada وَيْلٌ bertemu Lam (ل), dibaca "Wailul-likulli" tanpa dengung.'
      }
    ]
  },
  {
    id: 'iqlab',
    name: 'Iqlab',
    arabicName: 'إقلاب',
    category: 'nun-mati',
    description: 'Apabila nun sukun atau tanwin bertemu dengan huruf Ba (ب), bunyinya ditukar menjadi bunyi Mim (م) disertai dengung.',
    letters: ['ب (Ba)'],
    howToRead: 'Mengubah bunyi nun atau tanwin menjadi mim samar dengan merapatkan kedua bibir ringan dan mendengung 2 harakat.',
    examples: [
      {
        verse: 'QS. Al-Humazah: 4',
        surah: 'Al-Humazah',
        arabic: 'كَلَّا ۖ لَيُنْبَذَنَّ فِي الْحُطَمَةِ',
        latin: 'Kallaa layum-badzanna fil huthamah',
        explanation: 'Nun sukun bertemu huruf Ba (ب) pada kata لَيُنْبَذَنَّ, ditukar bunyinya menjadi Mim dengung: "layum-badzanna".'
      },
      {
        verse: 'QS. Al-Balad: 2',
        surah: 'Al-Balad',
        arabic: 'وَأَنْتَ حِلٌّ بِهَٰذَا الْبَلَدِ',
        latin: 'Wa anta hillum bihaadzal balad',
        explanation: 'Tanwin pada حِلٌّ bertemu Ba (ب), dibaca "hillum bihaadza" disertai dengung.'
      }
    ]
  },
  {
    id: 'ikhfa-haqiqi',
    name: 'Ikhfa Haqiqi',
    arabicName: 'إخفاء حقيقي',
    category: 'nun-mati',
    description: 'Apabila nun sukun atau tanwin bertemu dengan salah satu dari 15 huruf ikhfa, dibaca samar antara izhar dan idgham disertai dengung 2 harakat.',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    howToRead: 'Membunyikan nun mati/tanwin secara samar-samar mendekati makhraj huruf berikutnya sambil mendengung.',
    examples: [
      {
        verse: 'QS. Al-Falaq: 2',
        surah: 'Al-Falaq',
        arabic: 'مِنْ شَرِّ مَا خَلَقَ',
        latin: 'Min syarri maa khalaq',
        explanation: 'Nun sukun bertemu Syin (ش) pada مِنْ شَرِّ, dibaca samar mendengung "ming syarri".'
      },
      {
        verse: 'QS. An-Nas: 4',
        surah: 'An-Nas',
        arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        latin: 'Min syarril waswaasil khannaas',
        explanation: 'Nun sukun bertemu Syin (ش), dibaca samar ikhfa.'
      },
      {
        verse: 'QS. Quraisy: 4',
        surah: 'Quraisy',
        arabic: 'الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ',
        latin: 'Alladzii ath\'amahum min juu\'',
        explanation: 'Nun sukun bertemu Jim (ج) pada مِنْ جُوعٍ, dibaca samar mendengung "minj juu\'".'
      }
    ]
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah (Sughra & Kubra)',
    arabicName: 'قلقلة صغرى وكبرى',
    category: 'qalqalah',
    description: 'Memantulkan bunyi huruf qalqalah (Qaf, Tha, Ba, Jim, Dal - disingkat BAJU DI TOKO / قُطْبُ جَدٍّ) ketika sukun asli atau karena waqaf.',
    letters: ['ق (Qaf)', 'ط (Tha)', 'ب (Ba)', 'ج (Jim)', 'د (Dal)'],
    howToRead: 'Sughra (kecil): sukun di tengah kata, pantulan ringan. Kubra (besar): sukun karena waqaf di akhir ayat/kalimat, pantulan kuat dan jelas.',
    examples: [
      {
        verse: 'QS. Al-Ikhlas: 1',
        surah: 'Al-Ikhlas',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        latin: 'Qul huwallahu ahad(d)',
        explanation: 'Qalqalah Kubra pada huruf Dal di akhir ayat أَحَدٌ saat waqaf, dipantulkan secara mantap.'
      },
      {
        verse: 'QS. Al-Falaq: 1',
        surah: 'Al-Falaq',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        latin: 'Qul a\'uudzu birabbil falaq(q)',
        explanation: 'Qalqalah Kubra pada huruf Qaf (ق) yang diwaqafkan di akhir kata الْفَلَقِ.'
      },
      {
        verse: 'QS. Al-Kautsar: 3',
        surah: 'Al-Kautsar',
        arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        latin: 'Inna syaani\'aka huwal abtar',
        explanation: 'Qalqalah Sughra pada huruf Ba (ب) sukun di tengah kata الْأَبْتَرُ, pantulan ringan tidak terputus.'
      }
    ]
  },
  {
    id: 'mim-sukun',
    name: 'Hukum Mim Sukun (مْ)',
    arabicName: 'أحكام الميم الساكنة',
    category: 'mim-mati',
    description: 'Hukum bacaan ketika huruf mim sukun (مْ) bertemu huruf hijaiyah, terbagi menjadi 3: Ikhfa Syafawi, Idgham Mimi, dan Izhar Syafawi.',
    letters: ['Ikhfa Syafawi: bertemu Ba (ب)', 'Idgham Mimi: bertemu Mim (م)', 'Izhar Syafawi: 26 huruf lainnya'],
    howToRead: 'Ikhfa Syafawi: bibir tertutup renggang mendengung. Idgham Mimi: melebur sesama mim dengan dengung 2 harakat. Izhar Syafawi: dibaca jelas di bibir tanpa dengung.',
    examples: [
      {
        verse: 'QS. Al-Fil: 4',
        surah: 'Al-Fil',
        arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ',
        latin: 'Tarmiihim bihijaaratim min sijjiil',
        explanation: 'Ikhfa Syafawi: Mim sukun pada تَرْمِيهِمْ bertemu Ba (ب), dibaca samar mendengung di bibir.'
      },
      {
        verse: 'QS. Quraisy: 4',
        surah: 'Quraisy',
        arabic: 'وَآمَنَهُمْ مِنْ خَوْفٍ',
        latin: 'Wa aamanahum min khauf',
        explanation: 'Idgham Mimi: Mim sukun pada آمَنَهُمْ bertemu Mim (م), dileburkan menjadi satu mim bertasydid dengan dengung 2 harakat.'
      },
      {
        verse: 'QS. Al-Ma\'un: 5',
        surah: 'Al-Ma\'un',
        arabic: 'الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ',
        latin: 'Alladziina hum \'an shalaatihim saahuun',
        explanation: 'Izhar Syafawi: Mim sukun pada هُمْ bertemu \'Ain (ع) dan صَلَاتِهِمْ bertemu Sin (س), dibaca jelas tanpa dengung.'
      }
    ]
  },
  {
    id: 'mad-thabii',
    name: 'Hukum Mad (Mad Asli & Far\'i)',
    arabicName: 'أحكام المد',
    category: 'mad',
    description: 'Memanjangkan bunyi huruf vokal Alif sesudah fathah, Wawu sukun sesudah dhammah, dan Ya sukun sesudah kasrah.',
    letters: ['ا (Alif)', 'و (Wawu)', 'ي (Ya)'],
    howToRead: 'Mad Thabi\'i (Asli) dipanjangkan 1 alif (2 harakat). Mad Wajib Muttashil 4-5 harakat. Mad Ja\'iz Munfashil 2-5 harakat.',
    examples: [
      {
        verse: 'QS. An-Nas: 1',
        surah: 'An-Nas',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        latin: 'Qul a\'uudzu birabbin-naas',
        explanation: 'Mad \'Aridh Lissukun pada kata النَّاسِ saat waqaf di akhir ayat, boleh dibaca 2, 4, atau 6 harakat.'
      },
      {
        verse: 'QS. Al-Kautsar: 1',
        surah: 'Al-Kautsar',
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        latin: 'Innaa a\'thainaakal kautsar',
        explanation: 'Mad Ja\'iz Munfashil pada إِنَّا أَعْطَيْنَاكَ (huruf mad bertemu hamzah di kata terpisah), dibaca panjang 4-5 harakat.'
      }
    ]
  },
  {
    id: 'makhraj-huruf',
    name: 'Makhorijul Huruf',
    arabicName: 'مخارج الحروف',
    category: 'makhraj',
    description: 'Tempat keluarnya huruf hijaiyah saat diucapkan agar menghasilkan bunyi yang benar dan membedakan makna.',
    letters: ['Al-Halq (Tenggorokan)', 'Al-Lisan (Lidah)', 'Asy-Syafatain (Dua Bibir)', 'Al-Khaisyum (Rongga Hidung)', 'Al-Jauf (Rongga Mulut)'],
    howToRead: 'Mengenali posisi lidah, bibir, atau pita tenggorokan saat melafalkan setiap huruf Arab.',
    examples: [
      {
        verse: 'QS. Al-Fatihah: 6',
        surah: 'Al-Fatihah',
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        latin: 'Ihdinash-shiraathal mustaqiim',
        explanation: 'Perhatikan makhraj huruf Ha (هـ) di pangkal tenggorokan, Shad (ص) dan Tha (ط) di ujung lidah bersentuhan gusi atas dengan sifat Isti\'la (tebal).'
      }
    ]
  }
];
