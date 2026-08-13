import React, { useState } from 'react';
import { X, Sparkles, ZoomIn } from 'lucide-react';

const PLACEHOLDER_IMAGES = [
  { src: '/assets/couple_temple.jpg', alt: 'Couple at Temple', caption: 'Sacred Beginnings — Temple Photoshoot', span: true },
  { src: '/assets/royal_couple.png', alt: 'Couple Portrait', caption: 'Hari Chandana & Veera Harsha Vardhan' },
  { src: '/assets/royal_mandap.png', alt: 'Royal Mandap', caption: 'The Sacred Mandap' },
  { src: '/assets/divine_motif.png', alt: 'Divine Motif', caption: 'Divine Blessings' },
];

export function Gallery({ lang }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            {lang === 'te' ? 'చిత్రాలు' : 'Gallery'}
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'ఫోటో గ్యాలరీ' : 'Photo Gallery'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te'
              ? 'మరింత అందమైన క్షణాలు త్వరలో...'
              : 'Beautiful moments captured forever — more photos coming soon!'}
          </p>
        </div>

        <div className="gallery-grid" style={{ gridTemplateRows: 'auto' }}>
          {PLACEHOLDER_IMAGES.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(img)}
              style={{
                cursor: 'pointer',
                borderRadius: 20,
                border: `1px solid ${img.span ? 'rgba(245,200,66,0.4)' : 'rgba(245,200,66,0.2)'}`,
                overflow: 'hidden',
                aspectRatio: img.span ? '3/4' : '1',
                position: 'relative',
                gridRow: img.span ? 'span 2' : 'span 1',
                boxShadow: img.span ? '0 0 40px rgba(245,200,66,0.15)' : 'none',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.6s ease', display: 'block' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.07)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(255,107,157,0.08))';
                  e.target.parentNode.style.display = 'flex';
                  e.target.parentNode.style.alignItems = 'center';
                  e.target.parentNode.style.justifyContent = 'center';
                }}
              />
              {img.span && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  padding: '5px 12px', borderRadius: 100,
                  background: 'rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.5)',
                  fontSize: '0.62rem', fontWeight: 800, color: '#f5c842',
                  letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans',
                  backdropFilter: 'blur(8px)',
                }}>⭐ Featured</div>
              )}
              <div className="gallery-overlay">
                <ZoomIn size={32} color="rgba(255,255,255,0.9)" />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px', background: 'linear-gradient(0deg, rgba(4,1,26,0.92) 0%, transparent 100%)' }}>
                <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>{img.caption}</div>
              </div>
            </div>
          ))}

          {/* Coming soon card */}
          <div
            style={{
              borderRadius: 20, aspectRatio: '1', border: '1px dashed rgba(245,200,66,0.25)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'rgba(245,200,66,0.03)',
            }}
          >
            <Sparkles size={28} color="rgba(245,200,66,0.4)" />
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(245,200,66,0.5)', textAlign: 'center' }}>
              More photos<br />coming soon...
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="modal-backdrop"
          onClick={() => setLightbox(null)}
          style={{ zIndex: 300 }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', borderRadius: 20, overflow: 'hidden' }}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block', borderRadius: 20 }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '16px 20px', background: 'linear-gradient(0deg, rgba(4,1,26,0.9) 0%, transparent 100%)',
              fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, color: '#fff'
            }}>
              {lightbox.caption}
            </div>
            <button
              className="modal-close"
              onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: 12, right: 12 }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
