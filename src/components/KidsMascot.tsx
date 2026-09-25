import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Volume2, VolumeX, X, MessageSquare, Star, PartyPopper } from 'lucide-react';
import { CheerfulStar, SmilingCrescentMoon } from './IslamicDecorations';

// Soft cheerful chime synthesizer using pure Web Audio API
const playCheerfulChime = (type: 'happy' | 'star' | 'pop' = 'happy') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.15, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    if (type === 'happy') {
      // C5 - E5 - G5 - C6 joyful arpeggio
      playTone(523.25, now, 0.2);
      playTone(659.25, now + 0.1, 0.2);
      playTone(783.99, now + 0.2, 0.25);
      playTone(1046.50, now + 0.3, 0.4);
    } else if (type === 'star') {
      playTone(659.25, now, 0.15);
      playTone(880.00, now + 0.1, 0.3);
    } else {
      playTone(440, now, 0.1);
      playTone(880, now + 0.08, 0.25);
    }
  } catch {
    // Ignore audio restriction if user hasn't interacted
  }
};

export const triggerKidsConfetti = () => {
  playCheerfulChime('happy');
  try {
    // Left burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.15, y: 0.7 },
      colors: ['#34D399', '#FBBF24', '#38BDF8', '#F472B6', '#A78BFA'],
    });
    // Right burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.85, y: 0.7 },
      colors: ['#10B981', '#F59E0B', '#60A5FA', '#FB7185', '#C084FC'],
    });
  } catch {
    // Fallback if canvas blocked
  }
};

const KID_QUOTES = [
  { text: "Assalamu'alaikum sahabat kecil! Ayo selalu tersenyum dan semangat mengaji hari ini! 😊🌸", tag: "Sapaan Pagi" },
  { text: "Tahukah kamu? Membaca 1 huruf Al-Qur'an bernilai 10 pahala kebaikan di sisi Allah! 📖✨", tag: "Hadits Riwayat Tirmidzi" },
  { text: "Hebat sekali! Santri yang rajin sholat & mengaji pasti disayang Allah serta ayah bunda! 🤲❤️", tag: "Nasihat Santri" },
  { text: "Senyummu kepada saudaramu adalah sedekah yang paling manis dan mudah! 🎈⭐", tag: "Akhlak Mulia" },
  { text: "Jangan lupa baca Bismillah sebelum mulai belajar ya sahabat cilik! 🌟", tag: "Adab Belajar" },
  { text: "Jadilah anak sholeh yang senantiasa mendoakan orang tua di setiap selesai sholat! 🕌🤲", tag: "Doa Mustajab" },
  { text: "Keren! Sudah muraja'ah hafalan Juz 30 hari ini? Satu ayat demi satu ayat jadi mahkota surga! 👑", tag: "Semangat Hafalan" },
];

export const KidsMascot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isWiggling, setIsWiggling] = useState(false);

  // Auto rotate message gently
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % KID_QUOTES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuote = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
    if (soundEnabled) playCheerfulChime('star');
    setQuoteIndex((prev) => (prev + 1) % KID_QUOTES.length);
  };

  const handleConfettiBlast = () => {
    triggerKidsConfetti();
  };

  const currentQuote = KID_QUOTES[quoteIndex];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none select-none">
      {/* Speech bubble */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 max-w-xs sm:max-w-sm rounded-2xl bg-white border border-amber-200/90 p-4 shadow-xl shadow-amber-900/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 relative font-sans-clean">
          {/* Bubble tail */}
          <div className="absolute -bottom-2 right-8 h-3.5 w-3.5 rotate-45 border-b border-r border-amber-200/90 bg-white" />

          {/* Bubble header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs">
                ⭐
              </span>
              <span className="text-xs font-bold text-slate-800">
                Si Bintang Ceria TPQ
              </span>
              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
                {currentQuote.tag}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="rounded-lg p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                title={soundEnabled ? 'Matikan nada ting-ting' : 'Nyalakan nada ting-ting'}
              >
                {soundEnabled ? <Volume2 size={13} className="text-emerald-600" /> : <VolumeX size={13} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Tutup pesan"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Quote Content */}
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            "{currentQuote.text}"
          </p>

          {/* Quick interactive buttons inside speech bubble */}
          <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleNextQuote}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100/70 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
            >
              <span>Nasihat Lain 🎈</span>
            </button>
            <button
              onClick={handleConfettiBlast}
              className="btn-amber text-[11px] py-1 px-2.5 rounded-lg cursor-pointer"
            >
              <PartyPopper size={12} />
              <span>Horeee! 🎉</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              if (soundEnabled) playCheerfulChime('happy');
            }}
            className="flex items-center gap-1.5 rounded-full bg-white border border-amber-300 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-md hover:bg-amber-50 transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans-clean"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>Pesan Si Bintang ⭐</span>
          </button>
        )}

        <button
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            } else {
              handleConfettiBlast();
            }
          }}
          className={`relative group flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 border-2 border-amber-400 shadow-lg shadow-amber-500/25 transition-transform active:scale-90 cursor-pointer ${
            isWiggling ? 'animate-wiggle' : 'animate-float'
          }`}
          title="Klik Si Bintang Santri!"
        >
          {/* Little green Songkok / Peci on top of star */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-emerald-800 rounded-t-md border border-emerald-950 flex items-center justify-center shadow-xs">
            <span className="text-[7px] text-amber-200 font-bold">★</span>
          </div>

          {/* Cute Face */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Eyes */}
            <div className="flex items-center gap-2 mb-0.5">
              <div className="h-2 w-2 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="h-0.5 w-0.5 rounded-full bg-white ml-0.5 mb-0.5" />
              </div>
              <div className="h-2 w-2 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="h-0.5 w-0.5 rounded-full bg-white ml-0.5 mb-0.5" />
              </div>
            </div>
            {/* Cheeks and smiling mouth */}
            <div className="flex items-center justify-center relative">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 opacity-80 -mr-0.5" />
              <div className="h-2 w-3 rounded-b-full border-b-2 border-slate-900 mx-0.5" />
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 opacity-80 -ml-0.5" />
            </div>
          </div>

          {/* Sparkle badge */}
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-black border-2 border-white shadow-xs">
            ✨
          </div>
        </button>
      </div>
    </div>
  );
};
