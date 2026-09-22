import { useRef } from 'react';
import { POETRY_SECTIONS } from '@/constants/sections';
import type { PoetrySection } from '@/types';
import { toast } from 'sonner';

const SUPPORTED_FORMATS = ['.json', '.txt'];

const ImportExport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJSON = () => {
    const data = JSON.stringify(POETRY_SECTIONS, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diwan-irfan-poems.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON فائل ڈاؤنلوڈ ہو گئی');
  };

  const exportText = () => {
    const lines: string[] = ['دیوانِ عرفان — ڈاکٹر عرفان غازی', '='.repeat(50), ''];
    POETRY_SECTIONS.forEach(section => {
      lines.push(`\n【 ${section.title} 】`);
      lines.push('—'.repeat(30));
      section.poems.forEach(poem => {
        if (poem.title) lines.push(`\n${poem.title} (${poem.type})`);
        poem.verses.forEach(v => lines.push(v || ''));
        lines.push('\n— ڈاکٹر عرفان غازی\n');
      });
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diwan-irfan-poems.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Text فائل ڈاؤنلوڈ ہو گئی');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.slice(file.name.lastIndexOf('.'));
    if (!SUPPORTED_FORMATS.includes(ext)) {
      toast.error('صرف .json اور .txt فائلیں سپورٹ ہیں');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (ext === '.json') {
          const parsed = JSON.parse(reader.result as string);
          if (Array.isArray(parsed)) {
            toast.success(`${parsed.length} سیکشنز امپورٹ ہوئے (پریویو موڈ)`);
          } else toast.error('فائل کا فارمیٹ درست نہیں');
        } else {
          toast.success(`Text فائل لوڈ ہوئی: ${file.name}`);
        }
      } catch {
        toast.error('فائل پڑھنے میں خرابی آئی');
      }
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  const copyToClipboard = async () => {
    const data = JSON.stringify(POETRY_SECTIONS, null, 2);
    await navigator.clipboard.writeText(data);
    toast.success('کلپ بورڈ میں کاپی ہو گیا');
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
            امپورٹ / ایکسپورٹ
          </h2>
          <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>Import / Export — Poems & Sections</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl p-4 text-center border" style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.15)' }}>
            <div className="text-3xl font-bold" style={{ color: '#fbbf24' }}>{POETRY_SECTIONS.length}</div>
            <div className="text-xs mt-1" style={{ color: '#94a3b8', fontFamily: "'Noto Nastaliq Urdu',serif" }}>کل سیکشنز</div>
          </div>
          <div className="rounded-2xl p-4 text-center border" style={{ background: 'rgba(52,211,153,0.06)', borderColor: 'rgba(52,211,153,0.15)' }}>
            <div className="text-3xl font-bold" style={{ color: '#34d399' }}>{POETRY_SECTIONS.reduce((a, s) => a + s.poems.length, 0)}</div>
            <div className="text-xs mt-1" style={{ color: '#94a3b8', fontFamily: "'Noto Nastaliq Urdu',serif" }}>کل تخلیقات</div>
          </div>
        </div>

        {/* Export */}
        <div className="rounded-2xl p-5 border mb-4" style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.15)' }}>
          <h3 className="font-bold mb-4 text-right" style={{ color: '#4ade80', fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '1rem' }}>
            📤 ایکسپورٹ کریں
          </h3>
          <div className="space-y-2">
            <button onClick={exportJSON} className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-[1.01]" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
              <span className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>تمام شعر — JSON</span>
              <span style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '0.9rem' }}>⬇️ JSON ڈاؤنلوڈ</span>
            </button>
            <button onClick={exportText} className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-[1.01]" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
              <span className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>تمام شعر — Text</span>
              <span style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '0.9rem' }}>⬇️ Text ڈاؤنلوڈ</span>
            </button>
            <button onClick={copyToClipboard} className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-[1.01]" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}>
              <span className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>Clipboard میں کاپی</span>
              <span style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '0.9rem' }}>📋 کاپی کریں</span>
            </button>
          </div>
        </div>

        {/* Import */}
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.15)' }}>
          <h3 className="font-bold mb-4 text-right" style={{ color: '#93c5fd', fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '1rem' }}>
            📥 امپورٹ کریں
          </h3>
          <input ref={fileInputRef} type="file" accept=".json,.txt" onChange={handleImport} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all hover:scale-[1.01]"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px dashed rgba(59,130,246,0.35)', color: '#93c5fd' }}
          >
            <span className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>JSON یا TXT فائل منتخب کریں</span>
            <span style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '0.9rem' }}>📁 فائل منتخب کریں</span>
          </button>
          <div className="mt-3 flex flex-wrap gap-2 justify-end">
            {SUPPORTED_FORMATS.map(f => (
              <span key={f} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', fontFamily: 'Inter,sans-serif' }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Supported formats info */}
        <div className="mt-4 rounded-xl p-4 border" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
          <h4 className="text-sm font-medium mb-2 text-right" style={{ color: '#64748b', fontFamily: "'Noto Nastaliq Urdu',serif" }}>سپورٹ کردہ فارمیٹس:</h4>
          <div className="space-y-1">
            {[
              { fmt: 'JSON', desc: 'Complete sections structure with poems and metadata' },
              { fmt: 'TXT', desc: 'Plain text with section headers and verses' },
            ].map(f => (
              <div key={f.fmt} className="flex gap-2 items-start">
                <span className="text-xs px-1.5 py-0.5 rounded font-mono mt-0.5" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', flexShrink: 0 }}>{f.fmt}</span>
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter,sans-serif' }}>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
