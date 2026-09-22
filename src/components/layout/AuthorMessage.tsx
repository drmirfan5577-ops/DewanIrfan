const AuthorMessage = () => {
  return (
    <section className="relative py-12 px-4 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Author badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-3 border-2"
            style={{
              background: 'linear-gradient(135deg, #065f46, #d97706)',
              borderColor: '#d97706',
              boxShadow: '0 0 30px rgba(217, 119, 6, 0.4)'
            }}>
            🖊
          </div>
          <h2 className="text-xl font-bold text-center" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
            ڈاکٹر عرفان غازی
          </h2>
          <p className="text-sm mt-1" style={{ color: '#6ee7b7', fontFamily: "'Inter', sans-serif" }}>
            Dr. M Irfan Qadir Thaheem
          </p>
          <div className="mt-2 px-4 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(217, 119, 6, 0.15)', color: '#fcd34d', border: '1px solid rgba(217, 119, 6, 0.4)' }}>
            خاک نشیں بندہ ناچیز
          </div>
        </div>

        {/* Message card */}
        <div className="rounded-2xl p-6 md:p-8 border"
          style={{
            background: 'linear-gradient(135deg, rgba(5, 46, 22, 0.6), rgba(15, 23, 42, 0.8))',
            borderColor: 'rgba(217, 119, 6, 0.4)',
            boxShadow: '0 0 40px rgba(217, 119, 6, 0.1), inset 0 0 40px rgba(5, 46, 22, 0.3)'
          }}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold" style={{ color: '#fbbf24', fontFamily: "'Noto Nastaliq Urdu', serif" }}>
              نوجوانانِ پاکستان اور پوری ملتِ اسلامیہ کے نوجوانوں کے نام
            </h3>
            <p className="text-sm mt-1" style={{ color: '#86efac' }}>اک چھوٹا سا پیغام</p>
          </div>

          <div
            className="text-right leading-loose space-y-4"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', 'Amiri', serif",
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              color: '#e2e8f0',
              lineHeight: '2.2',
              direction: 'rtl'
            }}
          >
            <p style={{ color: '#fcd34d' }}>
              آج دنیا بھر میں اسلام اور مسلمانوں کو اپنی پہچان، اپنی جان و مال، عزت آبرو اور وجود اور تشخص کی بقا کا چیلنج درپیش ہے۔
            </p>
            <p className="italic" style={{ color: '#86efac', borderRight: '3px solid #22c55e', paddingRight: '1rem' }}>
              خاص ہے ترکیب میں قومِ رسولِ ہاشمی
            </p>
            <p>
              اب قائد اعظم محمد علی جناح اور ڈاکٹر علامہ اقبال جیسے مفکرین نے قبروں سے اٹھ کے نہیں آنا۔
              اس پوری امتِ مسلمہ کی آبیاری، اس کو لیڈ کرنے، امت مسلمہ کی ماؤں بہنوں بیٹیوں کی جان و مال،
              عزت آبرو کا تحفظ، اور بقا کی مکمل ذمہ داری اب ہر لحاظ سے ہم نوجوانوں پہ ہی عائد ہوتی ہے۔
            </p>
            <p>
              اپنی قوم کو ان مایوسیوں اور ذلتوں کی دلدلوں سے نکال لے جانا ہے،
              یہ فرض اب ہر حال میں ہمیں ہی نبھانا ہے انشاءاللہ عزوجل۔
            </p>

            {/* Poem box */}
            <div className="rounded-xl p-5 mt-6 text-center border"
              style={{
                background: 'rgba(217, 119, 6, 0.08)',
                borderColor: 'rgba(217, 119, 6, 0.3)',
              }}>
              <p className="text-lg font-medium" style={{ color: '#fbbf24', lineHeight: 2.4 }}>
                اس کرہ ارض پہ جب تک<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;پاکستان کا نام ہے تو ہم ہیں<br />
                ہماری پہچان آن بان شان بھی<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;یہ دین اسلام ہے تو ہم ہیں
              </p>
              <p className="text-sm mt-3" style={{ color: '#6ee7b7' }}>— ڈاکٹر عرفان</p>
            </div>

            <p className="text-center font-medium" style={{ color: '#fcd34d' }}>
              آئیے اس پورٹ فولیو کے ذریعے فقط ایک پلیٹ فارم کے طور پر اپنی عملی جدو جہد کا آغاز کریں!
            </p>
            <p className="text-center" style={{ color: '#86efac' }}>
              ائیں اپنی قوم کو ان مشکلات کی گھڑیوں سے آزادی دلوائیں، اس ڈوبتی ناؤ کو سہارا دیں
            </p>
            <p className="text-center font-bold" style={{ color: '#fbbf24' }}>
              انشاءاللہ عزوجل! میرا یہ پیغام دوسروں تک ضرور پہنچائیے۔ جزاکم اللہ خیرا
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorMessage;
