export interface TPQStudent {
  id: string;
  name: string;
  nis: string;
  parentName: string;
  parentWhatsApp: string;
  currentClass: string;
  progress: string;
  registeredBy: string; // Name of Ustadz / Ustadzah who registered this student
  registeredDate: string;
  notes?: string;
}

export interface StudentAttendance {
  id: string;
  studentName: string;
  parentName: string;
  parentWhatsApp: string;
  timeSlot: 'SORE' | 'MALAM';
  prayerSession: 'ASHAR' | 'MAGHRIB' | 'ISYA';
  status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA';
  date: string;
  learningProgress: string;
  notifiedViaWhatsApp: boolean;
  notifiedAt?: string;
  recordedByUstadz?: string; // Ustadz / Ustadzah who recorded attendance
}

export interface StudentCertificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  studentNis: string;
  fatherName: string;
  program: 'Iqra Jilid 6' | 'Tahsin Al-Qur\'an Dasar' | 'Khatam Al-Qur\'an 30 Juz' | 'Tahfidz Juz 30 Cilik';
  completionDate: string;
  predicate: 'Mumtaz (Dengan Pujian)' | 'Jayyid Jiddan (Sangat Baik)' | 'Jayyid (Baik)';
  examinerName: string;
  tajwidGrade: number;
  fashahahGrade: number;
  akhlakGrade: number;
  uploadedBy: string;
  certificateFileUrl?: string;
  isOfficialVerified: boolean;
}

export interface TPQNewsItem {
  id: string;
  title: string;
  category: 'Kegiatan' | 'Prestasi' | 'Pengumuman' | 'Wisuda' | 'Santri Baru';
  date: string;
  author: string;
  summary: string;
  content: string;
  imageAlt: string;
  iconName: string;
  relatedStudentName?: string;
}

export const INITIAL_STUDENTS_LIST: TPQStudent[] = [
  {
    id: 'st-1',
    name: 'Ahmad Faiz Al-Faruq',
    nis: 'TPQ-2026-001',
    parentName: 'Bambang Supriyadi',
    parentWhatsApp: '6281234567890',
    currentClass: "Kelas Al-Qur'an & Tajwid Menengah",
    progress: 'Juz 30 (Surat An-Naba s.d Al-Muthaffifin) & Makharijul Huruf',
    registeredBy: 'Ustadzah Nur Rohma, S. Pd.',
    registeredDate: '10 Januari 2026',
    notes: 'Sangat rajin dan tartil membaca Al-Quran',
  },
  {
    id: 'st-2',
    name: 'Aisyah Putri Azzahra',
    nis: 'TPQ-2026-002',
    parentName: 'H. Rudi Hartono',
    parentWhatsApp: '6281398765432',
    currentClass: 'Kelas Tahfidz Cilik Juz 30',
    progress: 'Hafal 22 Surat Pendek Juz 30 & Doa Harian',
    registeredBy: 'Ustadzah Nur Rohma, S. Pd.',
    registeredDate: '12 Januari 2026',
    notes: 'Fasih dan tajwid sangat baik',
  },
  {
    id: 'st-3',
    name: 'Muhammad Rayyan',
    nis: 'TPQ-2026-003',
    parentName: 'Ir. Hendra Gunawan',
    parentWhatsApp: '6285211223344',
    currentClass: "Kelas Iqra' Jilid 5",
    progress: "Iqra' 5 Halaman 18 (Mad Thabi'i & Harakat Panjang)",
    registeredBy: 'Ustadz Danang Prasetyo',
    registeredDate: '15 Februari 2026',
    notes: 'Semangat belajar tinggi dan aktif bertanya',
  },
  {
    id: 'st-4',
    name: 'Fatimah Zahra',
    nis: 'TPQ-2026-004',
    parentName: 'Ibu Siti Khadijah',
    parentWhatsApp: '6285744556677',
    currentClass: "Kelas Iqra' Jilid 6",
    progress: "Persiapan Wisuda Iqra' Menuju Al-Qur'an",
    registeredBy: 'Ustadzah Nur Rohma, S. Pd.',
    registeredDate: '20 Februari 2026',
    notes: 'Lancar dan siap munaqasyah',
  },
  {
    id: 'st-5',
    name: 'Zaid bin Tsabit',
    nis: 'TPQ-2026-005',
    parentName: 'Bapak Mansyur Al-Hadi',
    parentWhatsApp: '6287899887766',
    currentClass: "Kelas Al-Qur'an Dasar",
    progress: 'Membaca Surah Al-Baqarah 1-50 & Pengenalan Hukum Nun Mati',
    registeredBy: 'Ustadz Danang Prasetyo',
    registeredDate: '01 Maret 2026',
    notes: 'Suara lantang dan berakhlak mulia',
  },
];

export const INITIAL_ATTENDANCE_RECORDS: StudentAttendance[] = [
  {
    id: 'att-init-1',
    studentName: 'Ahmad Faiz Al-Faruq',
    parentName: 'Bambang Supriyadi',
    parentWhatsApp: '6281234567890',
    timeSlot: 'SORE',
    prayerSession: 'ASHAR',
    status: 'HADIR',
    date: new Date().toISOString().split('T')[0],
    learningProgress: 'Membaca tartil surah pendek dan latihan makharijul huruf',
    notifiedViaWhatsApp: true,
    notifiedAt: '16:15 WIB',
    recordedByUstadz: 'Ustadzah Nur Rohma, S. Pd.',
  },
];

export const INITIAL_CERTIFICATES: StudentCertificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'IJZ/TPQ-ARR/2026/042',
    studentName: 'Ahmad Faiz Al-Faruq',
    studentNis: 'TPQ-2026-001',
    fatherName: 'Bambang Supriyadi',
    program: "Tahsin Al-Qur'an Dasar",
    completionDate: '24 September 2026',
    predicate: 'Mumtaz (Dengan Pujian)',
    examinerName: 'Ustadzah Nur Rohma, S. Pd.',
    tajwidGrade: 96,
    fashahahGrade: 94,
    akhlakGrade: 98,
    uploadedBy: 'Ustadzah Nur Rohma, S. Pd.',
    isOfficialVerified: true,
  },
  {
    id: 'cert-2',
    certificateNumber: 'IJZ/TPQ-ARR/2026/043',
    studentName: 'Aisyah Putri Azzahra',
    studentNis: 'TPQ-2026-002',
    fatherName: 'H. Rudi Hartono',
    program: 'Tahfidz Juz 30 Cilik',
    completionDate: '20 September 2026',
    predicate: 'Mumtaz (Dengan Pujian)',
    examinerName: 'Ustadzah Nur Rohma, S. Pd.',
    tajwidGrade: 98,
    fashahahGrade: 97,
    akhlakGrade: 99,
    uploadedBy: 'Ustadzah Nur Rohma, S. Pd.',
    isOfficialVerified: true,
  },
];

export const TPQ_NEWS_ITEMS: TPQNewsItem[] = [];

/**
 * Helper to build the exact WhatsApp message required by the user:
 * "Salam
 * Bapak/ Ibu di rumah, semoga senantiasa sehat.
 * *KETERANGAN WARTU (SORE / MALAM)* ini,  *NAMA SANTRI*  *KETERANGAN HADIR (ASHAR, MAGHRIB, ISYA)*, Mohon doa untuk ananda. 
 * Semoga ilmu yang diperoleh _bermanfaat_ dan selalu diberi _istiqamah_. al Fatihah ...
 * Matur Nuwun"
 */
export function generateWhatsAppAttendanceMessage(
  studentName: string,
  timeSlot: 'SORE' | 'MALAM',
  prayerSession: 'ASHAR' | 'MAGHRIB' | 'ISYA',
  status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA' = 'HADIR'
): string {
  const hadirDesc = status === 'HADIR'
    ? `TELAH HADIR MENGIKUTI PEMBELAJARAN SESI ${prayerSession}`
    : status === 'IZIN'
    ? `IZIN TIDAK HADIR PADA SESI ${prayerSession}`
    : status === 'SAKIT'
    ? `SEDANG SAKIT PADA SESI ${prayerSession}`
    : `BELUM TERLIHAT DI KELAS SESI ${prayerSession}`;

  return `Salam
Bapak/ Ibu di rumah, semoga senantiasa sehat.
*${timeSlot}* ini,  *${studentName.toUpperCase()}*  *${hadirDesc}*, Mohon doa untuk ananda. 
Semoga ilmu yang diperoleh _bermanfaat_ dan selalu diberi _istiqamah_. al Fatihah ...
Matur Nuwun`;
}

/**
 * Normalizes Indonesian phone numbers for WhatsApp international format:
 * - '081234567890' -> '6281234567890'
 * - '+62 812-3456-7890' -> '6281234567890'
 * - '81234567890' -> '6281234567890'
 * - '6281234567890' -> '6281234567890'
 */
export function formatIndonesianWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  // Strip all non-digit characters
  let clean = phone.replace(/\D/g, '');

  if (clean.startsWith('620')) {
    clean = '62' + clean.slice(3);
  } else if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  } else if (clean.startsWith('8')) {
    clean = '62' + clean;
  }
  return clean;
}

export function isValidWhatsAppNumber(phone: string): boolean {
  const formatted = formatIndonesianWhatsAppNumber(phone);
  // Indonesian mobile numbers are usually between 10 and 16 digits starting with 628
  return formatted.length >= 10 && formatted.length <= 16 && formatted.startsWith('628');
}

/**
 * Standard Universal WhatsApp link (wa.me)
 * Reliably opens WhatsApp on Android, iOS, Windows, Mac, and browser without redirect failures
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = formatIndonesianWhatsAppNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Alternative api.whatsapp.com URL
 */
export function generateWhatsAppApiUrl(phone: string, message: string): string {
  const cleanPhone = formatIndonesianWhatsAppNumber(phone);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

/**
 * Dedicated WhatsApp Web link for desktop browsers
 */
export function generateWhatsAppWebUrl(phone: string, message: string): string {
  const cleanPhone = formatIndonesianWhatsAppNumber(phone);
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}
