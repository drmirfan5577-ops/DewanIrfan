import { useEffect, useRef, useState } from 'react';

interface Props {
  onDone: () => void;
}

const COLORS = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#fb923c'];

const IntroScreen = ({ onDone }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface P { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number; }
    const particles: P[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let t = 0;
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
      g.addColorStop(0, `hsl(${(t * 40) % 360},60%,8%)`);
      g.addColorStop(0.5, `hsl(${(t * 40 + 120) % 360},50%,5%)`);
      g.addColorStop(1, '#000');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Radial light burst
      const burst = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 300);
      burst.addColorStop(0, `hsla(${(t * 60) % 360},80%,55%,${0.06 + Math.sin(t * 3) * 0.04})`);
      burst.addColorStop(1, 'transparent');
      ctx.fillStyle = burst;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    setTimeout(() => setPhase('show'), 100);
    setTimeout(() => setPhase('exit'), 4200);
    setTimeout(() => onDone(), 4800);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        zIndex: 99999,
        transition: 'opacity 0.6s ease',
        opacity: phase === 'exit' ? 0 : 1,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: phase === 'show' ? 1 : 0,
          transform: phase === 'show' ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
        }}
      >
        {/* Top stars */}
        <div className="flex gap-3 mb-6">
          {COLORS.map((c, i) => (
            <span key={i} style={{ color: c, fontSize: '20px', animation: `starTwinkle ${1 + i * 0.2}s ease-in-out infinite` }}>✦</span>
          ))}
        </div>

        {/* Bismillah */}
        <div
          style={{
            fontSize: 'clamp(2.2rem, 8vw, 5rem)',
            fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
            fontWeight: '700',
            background: 'linear-gradient(90deg, #fbbf24, #34d399, #60a5fa, #f472b6, #fbbf24)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 2s linear infinite, pulse-glow 2s ease-in-out infinite',
            lineHeight: 1.5,
          }}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 w-full max-w-sm">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,#fbbf24)' }} />
          <span style={{ color: '#fbbf24', fontSize: '18px' }}>☽</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,#fbbf24,transparent)' }} />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            fontWeight: '700',
            color: '#fbbf24',
            textShadow: '0 0 40px rgba(251,191,36,0.6)',
            lineHeight: 1.6,
          }}
        >
          دیوانِ عرفان
        </div>
        <div
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            fontFamily: "'Noto Nastaliq Urdu', serif",
            color: '#6ee7b7',
            marginTop: '8px',
          }}
        >
          ڈاکٹر عرفان غازی
        </div>
        <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>
          SMART WORLD ORDER™ | ESOneWorld™
        </div>

        {/* Bottom decoration */}
        <div className="flex gap-3 mt-8">
          {['🇵🇰', '☪️', '📖', '✨', '🇵🇰'].map((e, i) => (
            <span key={i} style={{ fontSize: '20px', animation: `float ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>{e}</span>
          ))}
        </div>

        {/* Loading bar */}
        <div
          className="mt-8 rounded-full overflow-hidden"
          style={{ width: '200px', height: '3px', background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg,#fbbf24,#34d399,#60a5fa)',
              animation: 'loadBar 4s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loadBar { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
};

export default IntroScreen;
