import { useState } from 'react';
import { POETRY_SECTIONS } from '@/constants/sections';
import type { PoetrySection } from '@/types';
import SectionFullScreen from './SectionFullScreen';

interface Props {
  searchQuery?: string;
}

const SectionGrid = ({ searchQuery = '' }: Props) => {
  const [activeSection, setActiveSection] = useState<PoetrySection | null>(null);

  const handleOpen = (section: PoetrySection) => {
    setActiveSection(section);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setActiveSection(null);
    document.body.style.overflow = '';
  };

  const filtered = searchQuery
    ? POETRY_SECTIONS.filter(s =>
        s.title.includes(searchQuery) ||
        s.subtitle?.includes(searchQuery) ||
        s.poems.some(p => p.title?.includes(searchQuery) || p.verses.some(v => v.includes(searchQuery)))
      )
    : POETRY_SECTIONS;

  return (
    <>
      <section
        className="transition-all duration-500"
        style={{
          opacity: activeSection ? 0 : 1,
          visibility: activeSection ? 'hidden' : 'visible',
          pointerEvents: activeSection ? 'none' : 'auto',
          maxHeight: activeSection ? '0' : undefined,
          overflow: activeSection ? 'hidden' : undefined,
        }}
      >
        <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
              دیوانِ عرفان
            </h2>
            <p className="text-sm" style={{ color: '#6ee7b7' }}>
              کسی بھی سیکشن پر کلک کریں — پوری سکرین پر پڑھیں
            </p>
            {searchQuery && (
              <p className="text-xs mt-1" style={{ color: '#fcd34d', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                "{searchQuery}" — {filtered.length} نتائج
              </p>
            )}
            <div className="flex justify-center mt-3">
              <div className="h-px w-48" style={{ background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((section, index) => (
              <button
                key={section.id}
                className="section-card group text-right rounded-2xl p-5 border flex flex-col gap-3 w-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
                  borderColor: 'rgba(251, 191, 36, 0.2)',
                  animationDelay: `${index * 0.05}s`,
                }}
                onClick={() => handleOpen(section)}
                aria-label={`سیکشن کھولیں: ${section.title}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: section.gradient }} />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg leading-snug" style={{ fontFamily: "'Noto Nastaliq Urdu', serif", background: section.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-xs mt-1" style={{ color: '#94a3b8', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fcd34d', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                    {section.poems.length} تخلیق
                  </div>
                  <span className="text-xs transition-transform group-hover:translate-x-1" style={{ color: '#6ee7b7' }}>← پڑھیں</span>
                </div>
                <div className="w-full h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: section.gradient }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeSection && <SectionFullScreen section={activeSection} onClose={handleClose} />}
    </>
  );
};

export default SectionGrid;
