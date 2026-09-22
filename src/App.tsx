import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import IntroScreen from '@/components/features/IntroScreen';
import Dashboard from '@/pages/Dashboard';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'hsl(220 30% 6%)' }}>
    <div className="text-center">
      <p className="text-6xl mb-4" style={{ color: '#fbbf24' }}>۴۰۴</p>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#e2e8f0', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
        صفحہ نہیں ملا
      </h1>
      <a href="/" className="text-sm underline" style={{ color: '#6ee7b7' }}>واپس جائیں</a>
    </div>
  </div>
);

const App = () => {
  const [introPlayed, setIntroPlayed] = useState(false);

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      {!introPlayed && <IntroScreen onDone={() => setIntroPlayed(true)} />}
      <div style={{ opacity: introPlayed ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
