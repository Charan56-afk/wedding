import React, { useState } from 'react';
import { X, ScrollText, Sparkles, Image as ImageIcon, FileText, ZoomIn, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

const CARD_ITEMS = [
  {
    id: 'inner_divine',
    title: 'Divine Front Cover — Radha Krishna',
    titleTe: 'ముఖచిత్రం — శ్రీ రాధా కృష్ణ దివ్య రూపం',
    src: '/assets/card/card_inner_divine.jpg',
    desc: 'Main invitation cover featuring divine Sri Radha Krishna artwork with gold Ganesha medallion & temple gopuram background.',
  },
  {
    id: 'cover',
    title: 'Outer Invitation Cover',
    titleTe: 'ఆహ్వాన ముఖచిత్రం — పెద్దిడ వారి ఆహ్వానము',
    src: '/assets/card/card_outer_cover.jpg',
    desc: 'Outer flap invitation cover with Ganesha medallion, Peddada family invitation text, and Venue QR Code.',
  },
  {
    id: 'telugu',
    title: 'Telugu Invitation Card (తెలుగు)',
    titleTe: 'తెలుగు వివాహ ఆహ్వాన పత్రిక',
    src: '/assets/card/card_telugu.jpg',
    desc: 'శాస్త్రీయ తెలుగు శైలిలో ముద్రించిన సుముహూర్త మరియు వేదిక వివరాలతో కూడిన వివాహ ఆహ్వాన పత్రిక.',
  },
  {
    id: 'english',
    title: 'English Invitation Card',
    titleTe: 'ఇంగ్లీష్ వివాహ ఆహ్వాన పత్రిక',
    src: '/assets/card/card_english.jpg',
    desc: 'Official printed wedding invitation card in English detailing Sumuhurtham, Venue & Host details.',
  },
];

export function CardReplicaModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'english_text' | 'telugu_text'
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270 degrees

  if (!isOpen) return null;

  const currentPhoto = CARD_ITEMS[currentPhotoIdx];

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % CARD_ITEMS.length);
    setRotation(0);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + CARD_ITEMS.length) % CARD_ITEMS.length);
    setRotation(0);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(2, 1, 18, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 24px)',
        animation: 'backdrop-fade-in 0.3s ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 920, maxHeight: '92vh',
          background: 'linear-gradient(155deg, rgba(20, 8, 45, 0.96) 0%, rgba(6, 2, 24, 0.98) 60%, rgba(12, 18, 32, 0.98) 100%)',
          borderRadius: 28,
          border: '1.5px solid rgba(245, 200, 66, 0.35)',
          boxShadow: '0 0 80px rgba(245, 200, 66, 0.25), 0 25px 90px rgba(0, 0, 0, 0.85)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(245, 200, 66, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(245, 200, 66, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(245, 200, 66, 0.2), rgba(255, 107, 157, 0.15))',
                border: '1px solid rgba(245, 200, 66, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f5c842',
              }}
            >
              <ScrollText size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '1rem', color: '#f5c842', lineHeight: 1.2 }}>
                Wedding Invitation Card
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Plus Jakarta Sans', marginTop: 2 }}>
                Original Printed Card Photos & Transcription
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.2)',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('photos')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 100,
              fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.25s',
              fontFamily: 'Plus Jakarta Sans',
              background: activeTab === 'photos' ? 'linear-gradient(135deg, #f5c842, #c8972a)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'photos' ? '#04011a' : 'rgba(255,255,255,0.7)',
              border: activeTab === 'photos' ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: activeTab === 'photos' ? '0 4px 20px rgba(245, 200, 66, 0.4)' : 'none',
            }}
          >
            <ImageIcon size={14} /> Real Card Photos ({CARD_ITEMS.length})
          </button>

          <button
            onClick={() => setActiveTab('english_text')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 100,
              fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.25s',
              fontFamily: 'Plus Jakarta Sans',
              background: activeTab === 'english_text' ? 'linear-gradient(135deg, #ff6b9d, #c41f6b)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'english_text' ? '#fff' : 'rgba(255,255,255,0.7)',
              border: activeTab === 'english_text' ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: activeTab === 'english_text' ? '0 4px 20px rgba(255, 107, 157, 0.4)' : 'none',
            }}
          >
            <FileText size={14} /> English Transcript
          </button>

          <button
            onClick={() => setActiveTab('telugu_text')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 100,
              fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.25s',
              fontFamily: 'Noto Sans Telugu, Plus Jakarta Sans',
              background: activeTab === 'telugu_text' ? 'linear-gradient(135deg, #60a0ff, #1a3cbf)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'telugu_text' ? '#fff' : 'rgba(255,255,255,0.7)',
              border: activeTab === 'telugu_text' ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: activeTab === 'telugu_text' ? '0 4px 20px rgba(96, 160, 255, 0.4)' : 'none',
            }}
          >
            <FileText size={14} /> తెలుగు ఆహ్వానం
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: 'clamp(16px, 3vw, 28px)', overflowY: 'auto', flex: 1 }}>

          {/* TAB 1: REAL UPLOADED PHOTOS VIEW */}
          {activeTab === 'photos' && (
            <div>
              {/* Photo Selector Thumbnails */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 10, marginBottom: 20,
                }}
              >
                {CARD_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentPhotoIdx(idx); setRotation(0); }}
                    style={{
                      borderRadius: 14, overflow: 'hidden', padding: 0,
                      border: currentPhotoIdx === idx ? '2px solid #f5c842' : '1px solid rgba(255,255,255,0.15)',
                      boxShadow: currentPhotoIdx === idx ? '0 0 15px rgba(245, 200, 66, 0.4)' : 'none',
                      opacity: currentPhotoIdx === idx ? 1 : 0.6,
                      cursor: 'pointer', background: '#08031d',
                      transition: 'all 0.25s', position: 'relative', aspectRatio: '4/3',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'rgba(0,0,0,0.75)', padding: '3px 4px',
                      fontSize: '0.58rem', color: '#fff', fontWeight: 700,
                      textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      Photo {idx + 1}
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Photo Card Display Frame */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(235, 245, 230, 0.08) 0%, rgba(200, 225, 210, 0.03) 100%)',
                  border: '1.5px solid rgba(245, 200, 66, 0.3)',
                  boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '16px',
                  minHeight: 340,
                }}
              >
                {/* Photo Header Title */}
                <div
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 14, padding: '0 4px',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '0.95rem', color: '#f5c842' }}>
                      {currentPhoto.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Noto Sans Telugu, Plus Jakarta Sans' }}>
                      {currentPhoto.titleTe}
                    </div>
                  </div>

                  {/* Photo Tools: Rotate & Fullscreen Zoom */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      title="Rotate Image"
                      style={{
                        padding: '6px 12px', borderRadius: 100,
                        background: 'rgba(245, 200, 66, 0.12)',
                        border: '1px solid rgba(245, 200, 66, 0.3)',
                        color: '#f5c842', fontSize: '0.72rem', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                        fontFamily: 'Plus Jakarta Sans',
                      }}
                    >
                      <RotateCw size={13} /> Rotate
                    </button>
                    <button
                      onClick={() => setZoomImage(currentPhoto.src)}
                      title="Full Screen Zoom"
                      style={{
                        padding: '6px 12px', borderRadius: 100,
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                        fontFamily: 'Plus Jakarta Sans',
                      }}
                    >
                      <ZoomIn size={13} /> Zoom
                    </button>
                  </div>
                </div>

                {/* Photo Viewer Container */}
                <div
                  style={{
                    position: 'relative', width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 320, maxHeight: '55vh',
                    background: '#040212', borderRadius: 14, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '52vh',
                      objectFit: 'contain',
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease',
                      borderRadius: 8,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                    }}
                  />

                  {/* Nav Arrows */}
                  <button
                    onClick={prevPhoto}
                    style={{
                      position: 'absolute', left: 10,
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(4, 1, 26, 0.85)', border: '1px solid rgba(245,200,66,0.4)',
                      color: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={nextPhoto}
                    style={{
                      position: 'absolute', right: 10,
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(4, 1, 26, 0.85)', border: '1px solid rgba(245,200,66,0.4)',
                      color: '#f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* Caption Description */}
                <div style={{ marginTop: 12, textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  {currentPhoto.desc}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENGLISH CARD TRANSCRIPTION */}
          {activeTab === 'english_text' && (
            <div
              style={{
                background: 'linear-gradient(145deg, rgba(255, 252, 245, 0.97) 0%, rgba(242, 247, 238, 0.96) 100%)',
                color: '#1a3322',
                borderRadius: 20,
                border: '3px double #2e6040',
                padding: 'clamp(20px, 4vw, 36px)',
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
                position: 'relative',
              }}
            >
              {/* Card Green Header Banner */}
              <div style={{ color: '#2e6040', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', marginBottom: 12 }}>
                ॥ Srirasthu ॥ Subhamasthu ॥ Avignamasthu ॥
              </div>

              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", color: '#a62639', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: 14 }}>
                Wedding Invitation
              </h2>

              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#2d4d36', maxWidth: 520, margin: '0 auto 20px', lineHeight: 1.6 }}>
                We request your most gracious presence and blessings on the auspicious occasion of the marriage of our only daughter
              </p>

              <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(46, 96, 64, 0.06)', border: '1.5px solid rgba(46, 96, 64, 0.2)', marginBottom: 20 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a62639', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Chi.La.Sow.
                </div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, color: '#a62639', marginBottom: 8 }}>
                  Hari Chandana, <span style={{ fontSize: '1rem', color: '#2e6040' }}>B.Tech</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2e6040', fontStyle: 'italic', margin: '8px 0' }}>
                  with
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a62639', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
                  Chi.
                </div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: 900, color: '#a62639', marginBottom: 8 }}>
                  Veera Harsha Vardhan, <span style={{ fontSize: '1rem', color: '#2e6040' }}>B.Tech</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#33553d', fontStyle: 'italic', lineHeight: 1.5, maxWidth: 480, margin: '0 auto' }}>
                  (elder S/o. Sri. Suravarapu Srinivasarao - Smt. Venkata Nagalakshmi, of Kunchanapalli Village, Tadepalli Mandal, Guntur Dist.)
                </div>
              </div>

              {/* Sumuhurtham Box */}
              <div style={{ borderTop: '1px solid rgba(46, 96, 64, 0.3)', borderBottom: '1px solid rgba(46, 96, 64, 0.3)', padding: '16px 0', marginBottom: 20 }}>
                <div style={{ color: '#a62639', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', marginBottom: 6 }}>
                  Sumuhurtham
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a3322' }}>
                  On Friday 28th August 2026 at 10:08 p.m.
                </div>
                <div style={{ fontSize: '0.82rem', color: '#2e6040', fontStyle: 'italic', marginTop: 4 }}>
                  (Shatabhisha Nakshatrayukta, Mesha Lagnam)
                </div>
              </div>

              {/* Venue */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#a62639', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>
                  Venue
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a3322' }}>
                  at Helapuri Lions Club Kalyana Vedika
                </div>
                <div style={{ fontSize: '0.85rem', color: '#2e6040' }}>
                  New Ashoknagar, Gavaravaram, Sanivarapupeta
                </div>
              </div>

              <div style={{ color: '#a62639', fontSize: '0.9rem', fontWeight: 700, marginBottom: 20 }}>
                Dinner: On Friday 28th August 2026 from 7:00 p.m. onwards
              </div>

              <div style={{ borderTop: '1px solid rgba(46, 96, 64, 0.2)', paddingTop: 16, fontSize: '0.82rem', color: '#2e6040' }}>
                <div style={{ fontWeight: 800, color: '#a62639', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Invited by</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a3322', marginTop: 4 }}>
                  Peddada Durgaraju (Raja) - Smt. Ratna Kumari
                </div>
                <div style={{ fontStyle: 'italic', color: '#2e6040', marginTop: 6 }}>
                  "With Best Compliments From Near & Dear"
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TELUGU CARD TRANSCRIPTION */}
          {activeTab === 'telugu_text' && (
            <div
              style={{
                background: 'linear-gradient(145deg, rgba(255, 252, 245, 0.97) 0%, rgba(242, 247, 238, 0.96) 100%)',
                color: '#1a3322',
                borderRadius: 20,
                border: '3px double #2e6040',
                padding: 'clamp(20px, 4vw, 36px)',
                textAlign: 'center',
                fontFamily: "'Noto Sans Telugu', sans-serif",
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div style={{ color: '#2e6040', fontSize: '0.82rem', fontWeight: 700, marginBottom: 12 }}>
                ॥ శ్రీరస్తు ॥  ॥ శుభమస్తు ॥  ॥ అవిఘ్నమస్తు ॥
              </div>

              <h2 style={{ color: '#a62639', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 800, marginBottom: 14 }}>
                పెద్దడ వారి వివాహ ఆహ్వానము
              </h2>

              <div style={{ fontSize: '0.88rem', color: '#2d4d36', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 20px' }}>
                స్వస్తిశ్రీ పరాభవ నామ సంవత్సర శ్రావణ బహుళ పాడ్యమి అనగా ది|| 28-08-2026 శుక్రవారం రాత్రి గం|| 10-08 ని||లకు శతభిష నక్షత్రయుక్త మేషలగ్నమందు శుభముహూర్తము.
              </div>

              <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(46, 96, 64, 0.06)', border: '1.5px solid rgba(46, 96, 64, 0.2)', marginBottom: 20 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a62639', marginBottom: 4 }}>మా ఏకైక కుమార్తె</div>
                <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', fontWeight: 800, color: '#a62639', marginBottom: 8 }}>
                  చి||లా||సౌ|| హరిచందన, <span style={{ fontSize: '1rem', color: '#2e6040' }}>B.Tech</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2e6040', margin: '8px 0' }}>తో</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a62639', marginBottom: 4 }}>వరుడు</div>
                <div style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', fontWeight: 800, color: '#a62639', marginBottom: 8 }}>
                  చి|| వీర హర్షవర్ధన్, <span style={{ fontSize: '1rem', color: '#2e6040' }}>B.Tech</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#33553d', lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                  (గుంటూరు జిల్లా, తాడేపల్లి మండలం, కుంచనపల్లి గ్రాము వాస్తవ్యులు శ్రీ సూరవరపు శ్రీనివాసరావు - శ్రీమతి వెంకట నాగలక్ష్మి దంపతుల ప్రథమ కుమారుడు)
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(46, 96, 64, 0.3)', borderBottom: '1px solid rgba(46, 96, 64, 0.3)', padding: '16px 0', marginBottom: 20 }}>
                <div style={{ color: '#a62639', fontSize: '0.85rem', fontWeight: 800, marginBottom: 4 }}>సుముహూర్తం</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a3322' }}>
                  ది|| 28-08-2026 శుక్రవారం రాత్రి గం|| 10-08 ని||లకు
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#a62639', fontSize: '0.85rem', fontWeight: 800, marginBottom: 4 }}>కల్యాణ వేదిక</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a3322' }}>
                  హేళాపురి లయన్స్ క్లబ్ కల్యాణ వేదిక
                </div>
                <div style={{ fontSize: '0.82rem', color: '#2e6040' }}>
                  న్యూ అశోక్ నగర్, గవరవరం, శనివారపుపేట
                </div>
              </div>

              <div style={{ color: '#a62639', fontSize: '0.88rem', fontWeight: 700, marginBottom: 20 }}>
                విందు: ది|| 28-08-2026 శుక్రవారం రాత్రి 7 గంటల నుండి
              </div>

              <div style={{ borderTop: '1px solid rgba(46, 96, 64, 0.2)', paddingTop: 16, fontSize: '0.82rem', color: '#2e6040' }}>
                <div style={{ fontWeight: 800, color: '#a62639' }}>భవదీయులు:</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1a3322', marginTop: 4 }}>
                  శ్రీ పెద్దడ దుర్గారాజు (రాజా) - శ్రీమతి రత్నకుమారి
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FULLSCREEN ZOOM MODAL IF USER CLICKS ZOOM */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 400,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20, cursor: 'zoom-out',
          }}
        >
          <img
            src={zoomImage}
            alt="Zoomed Card"
            style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', borderRadius: 12 }}
          />
          <button
            onClick={() => setZoomImage(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              padding: '10px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              fontWeight: 700, border: 'none', cursor: 'pointer',
            }}
          >
            Close Fullscreen
          </button>
        </div>
      )}
    </div>
  );
}
