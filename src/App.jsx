import React, { useState, useEffect, useRef } from 'react';
import Background3D from './components/Background3D';
import { Hero } from './components/Hero';
import { CoupleSection } from './components/CoupleSection';
import { Timeline } from './components/Timeline';
import { VenueMap } from './components/VenueMap';
import { Guestbook } from './components/Guestbook';
import { Gallery } from './components/Gallery';
import { RsvpModal } from './components/RsvpModal';
import { CardReplicaModal } from './components/CardReplicaModal';
import { AudioPlayer } from './components/AudioPlayer';
import { ProfilePage } from './components/ProfilePage';
import { Heart, Globe, ScrollText, Menu, X, Crown } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePage, setProfilePage] = useState(null); // 'bride' | 'groom' | null

  // ── Hide-on-scroll logic (always declared — no early return before hooks) ──
  const [navVisible, setNavVisible] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (diff < -5 || currentY < 60) setNavVisible(true);
      if (diff > 5 && currentY > 80) { setNavVisible(false); setMobileOpen(false); }
      setNavScrolled(currentY > 30);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    ['#couple', lang === 'te' ? 'వధూవరులు' : 'Couple'],
    ['#timeline', lang === 'te' ? 'కార్యక్రమాలు' : 'Schedule'],
    ['#venue', lang === 'te' ? 'వేదిక' : 'Venue'],
    ['#guestbook', lang === 'te' ? 'దీవెనలు' : 'Blessings'],
    ['#gallery', lang === 'te' ? 'చిత్రాలు' : 'Gallery'],
  ];

  // ── If a profile page is active, render it full-screen (AFTER all hooks) ──
  if (profilePage) {
    return (
      <ProfilePage
        type={profilePage}
        lang={lang}
        onBack={() => { setProfilePage(null); window.scrollTo(0, 0); }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Background3D />

      {/* ===== NAVBAR ===== */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transform: navVisible ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 62,
            padding: '0 clamp(14px, 4vw, 32px)',
            background: navScrolled
              ? 'rgba(4,1,26,0.9)'
              : 'rgba(4,1,26,0.55)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderBottom: `1px solid ${navScrolled ? 'rgba(245,200,66,0.2)' : 'rgba(245,200,66,0.1)'}`,
            boxShadow: navScrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
            transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="#"
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              textDecoration: 'none', flexShrink: 0,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#ff6b9d,#f5c842)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 0 16px rgba(245,200,66,0.4)',
              }}
            >
              <img
                src="/assets/divine_motif.png"
                alt="Crest"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<span style="font-size:0.55rem;font-weight:900;color:#04011a;font-family:serif">H♥H</span>';
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 700,
                fontSize: 'clamp(0.58rem, 2vw, 0.82rem)',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '36vw',
                background: 'linear-gradient(135deg,#ff6b9d 0%,#f5c842 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent !important',
                lineHeight: 1.2,
              }}
            >
              Hari Chandana & Harsha
            </span>
          </a>

          {/* ── DESKTOP LINKS (hidden on mobile) ── */}
          <div
            style={{
              display: 'flex', alignItems: 'center',
              gap: 'clamp(12px, 2.5vw, 28px)',
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
            className="hide-mobile"
          >
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.75) !important',
                  position: 'relative',
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => { e.target.style.color = '#f5c842'; }}
                onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── CONTROLS ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            {/* Language toggle */}
            <button
              onClick={() => setLang((l) => l === 'en' ? 'te' : 'en')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 100,
                border: '1px solid rgba(245,200,66,0.3)',
                background: 'rgba(245,200,66,0.08)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.7rem', fontWeight: 700,
                cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,200,66,0.18)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(245,200,66,0.08)'}
            >
              🌐 {lang === 'en' ? 'తెలుగు' : 'EN'}
            </button>

            {/* RSVP button */}
            <button
              onClick={() => setIsRsvpOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 16px', borderRadius: 100,
                background: 'linear-gradient(135deg,#f5c842,#c8972a)',
                color: '#04011a', fontSize: '0.72rem', fontWeight: 800,
                border: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow: '0 3px 16px rgba(245,200,66,0.4)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,200,66,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 3px 16px rgba(245,200,66,0.4)'; }}
            >
              <Heart size={12} fill="currentColor" /> RSVP
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="hide-desktop"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: mobileOpen ? 'rgba(245,200,66,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#fff', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {/* ── MOBILE FULL-SCREEN MENU ── */}
        <div
          style={{
            position: 'fixed',
            top: 62, left: 0, right: 0, bottom: 0,
            zIndex: 98,
            background: 'rgba(4,1,26,0.97)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 28px 40px',
            overflowY: 'auto',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: '1px solid rgba(245,200,66,0.12)',
          }}
        >
          {/* Decorative top accent */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(255,107,157,0.12)',
              border: '1px solid rgba(255,107,157,0.3)',
              color: '#ffb3d0', fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: 'Plus Jakarta Sans',
            }}>
              <Crown size={12} /> Wedding Navigation
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '16px 20px', borderRadius: 16,
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: '1rem', fontWeight: 700,
                  color: 'rgba(255,255,255,0.85) !important',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  border: '1px solid transparent',
                  transition: 'all 0.25s',
                  gap: 14,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(245,200,66,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(245,200,66,0.2)';
                  e.currentTarget.style.color = '#f5c842';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#ff6b9d,#f5c842)',
                  flexShrink: 0,
                }} />
                {label}
              </a>
            ))}
          </nav>

          {/* Bottom action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
            <button
              onClick={() => { setMobileOpen(false); setIsCardOpen(true); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '14px 20px', borderRadius: 16,
                border: '1.5px solid rgba(245,200,66,0.4)',
                background: 'rgba(245,200,66,0.07)',
                color: '#f5c842', fontSize: '0.88rem', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
                letterSpacing: '0.05em',
                transition: 'all 0.25s',
              }}
            >
              <ScrollText size={16} /> View Invitation Card
            </button>

            <button
              onClick={() => { setMobileOpen(false); setIsRsvpOpen(true); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '14px 20px', borderRadius: 16,
                background: 'linear-gradient(135deg,#f5c842,#c8972a)',
                color: '#04011a', fontSize: '0.9rem', fontWeight: 800,
                border: 'none', cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.1em', textTransform: 'uppercase',
                boxShadow: '0 6px 24px rgba(245,200,66,0.35)',
                transition: 'all 0.25s',
              }}
            >
              <Heart size={16} fill="currentColor" /> Confirm RSVP
            </button>

            {/* Language toggle in mobile */}
            <button
              onClick={() => setLang((l) => l === 'en' ? 'te' : 'en')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                padding: '12px 20px', borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              }}
            >
              🌐 Switch to {lang === 'en' ? 'తెలుగు' : 'English'}
            </button>
          </div>

          {/* Bottom wedding info strip */}
          <div style={{
            marginTop: 32, paddingTop: 20,
            borderTop: '1px solid rgba(245,200,66,0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '1.6rem', color: 'rgba(245,200,66,0.7)',
              marginBottom: 6,
            }}>
              28 August 2026
            </div>
            <div style={{
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)',
              fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.1em',
            }}>
              HELAPURI LIONS CLUB KALYANA VEDIKA
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero lang={lang} onOpenCardReplica={() => setIsCardOpen(true)} onOpenRsvp={() => setIsRsvpOpen(true)} />
        <CoupleSection lang={lang} onNavigate={(type) => { setProfilePage(type); window.scrollTo(0,0); }} />
        <Timeline lang={lang} />
        <VenueMap lang={lang} />
        <Guestbook lang={lang} />
        <Gallery lang={lang} />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="footer-crest">
            <img
              src="/assets/divine_motif.png"
              alt="Divine Motif"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff6b9d 0%, #f5c842 55%, #ffb347 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 12,
          }}>
            Hari Chandana & Veera Harsha Vardhan
          </div>
          {/* Host Invitation Text */}
          <div style={{
            background: 'rgba(245,200,66,0.06)',
            border: '1px solid rgba(245,200,66,0.25)',
            borderRadius: 20,
            padding: '16px 20px',
            maxWidth: 520,
            margin: '0 auto 24px',
          }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em',
              color: '#f5c842', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans',
              marginBottom: 6,
            }}>
              💌 Cordial Invitation
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 10,
            }}>
              All are cordially invited by
            </div>
            <div style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffe98a 0%, #f5c842 50%, #ffb347 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.35,
              marginBottom: 14,
              filter: 'drop-shadow(0 0 20px rgba(245,200,66,0.3))',
            }}>
              Sri Peddada Durga Raju (Raja) <br />
              &amp; Smt. Peddada Ratna Kumari
            </div>
            <p style={{
              fontFamily: 'Noto Sans Telugu, Plus Jakarta Sans, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'rgba(245,200,66,0.9)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              శ్రీ పెద్దడ దుర్గారాజు (రాజా) - శ్రీమతి రత్నకుమారి దంపతుల ఆత్మీయ ఆహ్వానము. <br />
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>
                మీ ఆశీస్సులతో నూతన దంపతులు ఆనందంగా విలసిల్లాలని కోరుకుంటున్నాము.
              </span>
            </p>
          </div>
          {/* Designed & Deployed by Ganesh Charan Peddada */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid rgba(245,200,66,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '12px 24px', borderRadius: 100,
                background: 'linear-gradient(135deg, rgba(245,200,66,0.12) 0%, rgba(255,107,157,0.08) 100%)',
                border: '1px solid rgba(245,200,66,0.35)',
                boxShadow: '0 0 35px rgba(245,200,66,0.2)',
              }}
            >
              {/* Ganesh Photo */}
              <div
                style={{
                  width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid #f5c842',
                  boxShadow: '0 0 16px rgba(245,200,66,0.6)',
                  flexShrink: 0,
                  background: '#04011a',
                }}
              >
                <img
                  src="/assets/ganesh.png"
                  alt="Ganesh Charan Peddada"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.18em',
                  color: '#f5c842', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <Crown size={11} /> Designed &amp; Deployed By
                </div>
                <div style={{
                  fontFamily: "'Cinzel Decorative', serif", fontWeight: 900, fontSize: '0.96rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f5c842 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', marginTop: 2, letterSpacing: '0.04em',
                }}>
                  Ganesh Charan Peddada
                </div>
              </div>
            </div>

            <div style={{
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Plus Jakarta Sans',
              letterSpacing: '0.08em',
              marginTop: 4,
            }}>
              © 2026 Peddada &amp; Suravarapu Families · Helapuri Lions Club Kalyana Vedika, Sanivarapupeta
            </div>
          </div>
        </div>
      </footer>

      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} lang={lang} />
      <CardReplicaModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
      <AudioPlayer lang={lang} />
    </div>
  );
}
