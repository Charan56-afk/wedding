import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Calendar, Sparkles } from 'lucide-react';

const ADDRESS = 'Helapuri Lions Club Kalyana Vedika, New Ashoknagar, Gavaravaram, Sanivarapupeta';
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const CAL_LINK = `https://www.google.com/calendar/render?action=TEMPLATE&text=Hari+Chandana+%26+Harsha+Wedding&dates=20260828T164800Z%2F20260828T184800Z&details=Sumuhurtham+at+10:08+PM&location=${encodeURIComponent(ADDRESS)}`;

export function VenueMap({ lang }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="venue" style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-eyebrow">
            <MapPin size={14} />
            {lang === 'te' ? 'వేదిక వివరాలు' : 'Venue Details'}
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'వివాహ వేదిక' : 'Wedding Venue'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te'
              ? 'హేలాపురి లయన్స్ క్లబ్ కళ్యాణ వేదిక, గవరవరం, శనివారపుపేట'
              : 'Helapuri Lions Club Kalyana Vedika, New Ashoknagar, Gavaravaram, Sanivarapupeta'}
          </p>
        </div>

        <div className="venue-grid">
          {/* Map embed placeholder with styled overlay */}
          <div className="venue-map-placeholder glass-card-gold" style={{ position: 'relative', overflow: 'hidden', minHeight: 320 }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(168,85,247,0.08) 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg,#f5c842,#ff6b9d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 50px rgba(245,200,66,0.4)',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}>
                <MapPin size={34} color="#04011a" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1rem', fontWeight: 700, color: '#f5c842', marginBottom: 8 }}>
                  Helapuri Lions Club
                </div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgba(245,200,66,0.7)', marginBottom: 16 }}>
                  Kalyana Vedika
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  New Ashoknagar, Gavaravaram<br />Sanivarapupeta
                </div>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn-rsvp" style={{ marginTop: 8 }}>
                <Navigation size={14} /> {lang === 'te' ? 'గూగుల్ మ్యాప్ తెరవండి' : 'Open Google Maps'}
              </a>
            </div>
          </div>

          {/* Venue info panel */}
          <div className="venue-details">
            <div className="glass-card" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={16} color="#f5c842" />
                </div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgba(245,200,66,0.9)' }}>
                  Venue Address
                </div>
              </div>
              <div style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, lineHeight: 1.6, marginBottom: 8 }}>
                Helapuri Lions Club Kalyana Vedika
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                New Ashoknagar, Gavaravaram, Sanivarapupeta
              </div>
              {lang === 'te' && (
                <div style={{ fontFamily: 'Noto Sans Telugu', fontSize: '0.8rem', color: 'rgba(245,200,66,0.5)', marginTop: 8, lineHeight: 1.7 }}>
                  హేలాపురి లయన్స్ క్లబ్ కళ్యాణ వేదిక, గవరవరం, శనివారపుపేట
                </div>
              )}
            </div>

            <div className="glass-card" style={{ padding: '24px 28px' }}>
              <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgba(245,200,66,0.9)', marginBottom: 14 }}>
                Event Timings
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { t: '7:00 PM', e: 'Grand Dinner begins', c: '#f5c842' },
                  { t: '10:08 PM', e: 'Sumuhurtham (Auspicious Wedding)', c: '#ff6b9d' },
                ].map((ev) => (
                  <div key={ev.t} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, color: ev.c, minWidth: 72, fontSize: '0.9rem' }}>{ev.t}</div>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${ev.c}40, transparent)` }} />
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 600 }}>{ev.e}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="venue-action-btn" onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Address Copied!' : (lang === 'te' ? 'అడ్రస్ కాపీ చేయండి' : 'Copy Address')}
              </button>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="venue-action-btn">
                <Calendar size={15} />
                {lang === 'te' ? 'Google Calendar లో Add చేయండి' : 'Add to Google Calendar'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
