export interface QuizQuestion {
  id: string;
  category: 'tajwid' | 'dinul-islam' | 'sholat' | 'hafalan';
  question: string;
  arabicSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  isSharedToStudents: boolean;
  sharedBy?: string;
  sharedAt?: string;
}

export interface StudentQuizResult {
  id: string;
  studentName: string;
  category: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  stars: number;
  completedAt: string;
  syncedToGoogleSheet: boolean;
}

export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [];

export const INITIAL_STUDENT_SCORES: StudentQuizResult[] = [];

export const GOOGLE_DOCS_SOAL_TEMPLATE_URL = "https://docs.google.com/document/d/1TPQ-ArRohmah-NaskahSoalUjian-Santri/edit?usp=sharing";
export const GOOGLE_SHEETS_NILAI_TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/1TPQ-ArRohmah-RekapitulasiNilaiSantri-Realtime/edit?usp=sharing";
