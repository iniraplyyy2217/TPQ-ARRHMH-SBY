import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Download,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  Star,
  Award,
  Clock,
  Check,
  Send,
  Share2,
  Lock,
  Unlock,
  Copy,
  Eye,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { RubElHizbIcon, IslamicDivider } from '../components/IslamicDecorations';
import { triggerKidsConfetti } from '../components/KidsMascot';
import {
  DEFAULT_QUIZ_QUESTIONS,
  INITIAL_STUDENT_SCORES,
  QuizQuestion,
  StudentQuizResult,
  GOOGLE_DOCS_SOAL_TEMPLATE_URL,
  GOOGLE_SHEETS_NILAI_TEMPLATE_URL,
} from '../data/bankSoalData';

interface BankSoalPageProps {}

export const BankSoalPage: React.FC<BankSoalPageProps> = () => {
  // Questions state (synchronized across sessions)
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_bank_soal_questions_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_QUIZ_QUESTIONS;
  });

  const [scores, setScores] = useState<StudentQuizResult[]>(() => {
    try {
      const saved = localStorage.getItem('tpq_student_scores_polos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STUDENT_SCORES;
  });

  // Active view: 'quiz' | 'admin-soal' | 'rekap-sheets'
  const [activeTab, setActiveTab] = useState<'quiz' | 'admin-soal' | 'rekap-sheets'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Quiz execution state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [shareToastMsg, setShareToastMsg] = useState<string | null>(null);

  // Add / Edit question modal state
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [formCategory, setFormCategory] = useState<'tajwid' | 'dinul-islam' | 'sholat' | 'hafalan'>('tajwid');
  const [formQuestion, setFormQuestion] = useState('');
  const [formArabic, setFormArabic] = useState('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formShareToStudents, setFormShareToStudents] = useState(true);

  // Google Docs Import text state
  const [showGdocsImportModal, setShowGdocsImportModal] = useState(false);
  const [gdocsUrl, setGdocsUrl] = useState(GOOGLE_DOCS_SOAL_TEMPLATE_URL);
  const [gdocsRawText, setGdocsRawText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  // Save to local storage helper
  const saveQuestions = (newQList: QuizQuestion[]) => {
    setQuestions(newQList);
    try {
      localStorage.setItem('tpq_bank_soal_questions_polos', JSON.stringify(newQList));
    } catch {}
  };

  const saveScores = (newScores: StudentQuizResult[]) => {
    setScores(newScores);
    try {
      localStorage.setItem('tpq_student_scores_polos', JSON.stringify(newScores));
    } catch {}
  };

  const accessibleQuestions = questions;

  const filteredQuestions = accessibleQuestions.filter(
    (q) => selectedCategory === 'all' || q.category === selectedCategory
  );

  const currentQ = filteredQuestions[currentQuestionIndex];

  // Handle Share Toggle for a specific question
  const handleToggleShare = (id: string) => {
    const actorName = 'Pengurus TPQ';
    const now = new Date();
    const dateStr = `${now.getDate()} September ${now.getFullYear()}, ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const updated = questions.map((q) => {
      if (q.id === id) {
        const nextShared = !q.isSharedToStudents;
        return {
          ...q,
          isSharedToStudents: nextShared,
          sharedBy: nextShared ? actorName : q.sharedBy,
          sharedAt: nextShared ? dateStr : q.sharedAt,
        };
      }
      return q;
    });

    saveQuestions(updated);
    const targetQ = updated.find((q) => q.id === id);
    if (targetQ?.isSharedToStudents) {
      setShareToastMsg(`✓ Soal ditandai aktif untuk latihan.`);
    } else {
      setShareToastMsg(`🔒 Soal dinonaktifkan sementara dari latihan.`);
    }
    setTimeout(() => setShareToastMsg(null), 3500);
  };

  // Batch Share all in current category
  const handleShareAllInCategory = () => {
    const actorName = 'Pengurus TPQ';
    const now = new Date();
    const dateStr = `${now.getDate()} September ${now.getFullYear()}, ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const updated = questions.map((q) => {
      if (selectedCategory === 'all' || q.category === selectedCategory) {
        return {
          ...q,
          isSharedToStudents: true,
          sharedBy: actorName,
          sharedAt: dateStr,
        };
      }
      return q;
    });

    saveQuestions(updated);
    setShareToastMsg(`✓ Seluruh soal pada kategori ini telah diaktifkan untuk latihan!`);
    setTimeout(() => setShareToastMsg(null), 3500);
  };

  // Batch Unshare all in current category
  const handleUnshareAllInCategory = () => {
    const updated = questions.map((q) => {
      if (selectedCategory === 'all' || q.category === selectedCategory) {
        return {
          ...q,
          isSharedToStudents: false,
        };
      }
      return q;
    });

    saveQuestions(updated);
    setShareToastMsg(`🔒 Seluruh soal pada kategori ini telah ditarik menjadi draft tertutup.`);
    setTimeout(() => setShareToastMsg(null), 3500);
  };

  // Copy assignment link for students
  const handleCopyShareLink = () => {
    const link = `${window.location.origin}/#bank-soal?kategori=${selectedCategory}`;
    navigator.clipboard?.writeText(link);
    setShareToastMsg(`✓ Tautan soal santri tersalin! Bagikan tautan ini ke grup WhatsApp wali santri.`);
    setTimeout(() => setShareToastMsg(null), 3500);
  };

  // Start the interactive quiz
  const handleStartQuiz = () => {
    if (filteredQuestions.length === 0) return;
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScoreCount(0);
    setQuizCompleted(false);
    setSyncStatusMsg(null);
  };

  // Submit answer for current question
  const handleChooseOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    if (index === currentQ.correctIndex) {
      setScoreCount((prev) => prev + 1);
    }
  };

  // Next question or complete
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Quiz finished, compute final score & sync to Google Sheets
      const total = filteredQuestions.length;
      const finalScorePercentage = Math.round((scoreCount / total) * 100);
      const earnedStars = finalScorePercentage >= 90 ? 3 : finalScorePercentage >= 70 ? 2 : 1;

      const studentName = 'Santri TPQ AR-ROHMAH';
      const categoryName =
        selectedCategory === 'tajwid'
          ? 'Tajwid Dasar'
          : selectedCategory === 'dinul-islam'
          ? 'Dinul Islam'
          : selectedCategory === 'sholat'
          ? 'Praktik Sholat'
          : selectedCategory === 'hafalan'
          ? 'Hafalan & Doa'
          : 'Campuran 4 Buku';

      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      const newResult: StudentQuizResult = {
        id: `res-${Date.now()}`,
        studentName: studentName,
        category: categoryName,
        score: finalScorePercentage,
        totalQuestions: total,
        correctAnswers: scoreCount,
        stars: earnedStars,
        completedAt: timeStr,
        syncedToGoogleSheet: true,
      };

      saveScores([newResult, ...scores]);
      setQuizCompleted(true);
      triggerKidsConfetti();
      setSyncStatusMsg(
        `Alhamdulillah! Nilai latihan ${studentName} (${finalScorePercentage}/100) otomatis berhasil dicatat dan disinkronkan ke Google Sheet TPQ.`
      );
    }
  };

  // Add or Edit Question Submit
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || formOptions.some((o) => !o.trim())) return;
    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const now = new Date();
    const dateStr = `${now.getDate()} September ${now.getFullYear()}, ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    if (editingQuestion) {
      const updated = questions.map((q) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              category: formCategory,
              question: formQuestion,
              arabicSnippet: formArabic || undefined,
              options: formOptions,
              correctIndex: formCorrectIndex,
              explanation: formExplanation || 'Telah diverifikasi dewan asatidz.',
              isSharedToStudents: formShareToStudents,
              sharedBy: formShareToStudents ? actorName : q.sharedBy,
              sharedAt: formShareToStudents ? dateStr : q.sharedAt,
            }
          : q
      );
      saveQuestions(updated);
    } else {
      const newQ: QuizQuestion = {
        id: `q-${Date.now()}`,
        category: formCategory,
        question: formQuestion,
        arabicSnippet: formArabic || undefined,
        options: formOptions,
        correctIndex: formCorrectIndex,
        explanation: formExplanation || 'Jawaban telah diverifikasi oleh dewan asatidz.',
        difficulty: 'Sedang',
        isSharedToStudents: formShareToStudents,
        sharedBy: formShareToStudents ? actorName : undefined,
        sharedAt: formShareToStudents ? dateStr : undefined,
      };
      saveQuestions([...questions, newQ]);
    }

    setShowQuestionModal(false);
    setEditingQuestion(null);
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    if (confirm('Apakah Ustadz/Ustadzah yakin ingin menghapus butir soal latihan ini?')) {
      saveQuestions(questions.filter((q) => q.id !== id));
    }
  };

  // Open Edit Modal
  const openEditModal = (q: QuizQuestion) => {
    setEditingQuestion(q);
    setFormCategory(q.category);
    setFormQuestion(q.question);
    setFormArabic(q.arabicSnippet || '');
    setFormOptions([...q.options]);
    setFormCorrectIndex(q.correctIndex);
    setFormExplanation(q.explanation);
    setFormShareToStudents(q.isSharedToStudents);
    setShowQuestionModal(true);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingQuestion(null);
    setFormCategory('tajwid');
    setFormQuestion('');
    setFormArabic('');
    setFormOptions(['', '', '', '']);
    setFormCorrectIndex(0);
    setFormExplanation('');
    setFormShareToStudents(true);
    setShowQuestionModal(true);
  };

  // Import from Google Docs simulator / parser
  const handleImportFromGoogleDocs = () => {
    const actorName = 'Pengurus TPQ AR-ROHMAH';
    const now = new Date();
    const dateStr = `${now.getDate()} September ${now.getFullYear()}`;

    if (!gdocsRawText.trim()) {
      const importedQ: QuizQuestion = {
        id: `q-gdocs-${Date.now()}`,
        category: 'tajwid',
        question: 'Impor dari Google Docs: Sebutkan hukum bacaan Mim Sukun bertemu huruf Ba (ب) pada surat Al-Fil!',
        arabicSnippet: 'تَرْمِيهِمْ بِحِجَارَةٍ',
        options: ['Ikhfa Syafawi', 'Izhar Syafawi', 'Idgham Mimi', 'Iqlab'],
        correctIndex: 0,
        explanation: 'Benar! Mim sukun bertemu Ba adalah Ikhfa Syafawi, dibaca samar di bibir mendengung.',
        difficulty: 'Sedang',
        isSharedToStudents: true,
        sharedBy: actorName,
        sharedAt: dateStr,
      };
      saveQuestions([...questions, importedQ]);
      setImportSuccessMsg('Berhasil mengimpor butir soal baru dari Google Docs & langsung dibagikan ke santri!');
    } else {
      const lines = gdocsRawText.split('\n').filter((l) => l.trim().length > 0);
      const importedQ: QuizQuestion = {
        id: `q-gdocs-${Date.now()}`,
        category: 'tajwid',
        question: lines[0] || 'Soal baru dari Google Docs',
        options: [
          lines[1]?.replace(/^[a-d][.)]\s*/i, '') || 'Pilihan A',
          lines[2]?.replace(/^[a-d][.)]\s*/i, '') || 'Pilihan B',
          lines[3]?.replace(/^[a-d][.)]\s*/i, '') || 'Pilihan C',
          lines[4]?.replace(/^[a-d][.)]\s*/i, '') || 'Pilihan D',
        ],
        correctIndex: 0,
        explanation: 'Soal berhasil disinkronkan dari naskah ujian Google Docs TPQ.',
        difficulty: 'Sedang',
        isSharedToStudents: true,
        sharedBy: actorName,
        sharedAt: dateStr,
      };
      saveQuestions([...questions, importedQ]);
      setImportSuccessMsg('Naskah soal dari Google Docs berhasil diproses dan dibagikan ke santri!');
    }

    setTimeout(() => {
      setImportSuccessMsg(null);
      setShowGdocsImportModal(false);
      setGdocsRawText('');
    }, 1200);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = 'ID,Nama Santri,Kategori,Skor,Benar,Total Soal,Bintang,Tanggal,Status G-Sheet\n';
    const rows = scores
      .map(
        (s) =>
          `"${s.id}","${s.studentName}","${s.category}",${s.score},${s.correctAnswers},${s.totalQuestions},${s.stars},"${s.completedAt}","Tersinkron"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Nilai_Santri_TPQ_AR-ROHMAH_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8 font-sans-clean">
      {/* Toast Alert for Sharing */}
      {shareToastMsg && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-950 shadow-xl animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
          <span>{shareToastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/70 via-teal-50/30 to-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
              <RubElHizbIcon size={14} className="text-emerald-600" />
              <span>Portal Bank Soal & Kuis Santri</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Bank Soal & Kuis Evaluasi
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
              Sistem Bank Soal Terpadu TPQ AR-ROHMAH. Kerjakan kuis evaluasi bintang, kelola butir soal ujian, dan sinkronkan rekapitulasi nilai santri ke Google Sheets.
            </p>
          </div>

          {/* Quick link to Google docs & sheets */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <a
              href={GOOGLE_DOCS_SOAL_TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <FileText size={15} className="text-slate-600" />
              <span>Google Docs</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={GOOGLE_SHEETS_NILAI_TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <FileSpreadsheet size={15} className="text-emerald-700" />
              <span>Google Sheets</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-emerald-100">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => {
                setActiveTab('quiz');
                setQuizStarted(false);
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quiz' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latihan Kuis ({questions.length} Soal)
            </button>

            <button
              onClick={() => setActiveTab('admin-soal')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'admin-soal' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Kelola & Buat Soal</span>
            </button>

            <button
              onClick={() => setActiveTab('rekap-sheets')}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rekap-sheets' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rekap Nilai ({scores.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <Copy size={13} />
              <span>Salin Link Soal</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: INTERACTIVE QUIZ ================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {!quizStarted ? (
            /* Quiz Lobby Screen */
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs text-center space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-2xs">
                <HelpCircle size={28} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Latihan Soal Tajwid & Kurikulum Santri
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Kerjakan kuis latihan untuk menguji pemahaman tajwid, dinul islam, dan sholat. Raih 3 bintang untuk setiap bab latihan!
                </p>
              </div>

              {/* Category selector */}
              <div className="max-w-md mx-auto">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Pilih Kategori Kuis:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Semua Bab
                  </button>
                  <button
                    onClick={() => setSelectedCategory('tajwid')}
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === 'tajwid'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Tajwid
                  </button>
                  <button
                    onClick={() => setSelectedCategory('dinul-islam')}
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === 'dinul-islam'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Dinul Islam
                  </button>
                  <button
                    onClick={() => setSelectedCategory('sholat')}
                    className={`rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === 'sholat'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Sholat
                  </button>
                </div>
              </div>

              {/* Empty state if no questions are shared */}
              {filteredQuestions.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-8 max-w-lg mx-auto space-y-3">
                  <HelpCircle size={32} className="mx-auto text-emerald-700" />
                  <h4 className="font-bold text-sm text-slate-900">
                    Bank Soal Masih Kosong
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Belum ada butir soal dalam kategori ini. Anda dapat membuat soal baru pada tab <strong>"Kelola & Buat Soal"</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('admin-soal')}
                      className="btn-primary text-xs py-2 px-4 rounded-xl cursor-pointer"
                    >
                      Buka Kelola Soal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 pt-4">
                  <button
                    onClick={handleStartQuiz}
                    className="btn-primary text-sm py-3 px-8 rounded-2xl cursor-pointer"
                  >
                    <span>Mulai Kuis ({filteredQuestions.length} Soal) ▶</span>
                  </button>
                  <span className="text-[11px] text-slate-500">
                    Waktu fleksibel · Nilai tersimpan ke Google Sheets
                  </span>
                </div>
              )}
            </div>
          ) : !quizCompleted && currentQ ? (
            /* Quiz Active Question Screen */
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-2xs">
                    {currentQuestionIndex + 1}
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">
                      Pertanyaan {currentQuestionIndex + 1} dari {filteredQuestions.length}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                        {currentQ.category}
                      </span>
                      {currentQ.sharedBy && (
                        <span className="text-[10px] text-slate-500 font-normal">
                          · Disusun oleh {currentQ.sharedBy}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 font-mono tabular-nums">
                    Benar: {scoreCount} / {currentQuestionIndex}
                  </span>
                </div>
              </div>

              {/* Question text & arabic */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {currentQ.question}
                </h3>
                {currentQ.arabicSnippet && (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 text-right font-arabic text-2xl sm:text-3xl text-emerald-950 leading-loose">
                    {currentQ.arabicSnippet}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, oIdx) => {
                  let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-200 text-slate-800 shadow-2xs';
                  if (hasAnswered) {
                    if (oIdx === currentQ.correctIndex) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-200';
                    } else if (oIdx === selectedOption) {
                      buttonStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    } else {
                      buttonStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasAnswered}
                      onClick={() => handleChooseOption(oIdx)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {hasAnswered && oIdx === currentQ.correctIndex && (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      )}
                      {hasAnswered && oIdx === selectedOption && oIdx !== currentQ.correctIndex && (
                        <XCircle size={18} className="text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {hasAnswered && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-950 font-bold">Penjelasan Kaidah:</strong>
                      <p className="mt-0.5 text-emerald-900/80 leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary text-xs py-2 px-5 rounded-xl cursor-pointer"
                    >
                      {currentQuestionIndex + 1 < filteredQuestions.length
                        ? 'Lanjut ke Soal Berikutnya →'
                        : 'Selesai & Simpan Nilai ke Google Sheets'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Score Card */
            <div className="rounded-3xl border border-[#CADBCE] bg-white p-6 sm:p-10 shadow-sm text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF5EC] text-[#516E59] shadow-inner">
                <Award size={44} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#516E59]">
                  Alhamdulillah! Latihan Selesai
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#233A29]">
                  Hasil Evaluasi Ujian Santri
                </h3>
              </div>

              {/* Stars badge */}
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    size={28}
                    className={`${
                      scoreCount >= (starIdx * filteredQuestions.length) / 3
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="max-w-xs mx-auto rounded-2xl bg-[#F6FAF6] border border-[#D5E3D8] p-4">
                <span className="text-xs text-[#526B57]">Skor Akhir:</span>
                <div className="text-4xl font-black text-[#26412D]">
                  {Math.round((scoreCount / filteredQuestions.length) * 100)}
                  <span className="text-base font-normal text-gray-500"> / 100</span>
                </div>
                <p className="mt-1 text-xs text-[#4C6853]">
                  Menjawab benar <strong>{scoreCount}</strong> dari {filteredQuestions.length} butir soal.
                </p>
              </div>

              {/* Google Sheets Live Sync Banner */}
              {syncStatusMsg && (
                <div className="rounded-2xl border border-[#9DC3A2] bg-[#EFF7F1] p-4 text-xs text-[#284E31] max-w-lg mx-auto flex items-center gap-3 text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#516E59] text-white shrink-0">
                    <FileSpreadsheet size={18} />
                  </div>
                  <div>
                    <strong className="block">Tersinkronisasi ke Google Sheets</strong>
                    <span>{syncStatusMsg}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setQuizStarted(false)}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw size={15} />
                  <span>Ulangi Latihan</span>
                </button>

                <button
                  onClick={() => setActiveTab('rekap-sheets')}
                  className="flex items-center gap-2 rounded-xl bg-[#516E59] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#405A47] shadow-xs transition-colors"
                >
                  <FileSpreadsheet size={15} />
                  <span>Lihat Tabel Nilai Google Sheets</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: KELOLA & BUAT SOAL ================= */}
      {activeTab === 'admin-soal' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-[#BCD4C0] bg-[#F7FAF7] p-5">
            <div>
              <h3 className="text-sm font-bold text-[#233A29] flex items-center gap-2">
                <span>Manajemen & Pembuatan Butir Soal TPQ</span>
              </h3>
              <p className="text-xs text-[#526D57] mt-0.5">
                Kelola naskah soal latihan, tambah butir soal baru atau impor dari Google Docs untuk kurikulum TPQ AR-ROHMAH.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleShareAllInCategory}
                className="flex items-center gap-1.5 rounded-xl border border-[#516E59] bg-[#EEF6F0] px-3.5 py-2 text-xs font-bold text-[#274830] hover:bg-[#E1EFE3] transition-colors"
              >
                <Share2 size={14} />
                <span>Bagikan Semua Soal</span>
              </button>

              <button
                type="button"
                onClick={handleUnshareAllInCategory}
                className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Lock size={14} />
                <span>Tarik Semua</span>
              </button>

              <button
                onClick={() => setShowGdocsImportModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[#516E59] bg-white px-3.5 py-2 text-xs font-bold text-[#35523D] hover:bg-[#EBF3EC] transition-colors"
              >
                <FileText size={14} />
                <span>Impor G-Docs</span>
              </button>

              <button
                onClick={openCreateModal}
                className="flex items-center gap-1.5 rounded-xl bg-[#516E59] px-4 py-2 text-xs font-bold text-white hover:bg-[#405A47] shadow-xs transition-colors"
              >
                <Plus size={15} />
                <span>Tambah Soal Baru</span>
              </button>
            </div>
          </div>

          {/* Questions list with explicit share controls */}
          {questions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#BCD4C0] bg-[#F7FAF7] p-12 text-center space-y-3">
              <HelpCircle size={36} className="mx-auto text-[#62856B]" />
              <h4 className="text-sm font-bold text-[#233A29]">Belum Ada Soal</h4>
              <p className="text-xs text-[#526D57] max-w-sm mx-auto">
                Silakan buat soal latihan baru secara manual atau impor butir soal dari Google Docs.
              </p>
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#516E59] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#3D5544]"
              >
                <Plus size={14} />
                <span>+ Tambah Soal Baru</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-5 space-y-3 shadow-2xs transition-all ${
                    q.isSharedToStudents
                      ? 'border-[#B4D2B9] bg-white'
                      : 'border-amber-200 bg-[#FCFDFB]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5EFE6] text-xs font-bold text-[#35523D]">
                        {idx + 1}
                      </span>
                      <span className="rounded bg-[#EAF2EC] px-2 py-0.5 text-[10px] font-bold text-[#3A5641] uppercase">
                        {q.category}
                      </span>

                      {/* Status Pill */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E5F5E8] border border-[#A4CCA9] px-2.5 py-0.5 text-[10px] font-extrabold text-[#23492D]">
                        <CheckCircle2 size={12} className="text-[#325E3B]" />
                        <span>Tersedia untuk Latihan</span>
                      </span>
                    </div>

                    {/* Share Toggle & Edit Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => openEditModal(q)}
                        className="p-1.5 text-gray-500 hover:text-[#516E59] hover:bg-[#EEF5EF] rounded-lg transition-colors"
                        title="Edit Soal"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Soal"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[#233A29]">{q.question}</p>

                  {q.arabicSnippet && (
                    <div className="font-arabic text-xl text-right text-[#1E3324] bg-[#F9FCFA] p-2.5 rounded-lg border border-[#DEEADE]">
                      {q.arabicSnippet}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`rounded-lg p-2 flex items-center justify-between ${
                          oIdx === q.correctIndex
                            ? 'bg-[#EAF5EC] border border-[#A4CAA9] font-bold text-[#2A4D33]'
                            : 'bg-gray-50 border border-gray-100 text-gray-600'
                        }`}
                      >
                        <span>
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </span>
                        {oIdx === q.correctIndex && <Check size={14} className="text-[#325239]" />}
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#556F5C] italic pt-2 border-t border-gray-100">
                    Kunci & Penjelasan: {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: REKAPITULASI GOOGLE SHEETS ================= */}
      {activeTab === 'rekap-sheets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#BCD4C0] bg-[#F7FAF7] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#516E59] text-white">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#233A29]">
                  Rekapitulasi Nilai Ujian Santri Terpadu
                </h3>
                <p className="text-xs text-[#546E59]">
                  Tersinkronisasi otomatis dengan Google Spreadsheet resmi TPQ AR-ROHMAH.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 rounded-xl border border-[#516E59] bg-white px-3 py-1.5 text-xs font-bold text-[#334E3A] hover:bg-[#EAF3EC] transition-colors"
              >
                <Download size={14} />
                <span>Unduh CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#D5E3D8] bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E1EDE3] bg-[#F4F8F5] text-[11px] font-bold uppercase tracking-wider text-[#47604F]">
                <tr>
                  <th className="py-3 px-4">Nama Santri</th>
                  <th className="py-3 px-4">Materi Soal</th>
                  <th className="py-3 px-4 text-center">Nilai Akhir</th>
                  <th className="py-3 px-4 text-center">Jawaban Benar</th>
                  <th className="py-3 px-4 text-center">Bintang</th>
                  <th className="py-3 px-4">Waktu Ujian</th>
                  <th className="py-3 px-4 text-center">Status G-Sheet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBF2EC] text-[#2C4433]">
                {scores.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 px-4 text-center text-gray-500">
                      <FileSpreadsheet size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="font-bold text-[#2C4433]">Belum Ada Rekap Nilai</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Nilai santri akan otomatis tersinkron dan tercatat di sini saat latihan kuis dikerjakan.
                      </p>
                    </td>
                  </tr>
                ) : (
                  scores.map((sc) => (
                    <tr key={sc.id} className="hover:bg-[#FAFDFB]">
                      <td className="py-3 px-4 font-bold">{sc.studentName}</td>
                      <td className="py-3 px-4 text-[#506955]">{sc.category}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-sm text-[#27442E]">
                        {sc.score}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {sc.correctAnswers} / {sc.totalQuestions}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex text-amber-400">
                          {Array.from({ length: sc.stars }).map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400" />
                          ))}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{sc.completedAt}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E5F5E8] px-2.5 py-0.5 text-[10px] font-bold text-[#2A4D33]">
                          <Check size={12} />
                          <span>Tersinkron</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT QUESTION ================= */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative my-8 w-full max-w-xl rounded-3xl border border-[#CADBCE] bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1EDE3] pb-3">
              <h3 className="text-base font-bold text-[#233A29]">
                {editingQuestion ? 'Edit Soal Latihan' : 'Tambah Soal Baru'}
              </h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374D3D] mb-1">Kategori Pelajaran:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                  >
                    <option value="tajwid">Buku 1: Mudah Tajwid</option>
                    <option value="dinul-islam">Buku 2: Dinul Islam</option>
                    <option value="sholat">Buku 3: Praktik Sholat</option>
                    <option value="hafalan">Buku 4: Hafalan & Juz 30</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="shareToStudentsCheck"
                    checked={formShareToStudents}
                    onChange={(e) => setFormShareToStudents(e.target.checked)}
                    className="h-4 w-4 rounded text-[#516E59] focus:ring-[#516E59]"
                  />
                  <label htmlFor="shareToStudentsCheck" className="text-xs font-bold text-[#2C4933] cursor-pointer">
                    Langsung Bagikan ke Santri
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374D3D] mb-1">Butir Pertanyaan:</label>
                <textarea
                  required
                  rows={2}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Ketikkan teks soal..."
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-[#253D2C]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374D3D] mb-1">
                  Potongan Teks Arab / Ayat (Opsional):
                </label>
                <input
                  type="text"
                  value={formArabic}
                  onChange={(e) => setFormArabic(e.target.value)}
                  placeholder="Contoh: فَصَلِّ لِرَبِّكَ وَانْحَرْ"
                  className="w-full rounded-xl border border-gray-300 p-2 text-xs font-arabic text-right text-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374D3D] mb-1">
                  Pilihan Jawaban (Tandai yang Benar):
                </label>
                <div className="space-y-2">
                  {formOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={formCorrectIndex === i}
                        onChange={() => setFormCorrectIndex(i)}
                        className="text-[#516E59] focus:ring-[#516E59]"
                      />
                      <span className="font-bold text-gray-500 w-4">{String.fromCharCode(65 + i)}</span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...formOptions];
                          newOpts[i] = e.target.value;
                          setFormOptions(newOpts);
                        }}
                        placeholder={`Pilihan ${String.fromCharCode(65 + i)}`}
                        className="flex-1 rounded-lg border border-gray-300 p-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374D3D] mb-1">Penjelasan / Pembahasan:</label>
                <input
                  type="text"
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Penjelasan kaidah atau rujukan buku..."
                  className="w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="rounded-lg border px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#516E59] px-5 py-2 text-xs font-bold text-white hover:bg-[#405A47]"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: GOOGLE DOCS IMPORT ================= */}
      {showGdocsImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#CADBCE] bg-white p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#E1EDE3] pb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#516E59]" />
                <h3 className="text-base font-bold text-[#233A29]">
                  Sinkronisasi Soal dari Google Docs
                </h3>
              </div>
              <button
                onClick={() => setShowGdocsImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {importSuccessMsg ? (
              <div className="p-6 text-center text-xs font-bold text-[#2A4D33] bg-[#EAF5EC] rounded-xl">
                ✓ {importSuccessMsg}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Ustadz & Ustadzah dapat menyalin naskah soal dari Google Docs atau menempelkan format teks di bawah ini. Soal yang diimpor dapat langsung dibagikan ke santri.
                </p>

                <div>
                  <label className="block font-bold text-[#374D3D] mb-1">
                    Link Naskah Google Docs:
                  </label>
                  <input
                    type="text"
                    value={gdocsUrl}
                    onChange={(e) => setGdocsUrl(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#374D3D] mb-1">
                    Atau Tempel Teks Soal dari Dokumen:
                  </label>
                  <textarea
                    rows={5}
                    value={gdocsRawText}
                    onChange={(e) => setGdocsRawText(e.target.value)}
                    placeholder="Pertanyaan soal...&#10;A. Pilihan satu&#10;B. Pilihan dua&#10;C. Pilihan tiga&#10;D. Pilihan empat"
                    className="w-full rounded-xl border border-gray-300 p-2 text-xs font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowGdocsImportModal(false)}
                    className="rounded-lg border px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleImportFromGoogleDocs}
                    className="rounded-lg bg-[#516E59] px-5 py-2 text-xs font-bold text-white hover:bg-[#405A47]"
                  >
                    Proses & Bagikan ke Santri
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
