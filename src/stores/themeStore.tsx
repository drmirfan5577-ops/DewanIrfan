import { createContext, useContext, useState, type ReactNode } from 'react';

export interface VisualFilters {
  glassIntensity: number;
  blurLevel: number;
  tintOpacity: number;
  neonGlow: number;
  colorTint: string;
  enabled: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  bg: string;
  bgSecondary?: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
  type: 'dark-gradient' | 'light-gradient' | 'color' | 'landscape' | 'texture';
  thumbnail: string;
}

export const THEMES: ThemeConfig[] = [
  { id: 'islamic-dark', name: 'اسلامی سیاہ', bg: 'linear-gradient(135deg,#020617,#0f172a,#020617)', bgSecondary: '#0f172a', textPrimary: '#fbbf24', textSecondary: '#94a3b8', accent: '#fbbf24', border: 'rgba(251,191,36,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#020617,#1e3a5f)' },
  { id: 'emerald-night', name: 'زمرد رات', bg: 'linear-gradient(135deg,#022c22,#064e3b,#022c22)', bgSecondary: '#064e3b', textPrimary: '#6ee7b7', textSecondary: '#94a3b8', accent: '#34d399', border: 'rgba(52,211,153,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#022c22,#065f46)' },
  { id: 'royal-purple', name: 'شاہی بنفشی', bg: 'linear-gradient(135deg,#1e1b4b,#312e81,#1e1b4b)', bgSecondary: '#312e81', textPrimary: '#c4b5fd', textSecondary: '#a5b4fc', accent: '#8b5cf6', border: 'rgba(139,92,246,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#1e1b4b,#4c1d95)' },
  { id: 'deep-crimson', name: 'گہرا سرخ', bg: 'linear-gradient(135deg,#1c0505,#450a0a,#1c0505)', bgSecondary: '#450a0a', textPrimary: '#fca5a5', textSecondary: '#94a3b8', accent: '#ef4444', border: 'rgba(239,68,68,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#1c0505,#7f1d1d)' },
  { id: 'midnight-blue', name: 'نیلی رات', bg: 'linear-gradient(135deg,#030712,#1e3a8a,#030712)', bgSecondary: '#1e3a8a', textPrimary: '#93c5fd', textSecondary: '#94a3b8', accent: '#3b82f6', border: 'rgba(59,130,246,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#030712,#1e40af)' },
  { id: 'dark-teal', name: 'سیاہ فیروزی', bg: 'linear-gradient(135deg,#042f2e,#134e4a,#042f2e)', bgSecondary: '#134e4a', textPrimary: '#5eead4', textSecondary: '#94a3b8', accent: '#14b8a6', border: 'rgba(20,184,166,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#042f2e,#0f766e)' },
  { id: 'golden-black', name: 'سنہری سیاہ', bg: 'linear-gradient(135deg,#0c0a00,#451a03,#0c0a00)', bgSecondary: '#451a03', textPrimary: '#fde68a', textSecondary: '#d97706', accent: '#f59e0b', border: 'rgba(245,158,11,0.25)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#0c0a00,#78350f)' },
  { id: 'galaxy', name: 'کہکشاں', bg: 'linear-gradient(135deg,#0a0014,#1a0533,#0d0020)', bgSecondary: '#1a0533', textPrimary: '#e879f9', textSecondary: '#a78bfa', accent: '#d946ef', border: 'rgba(217,70,239,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#0a0014,#4a044e)' },
  { id: 'forest-dark', name: 'جنگل', bg: 'linear-gradient(135deg,#052e16,#14532d,#052e16)', bgSecondary: '#14532d', textPrimary: '#86efac', textSecondary: '#4ade80', accent: '#22c55e', border: 'rgba(34,197,94,0.2)', type: 'dark-gradient', thumbnail: 'linear-gradient(135deg,#052e16,#166534)' },
  { id: 'rose-pearl', name: 'گلابی موتی', bg: 'linear-gradient(135deg,#fff1f2,#fce7f3,#ede9fe)', bgSecondary: '#fce7f3', textPrimary: '#9f1239', textSecondary: '#6b21a8', accent: '#e11d48', border: 'rgba(159,18,57,0.15)', type: 'light-gradient', thumbnail: 'linear-gradient(135deg,#fce7f3,#ede9fe)' },
  { id: 'sky-cream', name: 'آسمانی کریم', bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe,#f0fdf4)', bgSecondary: '#e0f2fe', textPrimary: '#0c4a6e', textSecondary: '#14532d', accent: '#0284c7', border: 'rgba(12,74,110,0.15)', type: 'light-gradient', thumbnail: 'linear-gradient(135deg,#e0f2fe,#dcfce7)' },
  { id: 'ivory-gold', name: 'ہاتھی دانت سونا', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7,#fff7ed)', bgSecondary: '#fef3c7', textPrimary: '#78350f', textSecondary: '#92400e', accent: '#d97706', border: 'rgba(120,53,15,0.15)', type: 'light-gradient', thumbnail: 'linear-gradient(135deg,#fef3c7,#fff7ed)' },
  { id: 'mint-white', name: 'پودینہ سفید', bg: 'linear-gradient(135deg,#f0fdf4,#ecfdf5,#f0fdfa)', bgSecondary: '#ecfdf5', textPrimary: '#14532d', textSecondary: '#134e4a', accent: '#059669', border: 'rgba(5,150,105,0.15)', type: 'light-gradient', thumbnail: 'linear-gradient(135deg,#ecfdf5,#ccfbf1)' },
  { id: 'mosaic-green', name: 'سبز موزیک', bg: 'repeating-linear-gradient(45deg,#064e3b 0,#064e3b 2px,#022c22 0,#022c22 50%)', bgSecondary: '#022c22', textPrimary: '#6ee7b7', textSecondary: '#34d399', accent: '#10b981', border: 'rgba(16,185,129,0.2)', type: 'texture', thumbnail: 'repeating-linear-gradient(45deg,#064e3b,#064e3b 4px,#022c22 4px,#022c22 8px)' },
  { id: 'mosaic-red', name: 'سرخ موزیک', bg: 'repeating-linear-gradient(45deg,#450a0a 0,#450a0a 2px,#1c0505 0,#1c0505 50%)', bgSecondary: '#1c0505', textPrimary: '#fca5a5', textSecondary: '#f87171', accent: '#ef4444', border: 'rgba(239,68,68,0.2)', type: 'texture', thumbnail: 'repeating-linear-gradient(45deg,#450a0a,#450a0a 4px,#1c0505 4px,#1c0505 8px)' },
  { id: 'hex-purple', name: 'ہیکساگون بنفشی', bg: 'radial-gradient(ellipse at 50% 50%,#312e81,#1e1b4b)', bgSecondary: '#312e81', textPrimary: '#c4b5fd', textSecondary: '#a5b4fc', accent: '#7c3aed', border: 'rgba(124,58,237,0.2)', type: 'texture', thumbnail: 'radial-gradient(ellipse,#4c1d95,#1e1b4b)' },
  { id: 'hex-amber', name: 'ہیکساگون سنہری', bg: 'radial-gradient(ellipse at 50% 50%,#451a03,#1c0f00)', bgSecondary: '#451a03', textPrimary: '#fde68a', textSecondary: '#fbbf24', accent: '#f59e0b', border: 'rgba(245,158,11,0.2)', type: 'texture', thumbnail: 'radial-gradient(ellipse,#92400e,#451a03)' },
];

export const COLOR_TINTS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#ef4444', '#06b6d4', '#f97316'];

const defaultFilters: VisualFilters = {
  glassIntensity: 50,
  blurLevel: 0,
  tintOpacity: 0,
  neonGlow: 40,
  colorTint: '#3b82f6',
  enabled: false,
};

interface ThemeContextType {
  activeTheme: ThemeConfig;
  filters: VisualFilters;
  setTheme: (theme: ThemeConfig) => void;
  setFilters: (filters: Partial<VisualFilters>) => void;
  resetFilters: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: THEMES[0],
  filters: defaultFilters,
  setTheme: () => {},
  setFilters: () => {},
  resetFilters: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeTheme, setActiveThemeState] = useState<ThemeConfig>(THEMES[0]);
  const [filters, setFiltersState] = useState<VisualFilters>(defaultFilters);

  const setTheme = (theme: ThemeConfig) => setActiveThemeState(theme);
  const setFilters = (f: Partial<VisualFilters>) => setFiltersState(prev => ({ ...prev, ...f }));
  const resetFilters = () => setFiltersState(defaultFilters);

  return (
    <ThemeContext.Provider value={{ activeTheme, filters, setTheme, setFilters, resetFilters }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeStore = () => useContext(ThemeContext);
