import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Crown, MapPin, Clock, ScrollText, Star } from 'lucide-react';

function Countdown() {
  const target = new Date('2026-08-28T22:08:00+05:30');
  const [time, setTime] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (v) => String(v ?? 0).padStart(2, '0');

  return (
    <div className="countdown-strip" style={{ position: 'relative', zIndex: 5 }}>
      {[['d', 'Days'], ['h', 'Hours'], ['m', 'Mins'], ['s', 'Secs']].map(([k, l], i) => (
        <React.Fragment key={k}>
          {i > 0 && <span className="count-sep">·</span>}
          <div className="count-box">
            <div
              className="count-number"
              style={{
                background: 'linear-gradient(135deg,#ffe98a 0%,#f5c842 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(2rem,5vw,3rem)',
                fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 900,
                filter: 'drop-shadow(0 0 20px rgba(245,200,66,0.5))',
              }}
            >
              {pad(time[k])}
            </div>
            <div className="count-label">{l}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export function Hero({ lang, onOpenCardReplica, onOpenRsvp }) {
  return (
    <section className="hero">
      {/* Rotating glow aura */}
      <div className="hero-aura" />

      {/* Sacred mantra bar */}
      <div className="hero-mantra-bar">
        <Sparkles size={16} />
        <span>
          {lang === 'te'
            ? '॥ శ్రీరస్తు ॥  ॥ శుభమస్తు ॥  ॥ అవిఘ్నమస్తు ॥'
            : '॥ Srirasthu ॥  ॥ Subhamasthu ॥  ॥ Avignamasthu ॥'}
        </span>
        <Sparkles size={16} />
      </div>

      {/* Pelli Kuthuru badge */}
      <div className="hero-badge">
        <Crown size={14} />
        {lang === 'te' ? 'పెండ్లికూతురు వివాహ ఆహ్వానము' : 'Pelli Kuthuru — Bride-Side Celebration'}
      </div>

      {/* MAIN INVITATION CARD */}
      <div
        className="hero-invitation-card glass-card-gold float-anim"
        style={{ perspective: '1200px' }}
      >
        {/* Corner ornaments */}
        <div className="hero-corner tl" /><div className="hero-corner tr" />
        <div className="hero-corner bl" /><div className="hero-corner br" />

        {/* Crest */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg,#ff6b9d,#f5c842)',
            padding: 3, boxShadow: '0 0 40px rgba(245,200,66,0.5)',
          }}>
            <img
              src="/assets/divine_motif.png"
              alt="Divine Motif"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* BRIDE NAME — prominently first */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,107,157,0.8)', fontFamily: 'Plus Jakarta Sans', marginBottom: 8 }}>
            {lang === 'te' ? 'వధువు (The Bride)' : '✦ The Bride ✦'}
          </div>
          <div
            className="bride-name"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Chi.La.Sow.<br />Hari Chandana
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,200,100,0.7)', fontFamily: 'Plus Jakarta Sans', marginTop: 6, letterSpacing: '0.15em' }}>B.Tech</div>
        </div>

        {/* Ornamental divider */}
        <div className="divider-ornament">
          <Heart size={18} fill="rgba(255,107,157,0.6)" color="rgb(255,107,157)" />
        </div>

        {/* WITH GROOM label */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.7)', fontFamily: 'Plus Jakarta Sans', marginBottom: 8 }}>
            {lang === 'te' ? 'వరుడు (The Groom)' : '✦ with Groom ✦'}
          </div>
          <div className="groom-name">
            Chi. Veera<br />Harsha Vardhan
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(200,150,40,0.7)', fontFamily: 'Plus Jakarta Sans', marginTop: 6, letterSpacing: '0.15em' }}>B.Tech</div>
        </div>

        {/* Event summary strip */}
        <div className="hero-event-strip">
          <div className="event-chip">
            <Clock size={14} />
            <span>28 Aug 2026 • 10:08 PM</span>
          </div>
          <div className="event-chip">
            <MapPin size={14} />
            <span>Helapuri Lions Club Kalyana Vedika</span>
          </div>
          <div className="event-chip">
            <Star size={14} />
            <span>Shatabhisha Nakshatrayukta • Mesha Lagnam</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          <button className="btn-rsvp" onClick={onOpenRsvp}>
            <Heart size={14} fill="currentColor" /> {lang === 'te' ? 'RSVP నిర్ధారించండి' : 'RSVP Now'}
          </button>
          <button className="btn-outline" onClick={onOpenCardReplica}>
            <ScrollText size={14} /> {lang === 'te' ? 'పత్రిక చూడండి' : 'View Invitation Card'}
          </button>
        </div>
      </div>

      {/* Countdown timer */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'Plus Jakarta Sans', marginBottom: 16 }}>
          Sumuhurtham Countdown
        </div>
        <Countdown />
      </div>
    </section>
  );
}
