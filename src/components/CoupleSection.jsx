import React, { useState } from 'react';
import { GraduationCap, MapPin, ChevronRight, Sparkles } from 'lucide-react';

function ProfileCard({ type, lang, onClick }) {
  const [pressed, setPressed] = useState(false);
  const touchStartPos = React.useRef({ x: 0, y: 0 });

  const isBride = type === 'bride';
  const accent  = isBride ? '#ff6b9d' : '#60a0ff';
  const glow    = isBride ? 'rgba(255,107,157,0.3)' : 'rgba(96,160,255,0.25)';

  const handleTouchStart = (e) => {
    setPressed(true);
    if (e.touches && e.touches[0]) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e) => {
    setPressed(false);
    if (e.changedTouches && e.changedTouches[0]) {
      const dist = Math.hypot(
        e.changedTouches[0].clientX - touchStartPos.current.x,
        e.changedTouches[0].clientY - touchStartPos.current.y
      );
      // Only trigger click if user didn't move finger more than 10px (i.e. not scrolling)
      if (dist < 10) {
        onClick();
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        // Fallback for non-touch / desktop click
        if (!('ontouchstart' in window)) {
          onClick();
        }
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: 'pointer',
        borderRadius: 28,
        padding: 'clamp(20px,5vw,32px)',
        background: isBride
          ? 'linear-gradient(145deg,rgba(255,107,157,0.14) 0%,rgba(255,107,157,0.04) 60%,rgba(10,5,40,0.9) 100%)'
          : 'linear-gradient(145deg,rgba(96,160,255,0.14) 0%,rgba(96,160,255,0.04) 60%,rgba(10,5,40,0.9) 100%)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: `1.5px solid ${accent}55`,
        boxShadow: pressed
          ? `0 4px 20px ${glow}, 0 0 0 2px ${accent}60`
          : `0 0 60px ${glow}, 0 30px 70px rgba(0,0,0,0.7)`,
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        transition: 'all 0.18s cubic-bezier(0.175,0.885,0.32,1.275)',
        position: 'relative', overflow: 'hidden',
        userSelect: 'none', WebkitUserSelect: 'none',
      }}
    >
      {/* Shimmer overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${accent}06 0%,transparent 60%)`, borderRadius: 'inherit', pointerEvents: 'none' }} />

      {/* Tag */}
      <div style={{
        position: 'absolute', top: 0, right: 0, padding: '7px 18px',
        borderRadius: '0 28px 0 16px',
        background: isBride ? 'linear-gradient(135deg,#ff6b9d,#c41f6b)' : 'linear-gradient(135deg,#60a0ff,#1a3cbf)',
        color: '#fff', fontSize: '0.65rem', fontWeight: 800,
        letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans',
      }}>
        {isBride ? (lang === 'te' ? '🌸 వధువు' : '🌸 Bride') : (lang === 'te' ? '✨ వరుడు' : '✨ Groom')}
      </div>

      {/* Content */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${accent}90`, fontFamily: 'Plus Jakarta Sans', marginBottom: 8 }}>
          {isBride ? (lang === 'te' ? 'చి||లా||సౌ||' : 'Chi.La.Sow.') : (lang === 'te' ? 'చి||' : 'Chi.')}
        </div>

        <h3 style={{
          fontFamily: "'Cinzel Decorative',serif",
          fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,2.1rem)',
          background: isBride
            ? 'linear-gradient(135deg,#ff6b9d 0%,#f5c842 55%,#ffb347 100%)'
            : 'linear-gradient(135deg,#a0d0ff 0%,#60a0ff 40%,#f5c842 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', lineHeight: 1.2, marginBottom: 10,
          filter: `drop-shadow(0 0 20px ${accent}40)`,
        }}>
          {isBride ? 'Hari Chandana' : 'Veera Harsha Vardhan'}
        </h3>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', fontWeight: 600, marginBottom: 20 }}>
          <GraduationCap size={12} /> B.Tech
        </div>

        {/* Parents preview */}
        <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: `1px solid ${accent}20`, marginBottom: 12 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: accent, fontFamily: 'Plus Jakarta Sans', textTransform: 'uppercase', marginBottom: 6 }}>
            {lang === 'te' ? 'తల్లిదండ్రులు' : 'Parents'}
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.88rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
            {isBride ? 'Sri Peddada Durgaraju & Smt. Ratna Kumari' : 'Sri Suravarapu Srinivasarao & Smt. Venkata Nagalakshmi'}
          </div>
        </div>

        {/* Brother preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span style={{ fontSize: '0.75rem', color: `${accent}80`, fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}>
            👫 {lang === 'te' ? 'సోదరుడు' : 'Brother'}:
          </span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Plus Jakarta Sans' }}>
            {isBride ? 'Ganesh Charan Peddada' : 'Chinna Suravarapu'}
          </span>
        </div>

        {!isBride && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
            <MapPin size={12} color={accent} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Plus Jakarta Sans' }}>
              Kunchanapalli, Guntur
            </span>
          </div>
        )}

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderRadius: 14,
          background: `${accent}12`, border: `1px solid ${accent}35`,
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: accent, fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.05em' }}>
            {lang === 'te' ? 'పూర్తి వివరాలు చూడండి →' : 'Open Full Profile →'}
          </span>
          <ChevronRight size={16} color={accent} />
        </div>
      </div>
    </div>
  );
}

export function CoupleSection({ lang, onNavigate }) {
  return (
    <section id="couple" style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            {lang === 'te' ? 'వధూ వరుల సమాచారం' : 'Bride & Groom'}
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'వధూవరులు' : 'Meet the Couple'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te'
              ? 'కార్డులు నొక్కి పూర్తి వివరాలు చూడండి'
              : 'Tap a card to open their full profile page'}
          </p>
        </div>

        {/* Banner photo */}
        <div style={{ borderRadius: 28, overflow: 'hidden', marginBottom: 32, position: 'relative', border: '1px solid rgba(245,200,66,0.3)', boxShadow: '0 0 80px rgba(245,200,66,0.15), 0 30px 70px rgba(0,0,0,0.7)' }}>
          <img
            src="/assets/royal_couple.png"
            alt="Hari Chandana & Veera Harsha Vardhan"
            style={{
              width: '100%',
              height: 'clamp(320px, 60vw, 560px)',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Subtle gradient overlay — lighter so the photo shines */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(4,1,26,0.88) 0%,rgba(4,1,26,0.08) 45%,transparent 100%)' }} />
          {/* Golden shimmer top edge */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,rgba(245,200,66,0.7),transparent)' }} />
          <div style={{ position: 'absolute', bottom: 22, left: 24, right: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(1.6rem,5vw,2.8rem)', color: 'rgba(245,200,66,0.95)', lineHeight: 1, textShadow: '0 0 30px rgba(245,200,66,0.5)' }}>Together Forever</div>
              <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(0.62rem,1.8vw,0.9rem)', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginTop: 6, letterSpacing: '0.08em' }}>28th August 2026</div>
            </div>
            <div style={{ padding: '7px 16px', borderRadius: 100, background: 'rgba(255,107,157,0.25)', border: '1px solid rgba(255,107,157,0.5)', fontSize: '0.65rem', fontWeight: 800, color: '#ffb3d0', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', backdropFilter: 'blur(10px)' }}>
              Peddada × Suravarapu
            </div>
          </div>
        </div>

        {/* PRESSABLE CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          <ProfileCard type="bride" lang={lang} onClick={() => onNavigate('bride')} />
          <ProfileCard type="groom" lang={lang} onClick={() => onNavigate('groom')} />
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.08em' }}>
          👆 {lang === 'te' ? 'కార్డు నొక్కి పేజీ తెరవండి' : 'Tap a card to open their dedicated page'}
        </p>
      </div>
    </section>
  );
}
