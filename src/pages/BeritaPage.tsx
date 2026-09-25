import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  Mail,
  Award,
  Upload,
  Download,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Search,
  ExternalLink,
  Printer,
  Sparkles,
  FileCheck,
  Check,
  X,
  UserPlus,
  Users,
  Newspaper,
  Lock,
  Share2,
  Tag,
  BookOpen,
  Filter,
  Phone,
  Copy,
  Save,
  AlertCircle,
  Edit2,
  CheckCheck,
} from 'lucide-react';
import { RubElHizbIcon, IslamicDivider, CheerfulStar } from '../components/IslamicDecorations';
import { triggerKidsConfetti } from '../components/KidsMascot';
import {
  StudentAttendance,
  StudentCertificate,
  TPQNewsItem,
  TPQStudent,
  INITIAL_STUDENTS_LIST,
  INITIAL_ATTENDANCE_RECORDS,
  INITIAL_CERTIFICATES,
  TPQ_NEWS_ITEMS,
  generateWhatsAppAttendanceMessage,
  generateWhatsAppUrl,
  generateWhatsAppWebUrl,
  formatIndonesianWhatsAppNumber,
  isValidWhatsAppNumber,
} from '../data/presensiIjazahData';
import {
  downloadCertificateAsImage,
  downloadCertificateAsHtml,
  printCertificateSafely,
} from '../utils/certificateDownloader';

interface BeritaPageProps {}

export const BeritaPage: React.FC<BeritaPageProps> = () => {
  // Navigation subtabs: 'santri' | 'berita' | 'presensi' | 'ijazah'
  const [subTab, setSubTab] = useState<'santri' | 'berita' | 'presensi' | 'ijazah'>('santri');

  // Master students state
  const [students, setStudents] = useState<TPQStudent[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_master_students_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STUDENTS_LIST;
  });

  // News items state
  const [newsItems, setNewsItems] = useState<TPQNewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_master_news_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return TPQ_NEWS_ITEMS;
  });

  // Attendance records state
  const [attendanceRecords, setAttendanceRecords] = useState<StudentAttendance[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_master_attendance_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ATTENDANCE_RECORDS;
  });

  // Certificate records state
  const [certificates, setCertificates] = useState<StudentCertificate[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_master_certs_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CERTIFICATES;
  });

  // Storage sync helpers
  const saveStudents = (list: TPQStudent[]) => {
    setStudents(list);
    try {
      localStorage.setItem('tpq_master_students_polos', JSON.stringify(list));
    } catch {}
  };

  const saveNewsItems = (list: TPQNewsItem[]) => {
    setNewsItems(list);
    try {
      localStorage.setItem('tpq_master_news_polos', JSON.stringify(list));
    } catch {}
  };

  const saveAttendance = (list: StudentAttendance[]) => {
    setAttendanceRecords(list);
    try {
      localStorage.setItem('tpq_master_attendance_polos', JSON.stringify(list));
    } catch {}
  };

  const saveCertificates = (list: StudentCertificate[]) => {
    setCertificates(list);
    try {
      localStorage.setItem('tpq_master_certs_polos', JSON.stringify(list));
    } catch {}
  };

  // Student Registration Form States
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNis, setNewStudentNis] = useState('');
  const [newStudentParent, setNewStudentParent] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('Kelas Al-Qur\'an & Tajwid Menengah');
  const [newStudentProgress, setNewStudentProgress] = useState('Mulai Juz 30 & hukum nun sukun');
  const [publishToNews, setPublishToNews] = useState(true);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentSuccessMsg, setStudentSuccessMsg] = useState<string | null>(null);

  // New General News Form State
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Kegiatan' | 'Prestasi' | 'Pengumuman' | 'Wisuda' | 'Santri Baru'>('Pengumuman');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsFilterCategory, setNewsFilterCategory] = useState<string>('all');

  // Attendance states
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || 'st-1'
  );
  const [destinationPhone, setDestinationPhone] = useState<string>('');
  const [phoneSavedToast, setPhoneSavedToast] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<'SORE' | 'MALAM'>('SORE');
  const [prayerSession, setPrayerSession] = useState<'ASHAR' | 'MAGHRIB' | 'ISYA'>('ASHAR');
  const [attendanceStatus, setAttendanceStatus] = useState<'HADIR' | 'IZIN' | 'SAKIT' | 'ALPA'>('HADIR');
  const [learningNotes, setLearningNotes] = useState('Membaca tartil surah pendek dan latihan makharijul huruf');
  const [notificationSuccessMsg, setNotificationSuccessMsg] = useState<string | null>(null);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState<string | null>(null);

  // Certificate states
  const [certificateSearch, setCertificateSearch] = useState('');
  const [showUploadCertModal, setShowUploadCertModal] = useState(false);
  const [previewingCertificate, setPreviewingCertificate] = useState<StudentCertificate | null>(null);
  const [isDownloadingCert, setIsDownloadingCert] = useState(false);
  const [certDownloadToast, setCertDownloadToast] = useState<string | null>(null);

  // Upload certificate form fields
  const [certStudentName, setCertStudentName] = useState(students[0]?.name || '');
  const [certNis, setCertNis] = useState(students[0]?.nis || '');
  const [certFatherName, setCertFatherName] = useState('');
  const [certProgram, setCertProgram] = useState<any>('Tahsin Al-Qur\'an Dasar');
  const [certPredicate, setCertPredicate] = useState<any>('Mumtaz (Dengan Pujian)');
  const [certExaminer, setCertExaminer] = useState('Dewan Penguji TPQ AR-ROHMAH');
  const [certTajwidGrade, setCertTajwidGrade] = useState(95);
  const [certFashahahGrade, setCertFashahahGrade] = useState(94);
  const [certAkhlakGrade, setCertAkhlakGrade] = useState(98);
  const [uploadSuccessAlert, setUploadSuccessAlert] = useState<string | null>(null);

  const selectedStudentObj = students.find((s) => s.id === selectedStudentId) || students[0];

  // Synchronize destinationPhone whenever selected student changes
  React.useEffect(() => {
    if (selectedStudentObj) {
      setDestinationPhone(selectedStudentObj.parentWhatsApp || '');
    }
  }, [selectedStudentId, selectedStudentObj?.id, selectedStudentObj?.parentWhatsApp]);

  // Update phone number on the student's profile directly
  const handleUpdateStudentPhone = () => {
    if (!selectedStudentObj || !destinationPhone.trim()) return;
    const clean = formatIndonesianWhatsAppNumber(destinationPhone);
    const updated = students.map((s) =>
      s.id === selectedStudentObj.id ? { ...s, parentWhatsApp: clean } : s
    );
    saveStudents(updated);
    setPhoneSavedToast('✓ Nomor WhatsApp berhasil disimpan ke profil santri!');
    setTimeout(() => setPhoneSavedToast(null), 3000);
  };

  // Copy full generated WhatsApp text
  const handleCopyWhatsAppMessage = () => {
    if (!generatedMessage) return;
    navigator.clipboard?.writeText(generatedMessage);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  // Handle Adding Student by Ustadz / Ustadzah
  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const now = new Date();
    const dateFormatted = `${now.getDate()} September ${now.getFullYear()}`;
    const generatedNis = newStudentNis.trim() || `TPQ-2026-${String(students.length + 1).padStart(3, '0')}`;

    const cleanPhone = formatIndonesianWhatsAppNumber(newStudentPhone.trim()) || '6281234567890';

    const newStudent: TPQStudent = {
      id: `st-${Date.now()}`,
      name: newStudentName.trim(),
      nis: generatedNis,
      parentName: newStudentParent.trim() || 'Wali Santri',
      parentWhatsApp: cleanPhone,
      currentClass: newStudentClass,
      progress: newStudentProgress.trim() || 'Pendaftaran baru di TPQ AR-ROHMAH',
      registeredBy: actorName,
      registeredDate: dateFormatted,
      notes: `Dimasukkan oleh ${actorName}`,
    };

    const updatedStudents = [newStudent, ...students];
    saveStudents(updatedStudents);

    // If option is checked, also publish an official news item accessible to all Asatidz
    if (publishToNews) {
      const newNewsItem: TPQNewsItem = {
        id: `news-santri-${Date.now()}`,
        title: `Pendaftaran Santri Baru: ${newStudent.name}`,
        category: 'Santri Baru',
        date: dateFormatted,
        author: actorName,
        summary: `Santri ananda ${newStudent.name} (${newStudent.currentClass}) resmi didaftarkan ke dalam pangkalan data terpusat TPQ.`,
        content: `Alhamdulillah, ananda ${newStudent.name} (NIS: ${newStudent.nis}) telah resmi didaftarkan pada ${dateFormatted}. Data santri ini dapat diakses untuk presensi kegiatan mengaji, penugasan soal latihan, serta penerbitan e-ijazah resmi.`,
        imageAlt: `Santri ${newStudent.name} terdaftar di TPQ`,
        iconName: 'UserCheck',
        relatedStudentName: newStudent.name,
      };
      saveNewsItems([newNewsItem, ...newsItems]);
    }

    setStudentSuccessMsg(
      `Alhamdulillah! Santri ${newStudent.name} berhasil didaftarkan. Data telah tersimpan di pangkalan berita & administrasi TPQ.`
    );

    // Reset form
    setNewStudentName('');
    setNewStudentNis('');
    setNewStudentParent('');
    setNewStudentPhone('');
    setNewStudentProgress('');
    setTimeout(() => setStudentSuccessMsg(null), 5000);
  };

  // Add General News
  const handleSaveGeneralNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;

    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const now = new Date();
    const dateFormatted = `${now.getDate()} September ${now.getFullYear()}`;

    const newNews: TPQNewsItem = {
      id: `news-${Date.now()}`,
      title: newsTitle.trim(),
      category: newsCategory,
      date: dateFormatted,
      author: actorName,
      summary: newsSummary.trim() || newsContent.slice(0, 120) + '...',
      content: newsContent.trim(),
      imageAlt: newsTitle,
      iconName: 'Newspaper',
    };

    saveNewsItems([newNews, ...newsItems]);
    setShowAddNewsModal(false);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
  };

  // Generated WhatsApp message with the exact format required by the user
  const generatedMessage = selectedStudentObj
    ? generateWhatsAppAttendanceMessage(
        selectedStudentObj.name,
        timeSlot,
        prayerSession,
        attendanceStatus
      )
    : '';

  // Record attendance and auto-sync student phone without navigating current window
  const handleRecordAttendanceOnly = (
    studentObj = selectedStudentObj,
    targetPhone = destinationPhone,
    recordTime = timeSlot,
    recordSession = prayerSession,
    recordStatus = attendanceStatus
  ) => {
    if (!studentObj) return;
    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const rawTarget = targetPhone || studentObj.parentWhatsApp || '';
    const cleanPhone = formatIndonesianWhatsAppNumber(rawTarget);

    if (!cleanPhone || cleanPhone.length < 9) {
      setPhoneErrorMsg('Mohon masukkan nomor WhatsApp tujuan yang valid (contoh: 081234567890).');
      setTimeout(() => setPhoneErrorMsg(null), 4000);
      return;
    }

    // Auto-sync phone number to student profile if changed or updated
    if (cleanPhone && studentObj.parentWhatsApp !== cleanPhone) {
      const updated = students.map((s) =>
        s.id === studentObj.id ? { ...s, parentWhatsApp: cleanPhone } : s
      );
      saveStudents(updated);
    }

    // Save/update attendance record in state
    const newRecord: StudentAttendance = {
      id: `att-${Date.now()}`,
      studentName: studentObj.name,
      parentName: studentObj.parentName,
      parentWhatsApp: cleanPhone,
      timeSlot: recordTime,
      prayerSession: recordSession,
      status: recordStatus,
      date: new Date().toISOString().split('T')[0],
      learningProgress: learningNotes,
      notifiedViaWhatsApp: true,
      notifiedAt: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')} WIB`,
      recordedByUstadz: actorName,
    };

    saveAttendance([newRecord, ...attendanceRecords]);
    setNotificationSuccessMsg(
      `Alhamdulillah! Presensi ananda ${studentObj.name} berhasil dicatat & disiapkan ke nomor wali: +${cleanPhone}!`
    );
    setTimeout(() => setNotificationSuccessMsg(null), 6000);
  };

  // Trigger Send WhatsApp safely to new tab
  const handleSendWhatsAppNotification = (
    studentObj = selectedStudentObj,
    targetPhone = destinationPhone,
    recordTime = timeSlot,
    recordSession = prayerSession,
    recordStatus = attendanceStatus
  ) => {
    if (!studentObj) return;
    const rawTarget = targetPhone || studentObj.parentWhatsApp || '';
    const cleanPhone = formatIndonesianWhatsAppNumber(rawTarget);

    if (!cleanPhone || cleanPhone.length < 9) {
      setPhoneErrorMsg('Mohon masukkan nomor WhatsApp tujuan yang valid (contoh: 081234567890).');
      setTimeout(() => setPhoneErrorMsg(null), 4000);
      return;
    }

    handleRecordAttendanceOnly(studentObj, cleanPhone, recordTime, recordSession, recordStatus);

    const msg = generateWhatsAppAttendanceMessage(
      studentObj.name,
      recordTime,
      recordSession,
      recordStatus
    );
    const waUrl = generateWhatsAppUrl(cleanPhone, msg);

    // Open WhatsApp URL safely in a new tab without redirecting current iframe
    try {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Popup blocked:', err);
    }
  };

  // Certificate Download Handlers
  const handleDownloadCertPng = async (cert: StudentCertificate) => {
    try {
      setIsDownloadingCert(true);
      await downloadCertificateAsImage(cert);
      setCertDownloadToast(`✓ Ijazah ananda ${cert.studentName} berhasil diunduh ke perangkat (PNG HD)!`);
      triggerKidsConfetti();
      setTimeout(() => setCertDownloadToast(null), 4000);
    } catch (err) {
      console.error('Canvas download fallback:', err);
      downloadCertificateAsHtml(cert);
      setCertDownloadToast(`✓ Ijazah ananda ${cert.studentName} berhasil diunduh (Dokumen HTML)!`);
      setTimeout(() => setCertDownloadToast(null), 4000);
    } finally {
      setIsDownloadingCert(false);
    }
  };

  const handleDownloadCertHtml = (cert: StudentCertificate) => {
    downloadCertificateAsHtml(cert);
    setCertDownloadToast(`✓ Dokumen Ijazah ${cert.studentName} berhasil disimpan ke perangkat!`);
    triggerKidsConfetti();
    setTimeout(() => setCertDownloadToast(null), 4000);
  };

  // Certificate Save
  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const newCert: StudentCertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: `IJZ/TPQ-ARR/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      studentName: certStudentName,
      studentNis: certNis,
      fatherName: certFatherName,
      program: certProgram,
      completionDate: `${new Date().getDate()} September ${new Date().getFullYear()}`,
      predicate: certPredicate,
      examinerName: certExaminer,
      tajwidGrade: Number(certTajwidGrade),
      fashahahGrade: Number(certFashahahGrade),
      akhlakGrade: Number(certAkhlakGrade),
      uploadedBy: actorName,
      isOfficialVerified: true,
    };

    saveCertificates([newCert, ...certificates]);
    setUploadSuccessAlert(`Alhamdulillah! Ijazah ananda ${certStudentName} berhasil diterbitkan oleh ${actorName}.`);
    setTimeout(() => {
      setUploadSuccessAlert(null);
      setShowUploadCertModal(false);
    }, 1500);
  };

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.nis.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.currentClass.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.registeredBy?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Filter news
  const filteredNews = newsItems.filter(
    (n) => newsFilterCategory === 'all' || n.category === newsFilterCategory
  );

  // Filter certificates
  const filteredCertificates = certificates.filter(
    (c) =>
      c.studentName.toLowerCase().includes(certificateSearch.toLowerCase()) ||
      c.studentNis.toLowerCase().includes(certificateSearch.toLowerCase()) ||
      c.program.toLowerCase().includes(certificateSearch.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8 font-sans-clean">
      {/* Header Banner */}
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-amber-50/40 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
              <span>🌟</span>
              <span>Portal Terpadu Santri TPQ AR-ROHMAH</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display">
              Pangkalan Data Santri, Warta & Presensi
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Pusat data TPQ AR-ROHMAH untuk pendaftaran santri baru, penyampaian warta informasi kegiatan, presensi WhatsApp otomatis ke orang tua, serta penerbitan e-ijazah kelulusan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="rounded-xl border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs flex items-center gap-1.5">
              <span>🕌</span>
              <span>Pangkalan Data Terbuka</span>
            </span>
          </div>
        </div>

        {/* Subtabs switcher */}
        <div className="mt-8 flex flex-wrap rounded-xl bg-slate-100/90 border border-slate-200/60 p-1 gap-1 max-w-2xl relative z-10">
          <button
            onClick={() => setSubTab('santri')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              subTab === 'santri'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <span>👦</span>
            <span>Santri Cilik ({students.length})</span>
          </button>
          <button
            onClick={() => setSubTab('berita')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              subTab === 'berita'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <span>📰</span>
            <span>Warta Berita ({newsItems.length})</span>
          </button>
          <button
            onClick={() => setSubTab('presensi')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              subTab === 'presensi'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <span>📲</span>
            <span>Presensi WhatsApp</span>
          </button>
          <button
            onClick={() => setSubTab('ijazah')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              subTab === 'ijazah'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <span>🏆</span>
            <span>E-Ijazah ({certificates.length})</span>
          </button>
        </div>
      </div>

      {/* ================= SUBTAB 1: KELOLA & DAFTARKAN NAMA SANTRI KE BERITA ================= */}
      {subTab === 'santri' && (
        <div className="space-y-8">
          {studentSuccessMsg && (
            <div className="flex items-center gap-2 rounded-2xl bg-[#EAF5EC] border border-[#A4CAA9] p-4 text-xs font-bold text-[#2A4D33] shadow-xs animate-in fade-in">
              <CheckCircle2 size={18} className="text-[#325239] shrink-0" />
              <span>{studentSuccessMsg}</span>
            </div>
          )}

          {/* Form Memasukkan Nama Santri Baru */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 rounded-3xl border border-[#CADBCE] bg-white p-6 sm:p-7 shadow-xs space-y-4">
              <div className="border-b border-[#E1EDE3] pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus size={18} className="text-[#516E59]" />
                  <h3 className="text-base font-extrabold text-[#233A29]">
                    Masukkan & Daftarkan Nama Santri Baru
                  </h3>
                </div>
                <p className="text-xs text-[#526B57] mt-0.5">
                  Setiap nama santri yang Anda masukkan akan langsung tersinkron dan bisa diakses oleh seluruh Ustadz & Ustadzah di portal ini.
                </p>
              </div>

              <form onSubmit={handleRegisterStudent} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#364F3C] mb-1">Nama Lengkap Santri:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rayhan Syarif"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-[#253D2B] focus:border-[#516E59] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#364F3C] mb-1">Nomor Induk Santri (NIS):</label>
                    <input
                      type="text"
                      placeholder={`Otomatis (TPQ-2026-${String(students.length + 1).padStart(3, '0')})`}
                      value={newStudentNis}
                      onChange={(e) => setNewStudentNis(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#364F3C] mb-1">Nama Ayah / Ibu / Wali:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bapak Hendra Gunawan"
                      value={newStudentParent}
                      onChange={(e) => setNewStudentParent(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#364F3C] mb-1">
                      WhatsApp Orang Tua (Aktif):
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890 atau 6281234567890"
                      value={newStudentPhone}
                      onChange={(e) => setNewStudentPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-2 text-xs font-mono"
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5 block">
                      Dapat diawali 08... atau 628... (otomatis diformat sistem untuk WhatsApp)
                    </span>
                  </div>
                  <div>
                    <label className="block font-bold text-[#364F3C] mb-1">Kelas / Halaqah Belajar:</label>
                    <select
                      value={newStudentClass}
                      onChange={(e) => setNewStudentClass(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                    >
                      <option value="Kelas Al-Qur'an & Tajwid Menengah">Kelas Al-Qur'an & Tajwid Menengah</option>
                      <option value="Kelas Tahfidz Cilik">Kelas Tahfidz Cilik</option>
                      <option value="Kelas Praktik Sholat & Dinul Islam">Kelas Praktik Sholat & Dinul Islam</option>
                      <option value="Kelas Iqra Jilid 1-3">Kelas Iqra Jilid 1-3</option>
                      <option value="Kelas Iqra Jilid 4-6">Kelas Iqra Jilid 4-6</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#364F3C] mb-1">Catatan Kemajuan / Hafalan Awal:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Telah hafal Surah An-Nas s/d Al-Falaq, latihan makhraj ra dan za"
                    value={newStudentProgress}
                    onChange={(e) => setNewStudentProgress(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs"
                  />
                </div>

                {/* Checkbox auto post to news page */}
                <div className="flex items-center gap-2 rounded-xl bg-[#F4F9F5] border border-[#CFE1D2] p-3">
                  <input
                    type="checkbox"
                    id="publishNewsCheck"
                    checked={publishToNews}
                    onChange={(e) => setPublishToNews(e.target.checked)}
                    className="h-4 w-4 rounded text-[#516E59] focus:ring-[#516E59]"
                  />
                  <label htmlFor="publishNewsCheck" className="text-xs font-bold text-[#2A4933] cursor-pointer">
                    Publikasikan pengumuman santri baru ini ke warta Berita agar langsung terbaca oleh seluruh Ustadz & Ustadzah
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#516E59] py-3 text-xs font-bold text-white shadow-xs hover:bg-[#3D5544] transition-colors"
                  >
                    <UserPlus size={16} />
                    <span>Simpan & Masukkan Nama Santri</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Information Card & Guidelines */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-3xl border border-[#CCDBCF] bg-[#FAFDFB] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#516E59]" />
                  <h4 className="font-extrabold text-sm text-[#233829]">
                    Keterhubungan Data Terpusat Antar Asatidz
                  </h4>
                </div>
                <p className="text-xs text-[#526B57] leading-relaxed">
                  Sesuai dengan ketentuan TPQ AR-ROHMAH:
                </p>
                <ul className="space-y-2 text-xs text-[#44604C]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#516E59] shrink-0 mt-0.5" />
                    <span>
                      Nama santri yang dimasukkan oleh <strong>Ustadz maupun Ustadzah</strong> otomatis masuk ke pangkalan data terpusat dan muncul di halaman Berita.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#516E59] shrink-0 mt-0.5" />
                    <span>
                      Seluruh Ustadz/Ustadzah lain yang membuka website ini dapat langsung mempresensi santri tersebut melalui WhatsApp, membagikan soal ujian, serta menerbitkan sertifikat ijazah.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#516E59] shrink-0 mt-0.5" />
                    <span>
                      Santri hanya dapat mengakses soal latihan di tab Bank Soal apabila Ustadz/Ustadzah telah menggunakan fitur <strong>"Bagikan kepada Santri"</strong>.
                    </span>
                  </li>
                </ul>

                <div className="rounded-2xl border border-[#CFE1D2] bg-white p-4">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">
                    Petugas Administrasi:
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#516E59] text-xs font-bold text-white">
                      TPQ
                    </div>
                    <div>
                      <strong className="text-xs text-[#233A29]">Pengurus TPQ AR-ROHMAH</strong>
                      <span className="block text-[10px] text-[#55735D]">
                        Status Sistem: Pangkalan Data Aktif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Master Table of All Registered Students */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#CCDBCF] bg-[#F7FAF7] p-4">
              <div>
                <h3 className="text-sm font-bold text-[#233A29]">
                  Daftar Pangkalan Data Santri (Akses Bersama Seluruh Asatidz)
                </h3>
                <p className="text-xs text-[#526B57]">
                  Menampilkan {filteredStudents.length} santri yang terdaftar dan dikelola oleh dewan asatidz.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari santri, NIS, atau ustadz..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-xs text-[#2A4231] focus:border-[#516E59] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-[#D5E3D8] bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#E1EDE3] bg-[#F4F8F5] text-[11px] font-bold uppercase tracking-wider text-[#47604F]">
                  <tr>
                    <th className="py-3.5 px-4">Nama Santri & NIS</th>
                    <th className="py-3.5 px-4">Kelas / Halaqah</th>
                    <th className="py-3.5 px-4">Wali & WhatsApp</th>
                    <th className="py-3.5 px-4">Kemajuan Hafalan</th>
                    <th className="py-3.5 px-4">Dimasukkan Oleh</th>
                    <th className="py-3.5 px-4 text-center">Tindakan Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBF2EC] text-[#2C4433]">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 px-4 text-center text-gray-500">
                        <UserPlus size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="font-bold text-[#2C4433]">Belum Ada Data Santri</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Gunakan formulir pendaftaran di atas untuk menambahkan santri baru ke pangkalan data TPQ.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-[#FAFDFB]">
                      <td className="py-3.5 px-4">
                        <strong className="block text-sm text-[#1F3625]">{st.name}</strong>
                        <span className="font-mono text-[11px] text-gray-400">{st.nis}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-bold text-[#35523D]">
                          {st.currentClass}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1F3826]">{st.parentName}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[11px] text-gray-500">
                            +{formatIndonesianWhatsAppNumber(st.parentWhatsApp)}
                          </span>
                          <a
                            href={generateWhatsAppUrl(
                              st.parentWhatsApp,
                              `Assalamu'alaikum Bapak/Ibu ${st.parentName}, dari Pengurus TPQ AR-ROHMAH terkait ananda ${st.name}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-1.5 py-0.5 rounded font-black border border-emerald-300 transition-colors"
                            title={`Kirim pesan WhatsApp ke ${st.parentName}`}
                          >
                            <MessageCircle size={10} className="text-emerald-700" />
                            <span>WA</span>
                          </a>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-[#4E6855]">
                        {st.progress}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#EFF5F0] border border-[#BCD5C1] px-2.5 py-0.5 text-[10px] font-bold text-[#274830]">
                          <User size={11} className="text-[#516E59]" />
                          <span>{st.registeredBy || 'Ustadzah Aminah Nur, Lc.'}</span>
                        </div>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{st.registeredDate}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedStudentId(st.id);
                              setSubTab('presensi');
                            }}
                            className="flex items-center gap-1 rounded-lg bg-[#516E59] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#3E5845] transition-colors"
                            title="Kirim Presensi WA"
                          >
                            <MessageCircle size={12} />
                            <span>Presensi</span>
                          </button>

                          <button
                            onClick={() => {
                              setCertStudentName(st.name);
                              setCertNis(st.nis);
                              setCertFatherName(st.parentName.replace(/^(Bapak|Ibu)\s*/i, ''));
                              setShowUploadCertModal(true);
                              setSubTab('ijazah');
                            }}
                            className="flex items-center gap-1 rounded-lg border border-[#BCD5C1] bg-white px-2.5 py-1 text-[11px] font-bold text-[#33533B] hover:bg-[#EEF5EF] transition-colors"
                            title="Terbitkan E-Ijazah"
                          >
                            <Award size={12} />
                            <span>Ijazah</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 2: WARTA BERITA TPQ (TERBUKA UNTUK SELURUH ASATIDZ) ================= */}
      {subTab === 'berita' && (
        <div className="space-y-6">
          {/* Header & Filter for News */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#CCDBCF] bg-[#F7FAF7] p-5">
            <div>
              <h3 className="text-sm font-bold text-[#233A29] flex items-center gap-2">
                <span>Papan Warta Berita & Informasi Santri Baru</span>
                <span className="rounded bg-[#516E59] px-2 py-0.5 text-[10px] text-white">
                  Semua Asatidz
                </span>
              </h3>
              <p className="text-xs text-[#526D57] mt-0.5">
                Setiap santri yang dimasukkan oleh ustadz/ustadzah otomatis terwarta di sini dan dapat dibaca oleh seluruh dewan asatidz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-white border border-[#CCDBCF] p-0.5 text-xs font-bold">
                <button
                  onClick={() => setNewsFilterCategory('all')}
                  className={`rounded-lg px-2.5 py-1 ${newsFilterCategory === 'all' ? 'bg-[#516E59] text-white' : 'text-gray-600'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setNewsFilterCategory('Santri Baru')}
                  className={`rounded-lg px-2.5 py-1 ${newsFilterCategory === 'Santri Baru' ? 'bg-[#516E59] text-white' : 'text-gray-600'}`}
                >
                  Santri Baru
                </button>
                <button
                  onClick={() => setNewsFilterCategory('Prestasi')}
                  className={`rounded-lg px-2.5 py-1 ${newsFilterCategory === 'Prestasi' ? 'bg-[#516E59] text-white' : 'text-gray-600'}`}
                >
                  Prestasi
                </button>
              </div>

              <button
                onClick={() => setShowAddNewsModal(true)}
                className="flex items-center gap-1 rounded-xl bg-[#516E59] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#3D5544] transition-colors"
              >
                <span>+ Tulis Warta Baru</span>
              </button>
            </div>
          </div>

          {/* News List */}
          {filteredNews.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#BCD4C0] bg-[#F7FAF7] p-12 text-center space-y-3">
              <Newspaper size={36} className="mx-auto text-[#62856B]" />
              <h4 className="text-sm font-bold text-[#233A29]">Belum Ada Warta Berita</h4>
              <p className="text-xs text-[#526D57] max-w-sm mx-auto">
                Silakan tulis warta pengumuman atau kegiatan baru melalui tombol di atas.
              </p>
              <button
                onClick={() => setShowAddNewsModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#516E59] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#3D5544]"
              >
                <span>+ Tulis Warta Baru</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="rounded-3xl border border-[#D5E3D8] bg-white p-6 shadow-2xs hover:border-[#96B89D] transition-colors space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                          news.category === 'Santri Baru'
                            ? 'bg-[#E5F5E8] border border-[#9DC8A2] text-[#22482B]'
                            : news.category === 'Wisuda'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-[#EEF5EF] text-[#3B5A43] border border-[#CADBCE]'
                        }`}
                      >
                        {news.category}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">{news.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-[#233A29] leading-snug">
                      {news.title}
                    </h4>

                    <p className="text-xs text-[#506A56] leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">
                      Penulis/Penginput: <strong className="text-[#2C4833]">{news.author}</strong>
                    </span>
                    <span className="text-[#516E59] font-bold hover:underline cursor-pointer">
                      Lihat Selengkapnya →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= SUBTAB 3: PRESENSI & NOTIFIKASI WHATSAPP ================= */}
      {subTab === 'presensi' && (
        <div className="space-y-8">
          {notificationSuccessMsg && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-emerald-100/90 border-2 border-emerald-400 p-4 text-xs font-bold text-emerald-950 shadow-sm animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-700 shrink-0" />
                <span>{notificationSuccessMsg}</span>
              </div>
              {destinationPhone && (
                <a
                  href={generateWhatsAppUrl(destinationPhone, generatedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-4 py-2 text-white font-black shadow-xs transition-colors shrink-0 text-center"
                >
                  <MessageCircle size={15} />
                  <span>Buka Chat WA Sekarang 🚀</span>
                </a>
              )}
            </div>
          )}

          {phoneErrorMsg && (
            <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 text-xs font-bold text-amber-900 shadow-xs animate-in fade-in">
              <AlertCircle size={18} className="text-amber-700 shrink-0" />
              <span>{phoneErrorMsg}</span>
            </div>
          )}

          {/* Form Presensi Ustadz */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-3xl border border-[#D0DDD2] bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div className="border-b border-[#E1EDE3] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#233A29]">
                    Form Pencatatan Presensi Santri Harian
                  </h3>
                  <p className="text-xs text-[#526B57]">
                    Sistem otomatis menyusun pesan doa resmi untuk dikirim ke nomor WhatsApp orang tua.
                  </p>
                </div>
                <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-bold text-[#35523D]">
                  Format Doa Resmi
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Select Student from master list */}
                <div>
                  <label className="block font-bold text-[#354E3C] mb-1">
                    Pilih Santri yang Mengaji:
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    disabled={students.length === 0}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-[#2A4231] font-semibold bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    {students.length === 0 ? (
                      <option value="">Belum ada santri terdaftar (Tambahkan di Tab Kelola Santri)</option>
                    ) : (
                      students.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.nis}) — Wali: {st.parentName} (+{formatIndonesianWhatsAppNumber(st.parentWhatsApp)})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Target WhatsApp Number Input with Live Validation & Direct Save */}
                <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-black text-emerald-950 flex items-center gap-1.5 text-xs">
                      <Phone size={14} className="text-emerald-700" />
                      <span>Nomor WhatsApp Tujuan (Wali / Orang Tua):</span>
                    </label>
                    {phoneSavedToast && (
                      <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 animate-in fade-in">
                        {phoneSavedToast}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-500 font-mono text-xs select-none">
                        🇮🇩 +
                      </span>
                      <input
                        type="tel"
                        value={destinationPhone}
                        onChange={(e) => setDestinationPhone(e.target.value)}
                        placeholder="Contoh: 081234567890 atau 6281234567890"
                        className="w-full rounded-xl border border-emerald-300 bg-white pl-12 pr-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-emerald-500 shadow-2xs"
                      />
                    </div>

                    {selectedStudentObj && (
                      <button
                        type="button"
                        onClick={handleUpdateStudentPhone}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3.5 py-2 text-xs font-black text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
                        title="Simpan nomor ini secara permanen ke profil santri"
                      >
                        <Save size={13} />
                        <span>Simpan ke Profil</span>
                      </button>
                    )}
                  </div>

                  {/* Formatted phone badge preview */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px]">
                    {isValidWhatsAppNumber(destinationPhone) ? (
                      <span className="font-bold text-emerald-700 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>
                          Nomor tujuan valid: <strong>+{formatIndonesianWhatsAppNumber(destinationPhone)}</strong> ({selectedStudentObj?.parentName || 'Wali'})
                        </span>
                      </span>
                    ) : (
                      <span className="font-bold text-amber-800 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        <AlertCircle size={13} className="text-amber-600 shrink-0" />
                        <span>
                          {destinationPhone
                            ? `Format terdeteksi: +${formatIndonesianWhatsAppNumber(destinationPhone)} (Pastikan nomor diawali 08... atau 628...)`
                            : 'Masukkan nomor WhatsApp orang tua (contoh: 081234567890)'}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Sesi & Waktu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#354E3C] mb-1">Keterangan Waktu:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTimeSlot('SORE')}
                        className={`rounded-xl border p-2 text-xs font-bold transition-all ${
                          timeSlot === 'SORE'
                            ? 'border-[#516E59] bg-[#EEF5EF] text-[#2F4D37]'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        SORE
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeSlot('MALAM')}
                        className={`rounded-xl border p-2 text-xs font-bold transition-all ${
                          timeSlot === 'MALAM'
                            ? 'border-[#516E59] bg-[#EEF5EF] text-[#2F4D37]'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        MALAM
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#354E3C] mb-1">Sesi Waktu Sholat:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['ASHAR', 'MAGHRIB', 'ISYA'] as const).map((session) => (
                        <button
                          key={session}
                          type="button"
                          onClick={() => setPrayerSession(session)}
                          className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                            prayerSession === session
                              ? 'border-[#516E59] bg-[#EEF5EF] text-[#2F4D37]'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {session}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Kehadiran */}
                <div>
                  <label className="block font-bold text-[#354E3C] mb-1">Status Kehadiran Santri:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['HADIR', 'IZIN', 'SAKIT', 'ALPA'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAttendanceStatus(st)}
                        className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                          attendanceStatus === st
                            ? 'border-[#516E59] bg-[#516E59] text-white shadow-xs'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catatan Pembelajaran */}
                <div>
                  <label className="block font-bold text-[#354E3C] mb-1">
                    Catatan Materi Hari Ini:
                  </label>
                  <input
                    type="text"
                    value={learningNotes}
                    onChange={(e) => setLearningNotes(e.target.value)}
                    placeholder="Contoh: Belajar tajwid hukum Mad Thabi'i dan hafalan An-Naba'..."
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-[#2A4231]"
                  />
                </div>

                {/* Multi-Channel WhatsApp Action Buttons */}
                <div className="pt-2 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Primary Button / Direct link to WhatsApp App */}
                    <a
                      href={
                        destinationPhone && generatedMessage
                          ? generateWhatsAppUrl(destinationPhone, generatedMessage)
                          : '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!selectedStudentObj || !destinationPhone.trim()) {
                          e.preventDefault();
                          setPhoneErrorMsg('Mohon pilih santri dan masukkan nomor WhatsApp tujuan.');
                          setTimeout(() => setPhoneErrorMsg(null), 4000);
                          return;
                        }
                        handleRecordAttendanceOnly(selectedStudentObj, destinationPhone, timeSlot, prayerSession, attendanceStatus);
                      }}
                      className={`flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] px-4 py-3.5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-700/20 hover:scale-102 active:scale-95 transition-all text-center border-b-4 border-[#1E9E4B] cursor-pointer ${
                        !destinationPhone ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      <MessageCircle size={18} />
                      <span>Kirim ke WhatsApp (+{formatIndonesianWhatsAppNumber(destinationPhone) || '...'})</span>
                    </a>

                    {/* Secondary Button to WhatsApp Web */}
                    <a
                      href={
                        destinationPhone && generatedMessage
                          ? generateWhatsAppWebUrl(destinationPhone, generatedMessage)
                          : '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!selectedStudentObj || !destinationPhone.trim()) {
                          e.preventDefault();
                          setPhoneErrorMsg('Mohon pilih santri dan masukkan nomor WhatsApp tujuan.');
                          setTimeout(() => setPhoneErrorMsg(null), 4000);
                          return;
                        }
                        handleRecordAttendanceOnly(selectedStudentObj, destinationPhone, timeSlot, prayerSession, attendanceStatus);
                      }}
                      className={`flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-white hover:bg-emerald-50 px-4 py-3.5 text-xs sm:text-sm font-black text-emerald-800 shadow-2xs hover:scale-102 active:scale-95 transition-all text-center border-b-4 border-b-emerald-400 cursor-pointer ${
                        !destinationPhone ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      <ExternalLink size={16} />
                      <span>Buka di WhatsApp Web 💻</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyWhatsAppMessage}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copyToast ? <CheckCheck size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copyToast ? 'Teks Pesan Berhasil Disalin! Silakan Tempel ke WA' : 'Salin Seluruh Teks Pesan Doa Presensi 📋'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Message Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-[#C6DACB] bg-[#F8FAF8] p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35523C]">
                  <MessageCircle size={16} className="text-[#25D366]" />
                  <span>Pratinjau Pesan WhatsApp Orang Tua:</span>
                </div>

                <div className="rounded-2xl border border-[#D5E3D8] bg-white p-4 font-mono text-xs text-[#1E3324] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {generatedMessage || 'Belum ada santri yang dipilih. Silakan daftarkan santri terlebih dahulu.'}
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 text-[11px] text-emerald-950 font-medium space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-xs text-emerald-900">
                    <span>Nomor Tujuan:</span>
                    <span className="font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      +{formatIndonesianWhatsAppNumber(destinationPhone) || 'Belum diisi'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Wali Santri:</span>
                    <span className="font-bold text-slate-800">{selectedStudentObj?.parentName || '-'}</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-200/80">
                    <a
                      href={destinationPhone && generatedMessage ? generateWhatsAppUrl(destinationPhone, generatedMessage) : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1"
                    >
                      <ExternalLink size={12} />
                      <span>Klik di sini untuk tes membuka obrolan langsung</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 4: E-IJAZAH SANTRI ================= */}
      {subTab === 'ijazah' && (
        <div className="space-y-6">
          {uploadSuccessAlert && (
            <div className="rounded-2xl bg-[#EAF5EC] border border-[#A4CAA9] p-4 text-xs font-bold text-[#2A4D33]">
              ✓ {uploadSuccessAlert}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#CCDBCF] bg-[#F7FAF7] p-5">
            <div>
              <h3 className="text-sm font-bold text-[#233A29]">
                Penerbitan & Pencetakan E-Ijazah Resmi TPQ
              </h3>
              <p className="text-xs text-[#526D57]">
                Diterbitkan secara resmi dengan verifikasi dewan penguji dan stempel digital TPQ AR-ROHMAH.
              </p>
            </div>

            <button
              onClick={() => setShowUploadCertModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#516E59] px-4 py-2 text-xs font-bold text-white hover:bg-[#3D5544] transition-colors"
            >
              <Upload size={14} />
              <span>Terbitkan Ijazah Baru</span>
            </button>
          </div>

          {filteredCertificates.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#BCD4C0] bg-[#F7FAF7] p-12 text-center space-y-3">
              <Award size={36} className="mx-auto text-[#62856B]" />
              <h4 className="text-sm font-bold text-[#233A29]">Belum Ada E-Ijazah</h4>
              <p className="text-xs text-[#526D57] max-w-sm mx-auto">
                Silakan terbitkan ijazah kelulusan atau pencapaian tahsin santri melalui tombol di atas.
              </p>
              <button
                onClick={() => setShowUploadCertModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#516E59] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#3D5544]"
              >
                <Upload size={14} />
                <span>Terbitkan Ijazah Baru</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-3xl border border-[#D5E3D8] bg-white p-6 shadow-2xs hover:border-[#96B89D] transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400">{cert.certificateNumber}</span>
                    <span className="rounded-full bg-[#E5F5E8] px-2 py-0.5 text-[9px] font-bold text-[#244A2D]">
                      Resmi Terverifikasi
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-[#233A29]">{cert.studentName}</h4>
                    <p className="text-xs text-[#537059]">{cert.program}</p>
                  </div>

                  <div className="rounded-2xl bg-[#F6FAF6] border border-[#DCE8DE] p-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Predikat:</span>
                      <strong className="text-[#25412A]">{cert.predicate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nilai Tajwid:</span>
                      <strong className="text-[#25412A]">{cert.tajwidGrade} / 100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Diterbitkan Oleh:</span>
                      <span className="text-[#25412A] font-semibold">{cert.uploadedBy}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E6EFE8] pt-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDownloadCertPng(cert)}
                        disabled={isDownloadingCert}
                        className="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-black text-white shadow-2xs transition-all active:scale-95 cursor-pointer"
                        title="Unduh file gambar PNG ke perangkat"
                      >
                        <Download size={13} />
                        <span>Unduh PNG</span>
                      </button>
                      <button
                        onClick={() => setPreviewingCertificate(cert)}
                        className="flex items-center gap-1 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs transition-all cursor-pointer"
                      >
                        <Printer size={13} />
                        <span>Lihat & Cetak</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-gray-400">{cert.completionDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL: ADD GENERAL NEWS ================= */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#CADBCE] bg-white p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#E1EDE3] pb-3">
              <h3 className="text-base font-bold text-[#233A29]">
                Tulis Warta / Pengumuman TPQ Baru
              </h3>
              <button onClick={() => setShowAddNewsModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleSaveGeneralNews} className="space-y-3">
              <div>
                <label className="block font-bold text-[#354F3C] mb-1">Judul Warta:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Persiapan Ujian Munaqasyah Semester Ganjil"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Kategori Warta:</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Wisuda">Wisuda</option>
                    <option value="Santri Baru">Santri Baru</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Penulis:</label>
                  <input
                    type="text"
                    defaultValue="Pengurus TPQ AR-ROHMAH"
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#354F3C] mb-1">Ringkasan:</label>
                <input
                  type="text"
                  placeholder="Ringkasan singkat warta..."
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#354F3C] mb-1">Isi Berita Lengkap:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ketikkan warta lengkap..."
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="rounded-lg border px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#516E59] px-5 py-2 text-xs font-bold text-white hover:bg-[#3D5544]"
                >
                  Terbitkan Warta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ISSUE NEW CERTIFICATE ================= */}
      {showUploadCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#CADBCE] bg-white p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#E1EDE3] pb-3">
              <h3 className="text-base font-bold text-[#233A29]">
                Penerbitan Dokumen E-Ijazah Santri
              </h3>
              <button onClick={() => setShowUploadCertModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-3">
              <div>
                <label className="block font-bold text-[#354F3C] mb-1">Pilih Santri Terdaftar:</label>
                <select
                  value={certStudentName}
                  onChange={(e) => {
                    setCertStudentName(e.target.value);
                    const matched = students.find((s) => s.name === e.target.value);
                    if (matched) {
                      setCertNis(matched.nis);
                      setCertFatherName(matched.parentName.replace(/^(Bapak|Ibu)\s*/i, ''));
                    }
                  }}
                  className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.nis})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Nama Ayah / Wali:</label>
                  <input
                    type="text"
                    required
                    value={certFatherName}
                    onChange={(e) => setCertFatherName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Program Kelulusan:</label>
                  <select
                    value={certProgram}
                    onChange={(e) => setCertProgram(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  >
                    <option value="Tahsin Al-Qur'an Dasar">Tahsin Al-Qur'an Dasar</option>
                    <option value="Tahfidz Juz 30 Cilik">Tahfidz Juz 30 Cilik</option>
                    <option value="Iqra Jilid 6">Iqra Jilid 6</option>
                    <option value="Khatam Al-Qur'an 30 Juz">Khatam Al-Qur'an 30 Juz</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Predikat Kelulusan:</label>
                  <select
                    value={certPredicate}
                    onChange={(e) => setCertPredicate(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  >
                    <option value="Mumtaz (Dengan Pujian)">Mumtaz (Dengan Pujian)</option>
                    <option value="Jayyid Jiddan (Sangat Baik)">Jayyid Jiddan (Sangat Baik)</option>
                    <option value="Jayyid (Baik)">Jayyid (Baik)</option>
                    <option value="Maqbul (Cukup)">Maqbul (Cukup)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Penguji Munaqasyah:</label>
                  <input
                    type="text"
                    required
                    value={certExaminer}
                    onChange={(e) => setCertExaminer(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Nilai Tajwid:</label>
                  <input
                    type="number"
                    min={70}
                    max={100}
                    value={certTajwidGrade}
                    onChange={(e) => setCertTajwidGrade(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Nilai Fashahah:</label>
                  <input
                    type="number"
                    min={70}
                    max={100}
                    value={certFashahahGrade}
                    onChange={(e) => setCertFashahahGrade(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#354F3C] mb-1">Nilai Akhlak:</label>
                  <input
                    type="number"
                    min={70}
                    max={100}
                    value={certAkhlakGrade}
                    onChange={(e) => setCertAkhlakGrade(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUploadCertModal(false)}
                  className="rounded-lg border px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#516E59] px-5 py-2 text-xs font-bold text-white hover:bg-[#3D5544]"
                >
                  Terbitkan E-Ijazah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PRINT PREVIEW IJAZAH ================= */}
      {previewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl border-4 border-[#3D5544] bg-[#FAF8F2] p-8 shadow-2xl text-center space-y-6">
            <button
              onClick={() => setPreviewingCertificate(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="flex items-center justify-center gap-2 text-[#3D5544]">
              <RubElHizbIcon size={24} />
              <span className="font-arabic text-xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <RubElHizbIcon size={24} />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-black text-[#516E59]">
                IJAZAH RESMI TAMAN PENDIDIKAN AL-QUR'AN
              </span>
              <h2 className="text-2xl font-black text-[#233829] mt-1 font-serif">
                TPQ AR-ROHMAH
              </h2>
              <p className="font-mono text-[11px] text-gray-500">{previewingCertificate.certificateNumber}</p>
            </div>

            <div className="text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
              Menyatakan dengan sesungguhnya bahwa santriwan/santriwati:
              <div className="my-2 text-xl font-bold text-[#1E3224] font-serif border-b border-gray-300 pb-1 inline-block px-4">
                {previewingCertificate.studentName}
              </div>
              <div className="text-[11px] text-gray-500">
                Nomor Induk Santri: {previewingCertificate.studentNis} · Putra/Putri dari Bapak {previewingCertificate.fatherName}
              </div>
              <p className="mt-2">
                Telah menyelesaikan seluruh materi kurikulum <strong>{previewingCertificate.program}</strong> dengan predikat kelulusan:
              </p>
              <div className="mt-2 text-sm font-black text-[#26442E] bg-[#EAF3EC] py-1.5 px-4 rounded-full inline-block">
                {previewingCertificate.predicate}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto text-xs bg-white p-3 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-400 block">Tajwid</span>
                <strong className="text-sm text-[#27442E]">{previewingCertificate.tajwidGrade}</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Fashahah</span>
                <strong className="text-sm text-[#27442E]">{previewingCertificate.fashahahGrade}</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Akhlak</span>
                <strong className="text-sm text-[#27442E]">{previewingCertificate.akhlakGrade}</strong>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-end text-xs text-gray-600 px-6">
              <div>
                <p className="text-[10px] text-gray-400">Penguji Munaqasyah:</p>
                <p className="font-bold text-[#203626] mt-8">
                  {!previewingCertificate.examinerName || previewingCertificate.examinerName === 'Ustadz H. Abdul Halim, S.Pd.I'
                    ? 'Ustadzah Nur Rohma, S. Pd.'
                    : previewingCertificate.examinerName}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-2 border-dashed border-[#516E59] flex items-center justify-center text-[9px] font-bold text-[#516E59] uppercase p-1 text-center">
                  STEMPEL DIGITAL RESMI TPQ
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{previewingCertificate.completionDate}</span>
              </div>
            </div>

            {certDownloadToast && (
              <div className="rounded-2xl bg-emerald-100 border-2 border-emerald-400 p-3 text-xs font-black text-emerald-950 animate-in fade-in flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                <span>{certDownloadToast}</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#DDE7DF] flex flex-wrap justify-center gap-2.5">
              <button
                type="button"
                onClick={() => handleDownloadCertPng(previewingCertificate)}
                disabled={isDownloadingCert}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer border-b-4 border-emerald-800 disabled:opacity-50"
              >
                <Download size={16} />
                <span>{isDownloadingCert ? 'Menyiapkan Gambar...' : '📥 Unduh Gambar Ijazah (PNG)'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadCertHtml(previewingCertificate)}
                className="flex items-center gap-1.5 rounded-2xl border-2 border-emerald-300 bg-white hover:bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-900 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <FileCheck size={16} className="text-emerald-700" />
                <span>📄 Unduh Dokumen (HTML)</span>
              </button>

              <button
                type="button"
                onClick={() => printCertificateSafely(previewingCertificate)}
                className="flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <Printer size={16} />
                <span>🖨️ Cetak / Print PDF</span>
              </button>

              {previewingCertificate.studentNis && (
                <a
                  href={generateWhatsAppUrl(
                    students.find((s) => s.name === previewingCertificate.studentName)?.parentWhatsApp || '',
                    `Assalamu'alaikum Warahmatullahi Wabarakatuh.\nKabar gembira dari TPQ AR-ROHMAH, Alhamdulillah ananda *${previewingCertificate.studentName}* telah resmi lulus dan diterbitkan E-Ijazah resmi dengan predikat *${previewingCertificate.predicate}*.\nNomor Ijazah: ${previewingCertificate.certificateNumber}.\nBarakallahu fiikum!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md active:scale-95 transition-all text-center"
                >
                  <MessageCircle size={16} />
                  <span>Kirim ke WA Orang Tua</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
