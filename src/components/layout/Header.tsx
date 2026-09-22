import { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa',
  '#fb923c', '#4ade80', '#38bdf8', '#e879f9', '#facc15'
];

interface Particle {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

const Header = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.floor(canvas.width / 8);
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.5 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
    };
    initParticles();

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const grad = ctx.createLinearGradient(
        canvas.width * Math.abs(Math.sin(t)),
        0,
        canvas.width * Math.abs(Math.cos(t)),
        canvas.height
      );
      grad.addColorStop(0, `hsl(${(t * 50) % 360}, 80%, 8%)`);
      grad.addColorStop(0.5, `hsl(${(t * 50 + 120) % 360}, 70%, 12%)`);
      grad.addColorStop(1, `hsl(${(t * 50 + 240) % 360}, 80%, 8%)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw & update particles
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Glowing light streaks
      for (let i = 0; i < 3; i++) {
        const x = ((t * 80 + i * 200) % (canvas.width + 200)) - 100;
        const streakGrad = ctx.createLinearGradient(x - 80, 0, x + 80, canvas.height);
        streakGrad.addColorStop(0, 'transparent');
        streakGrad.addColorStop(0.5, `hsla(${(t * 60 + i * 120) % 360}, 80%, 60%, 0.08)`);
        streakGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = streakGrad;
        ctx.fillRect(x - 80, 0, 160, canvas.height);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const colorInterval = setInterval(() => {
      setCurrentColorIndex(i => (i + 1) % COLORS.length);
    }, 1200);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(colorInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const bismillahColors = [
    'from-yellow-400 via-emerald-400 to-cyan-400',
    'from-pink-400 via-purple-400 to-indigo-400',
    'from-orange-400 via-red-400 to-rose-400',
    'from-emerald-400 via-teal-400 to-sky-400',
  ];
  const colorClass = bismillahColors[currentColorIndex % bismillahColors.length];

  return (
    <header className="relative w-full overflow-hidden" style={{ minHeight: '260px' }}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Running light bar */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="h-full w-1/4"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS[currentColorIndex]}, transparent)`,
            animation: 'runningLight 2.5s linear infinite',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="h-full w-1/4"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS[(currentColorIndex + 3) % COLORS.length]}, transparent)`,
            animation: 'runningLight 2s linear infinite reverse',
          }}
        />
      </div>

      {/* Star decorations */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            background: COLORS[i % COLORS.length],
            left: `${(i * 8.3) + Math.random() * 5}%`,
            top: `${Math.random() * 80 + 10}%`,
            animation: `starTwinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center py-12 px-4 text-center" style={{ zIndex: 3, minHeight: '260px' }}>
        {/* Decorative top line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-16 sm:w-32" style={{ background: `linear-gradient(90deg, transparent, ${COLORS[currentColorIndex]})` }} />
          <span className="text-xl sm:text-2xl animate-color-cycle">✦ ✦ ✦</span>
          <div className="h-px w-16 sm:w-32" style={{ background: `linear-gradient(90deg, ${COLORS[currentColorIndex]}, transparent)` }} />
        </div>

        {/* بسم اللہ */}
        <div
          className="relative mb-4"
          style={{
            background: `linear-gradient(135deg, ${COLORS[currentColorIndex]}, ${COLORS[(currentColorIndex + 2) % COLORS.length]}, ${COLORS[(currentColorIndex + 4) % COLORS.length]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'shimmer 2s linear infinite, pulse-glow 2s ease-in-out infinite',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
            fontWeight: '700',
            letterSpacing: '0.05em',
            lineHeight: '1.6',
          }}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl mb-4 font-medium"
          style={{ color: COLORS[(currentColorIndex + 1) % COLORS.length], fontFamily: "'Noto Nastaliq Urdu', serif" }}
        >
          شروع اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے
        </p>

        {/* Decorative bottom line */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-px w-12 sm:w-24" style={{ background: `linear-gradient(90deg, transparent, ${COLORS[(currentColorIndex + 2) % COLORS.length]})` }} />
          <span className="animate-color-cycle text-2xl">☽</span>
          <div
            className="text-sm sm:text-base font-medium"
            style={{ color: COLORS[(currentColorIndex + 3) % COLORS.length], fontFamily: 'Inter, sans-serif' }}
          >
            SMART WORLD ORDER™ | ESOneWorld™
          </div>
          <span className="animate-color-cycle text-2xl">☽</span>
          <div className="h-px w-12 sm:w-24" style={{ background: `linear-gradient(90deg, ${COLORS[(currentColorIndex + 2) % COLORS.length]}, transparent)` }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
