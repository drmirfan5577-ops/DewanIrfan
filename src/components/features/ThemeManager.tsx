import { useState } from 'react';
import { useThemeStore, THEMES, COLOR_TINTS } from '@/stores/themeStore';
import type { ThemeConfig } from '@/stores/themeStore';

const ThemeManager = () => {
  const { activeTheme, filters, setTheme, setFilters, resetFilters } = useThemeStore();
  const [tab, setTab] = useState<'themes' | 'filters'>('themes');
  const [openCategory, setOpenCategory] = useState<string | null>('dark');

  const darkThemes = THEMES.filter(t => t.type === 'dark-gradient');
  const lightThemes = THEMES.filter(t => t.type === 'light-gradient');
  const textureThemes = THEMES.filter(t => t.type === 'texture');

  const categories = [
    { key: 'dark', label: 'Dark Gradient', themes: darkThemes },
    { key: 'light', label: 'Light Gradient', themes: lightThemes },
    { key: 'texture', label: 'Texture / Mosaic', themes: textureThemes },
  ];

  const SliderRow = ({ label, value, onChange, max = 100 }: { label: string; value: number; onChange: (v: number) => void; max?: number }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm" style={{ color: '#94a3b8', fontFamily: 'Inter,sans-serif' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: '#fbbf24' }}>{value}</span>
      </div>
      <input
        type="range" min={0} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: filters.colorTint }}
      />
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ fontFamily: 'Inter,sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
          تھیم اسٹوڈیو
        </h2>
        <p className="text-sm" style={{ color: '#64748b' }}>Background Manager & Visual Filters</p>
      </div>

      {/* Tab switcher */}
      <div
        className="flex rounded-xl p-1 mb-6 max-w-sm mx-auto"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {(['themes', 'filters'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: tab === t ? 'rgba(251,191,36,0.15)' : 'transparent',
              color: tab === t ? '#fbbf24' : '#64748b',
              border: tab === t ? '1px solid rgba(251,191,36,0.3)' : '1px solid transparent',
            }}
          >
            {t === 'themes' ? '🎨 Themes' : '⚙️ Visual Filters'}
          </button>
        ))}
      </div>

      {/* Themes Tab */}
      {tab === 'themes' && (
        <div className="max-w-2xl mx-auto space-y-4">
          {categories.map(cat => (
            <div key={cat.key} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                className="w-full flex items-center justify-between px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <span className="font-semibold text-sm" style={{ color: '#e2e8f0', fontFamily: 'Inter,sans-serif' }}>{cat.label}</span>
                <span style={{ color: '#64748b', transform: openCategory === cat.key ? 'rotate(180deg)' : '', transition: '0.2s' }}>▼</span>
              </button>
              {openCategory === cat.key && (
                <div className="p-3 grid grid-cols-3 gap-3">
                  {cat.themes.map((theme: ThemeConfig) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme)}
                      className="relative rounded-xl overflow-hidden transition-all hover:scale-105"
                      style={{
                        height: '80px',
                        background: theme.thumbnail,
                        border: activeTheme.id === theme.id ? '2px solid #fbbf24' : '2px solid transparent',
                        boxShadow: activeTheme.id === theme.id ? '0 0 12px rgba(251,191,36,0.4)' : 'none',
                      }}
                    >
                      {activeTheme.id === theme.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                            <span style={{ color: '#fbbf24', fontSize: '12px' }}>✓</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <span className="text-xs font-medium px-1" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '10px' }}>
                          {theme.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Active Theme Preview */}
          <div className="rounded-2xl p-4 border" style={{ background: activeTheme.bg, borderColor: activeTheme.border }}>
            <p className="text-center text-sm font-medium" style={{ color: activeTheme.textPrimary, fontFamily: "'Noto Nastaliq Urdu',serif" }}>
              ✦ موجودہ تھیم: {activeTheme.name} ✦
            </p>
            <p className="text-center text-xs mt-1" style={{ color: activeTheme.textSecondary }}>
              {activeTheme.id}
            </p>
          </div>
        </div>
      )}

      {/* Filters Tab */}
      {tab === 'filters' && (
        <div className="max-w-md mx-auto rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-5">
            <span className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>⚙️ Enable Filters</span>
            <button
              onClick={() => setFilters({ enabled: !filters.enabled })}
              className="w-12 h-6 rounded-full transition-all relative"
              style={{ background: filters.enabled ? '#3b82f6' : 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full transition-all"
                style={{ background: 'white', left: filters.enabled ? '26px' : '4px' }}
              />
            </button>
          </div>

          <div style={{ opacity: filters.enabled ? 1 : 0.4, pointerEvents: filters.enabled ? 'auto' : 'none' }}>
            <SliderRow label="Glass Intensity" value={filters.glassIntensity} onChange={v => setFilters({ glassIntensity: v })} />
            <SliderRow label="Blur Level" value={filters.blurLevel} onChange={v => setFilters({ blurLevel: v })} />
            <SliderRow label="Tint Opacity" value={filters.tintOpacity} onChange={v => setFilters({ tintOpacity: v })} />
            <SliderRow label="Neon Glow" value={filters.neonGlow} onChange={v => setFilters({ neonGlow: v })} />

            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>Color Tint</p>
              <div className="flex gap-2 flex-wrap">
                {COLOR_TINTS.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilters({ colorTint: c })}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110"
                    style={{
                      background: c,
                      border: filters.colorTint === c ? '3px solid white' : '2px solid transparent',
                      boxShadow: filters.colorTint === c ? `0 0 10px ${c}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              Reset All Filters
            </button>
          </div>

          {/* Live Preview */}
          {filters.enabled && (
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                background: activeTheme.bg,
                backdropFilter: `blur(${filters.blurLevel}px)`,
                WebkitBackdropFilter: `blur(${filters.blurLevel}px)`,
                filter: `brightness(${0.7 + filters.glassIntensity / 333})`,
                boxShadow: `0 0 ${filters.neonGlow}px ${filters.colorTint}40`,
              }}
            >
              <p style={{ color: activeTheme.textPrimary, fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '14px' }}>
                ← لائیو پریویو →
              </p>
              <div
                className="mt-2 rounded-lg px-3 py-2 text-xs"
                style={{
                  background: `${filters.colorTint}${Math.floor(filters.tintOpacity * 2.55).toString(16).padStart(2,'0')}`,
                  color: activeTheme.textSecondary,
                }}
              >
                نمونہ متن | Sample Text
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeManager;
