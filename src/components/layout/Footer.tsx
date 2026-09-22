const Footer = () => {
  const contacts = [
    { label: 'alqalam@drirfan.online', href: 'mailto:alqalam@drirfan.online', icon: '✉️' },
    { label: 'admin@drirfan.online', href: 'mailto:admin@drirfan.online', icon: '✉️' },
    { label: 'contact@drirfan.online', href: 'mailto:contact@drirfan.online', icon: '✉️' },
    { label: 'uni.smartworldorder@gmail.com', href: 'mailto:uni.smartworldorder@gmail.com', icon: '📧' },
    { label: 'dr.mirfan5577@gmail.com', href: 'mailto:dr.mirfan5577@gmail.com', icon: '📧' },
    { label: '0300-4737757 (WhatsApp)', href: 'https://wa.me/923004737757', icon: '📱' },
  ];

  return (
    <footer
      className="relative mt-8 py-12 px-4 md:px-8 border-t overflow-hidden"
      style={{
        borderColor: 'rgba(251, 191, 36, 0.15)',
        background: 'linear-gradient(135deg, rgba(5, 46, 22, 0.3), rgba(15, 23, 42, 0.9))',
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.08), transparent)', filter: 'blur(30px)' }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h3
            className="text-xl font-bold mb-1"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', serif",
              background: 'linear-gradient(90deg, #fbbf24, #34d399, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            رابطہ کریں
          </h3>
          <p className="text-xs" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            For more info and queries
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:scale-[1.02] hover:border-yellow-500/40"
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                borderColor: 'rgba(251, 191, 36, 0.15)',
                color: '#94a3b8',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                direction: 'ltr',
              }}
            >
              <span className="text-base flex-shrink-0">{c.icon}</span>
              <span>{c.label}</span>
            </a>
          ))}
        </div>

        {/* Brand */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-px w-48" style={{ background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)' }} />
          </div>
          <h4
            className="text-lg font-bold mb-1"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(90deg, #fbbf24, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            "SMART WORLD ORDER™"
          </h4>
          <p
            className="text-base font-semibold mb-2"
            style={{ color: '#60a5fa', fontFamily: 'Inter, sans-serif' }}
          >
            ESOneWorld™
          </p>
          <p
            className="text-sm mb-2"
            style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}
          >
            A Global Family Platform Vision by Dr M Irfan Qadir Thaheem
          </p>
          <p
            className="text-xs max-w-md mx-auto mb-6"
            style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
          >
            We're committed to Enhance the whole world in every field of life within Unity, Integrity and Universality. In-sha-Allah Azza-wa-Jall!
          </p>

          <div className="flex justify-center mb-6">
            <div className="h-px w-48" style={{ background: 'linear-gradient(90deg, transparent, #22c55e, transparent)' }} />
          </div>

          <p
            className="text-base font-bold mb-1"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', serif",
              color: '#fbbf24',
            }}
          >
            دیوانِ عرفان
          </p>
          <p
            className="text-sm"
            style={{ color: '#6ee7b7', fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            ڈاکٹر عرفان غازی — خاک نشیں بندہ ناچیز
          </p>

          <p
            className="text-xs mt-6"
            style={{ color: '#1e293b', fontFamily: 'Inter, sans-serif' }}
          >
            © 2026 Dr. M Irfan Qadir Thaheem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
