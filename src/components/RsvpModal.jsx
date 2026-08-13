import React, { useState } from 'react';
import { Heart, X, Check } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../firebase';

export function RsvpModal({ isOpen, onClose, lang }) {
  const [step, setStep] = useState(0); // 0 = form, 1 = done
  const [form, setForm] = useState({ name: '', guests: '1', attend: 'yes', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSubmitting(true);

    const rsvpData = {
      name: form.name.trim(),
      attend: form.attend,
      guests: form.guests,
      msg: form.msg.trim(),
      createdAt: serverTimestamp(),
      formattedTime: new Date().toLocaleString(),
    };

    // 1. Post RSVP to Express backend API
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData)
      });
    } catch (apiErr) {
      console.warn("Express backend RSVP API note:", apiErr.message);
    }

    // 2. Save to Firebase Firestore collection 'rsvps'
    if (db) {
      try {
        await addDoc(collection(db, 'rsvps'), rsvpData);
      } catch (err) {
        console.warn("Firebase RSVP write warning:", err.message);
      }
    }

    // Also write to wishes if they included a message
    if (form.msg.trim() && db) {
      try {
        await addDoc(collection(db, 'wishes'), {
          name: form.name.trim(),
          msg: form.msg.trim(),
          createdAt: serverTimestamp(),
          formattedTime: new Date().toLocaleString(),
        });
      } catch (err) {
        console.warn("Firebase Wish write warning:", err.message);
      }
    }

    // Save locally as backup
    const saved = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    localStorage.setItem('wedding-rsvps', JSON.stringify([rsvpData, ...saved]));

    setIsSubmitting(false);
    setStep(1);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.1rem', fontWeight: 700, color: '#f5c842' }}>
              {lang === 'te' ? 'RSVP నిర్ధారణ' : 'RSVP Confirmation'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
              Hari Chandana & Veera Harsha Vardhan Wedding
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {step === 0 ? (
            <form onSubmit={submit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                    {lang === 'te' ? 'మీ పేరు' : 'Full Name'}
                  </label>
                  <input
                    className="guestbook-input"
                    placeholder={lang === 'te' ? 'మీ పూర్తి పేరు' : 'Enter your full name'}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                    {lang === 'te' ? 'హాజరవుతారా?' : 'Will you attend?'}
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[{ v: 'yes', l: lang === 'te' ? 'అవుననే హాజరవుతాను ✓' : "Yes, I'll attend! ✓" }, { v: 'no', l: lang === 'te' ? 'రాలేను' : 'Unable to attend' }].map((opt) => (
                      <button
                        type="button"
                        key={opt.v}
                        onClick={() => setForm({ ...form, attend: opt.v })}
                        style={{
                          flex: 1, padding: '10px 14px', borderRadius: 12, fontSize: '0.82rem', fontWeight: 700,
                          cursor: 'pointer', transition: 'all 0.3s',
                          background: form.attend === opt.v
                            ? (opt.v === 'yes' ? 'rgba(245,200,66,0.2)' : 'rgba(255,107,157,0.15)')
                            : 'rgba(255,255,255,0.05)',
                          border: form.attend === opt.v
                            ? `1.5px solid ${opt.v === 'yes' ? '#f5c842' : '#ff6b9d'}`
                            : '1px solid rgba(255,255,255,0.1)',
                          color: form.attend === opt.v
                            ? (opt.v === 'yes' ? '#f5c842' : '#ff6b9d')
                            : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </div>

                {form.attend === 'yes' && (
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                      {lang === 'te' ? 'అతిథుల సంఖ్య' : 'Number of Guests'}
                    </label>
                    <input
                      type="number"
                      min="1" max="10"
                      className="guestbook-input"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                    {lang === 'te' ? 'మీ దీవెనలు (ఐచ్ఛికం)' : 'Your Blessings (Optional)'}
                  </label>
                  <textarea
                    className="guestbook-textarea"
                    placeholder={lang === 'te' ? 'మీ శుభాకాంక్షలు...' : 'Share your heartfelt wishes...'}
                    rows={3}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-rsvp" style={{ width: '100%', justifyContent: 'center' }}>
                  <Heart size={15} fill="currentColor" />
                  {isSubmitting
                    ? (lang === 'te' ? 'పంపుతోంది...' : 'Sending to Firestore...')
                    : (lang === 'te' ? 'RSVP నిర్ధారించండి' : 'Confirm RSVP')}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5c842, #ff6b9d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 0 40px rgba(245,200,66,0.4)',
              }}>
                <Check size={34} color="#04011a" />
              </div>
              <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.3rem', fontWeight: 700, color: '#f5c842', marginBottom: 12 }}>
                {lang === 'te' ? 'ధన్యవాదాలు!' : 'Thank You!'}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {form.attend === 'yes'
                  ? (lang === 'te'
                      ? `${form.name} గారు, మీరు హాజరవుతున్నందుకు చాలా సంతోషం! మీ ఆగమనం కోసం ఎదురుచూస్తున్నాం.`
                      : `Thank you ${form.name}! We're thrilled you'll be joining us to celebrate. See you on 28th August! 🎊`)
                  : (lang === 'te'
                      ? 'మీరు రాలేకపోతున్నందుకు బాధగా ఉంది. మీ దీవెనలకు ధన్యవాదాలు!'
                      : "We'll miss you, but thank you so much for your kind wishes! You'll be in our hearts.")}
              </p>
              <button className="btn-rsvp" onClick={onClose} style={{ marginTop: 24 }}>
                <Heart size={14} fill="currentColor" /> Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
