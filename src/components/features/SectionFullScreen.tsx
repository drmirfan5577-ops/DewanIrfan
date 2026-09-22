import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import type { PoetrySection } from '@/types';
import { POETRY_SECTIONS } from '@/constants/sections';

interface Props {
  section: PoetrySection;
  onClose: () => void;
}

const SectionFullScreen = ({ section, onClose }: Props) => {
  const [activePoemIndex, setActivePoemIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const activePoem = section.poems[activePoemIndex];

  const currentSectionIndex = POETRY_SECTIONS.findIndex(s => s.id === section.id);

  const navigate = (dir: 'prev' | 'next') => {
    setAnimKey(k => k + 1);
    if (dir === 'prev') {
      setActivePoemIndex(i => (i - 1 + section.poems.length) % section.poems.length);
    } else {
      setActivePoemIndex(i => (i + 1) % section.poems.length);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate('next');
      if (e.key === 'ArrowRight') navigate('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="fullscreen-overlay fixed inset-0 flex flex-col"
      style={{
        zIndex: 9999,
        background: `radial-gradient(ellipse at 20% 20%, rgba(5, 46, 22, 0.5), transparent),
                     radial-gradient(ellipse at 80% 80%, rgba(15, 23, 42, 0.8), transparent),
                     linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)`,
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0"
        style={{
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.8))',
          borderBottom: `1px solid rgba(251, 191, 36, 0.2)`,
        }}
      >
        {/* Right: section title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.icon}</span>
          <div>
            <h2
              className="font-bold text-sm sm:text-base leading-tight"
              style={{
                fontFamily: "'Noto Nastaliq Urdu', serif",
                background: section.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-xs" style={{ color: '#64748b' }}>{section.subtitle}</p>
            )}
          </div>
        </div>

        {/* Left: close */}
        <div className="flex items-center gap-2">
          <span className="text-xs hidden sm:block" style={{ color: '#475569' }}>
            {activePoemIndex + 1} / {section.poems.length}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(220, 38, 38, 0.15)',
              color: '#fca5a5',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
            aria-label="بند کریں"
          >
            <X size={14} />
            <span className="hidden sm:inline" style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: '12px' }}>بند کریں</span>
          </button>
        </div>
      </div>

      {/* Gradient accent strip */}
      <div className="h-0.5 flex-shrink-0" style={{ background: section.gradient }} />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-8 relative">
        {/* Background decorations */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${section.gradient.match(/#[a-f0-9]{6}/gi)?.[1] || '#fbbf24'}15, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        {/* Poem card */}
        <div
          key={animKey}
          className="animate-fade-scale relative max-w-2xl w-full rounded-2xl p-6 sm:p-10 border"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(5, 46, 22, 0.3))',
            borderColor: 'rgba(251, 191, 36, 0.25)',
            boxShadow: `0 0 60px rgba(251, 191, 36, 0.05), 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Poem type badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: section.gradient }} />
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#fcd34d',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                fontFamily: "'Noto Nastaliq Urdu', serif",
              }}
            >
              {activePoem.type}
            </span>
            <div className="h-px flex-1" style={{ background: section.gradient }} />
          </div>

          {/* Poem title */}
          {activePoem.title && (
            <h3
              className="text-xl sm:text-2xl font-bold text-center mb-8"
              style={{
                fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
                background: section.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.8,
              }}
            >
              {activePoem.title}
            </h3>
          )}

          {/* Verses */}
          <div
            className="text-center space-y-1"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
              direction: 'rtl',
            }}
          >
            {activePoem.verses.map((line, i) => (
              line === '' || line === '—' ? (
                <div key={i} className="flex justify-center py-2">
                  <div className="w-16 h-px" style={{ background: 'rgba(251, 191, 36, 0.3)' }} />
                </div>
              ) : (
                <p
                  key={i}
                  className="poetry-line"
                  style={{
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    color: i % 2 === 0 ? '#e2e8f0' : '#cbd5e1',
                    lineHeight: 2.4,
                  }}
                >
                  {line}
                </p>
              )
            ))}
          </div>

          {/* Attribution */}
          <div className="mt-8 text-center">
            <div className="h-px w-24 mx-auto mb-3" style={{ background: 'rgba(251, 191, 36, 0.3)' }} />
            <p className="text-sm" style={{ color: '#6ee7b7', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
              — ڈاکٹر عرفان غازی
            </p>
          </div>
        </div>

        {/* Navigation */}
        {section.poems.length > 1 && (
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => navigate('prev')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#fcd34d',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <ChevronRight size={16} />
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: '12px' }}>پچھلا</span>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {section.poems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAnimKey(k => k + 1); setActivePoemIndex(i); }}
                  className="rounded-full transition-all"
                  style={{
                    width: i === activePoemIndex ? '20px' : '8px',
                    height: '8px',
                    background: i === activePoemIndex ? '#fbbf24' : 'rgba(251, 191, 36, 0.3)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => navigate('next')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                color: '#fcd34d',
                border: '1px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: '12px' }}>اگلا</span>
              <ChevronLeft size={16} />
            </button>
          </div>
        )}

        {/* Back to all sections */}
        <button
          onClick={onClose}
          className="mt-6 flex items-center gap-2 text-sm transition-all hover:opacity-80"
          style={{ color: '#475569' }}
        >
          <Home size={14} />
          <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: '12px' }}>تمام سیکشنز</span>
        </button>
      </div>

      {/* Bottom gradient strip */}
      <div className="h-0.5 flex-shrink-0" style={{ background: section.gradient }} />

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-2 flex-shrink-0"
        style={{
          background: 'rgba(15, 23, 42, 0.9)',
          borderTop: '1px solid rgba(251, 191, 36, 0.1)',
        }}
      >
        <p className="text-xs" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>
          SMART WORLD ORDER™ | ESOneWorld™
        </p>
        <p className="text-xs" style={{ color: '#334155', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
          دیوانِ عرفان | ڈاکٹر عرفان غازی
        </p>
      </div>
    </div>
  );
};

export default SectionFullScreen;
