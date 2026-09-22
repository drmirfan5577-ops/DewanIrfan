import { useState, useRef, useEffect } from 'react';
import { POETRY_SECTIONS } from '@/constants/sections';
import type { Poem } from '@/types';

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  sectionIcon: string;
  poem: Poem;
}

const FILTER_TYPES = ['تمام', 'غزل', 'نظم', 'قطعہ', 'رباعی', 'دعائیہ', 'ندائیہ', 'مجاہدانہ', 'قومی', 'فکریہ', 'رومانٹک', 'تلخ', 'اقبالیاتی'];

const SearchAndFilter = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('تمام');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim() && activeType === 'تمام') { setResults([]); return; }
    const q = query.toLowerCase().trim();
    const res: SearchResult[] = [];
    POETRY_SECTIONS.forEach(section => {
      section.poems.forEach(poem => {
        const matchType = activeType === 'تمام' || poem.type === activeType;
        const matchQuery = !q || poem.title?.toLowerCase().includes(q) || poem.verses.some(v => v.toLowerCase().includes(q)) || poem.type.toLowerCase().includes(q) || section.title.includes(q);
        if (matchType && matchQuery) {
          res.push({ sectionId: section.id, sectionTitle: section.title, sectionIcon: section.icon, poem });
        }
      });
    });
    setResults(res);
  }, [query, activeType]);

  const highlight = (text: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((p, i) => p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: 'rgba(251,191,36,0.35)', color: '#fbbf24', borderRadius: '2px' }}>{p}</mark>
      : p
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
            تلاش و فلٹر
          </h2>
          <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>Search & Filter — All Poems & Sections</p>
        </div>

        {/* Search Box */}
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(251,191,36,0.25)' }}
          onClick={() => inputRef.current?.focus()}
        >
          <span style={{ color: '#64748b', fontSize: '20px' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="تلاش کریں... شعر، سیکشن، نوع..."
            className="flex-1 bg-transparent outline-none"
            style={{
              color: '#e2e8f0',
              fontFamily: "'Noto Nastaliq Urdu',serif",
              fontSize: '1rem',
              direction: 'rtl',
              textAlign: 'right',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: '#64748b', fontSize: '18px' }}>✕</button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6 justify-end">
          {FILTER_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{
                background: activeType === t ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                color: activeType === t ? '#fbbf24' : '#64748b',
                border: activeType === t ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'Noto Nastaliq Urdu',serif",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stats */}
        {(query || activeType !== 'تمام') && (
          <p className="text-xs mb-4 text-right" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>
            {results.length} نتائج ملے | {results.length} results found
          </p>
        )}

        {/* Empty State */}
        {!query && activeType === 'تمام' && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p style={{ color: '#334155', fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '1.1rem' }}>
              اوپر تلاش کریں یا نوع منتخب کریں
            </p>
            <p style={{ color: '#1e293b', fontSize: '0.85rem', fontFamily: 'Inter,sans-serif', marginTop: '4px' }}>
              Search above or select a poem type
            </p>
          </div>
        )}

        {/* No results */}
        {(query || activeType !== 'تمام') && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">😔</div>
            <p style={{ color: '#475569', fontFamily: "'Noto Nastaliq Urdu',serif" }}>کوئی نتیجہ نہیں ملا</p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3">
          {results.map(r => (
            <div
              key={`${r.sectionId}-${r.poem.id}`}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: expanded === r.poem.id ? 'rgba(251,191,36,0.35)' : 'rgba(255,255,255,0.07)',
              }}
            >
              {/* Result header */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-right"
                onClick={() => setExpanded(expanded === r.poem.id ? null : r.poem.id)}
              >
                <span style={{ fontSize: '20px' }}>{r.sectionIcon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.1)', color: '#fcd34d', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                      {r.poem.type}
                    </span>
                    <p className="font-semibold text-sm" style={{ color: '#e2e8f0', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                      {r.poem.title ? highlight(r.poem.title) : r.poem.type}
                    </p>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#475569', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                    {r.sectionTitle}
                  </p>
                </div>
                <span style={{ color: '#334155', transform: expanded === r.poem.id ? 'rotate(180deg)' : '', transition: '0.2s' }}>▼</span>
              </button>

              {/* Expanded verses */}
              {expanded === r.poem.id && (
                <div
                  className="px-5 pb-5 pt-2 border-t text-right"
                  style={{ borderColor: 'rgba(251,191,36,0.1)', direction: 'rtl' }}
                >
                  {r.poem.verses.map((v, i) => (
                    v === '' || v === '—' ? (
                      <div key={i} className="py-1 flex justify-center">
                        <div className="w-12 h-px" style={{ background: 'rgba(251,191,36,0.2)' }} />
                      </div>
                    ) : (
                      <p key={i} style={{ color: '#cbd5e1', fontFamily: "'Noto Nastaliq Urdu',serif", lineHeight: 2.2, fontSize: '0.95rem' }}>
                        {highlight(v)}
                      </p>
                    )
                  ))}
                  <p className="text-xs mt-3" style={{ color: '#4ade80', fontFamily: "'Noto Nastaliq Urdu',serif" }}>— ڈاکٹر عرفان غازی</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
