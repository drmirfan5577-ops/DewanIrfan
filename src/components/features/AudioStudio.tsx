import { useState, useRef, useEffect } from 'react';
import { POETRY_SECTIONS } from '@/constants/sections';
import type { Poem, PoetrySection } from '@/types';

interface AudioState {
  speaking: boolean;
  paused: boolean;
  utterance: SpeechSynthesisUtterance | null;
}

const AudioStudio = () => {
  const [selectedSection, setSelectedSection] = useState<PoetrySection | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [audio, setAudio] = useState<AudioState>({ speaking: false, paused: false, utterance: null });
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string>('');
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const stop = () => {
    window.speechSynthesis.cancel();
    setAudio({ speaking: false, paused: false, utterance: null });
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const speak = (poem: Poem) => {
    stop();
    const text = [poem.title, ...poem.verses.filter(v => v && v !== '—')].join('۔ ');
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ur-PK';
    utt.rate = 0.85;
    utt.pitch = 1.1;
    utt.volume = 1;

    // Try to find Urdu voice
    const voices = window.speechSynthesis.getVoices();
    const urduVoice = voices.find(v => v.lang.includes('ur') || v.name.toLowerCase().includes('urdu'));
    if (urduVoice) utt.voice = urduVoice;

    utt.onend = () => { setAudio({ speaking: false, paused: false, utterance: null }); setProgress(100); };
    utt.onstart = () => {
      let p = 0;
      progressRef.current = setInterval(() => {
        p += 1;
        if (p >= 98) { if (progressRef.current) clearInterval(progressRef.current); return; }
        setProgress(p);
      }, (utt.text.length * 80) / 100);
    };

    setAudio({ speaking: true, paused: false, utterance: utt });
    window.speechSynthesis.speak(utt);
  };

  const pauseResume = () => {
    if (audio.paused) {
      window.speechSynthesis.resume();
      setAudio(a => ({ ...a, paused: false }));
    } else {
      window.speechSynthesis.pause();
      setAudio(a => ({ ...a, paused: true }));
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = e => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        setRecordedUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
    } catch (e) {
      alert('مائیکروفون تک رسائی نہیں مل سکی۔ Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const downloadRecording = () => {
    if (!recordedBlob) return;
    const a = document.createElement('a');
    a.href = recordedUrl;
    a.download = `${selectedPoem?.title || 'recording'}.webm`;
    a.click();
  };

  useEffect(() => () => { stop(); }, []);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
            آڈیو اسٹوڈیو
          </h2>
          <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter,sans-serif' }}>Audio Recitation & Recording</p>
        </div>

        {/* Section picker */}
        <div className="mb-4">
          <p className="text-sm mb-2 text-right" style={{ color: '#94a3b8', fontFamily: "'Noto Nastaliq Urdu',serif" }}>سیکشن منتخب کریں:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {POETRY_SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedSection(s); setSelectedPoem(null); stop(); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-right transition-all hover:scale-[1.02]"
                style={{
                  background: selectedSection?.id === s.id ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.04)',
                  border: selectedSection?.id === s.id ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span>{s.icon}</span>
                <span className="text-xs" style={{ color: selectedSection?.id === s.id ? '#fbbf24' : '#64748b', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                  {s.title.split('،')[0].split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Poem picker */}
        {selectedSection && (
          <div className="mb-4">
            <p className="text-sm mb-2 text-right" style={{ color: '#94a3b8', fontFamily: "'Noto Nastaliq Urdu',serif" }}>شعر منتخب کریں:</p>
            <div className="space-y-2">
              {selectedSection.poems.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPoem(p); stop(); }}
                  className="w-full text-right px-4 py-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{
                    background: selectedPoem?.id === p.id ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.03)',
                    border: selectedPoem?.id === p.id ? '1px solid rgba(251,191,36,0.35)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: selectedPoem?.id === p.id ? '#fbbf24' : '#e2e8f0', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                    {p.title || p.type}
                  </span>
                  <span className="text-xs ml-2" style={{ color: '#475569', fontFamily: "'Noto Nastaliq Urdu',serif" }}>— {p.type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Player */}
        {selectedPoem && (
          <div className="rounded-2xl p-5 border mb-4" style={{ background: 'rgba(251,191,36,0.05)', borderColor: 'rgba(251,191,36,0.2)' }}>
            <h3 className="text-center font-bold mb-4" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: '1.1rem' }}>
              {selectedPoem.title}
            </h3>

            {/* Progress bar */}
            <div className="rounded-full overflow-hidden mb-4" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#fbbf24,#34d399)' }} />
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => speak(selectedPoem)}
                disabled={audio.speaking && !audio.paused}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#0c0a00', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif' }}
              >
                ▶ سنیں
              </button>
              {audio.speaking && (
                <button
                  onClick={pauseResume}
                  className="px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {audio.paused ? '▶ جاری' : '⏸ رکیں'}
                </button>
              )}
              <button
                onClick={stop}
                className="px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                ⏹ بند
              </button>
            </div>

            {audio.speaking && (
              <p className="text-center text-xs mt-3" style={{ color: '#4ade80', fontFamily: "'Noto Nastaliq Urdu',serif" }}>
                🎵 {audio.paused ? 'رکا ہوا' : 'پڑھا جا رہا ہے...'}
              </p>
            )}
          </div>
        )}

        {/* Recording section */}
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.15)' }}>
          <h3 className="text-right font-bold mb-4" style={{ color: '#fca5a5', fontFamily: "'Noto Nastaliq Urdu',serif" }}>🎙️ آواز ریکارڈ کریں</h3>

          <div className="flex gap-3 justify-center">
            {!recording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.35)' }}
              >
                🔴 ریکارڈ شروع
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 animate-pulse"
                style={{ background: 'rgba(239,68,68,0.35)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.5)' }}
              >
                ⏹ ریکارڈنگ بند کریں
              </button>
            )}
          </div>

          {recording && (
            <p className="text-center text-xs mt-2" style={{ color: '#ef4444' }}>● ریکارڈنگ جاری ہے...</p>
          )}

          {recordedUrl && (
            <div className="mt-4">
              <audio src={recordedUrl} controls className="w-full rounded-lg" />
              <button
                onClick={downloadRecording}
                className="mt-3 w-full py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                ⬇️ ڈاؤنلوڈ کریں
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioStudio;
