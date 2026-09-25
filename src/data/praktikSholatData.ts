export interface SholatStep {
  id: string;
  stepNumber: number;
  name: string;
  arabicName: string;
  description: string;
  arabicText?: string;
  latinText?: string;
  translation?: string;
  gestureIllustrationNote: string;
  sunnahNotes?: string;
}

export const PRAKTIK_SHOLAT_BOOK_URL = "https://digilibwacasman1asjap.com/index.php?p=fstream-pdf&fid=893&bid=3287";

export const WUDHU_STEPS = [
  {
    step: 1,
    title: 'Membaca Basmalah & Mencuci Kedua Telapak Tangan',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    desc: 'Membaca Bismillah dan mencuci kedua telapak tangan hingga pergelangan sebanyak 3 kali sambil menyela-nyela jari.'
  },
  {
    step: 2,
    title: 'Berkumur-kumur (Madhmadhah)',
    arabic: 'الْمَضْمَضَةُ',
    desc: 'Memasukkan air ke dalam mulut lalu berkumur-kumur membersihkan sisa makanan sebanyak 3 kali.'
  },
  {
    step: 3,
    title: 'Menghirup Air ke Hidung & Mengeluarkannya (Istinsyaq & Istintsar)',
    arabic: 'الِاسْتِنْشَاقُ وَالِاسْتِنْثَارُ',
    desc: 'Menghirup air dengan hidung secara perlahan dan menyemburkannya kembali sebanyak 3 kali.'
  },
  {
    step: 4,
    title: 'Membasuh Muka Sambil Berniat Wudhu',
    arabic: 'نَوَيْتُ الْوُضُوءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلَّهِ تَعَالَى',
    latin: 'Nawaitul wudhuu-a liraf\'il hadatsil ashghari fardhal lillaahi ta\'aala',
    meaning: 'Saya niat berwudhu untuk menghilangkan hadats kecil fardhu karena Allah Ta\'ala.',
    desc: 'Membasuh seluruh wajah dari batas tumbuhnya rambut kepala sampai dagu, dan dari telinga kanan ke telinga kiri sebanyak 3 kali.'
  },
  {
    step: 5,
    title: 'Membasuh Kedua Tangan Hingga Siku',
    arabic: 'غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ',
    desc: 'Membasuh tangan kanan dari ujung jari hingga siku 3 kali, lalu tangan kiri dengan cara yang sama.'
  },
  {
    step: 6,
    title: 'Mengusap Sebagian Kepala / Rambut',
    arabic: 'مَسْحُ الرَّأْسِ',
    desc: 'Mengusap sebagian rambut kepala dengan telapak tangan yang basah sebanyak 3 kali.'
  },
  {
    step: 7,
    title: 'Mengusap Kedua Telinga',
    arabic: 'مَسْحُ الْأُذُنَيْنِ',
    desc: 'Memasukkan jari telunjuk ke lubang telinga dan ibu jari mengusap bagian daun telinga luar sebanyak 3 kali.'
  },
  {
    step: 8,
    title: 'Membasuh Kedua Kaki Hingga Mata Kaki',
    arabic: 'غَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْنِ',
    desc: 'Membasuh kaki kanan hingga mata kaki sambil menyela jari-jemari 3 kali, kemudian kaki kiri 3 kali.'
  },
  {
    step: 9,
    title: 'Doa Sesudah Wudhu Menghadap Kiblat',
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ، وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ',
    latin: 'Asyhadu an laa ilaaha illallaah wahdahu laa syariika lah, wa asyhadu anna Muhammadan \'abduhu wa rasuuluh. Allaahummaj\'alnii minat-tawwaabiina waj\'alnii minal mutathahhiriina waj\'alnii min \'ibaadikas-shaalihiin.',
    meaning: 'Aku bersaksi tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Dan aku bersaksi Nabi Muhammad adalah hamba dan utusan-Nya. Ya Allah jadikanlah aku termasuk orang yang bertaubat, bersuci, dan hamba-hamba-Mu yang shalih.',
    desc: 'Membaca doa sesudah wudhu dengan mengangkat kedua tangan menghadap kiblat.'
  }
];

export const SHOLAT_STEPS: SholatStep[] = [
  {
    id: 'berdiri-niat',
    stepNumber: 1,
    name: 'Berdiri Tegak Menghadap Kiblat & Niat',
    arabicName: 'الْقِيَامُ وَالنِّيَّةُ',
    description: 'Berdiri tegak dengan khusyuk menghadap kiblat, pandangan tertuju ke tempat sujud.',
    arabicText: 'أُصَلِّي فَرْضَ (الظُّهْرِ / الْعَصْرِ / الْمَغْرِبِ / الْعِشَاءِ / الصُّبْحِ) ... لِلَّهِ تَعَالَى',
    latinText: 'Ushallii fardha (Zhuhri / \'Ashri / Maghribi / \'Isyaa-i / Shubhi) ... lillaahi ta\'aalaa',
    translation: 'Aku berniat sholat fardhu ... menghadap kiblat karena Allah Ta\'ala.',
    gestureIllustrationNote: 'Kedua kaki diregangkan selebar bahu, badan rileks tegak menghadap kiblat.'
  },
  {
    id: 'takbiratul-ihram',
    stepNumber: 2,
    name: 'Takbiratul Ihram',
    arabicName: 'تَكْبِيرَةُ الْإِحْرَامِ',
    description: 'Mengangkat kedua tangan sejajar daun telinga atau pundak sambil mengucap Takbir.',
    arabicText: 'اللَّهُ أَكْبَرُ',
    latinText: 'Allaahu Akbar',
    translation: 'Allah Maha Besar.',
    gestureIllustrationNote: 'Kedua telapak tangan menghadap kiblat, jari-jemari terbuka tidak terlalu renggang.'
  },
  {
    id: 'iftitah',
    stepNumber: 3,
    name: 'Bersedekap & Doa Iftitah',
    arabicName: 'دُعَاءُ الِافْتِتَاحِ',
    description: 'Meletakkan tangan kanan di atas punggung tangan kiri di atas pusar / bawah dada, membaca doa pembuka sholat.',
    arabicText: 'اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا. وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لَا شَرِيكَ لَهُ وَبِذَٰلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ',
    latinText: 'Allaahu akbaru kabiiraa walhamdu lillaahi katsiiraa wa subhaanallaahi bukrataw wa ashiilaa. Wajjahtu wajhiya lilladzii fatharas-samaawaati wal ardha haniifam muslimaw wamaa ana minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil \'aalamiin. Laa syariika lahu wa bidzaalika umirtu wa ana minal muslimiin.',
    translation: 'Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah sebanyak-banyaknya, dan Maha Suci Allah sepanjang pagi dan petang. Aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan lurus dan berserah diri...',
    gestureIllustrationNote: 'Tangan kanan memegang pergelangan tangan kiri dengan tenang (tuma\'ninah).'
  },
  {
    id: 'alfatihah',
    stepNumber: 4,
    name: 'Membaca Surat Al-Fatihah & Ayat Pilihan',
    arabicName: 'قِرَاءَةُ الْفَاتِحَةِ',
    description: 'Rukun sholat yang wajib dibaca di setiap rakaat secara tartil dan fasih.',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝ آمِينَ',
    latinText: 'Bismillaahir-rahmaanir-rahiim. Alhamdulillaahi rabbil-\'aalamiin. Ar-rahmaanir-rahiim. Maaliki yaumid-diin. Iyyaaka na\'budu wa iyyaaka nasta\'iin. Ihdinash-shiraathal mustaqiim. Shiraathal-ladziina an\'amta \'alaihim ghairil maghdhuubi \'alaihim waladh-dhaalliin. Aamiin.',
    translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam...',
    gestureIllustrationNote: 'Membaca dengan suara lembut saat sholat sirr (Dzuhur/Ashar) dan jahr pada rakaat 1-2 sholat Maghrib, Isya, Subuh.'
  },
  {
    id: 'ruku',
    stepNumber: 5,
    name: 'Ruku\' dengan Tuma\'ninah',
    arabicName: 'الرُّكُوعُ',
    description: 'Membungkukkan punggung lurus mendatar, kedua tangan memegang kedua lutut.',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ (٣×)',
    latinText: 'Subhaana rabbiyal \'azhiimi wa bihamdih (3x)',
    translation: 'Maha Suci Tuhanku Yang Maha Agung dan dengan memuji kepada-Nya (dibaca 3 kali).',
    gestureIllustrationNote: 'Punggung dan kepala sejajar mendatar lurus sehingga jika diletakkan wadah air tidak akan tumpah.'
  },
  {
    id: 'itidal',
    stepNumber: 6,
    name: 'I\'tidal (Bangkit dari Ruku\')',
    arabicName: 'الِاعْتِدَالُ',
    description: 'Bangkit berdiri tegak kembali sambil mengangkat kedua tangan lalu membaca doa tahmid.',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ',
    latinText: 'Sami\'allaahu liman hamidah. Rabbanaa lakal hamdu mil\'us-samaawaati wa mil\'ul ardhi wa mil\'u maa syi\'ta min syai\'in ba\'d.',
    translation: 'Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji sepenuh langit dan bumi dan sepenuh apa yang Engkau kehendaki sesudahnya.',
    gestureIllustrationNote: 'Badan kembali berdiri tegak lurus dan berhenti sejenak (tuma\'ninah).'
  },
  {
    id: 'sujud',
    stepNumber: 7,
    name: 'Sujud Pertama & Kedua',
    arabicName: 'السُّجُودُ',
    description: 'Menempelkan 7 anggota sujud ke lantai: dahi & hidung, kedua telapak tangan, kedua lutut, dan ujung jari jemari kedua kaki.',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ (٣×)',
    latinText: 'Subhaana rabbiyal a\'laa wa bihamdih (3x)',
    translation: 'Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji kepada-Nya (dibaca 3 kali).',
    gestureIllustrationNote: 'Posisi terdekat seorang hamba dengan Allah SWT, dahi menempel mantap pada sajadah.'
  },
  {
    id: 'duduk-antara-dua-sujud',
    stepNumber: 8,
    name: 'Duduk Antara Dua Sujud (Iftirasy)',
    arabicName: 'الْجُلُوسُ بَيْنَ السَّجْدَتَيْنِ',
    description: 'Duduk di atas telapak kaki kiri, menegakkan kaki kanan (iftirasy) sambil memanjatkan 8 permohonan mulia.',
    arabicText: 'رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاجْبُرْنِي، وَارْفَعْنِي، وَارْزُقْنِي، وَاهْدِنِي، وَعَافِنِي، وَاعْفُ عَنِّي',
    latinText: 'Rabbighfir lii, warhamnii, wajburnii, warfa\'nii, warzuqnii, wahdinii, wa\'aafinii, wa\'fu \'annii',
    translation: 'Ya Tuhanku ampunilah aku, sayangilah aku, cukupkanlah kekuranganku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah kesalahanku.',
    gestureIllustrationNote: 'Kedua tangan diletakkan di atas paha dekat lutut dengan tenang.'
  },
  {
    id: 'tasyahhud-akhir',
    stepNumber: 9,
    name: 'Tasyahhud Akhir & Sholawat Ibrahimiyah',
    arabicName: 'التَّشَهُّدُ الْأَخِيرُ',
    description: 'Duduk tawarruk di rakaat terakhir, membaca kalimat tasyahhud dan sholawat kepada Nabi.',
    arabicText: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ ...',
    latinText: 'At-tahiyyaatul mubaarakaatus-shalawaatuth-thayyibaatu lillaah. As-salaamu \'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu \'alainaa wa \'alaa \'ibaadillaahis-shaalihiin. Asyhadu an laa ilaaha illallaah wa asyhadu anna Muhammadan rasuulullaah. Allaahumma shalli \'alaa Muhammad wa \'alaa aali Muhammad...',
    translation: 'Segala kehormatan, keberkahan, kebahagiaan, dan kebaikan adalah milik Allah. Salam sejahtera kepadamu wahai Nabi beserta rahmat Allah dan berkah-Nya...',
    gestureIllustrationNote: 'Jari telunjuk tangan kanan diacungkan saat mengucapkan kalimat "illallaah" (إِلَّا اللَّهُ).'
  },
  {
    id: 'salam',
    stepNumber: 10,
    name: 'Mengucap Salam ke Kanan dan ke Kiri',
    arabicName: 'التَّسْلِيمُ',
    description: 'Memalingkan wajah ke kanan sampai pipi terlihat dari belakang, lalu ke arah kiri sebagai penutup sholat.',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    latinText: 'As-salaamu \'alaikum wa rahmatullaah',
    translation: 'Semoga keselamatan dan rahmat Allah terlimpahkan kepada kalian semua.',
    gestureIllustrationNote: 'Salam pertama adalah rukun fardhu penutup sholat, salam kedua adalah sunnah muakkadah.'
  }
];
