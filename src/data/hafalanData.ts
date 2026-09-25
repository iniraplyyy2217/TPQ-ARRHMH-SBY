export interface ChildPrayer {
  id: string;
  title: string;
  category: string;
  arabic: string;
  latin: string;
  meaning: string;
  benefit: string;
}

export interface Juz30Surah {
  number: number;
  name: string;
  arabicName: string;
  translation: string;
  numberOfAyahs: number;
  revelationType: 'Makkiyah' | 'Madaniyah';
  verses: {
    ayahNumber: number;
    arabic: string;
    latin: string;
    translation: string;
  }[];
}

export interface QariInfo {
  id: string;
  name: string;
  country: string;
  flag: string;
  badge: string;
  folder: string;
  description: string;
}

export const INTERNATIONAL_QARIS: QariInfo[] = [
  {
    id: 'alafasy',
    name: 'Misyari Rasyid Al-Afasy',
    country: 'Kuwait',
    flag: '🇰🇼',
    badge: 'Favorit Santri Cilik',
    folder: 'Alafasy_128kbps',
    description: 'Suara merdu, fasih, dan paling disukai anak-anak untuk hafalan.'
  },
  {
    id: 'husary',
    name: 'Mahmud Khalil Al-Hushari',
    country: 'Mesir',
    flag: '🇪🇬',
    badge: 'Guru Tajwid & Tartil',
    folder: 'Husary_128kbps',
    description: 'Pelafalan makhraj sangat jelas dan tempo teratur, standar guru TPQ dunia.'
  },
  {
    id: 'sudais',
    name: 'Abdurrahman As-Sudais',
    country: 'Arab Saudi',
    flag: '🇸🇦',
    badge: 'Imam Masjidil Haram',
    folder: 'Abdurrahmaan_As-Sudais_192kbps',
    description: 'Khas lantunan Makkah Al-Mukarramah yang berwibawa dan menggetarkan hati.'
  },
  {
    id: 'ghamadi',
    name: "Sa'ad Al-Ghamidi",
    country: 'Arab Saudi',
    flag: '🇸🇦',
    badge: 'Syahdu & Mengalir',
    folder: 'Ghamadi_40kbps',
    description: 'Irama tartil yang lembut, tenang, dan mudah ditirukan anak.'
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    country: 'Mesir',
    flag: '🇪🇬',
    badge: 'Legenda Qari Dunia',
    folder: 'Abdul_Basit_Murattal_192kbps',
    description: 'Master qiraah dengan napas panjang dan ketukan harakat presisi.'
  }
];

export const getAyahAudioUrl = (surahNumber: number, ayahNumber: number, qariFolder: string): string => {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/${qariFolder}/${s}${a}.mp3`;
};

export const CHILD_PRAYERS: ChildPrayer[] = [
  {
    id: 'doa-makan-sebelum',
    title: 'Doa Sebelum Makan',
    category: 'Makan & Minum',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ، بِسْمِ اللَّهِ',
    latin: "Allaahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban-naar, bismillaah",
    meaning: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka. Dengan menyebut nama Allah.',
    benefit: 'Menghadirkan keberkahan pada makanan dan mencegah setan ikut memakan hidangan.'
  },
  {
    id: 'doa-makan-sesudah',
    title: 'Doa Sesudah Makan & Minum',
    category: 'Makan & Minum',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ',
    latin: "Alhamdulillaahil-ladzii ath'amanaa wa saqaanaa wa ja'alanaa minal muslimiin",
    meaning: 'Segala puji bagi Allah yang telah memberi makan dan minum kepada kami, serta menjadikan kami termasuk orang-orang muslim.',
    benefit: 'Bentuk syukur atas kenikmatan makanan dan diampuni dosa-dosa yang telah lalu.'
  },
  {
    id: 'doa-orang-tua',
    title: 'Doa Untuk Kedua Orang Tua',
    category: 'Birrul Walidain',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa',
    meaning: 'Wahai Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah mereka berdua sebagaimana mereka telah mendidikku di waktu kecil.',
    benefit: 'Menjadi anak shalih yang doa baktinya menjadi aliran pahala jariyah orang tua.'
  },
  {
    id: 'doa-dunia-akhirat',
    title: 'Doa Kebaikan Dunia & Akhirat (Sapu Jagad)',
    category: 'Harian',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban-naar",
    meaning: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa api neraka.',
    benefit: 'Doa yang paling sering dibaca oleh Rasulullah SAW karena mencakup seluruh kebaikan hidup.'
  },
  {
    id: 'doa-tidur-sebelum',
    title: 'Doa Sebelum Tidur',
    category: 'Istirahat',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوتُ',
    latin: 'Bismikallaahumma ahyaa wa bismika amuutu',
    meaning: 'Dengan menyebut nama-Mu ya Allah aku hidup dan dengan menyebut nama-Mu aku mati.',
    benefit: 'Mendapat perlindungan malaikat saat terlelap dan dijauhkan dari mimpi buruk.'
  },
  {
    id: 'doa-tidur-bangun',
    title: 'Doa Bangun Tidur',
    category: 'Istirahat',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: "Alhamdulillaahil-ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin-nusyuur",
    meaning: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (tidur) dan kepada-Nya kami kembali.',
    benefit: 'Mengawali hari dengan dzikir syukur sehingga pikiran menjadi segar dan bersemangat.'
  },
  {
    id: 'doa-masuk-masjid',
    title: 'Doa Masuk Masjid',
    category: 'Ibadah',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allaahummaftah lii abwaaba rahmatik',
    meaning: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    benefit: 'Sunnah mendahulukan kaki kanan dan beriktikaf mendapatkan limpahan rahmat.'
  },
  {
    id: 'doa-keluar-masjid',
    title: 'Doa Keluar Masjid',
    category: 'Ibadah',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allaahumma innii as-aluka min fadhlik',
    meaning: 'Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu.',
    benefit: 'Melangkah dengan kaki kiri memohon kelapangan rezeki dan karunia halal.'
  },
  {
    id: 'doa-belajar-sebelum',
    title: 'Doa Sebelum Belajar & Mengaji',
    category: 'Belajar',
    arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا، وَاجْعَلْنِي مِنَ الصَّالِحِينَ',
    latin: "Rabbi zidnii 'ilman warzuqnii fahman, waj'alnii minash-shaalihiin",
    meaning: 'Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan dan karuniakanlah kepadaku pemahaman yang luas, serta jadikanlah aku golongan orang shalih.',
    benefit: 'Membuka pintu kecerdasan, ketajaman hafalan tajwid, dan kemudahan dalam memahami ayat.'
  },
  {
    id: 'doa-keluar-rumah',
    title: 'Doa Keluar Rumah',
    category: 'Perjalanan',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: "Bismillaahi tawakkaltu 'alallaahi, laa haula wa laa quwwata illaa billaah",
    meaning: 'Dengan menyebut nama Allah, aku berserah diri kepada Allah, tiada daya dan upaya melainkan dengan pertolongan Allah.',
    benefit: 'Dijamin keselamatan di jalan dari bahaya kecelakaan dan godaan syaitan.'
  },
  {
    id: 'doa-bercermin',
    title: 'Doa Bercermin (Memperindah Akhlak)',
    category: 'Adab',
    arabic: 'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    latin: 'Allaahumma kamaa hassanta khalqii fahassin khuluqii',
    meaning: 'Ya Allah, sebagaimana Engkau telah memperbagus rupa penciptaanku, maka perbaguslah pula akhlak pekertiku.',
    benefit: 'Menghindarkan rasa sombong dan menumbuhkan akhlak budi pekerti yang santun.'
  }
];

export const JUZ_30_SURAHS: Juz30Surah[] = [
  {
    number: 1,
    name: 'Al-Fatihah',
    arabicName: 'الفاتحة',
    translation: 'Pembukaan (Ummul Qur\'an)',
    numberOfAyahs: 7,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Bismillaahir-rahmaanir-rahiim',
        translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.'
      },
      {
        ayahNumber: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        latin: "Al-hamdu lillaahi rabbil-'aalamiin",
        translation: 'Segala puji bagi Allah, Tuhan seluruh alam,'
      },
      {
        ayahNumber: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Ar-rahmaanir-rahiim',
        translation: 'Yang Maha Pengasih lagi Maha Penyayang,'
      },
      {
        ayahNumber: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        latin: 'Maaliki yaumid-diin',
        translation: 'Pemilik hari pembalasan.'
      },
      {
        ayahNumber: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        latin: 'Iyyaaka na\'budu wa iyyaaka nasta\'iin',
        translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.'
      },
      {
        ayahNumber: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        latin: 'Ihdinash-shiraathal-mustaqiim',
        translation: 'Tunjukilah kami jalan yang lurus,'
      },
      {
        ayahNumber: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        latin: "Shiraathal-ladziina an'amta 'alaihim ghairil-maghdhuubi 'alaihim wa ladh-dhaalliin",
        translation: '(yaitu) jalan orang-orang yang telah Engkau anugerahkan nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.'
      }
    ]
  },
  {
    number: 114,
    name: 'An-Nas',
    arabicName: 'الناس',
    translation: 'Manusia',
    numberOfAyahs: 6,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        latin: "Qul a'uudzu birabbin-naas",
        translation: 'Katakanlah: "Aku berlindung kepada Tuhannya manusia,'
      },
      {
        ayahNumber: 2,
        arabic: 'مَلِكِ النَّاسِ',
        latin: 'Malikin-naas',
        translation: 'Raja manusia,'
      },
      {
        ayahNumber: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        latin: 'Ilaahin-naas',
        translation: 'Sembahan manusia,'
      },
      {
        ayahNumber: 4,
        arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        latin: 'Min syarril waswaasil khannaas',
        translation: 'Dari kejahatan (bisikan) syaitan yang biasa bersembunyi,'
      },
      {
        ayahNumber: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        latin: 'Alladzii yuwaswisu fii shuduurin-naas',
        translation: 'Yang membisikkan (kejahatan) ke dalam dada manusia,'
      },
      {
        ayahNumber: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        latin: 'Minal jinnati wan-naas',
        translation: 'Dari (golongan) jin dan manusia."'
      }
    ]
  },
  {
    number: 113,
    name: 'Al-Falaq',
    arabicName: 'الفلق',
    translation: 'Waktu Subuh',
    numberOfAyahs: 5,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        latin: "Qul a'uudzu birabbil falaq",
        translation: 'Katakanlah: "Aku berlindung kepada Tuhan Yang Menguasai subuh,'
      },
      {
        ayahNumber: 2,
        arabic: 'مِنْ شَرِّ مَا خَلَقَ',
        latin: 'Min syarri maa khalaq',
        translation: 'Dari kejahatan makhluk-Nya,'
      },
      {
        ayahNumber: 3,
        arabic: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        latin: 'Wa min syarri ghaasiqin idzaa waqab',
        translation: 'Dan dari kejahatan malam apabila telah gelap gulita,'
      },
      {
        ayahNumber: 4,
        arabic: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        latin: "Wa min syarrin-naffaatsaati fil 'uqad",
        translation: 'Dan dari kejahatan wanita-wanita penyihir yang menghembus pada buhul-buhul,'
      },
      {
        ayahNumber: 5,
        arabic: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        latin: 'Wa min syarri haasidin idzaa hasad',
        translation: 'Dan dari kejahatan orang yang dengki apabila ia dengki."'
      }
    ]
  },
  {
    number: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإخلاص',
    translation: 'Kemurnian Tauhid',
    numberOfAyahs: 4,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        latin: 'Qul huwallaahu ahad',
        translation: 'Katakanlah: "Dialah Allah, Yang Maha Esa.'
      },
      {
        ayahNumber: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        latin: 'Allaahush-shamad',
        translation: 'Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu.'
      },
      {
        ayahNumber: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        latin: 'Lam yalid wa lam yuulad',
        translation: 'Dia tiada beranak dan tidak pula diperanakkan,'
      },
      {
        ayahNumber: 4,
        arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        latin: 'Wa lam yakul lahu kufuwan ahad',
        translation: 'Dan tidak ada seorang pun yang setara dengan Dia."'
      }
    ]
  },
  {
    number: 111,
    name: 'Al-Lahab',
    arabicName: 'المسد',
    translation: 'Gejolak Api / Sabut',
    numberOfAyahs: 5,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
        latin: 'Tabbat yadaa abii lahabiw-wa tabb',
        translation: 'Binasalah kedua tangan Abu Lahab dan sesungguhnya dia pasti binasa.'
      },
      {
        ayahNumber: 2,
        arabic: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ',
        latin: 'Maa aghnaa \'anhu maaluhuu wa maa kasab',
        translation: 'Tidaklah berfaedah kepadanya harta bendanya dan apa yang ia usahakan.'
      },
      {
        ayahNumber: 3,
        arabic: 'سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ',
        latin: 'Sayashlaa naaran dzaata lahab',
        translation: 'Kelak dia akan masuk ke dalam api yang bergejolak.'
      },
      {
        ayahNumber: 4,
        arabic: 'وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ',
        latin: 'Wamra-atuhuu hammaalatal-hathab',
        translation: 'Dan (begitu pula) istrinya, pembawa kayu bakar.'
      },
      {
        ayahNumber: 5,
        arabic: 'فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ',
        latin: 'Fii jiidihaa hablum-mim masad',
        translation: 'Yang di lehernya ada tali dari sabut.'
      }
    ]
  },
  {
    number: 110,
    name: 'An-Nasr',
    arabicName: 'النصر',
    translation: 'Pertolongan',
    numberOfAyahs: 3,
    revelationType: 'Madaniyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        latin: 'Idzaa jaa-a nashrullaahi wal-fath',
        translation: 'Apabila telah datang pertolongan Allah dan kemenangan,'
      },
      {
        ayahNumber: 2,
        arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
        latin: "Wa ra-aitan-naasa yadkhuluuna fii diinillaahi afwaajaa",
        translation: 'Dan kamu lihat manusia masuk agama Allah dengan berbondong-bondong,'
      },
      {
        ayahNumber: 3,
        arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
        latin: 'Fasabbih bihamdi rabbika wastaghfirh, innahuu kaana tawwaabaa',
        translation: 'Maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun kepada-Nya. Sesungguhnya Dia adalah Maha Penerima taubat.'
      }
    ]
  },
  {
    number: 109,
    name: 'Al-Kafirun',
    arabicName: 'الكافرون',
    translation: 'Orang-Orang Kafir',
    numberOfAyahs: 6,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ',
        latin: 'Qul yaa ayyuhal-kaafiruun',
        translation: 'Katakanlah: "Hai orang-orang kafir,'
      },
      {
        ayahNumber: 2,
        arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ',
        latin: "Laa a'budu maa ta'buduun",
        translation: 'Aku tidak akan menyembah apa yang kamu sembah.'
      },
      {
        ayahNumber: 3,
        arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
        latin: "Wa laa antum 'aabiduuna maa a'bud",
        translation: 'Dan kamu bukan penyembah Tuhan yang aku sembah.'
      },
      {
        ayahNumber: 4,
        arabic: 'وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ',
        latin: "Wa laa ana 'aabidum-maa 'abadtum",
        translation: 'Dan aku tidak pernah menjadi penyembah apa yang kamu sembah,'
      },
      {
        ayahNumber: 5,
        arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
        latin: "Wa laa antum 'aabiduuna maa a'bud",
        translation: 'Dan kamu tidak pernah (pula) menjadi penyembah Tuhan yang aku sembah.'
      },
      {
        ayahNumber: 6,
        arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
        latin: 'Lakum diinukum wa liya diin',
        translation: 'Untukmu agamamu, dan untukkulah, agamaku."'
      }
    ]
  },
  {
    number: 108,
    name: 'Al-Kautsar',
    arabicName: 'الكوثر',
    translation: 'Nikmat yang Berlimpah',
    numberOfAyahs: 3,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        latin: "Innaa a'thainaakal-kautsar",
        translation: 'Sesungguhnya Kami telah memberikan kepadamu nikmat yang banyak.'
      },
      {
        ayahNumber: 2,
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        latin: 'Fa shalli lirabbika wan-har',
        translation: 'Maka dirikanlah sholat karena Tuhanmu; dan berkorbanlah.'
      },
      {
        ayahNumber: 3,
        arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        latin: "Inna syaani'aka huwal-abtar",
        translation: 'Sesungguhnya orang-orang yang membenci kamu dialah yang terputus.'
      }
    ]
  },
  {
    number: 107,
    name: 'Al-Ma\'un',
    arabicName: 'الماعون',
    translation: 'Barang-Barang yang Berguna',
    numberOfAyahs: 7,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ',
        latin: "Ara-aital-ladzii yukadz-dzibu bid-diin",
        translation: 'Tahukah kamu (orang) yang mendustakan agama?'
      },
      {
        ayahNumber: 2,
        arabic: 'فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ',
        latin: 'Fa dzaalikal-ladzii yadu\'\'ul-yatiim',
        translation: 'Itulah orang yang menghardik anak yatim,'
      },
      {
        ayahNumber: 3,
        arabic: 'وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ',
        latin: "Wa laa yahudh-dhu 'alaa tha'aamil-miskiin",
        translation: 'Dan tidak menganjurkan memberi makan orang miskin.'
      },
      {
        ayahNumber: 4,
        arabic: 'فَوَيْلٌ لِلْمُصَلِّينَ',
        latin: 'Fa wailul-lilmushalliin',
        translation: 'Maka kecelakaanlah bagi orang-orang yang shalat,'
      },
      {
        ayahNumber: 5,
        arabic: 'الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ',
        latin: "Alladziina hum 'an shalaatihim saahuun",
        translation: '(yaitu) orang-orang yang lalai dari shalatnya,'
      },
      {
        ayahNumber: 6,
        arabic: 'الَّذِينَ هُمْ يُرَاءُونَ',
        latin: 'Alladziina hum yuraa-uun',
        translation: 'Orang-orang yang berbuat riya,'
      },
      {
        ayahNumber: 7,
        arabic: 'وَيَمْنَعُونَ الْمَاعُونَ',
        latin: "Wa yamna'uunal-maa'uun",
        translation: 'Dan enggan (menolong dengan) barang berguna.'
      }
    ]
  },
  {
    number: 106,
    name: 'Quraisy',
    arabicName: 'قريش',
    translation: 'Suku Quraisy',
    numberOfAyahs: 4,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'لِإِيلَافِ قُرَيْشٍ',
        latin: 'Li-iilaafi quraisy',
        translation: 'Karena kebiasaan orang-orang Quraisy,'
      },
      {
        ayahNumber: 2,
        arabic: 'إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ',
        latin: 'Iilaafihim rihlatasy-syitaa-i wash-shaif',
        translation: '(yaitu) kebiasaan mereka bepergian pada musim dingin dan musim panas.'
      },
      {
        ayahNumber: 3,
        arabic: 'فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ',
        latin: "Falya'buduu rabba haadzal-bait",
        translation: 'Maka hendaklah mereka menyembah Tuhan Pemilik rumah ini (Ka\'bah).'
      },
      {
        ayahNumber: 4,
        arabic: 'الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ',
        latin: "Alladzii ath'amahum min juu'iw-wa aamanahum min khauf",
        translation: 'Yang telah memberi makanan kepada mereka untuk menghilangkan lapar dan mengamankan mereka dari ketakutan.'
      }
    ]
  },
  {
    number: 105,
    name: 'Al-Fil',
    arabicName: 'الفيل',
    translation: 'Gajah',
    numberOfAyahs: 5,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',
        latin: "Alam tara kaifa fa'ala rabbuka bi-ash-haabil-fiil",
        translation: 'Apakah kamu tidak memperhatikan bagaimana Tuhanmu telah bertindak terhadap tentara bergajah?'
      },
      {
        ayahNumber: 2,
        arabic: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ',
        latin: 'Alam yaj\'al kaidahum fii tadhliil',
        translation: 'Bukankah Dia telah menjadikan rencana jahat mereka itu sia-sia?'
      },
      {
        ayahNumber: 3,
        arabic: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ',
        latin: "Wa arsala 'alaihim thairan abaabiil",
        translation: 'Dan Dia mengirimkan kapada mereka burung yang berbondong-bondong,'
      },
      {
        ayahNumber: 4,
        arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ',
        latin: 'Tarmiihim bihijaaratim-min sijjiil',
        translation: 'Yang melempari mereka dengan batu (berasal) dari tanah yang terbakar,'
      },
      {
        ayahNumber: 5,
        arabic: 'فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ',
        latin: "Fa ja'alahum ka'ashfim-ma'kuul",
        translation: 'Lalu Dia menjadikan mereka seperti daun-daun yang dimakan (ulat).'
      }
    ]
  },
  {
    number: 103,
    name: 'Al-\'Asr',
    arabicName: 'العصر',
    translation: 'Masa / Waktu',
    numberOfAyahs: 3,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'وَالْعَصْرِ',
        latin: "Wal-'ashr",
        translation: 'Demi masa.'
      },
      {
        ayahNumber: 2,
        arabic: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ',
        latin: 'Innal-insaana lafii khusr',
        translation: 'Sesungguhnya manusia itu benar-benar dalam kerugian,'
      },
      {
        ayahNumber: 3,
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        latin: "Illal-ladziina aamanuu wa 'amilush-shaalihaati wa tawaashau bil-haqqi wa tawaashau bish-shabr",
        translation: 'Kecuali orang-orang yang beriman dan mengerjakan amal saleh dan nasehat menasehati supaya mentaati kebenaran dan nasehat menasehati supaya menetapi kesabaran.'
      }
    ]
  },
  {
    number: 97,
    name: 'Al-Qadr',
    arabicName: 'القدر',
    translation: 'Kemuliaan (Malam Lailatul Qadr)',
    numberOfAyahs: 5,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        latin: 'Innaa anzalnaahu fii lailatil-qadr',
        translation: 'Sesungguhnya Kami telah menurunkannya (Al-Qur\'an) pada malam kemuliaan.'
      },
      {
        ayahNumber: 2,
        arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',
        latin: 'Wa maa adraaka maa lailatul-qadr',
        translation: 'Dan tahukah kamu apakah malam kemuliaan itu?'
      },
      {
        ayahNumber: 3,
        arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ',
        latin: 'Lailatul-qadri khairum-min alfi syahr',
        translation: 'Malam kemuliaan itu lebih baik dari seribu bulan.'
      },
      {
        ayahNumber: 4,
        arabic: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ',
        latin: 'Tanazzalul-malaa-ikatu war-ruuhu fiihaa bi-idzni rabbihim min kulli amr',
        translation: 'Pada malam itu turun malaikat-malaikat dan malaikat Jibril dengan izin Tuhannya untuk mengatur segala urusan.'
      },
      {
        ayahNumber: 5,
        arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
        latin: 'Salaamun hiya hattaa mathla\'il-fajr',
        translation: 'Malam itu (penuh) kesejahteraan sampai terbit fajar.'
      }
    ]
  },
  {
    number: 95,
    name: 'At-Tin',
    arabicName: 'التين',
    translation: 'Buah Tin',
    numberOfAyahs: 8,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'وَالتِّينِ وَالزَّيْتُونِ',
        latin: 'Wat-tiini waz-zaituun',
        translation: 'Demi (buah) Tin dan (buah) Zaitun,'
      },
      {
        ayahNumber: 2,
        arabic: 'وَطُورِ سِينِينَ',
        latin: 'Wa thuuri siiniin',
        translation: 'Dan demi bukit Sinai,'
      },
      {
        ayahNumber: 3,
        arabic: 'وَهَٰذَا الْبَلَدِ الْأَمِينِ',
        latin: 'Wa haadzal-baladil-amiin',
        translation: 'Dan demi kota (Mekah) ini yang aman,'
      },
      {
        ayahNumber: 4,
        arabic: 'لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ',
        latin: 'Laqad khalaqnal-insaana fii ahsani taqwiim',
        translation: 'Sesungguhnya Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya.'
      },
      {
        ayahNumber: 5,
        arabic: 'ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ',
        latin: 'Tsumma radadnaahu asfala saafiliin',
        translation: 'Kemudian Kami kembalikan dia ke tempat yang serendah-rendahnya (neraka),'
      },
      {
        ayahNumber: 6,
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ',
        latin: "Illal-ladziina aamanuu wa 'amilush-shaalihaati falahum ajrun ghairu mamnuun",
        translation: 'Kecuali orang-orang yang beriman dan mengerjakan amal saleh; maka bagi mereka pahala yang tiada putus-putusnya.'
      },
      {
        ayahNumber: 7,
        arabic: 'فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ',
        latin: 'Famaa yukadz-dzibuka ba\'du bid-diin',
        translation: 'Maka apakah yang menyebabkan kamu mendustakan (hari) pembalasan sesudah (adanya bukti-bukti) itu?'
      },
      {
        ayahNumber: 8,
        arabic: 'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ',
        latin: 'Alaisallaahu bi-ahkamil-haakimiin',
        translation: 'Bukankah Allah Hakim yang seadil-adilnya?'
      }
    ]
  },
  {
    number: 94,
    name: 'Asy-Syarh',
    arabicName: 'الشرح',
    translation: 'Kelapangan Dada (Al-Insyirah)',
    numberOfAyahs: 8,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
        latin: 'Alam nasyrah laka shadrak',
        translation: 'Bukankah Kami telah melapangkan untukmu dadamu?'
      },
      {
        ayahNumber: 2,
        arabic: 'وَوَضَعْنَا عَنْكَ وِزْرَكَ',
        latin: "Wa wadha'naa 'anka wizrak",
        translation: 'Dan Kami telah menghilangkan daripadamu bebanmu,'
      },
      {
        ayahNumber: 3,
        arabic: 'الَّذِي أَنْقَضَ ظَهْرَكَ',
        latin: 'Alladzii anqadha zhahrak',
        translation: 'Yang memberatkan punggungmu?'
      },
      {
        ayahNumber: 4,
        arabic: 'وَرَفَعْنَا لَكَ ذِكْرَكَ',
        latin: 'Wa rafa\'naa laka dzikrak',
        translation: 'Dan Kami tinggikan bagimu sebutan (nama)mu,'
      },
      {
        ayahNumber: 5,
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        latin: "Fa inna ma'al-'usri yusraa",
        translation: 'Karena sesungguhnya sesudah kesulitan itu ada kemudahan,'
      },
      {
        ayahNumber: 6,
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        latin: "Inna ma'al-'usri yusraa",
        translation: 'Sesungguhnya sesudah kesulitan itu ada kemudahan.'
      },
      {
        ayahNumber: 7,
        arabic: 'فَإِذَا فَرَغْتَ فَانْصَبْ',
        latin: 'Fa idzaa faraghta fanshab',
        translation: 'Maka apabila kamu telah selesai (dari sesuatu urusan), kerjakanlah dengan sungguh-sungguh (urusan) yang lain,'
      },
      {
        ayahNumber: 8,
        arabic: 'وَإِلَىٰ رَبِّكَ فَارْغَبْ',
        latin: 'Wa ilaa rabbika farghab',
        translation: 'Dan hanya kepada Tuhanmulah hendaknya kamu berharap.'
      }
    ]
  },
  {
    number: 93,
    name: 'Ad-Duha',
    arabicName: 'الضحى',
    translation: 'Waktu Dhuha',
    numberOfAyahs: 11,
    revelationType: 'Makkiyah',
    verses: [
      {
        ayahNumber: 1,
        arabic: 'وَالضُّحَىٰ',
        latin: 'Wadh-dhuhaa',
        translation: 'Demi waktu matahari sepenggalahan naik,'
      },
      {
        ayahNumber: 2,
        arabic: 'وَاللَّيْلِ إِذَا سَجَىٰ',
        latin: 'Wal-laili idzaa sajaa',
        translation: 'Dan demi malam apabila telah sunyi,'
      },
      {
        ayahNumber: 3,
        arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ',
        latin: "Maa wadda'aka rabbuka wa maa qalaa",
        translation: 'Tuhanmu tiada meninggalkan kamu dan tiada (pula) benci kepadamu,'
      },
      {
        ayahNumber: 4,
        arabic: 'وَلَلْآخِرَةُ خَيْرٌ لَكَ مِنَ الْأُولَىٰ',
        latin: 'Wa lal-aakhiratu khairul laka minal-uulaa',
        translation: 'Dan sesungguhnya hari kemudian itu lebih baik bagimu daripada yang sekarang (permulaan),'
      },
      {
        ayahNumber: 5,
        arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
        latin: "Wa lasaufa yu'thiika rabbuka fatardhaa",
        translation: 'Dan kelak Tuhanmu pasti memberikan karunia-Nya kepadamu, lalu (hati) kamu menjadi puas.'
      },
      {
        ayahNumber: 6,
        arabic: 'أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ',
        latin: 'Alam yajidka yatiiman fa aawaa',
        translation: 'Bukankah Dia mendapatimu sebagai seorang yatim, lalu Dia melindungimu?'
      },
      {
        ayahNumber: 7,
        arabic: 'وَوَجَدَكَ ضَالًّا فَهَدَىٰ',
        latin: 'Wa wajadaka dhaallan fa hadaa',
        translation: 'Dan Dia mendapatimu sebagai seorang yang bingung, lalu Dia memberikan petunjuk.'
      },
      {
        ayahNumber: 8,
        arabic: 'وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ',
        latin: "Wa wajadaka 'aa-ilan fa aghnaa",
        translation: 'Dan Dia mendapatimu sebagai seorang yang kekurangan, lalu Dia memberikan kecukupan.'
      },
      {
        ayahNumber: 9,
        arabic: 'فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ',
        latin: 'Fa ammal-yatiima falaa taqhar',
        translation: 'Sebab itu, terhadap anak yatim janganlah kamu berlaku sewenang-wenang.'
      },
      {
        ayahNumber: 10,
        arabic: 'وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ',
        latin: 'Wa ammas-saa-ila falaa tanhar',
        translation: 'Dan terhadap orang yang minta-minta, janganlah kamu menghardiknya.'
      },
      {
        ayahNumber: 11,
        arabic: 'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ',
        latin: 'Wa ammaa bini\'mati rabbika fahaddits',
        translation: 'Dan terhadap nikmat Tuhanmu, maka hendaklah kamu siarkan.'
      }
    ]
  }
];

export const MEMORIZATION_METHOD_GUIDE = {
  name: 'Metode 3T TPQ AR-ROHMAH (Talqin - Tikrar - Tasmi\')',
  summary: 'Sistem hafalan Al-Qur\'an dan doa yang terbukti sangat praktis, ramah anak, dan memperkuat daya ingat santri secara berkesinambungan.',
  steps: [
    {
      step: 1,
      badge: 'Step 1: Talqin (Simak & Tiru)',
      title: 'Dengarkan Pelafalan Murottal Qari Internasional',
      desc: 'Santri mendengarkan potongan ayat dari Qari pilihan (Syaikh Misyari Rasyid Al-Afasy, Syaikh Al-Hushari, dll) sebanyak 3 kali berturut-turut untuk memastikan makhraj dan mad sudah tepat.'
    },
    {
      step: 2,
      badge: 'Step 2: Tikrar (Pengulangan Bertahap)',
      title: 'Ulangi 7-10 Kali & Sembunyikan Kata',
      desc: 'Santri mengulang ayat sambil menggunakan fitur interaktif "Sembunyikan Kata" (Word Cloze Test) di website. Dari teks terbuka 100%, sembunyikan 50%, hingga tanpa melihat teks.'
    },
    {
      step: 3,
      badge: 'Step 3: Tasmi\' AI & Ustadz',
      title: 'Setorkan Hafalan ke Ustadz / Mandiri',
      desc: 'Santri melafalkan hafalan di depan orang tua dan Ustadz, mendapatkan bintang apresiasi, dan mencatat progres hafalan harian.'
    }
  ]
};
