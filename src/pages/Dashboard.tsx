import { useState } from 'react';
import Header from '@/components/layout/Header';
import AuthorMessage from '@/components/layout/AuthorMessage';
import SectionGrid from '@/components/features/SectionGrid';
import ThemeManager from '@/components/features/ThemeManager';
import SearchAndFilter from '@/components/features/SearchAndFilter';
import AudioStudio from '@/components/features/AudioStudio';
import SlidesStudio from '@/components/features/SlidesStudio';
import ImportExport from '@/components/features/ImportExport';
import Footer from '@/components/layout/Footer';
import { useThemeStore } from '@/stores/themeStore';

type Tab = 'portfolio' | 'search' | 'slides' | 'audio' | 'themes' | 'files';

const TABS: { id: Tab; icon: string; label: string; labelEn: string }[] = [
  { id: 'portfolio', icon: '📖', label: 'دیوان', labelEn: 'Poetry' },
  { id: 'search', icon: '🔍', label: 'تلاش', labelEn: 'Search' },
  { id: 'slides', icon: '🎬', label: 'سلائیڈز', labelEn: 'Slides' },
  { id: 'audio', icon: '🎙️', label: 'آڈیو', labelEn: 'Audio' },
  { id: 'themes', icon: '🎨', label: 'تھیمز', labelEn: 'Themes' },
  { id: 'files', icon: '📁', label: 'فائلز', labelEn: 'Files' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const { activeTheme, filters } = useThemeStore();

  const filterStyle = filters.enabled ? {
    backdropFilter: `blur(${filters.blurLevel}px)`,
    WebkitBackdropFilter: `blur(${filters.blurLevel}px)`,
    filter: `brightness(${0.7 + filters.glassIntensity / 333})`,
  } : {};

  const neonStyle = filters.enabled && filters.neonGlow > 0 ? {
    boxShadow: `inset 0 0 ${filters.neonGlow * 2}px ${filters.colorTint}20`,
  } : {};

  return (
    <div
      className="min-h-screen relative"
      style={{ background: activeTheme.bg, ...filterStyle, ...neonStyle, transition: 'background 0.6s ease' }}
    >
      {/* Tint overlay */}
      {filters.enabled && filters.tintOpacity > 0 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: filters.colorTint, opacity: filters.tintOpacity / 200, zIndex: 1 }}
        />
      )}

      <div className="relative z-10">
        <Header />

        {/* Tab Navigation */}
        <div
          className="sticky top-0 z-50 px-2 py-2 flex overflow-x-auto gap-1 justify-center"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${activeTheme.border}`,
            scrollbarWidth: 'none',
          }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all flex-shrink-0 hover:scale-105"
              style={{
                background: activeTab === tab.id ? `${activeTheme.accent}20` : 'transparent',
                color: activeTab === tab.id ? activeTheme.accent : '#64748b',
                border: activeTab === tab.id ? `1px solid ${activeTheme.accent}40` : '1px solid transparent',
                fontFamily: "'Noto Nastaliq Urdu',serif",
                fontSize: '0.75rem',
                minWidth: '60px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <main style={{ color: activeTheme.textPrimary }}>
          {activeTab === 'portfolio' && (
            <>
              <AuthorMessage />
              <SectionGrid />
            </>
          )}
          {activeTab === 'search' && <SearchAndFilter />}
          {activeTab === 'slides' && <SlidesStudio />}
          {activeTab === 'audio' && <AudioStudio />}
          {activeTab === 'themes' && <ThemeManager />}
          {activeTab === 'files' && <ImportExport />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
