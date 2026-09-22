import { useState, useRef, useEffect } from 'react';
import { POETRY_SECTIONS } from '@/constants/sections';

interface Slide {
  id: string;
  title: string;
  content: string[];
  bg: string;
  textColor: string;
  accent: string;
  template: string;
  category: string;
}

const SLIDE_TRANSITIONS = ['fade', 'slide-left', 'slide-up', 'zoom', 'flip', 'blur'];

const TEMPLATES: Slide[] = [
  // Islamic
  { id: 'isl-1', title: 'بسم اللہ', content: ['بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ', 'شروع اللہ کے نام سے'], bg: 'linear-gradient(135deg,#022c22,#064e3b)', textColor: '#6ee7b7', accent: '#34d399', template: 'bismillah', category: 'Islamic' },
  { id: 'isl-2', title: 'اللہ اکبر', content: ['اللّٰهُ أَكْبَرُ', 'اللہ سب سے بڑا ہے'], bg: 'linear-gradient(135deg,#0c0a00,#451a03)', textColor: '#fde68a', accent: '#f59e0b', template: 'takbeer', category: 'Islamic' },
  { id: 'isl-3', title: 'درود شریف', content: ['اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', 'وَعَلَى آلِ مُحَمَّدٍ'], bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', textColor: '#c4b5fd', accent: '#8b5cf6', template: 'durood', category: 'Islamic' },
  { id: 'isl-4', title: 'آیت الکرسی', content: ['اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ', 'الْحَيُّ الْقَيُّومُ'], bg: 'linear-gradient(135deg,#030712,#1e3a8a)', textColor: '#93c5fd', accent: '#3b82f6', template: 'ayat', category: 'Quranic' },
  // Social
  { id: 'soc-1', title: 'Like & Share', content: ['پسند آئے تو لائیک کریں', '👍 شیئر کریں 🔔 سبسکرائب کریں'], bg: 'linear-gradient(135deg,#4f46e5,#7c3aed)', textColor: '#e0e7ff', accent: '#a78bfa', template: 'social', category: 'Social' },
  { id: 'soc-2', title: 'Pakistan Zindabad', content: ['پاکستان زندہ باد', '🇵🇰 اللہ کا پاکستان 🇵🇰'], bg: 'linear-gradient(135deg,#052e16,#14532d)', textColor: '#86efac', accent: '#22c55e', template: 'pakistan', category: 'Social' },
  { id: 'soc-3', title: 'Follow Us', content: ['ہمیں فالو کریں', 'SMART WORLD ORDER™'], bg: 'linear-gradient(135deg,#0c4a6e,#0369a1)', textColor: '#bae6fd', accent: '#38bdf8', template: 'follow', category: 'Social' },
  // Modern
  { id: 'mod-1', title: 'Welcome', content: ['خوش آمدید', 'Welcome to Diwan-e-Irfan'], bg: 'linear-gradient(135deg,#0f172a,#1e293b)', textColor: '#f8fafc', accent: '#fbbf24', template: 'welcome', category: 'Modern' },
  { id: 'mod-2', title: 'Thank You', content: ['جزاکم اللہ خیرا', 'شکریہ | Thank You'], bg: 'linear-gradient(135deg,#1c0505,#450a0a)', textColor: '#fca5a5', accent: '#ef4444', template: 'thanks', category: 'Modern' },
  // Poetry
  ...POETRY_SECTIONS.slice(0, 4).map(s => ({
    id: `poet-${s.id}`,
    title: s.title,
    content: s.poems[0]?.verses.slice(0, 2) || [],
    bg: s.gradient,
    textColor: '#e2e8f0',
    accent: '#fbbf24',
    template: 'poetry',
    category: 'Poetry',
  })),
];

const CATEGORIES = ['All', 'Islamic', 'Quranic', 'Social', 'Modern', 'Poetry'];

const SlidesStudio = () => {
  const [category, setCategory] = useState('All');
  const [activeSlide, setActiveSlide] = useState<Slide | null>(null);
  const [transition, setTransition] = useState('fade');
  const [playing, setPlaying] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [animClass, setAnimClass] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filtered = category === 'All' ? TEMPLATES : TEMPLATES.filter(s => s.category === category);

  const goTo = (idx: number) => {
    setAnimClass('');
    setTimeout(() => {
      setSlideIndex(idx);
      setActiveSlide(filtered[idx]);
      setAnimClass(`anim-${transition}`);
    }, 150);
  };

  const startShow = (slide: Slide) => {
    const idx = filtered.findIndex(s => s.id === slide.id);
    setSlideIndex(idx >= 0 ? idx : 0);
    setActiveSlide(slide);
    setAnimClass(`anim-${transition}`);
    setPlaying(false);
  };

  useEffect(() => {
    if (playing && activeSlide) {
      timerRef.current = setInterval(() => {
        setSlideIndex(i => {
          const next = (i + 1) % filtered.length;
          setActiveSlide(filtered[next]);
          setAnimClass('');
          setTimeout(() => setAnimClass(`anim-${transition}`), 100);
          return next;
        });
      }, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, filtered, transition]);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
            سلائیڈز اسٹوڈیو
          </h2>
          <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>Readymade Slides with Animated Transitions</p>
        </div>

        {/* Slide Preview */}
        {activeSlide && (
          <div className="mb-6">
            <div
              className={`rounded-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden ${animClass}`}
              style={{ background: activeSlide.bg, minHeight: '220px', border: `1px solid ${activeSlide.accent}40` }}
            >
              {/* Animated bg orb */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${activeSlide.accent}18, transparent 70%)` }} />
              <div className="relative z-10">
                {activeSlide.content.map((line, i) => (
                  <p key={i} className={i === 0 ? 'text-2xl font-bold mb-3' : 'text-base'} style={{
                    color: i === 0 ? activeSlide.accent : activeSlide.textColor,
                    fontFamily: "'Noto Nastaliq Urdu','Amiri',serif",
                    lineHeight: 1.8,
                    textShadow: `0 0 20px ${activeSlide.accent}60`,
                  }}>
                    {line}
                  </p>
                ))}
              </div>
              <div className="absolute bottom-2 right-3 text-xs opacity-40" style={{ color: activeSlide.textColor, fontFamily: 'Inter,sans-serif' }}>
                {slideIndex + 1}/{filtered.length}
              </div>
            </div>

            {/* Player controls */}
            <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
              <button onClick={() => goTo((slideIndex - 1 + filtered.length) % filtered.length)} className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>◀ پچھلا</button>
              <button onClick={() => setPlaying(p => !p)} className="px-5 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105" style={{ background: playing ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.15)', color: playing ? '#fca5a5' : '#fbbf24', border: `1px solid ${playing ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}` }}>
                {playing ? '⏸ رکیں' : '▶ آٹو پلے'}
              </button>
              <button onClick={() => goTo((slideIndex + 1) % filtered.length)} className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>اگلا ▶</button>
            </div>

            {/* Transition selector */}
            <div className="flex items-center gap-2 justify-center mt-3 flex-wrap">
              <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter,sans-serif' }}>Transition:</span>
              {SLIDE_TRANSITIONS.map(t => (
                <button key={t} onClick={() => setTransition(t)} className="px-2 py-1 rounded text-xs transition-all" style={{ background: transition === t ? 'rgba(251,191,36,0.15)' : 'transparent', color: transition === t ? '#fbbf24' : '#475569', border: transition === t ? '1px solid rgba(251,191,36,0.3)' : '1px solid transparent' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap justify-end mb-4">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className="px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105" style={{ background: category === c ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.04)', color: category === c ? '#fbbf24' : '#64748b', border: category === c ? '1px solid rgba(251,191,36,0.35)' : '1px solid rgba(255,255,255,0.07)' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Slides grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => startShow(slide)}
              className="rounded-xl overflow-hidden transition-all hover:scale-105 text-center"
              style={{
                background: slide.bg,
                height: '120px',
                border: activeSlide?.id === slide.id ? `2px solid ${slide.accent}` : '2px solid transparent',
                boxShadow: activeSlide?.id === slide.id ? `0 0 15px ${slide.accent}40` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                position: 'relative',
              }}
            >
              <p className="font-bold text-sm" style={{ color: slide.accent, fontFamily: "'Noto Nastaliq Urdu',serif", lineHeight: 1.6, textShadow: `0 0 10px ${slide.accent}60` }}>
                {slide.title}
              </p>
              <p className="text-xs mt-1 opacity-70" style={{ color: slide.textColor, fontFamily: 'Inter,sans-serif' }}>{slide.category}</p>
              <div className="absolute bottom-1 right-2 text-xs opacity-40" style={{ color: slide.textColor }}>#{i + 1}</div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .anim-fade { animation: fadeIn 0.4s ease; }
        .anim-slide-left { animation: slideFromRight 0.4s ease; }
        .anim-slide-up { animation: slideFromBottom 0.4s ease; }
        .anim-zoom { animation: zoomIn 0.35s ease; }
        .anim-flip { animation: flipIn 0.45s ease; }
        .anim-blur { animation: blurIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideFromRight { from { transform: translateX(60px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
        @keyframes slideFromBottom { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes zoomIn { from { transform: scale(0.8); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes flipIn { from { transform: perspective(400px) rotateY(90deg); opacity: 0 } to { transform: perspective(400px) rotateY(0); opacity: 1 } }
        @keyframes blurIn { from { filter: blur(12px); opacity: 0 } to { filter: blur(0); opacity: 1 } }
      `}</style>
    </div>
  );
};

export default SlidesStudio;
