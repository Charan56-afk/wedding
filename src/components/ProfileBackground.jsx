import React, { useEffect, useRef } from 'react';

// Full-screen animated canvas bg for profile pages
export default function ProfileBackground({ type }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isBride = type === 'bride';

    // Color palettes
    const palette = isBride
      ? { main: [220, 30, 100], accent: [255, 107, 157], secondary: [180, 20, 80], gold: [245, 200, 66] }
      : { main: [20, 60, 200],  accent: [100, 160, 255], secondary: [10, 30, 160], gold: [245, 200, 66] };

    // Stars
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.9 + 0.1,
      speed: Math.random() * 0.5 + 0.05,
    }));

    // Bokeh
    const bokeh = Array.from({ length: 16 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 180 + 60,
      opacity: Math.random() * 0.12 + 0.02,
      color: Math.random() > 0.5
        ? [palette.main[0], palette.main[1], palette.main[2]]
        : [palette.accent[0], palette.accent[1], palette.accent[2]],
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Petals
    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -80 - Math.random() * window.innerHeight,
      w: Math.random() * 14 + 5,
      h: Math.random() * 10 + 4,
      opacity: Math.random() * 0.4 + 0.05,
      vx: (Math.random() - 0.5) * 0.7,
      vy: Math.random() * 0.9 + 0.2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.025,
      sway: Math.random() * 0.7,
      swayPhase: Math.random() * Math.PI * 2,
    }));

    // Mandalas
    const mandalas = [
      { x: w * 0.1, y: h * 0.15, r: 120, speed: 0.003,  opacity: 0.07, color: palette.accent },
      { x: w * 0.9, y: h * 0.75, r: 90,  speed: -0.004, opacity: 0.06, color: palette.main  },
      { x: w * 0.5, y: h * 0.9,  r: 70,  speed: 0.005,  opacity: 0.05, color: palette.gold  },
    ];
    const mandalaAngles = mandalas.map(() => 0);

    const drawMandala = (x, y, r, angle, opacity, color) => {
      ctx.save();
      ctx.translate(x, y); ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      for (let i = 0; i < 8; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.4, -r * 0.18, r * 0.55, r * 0.18, 0, r * 0.95);
        ctx.bezierCurveTo(-r * 0.55, r * 0.18, -r * 0.4, -r * 0.18, 0, 0);
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},1)`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      [0.25, 0.55, 0.8].forEach(s => {
        ctx.beginPath(); ctx.arc(0, 0, r * s, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.4)`;
        ctx.lineWidth = 0.5; ctx.stroke();
      });
      ctx.restore();
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Bokeh
      bokeh.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.pulse += 0.007;
        if (b.x < -b.r) b.x = w + b.r; if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r; if (b.y > h + b.r) b.y = -b.r;
        const pr = b.r + Math.sin(b.pulse) * 20;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, pr);
        g.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.opacity})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, pr, 0, Math.PI * 2); ctx.fill();
      });

      // Mandalas
      mandalas.forEach((m, i) => {
        mandalaAngles[i] += m.speed;
        drawMandala(m.x, m.y, m.r, mandalaAngles[i], m.opacity, m.color);
      });

      // Stars
      stars.forEach((s, i) => {
        const f = s.opacity + Math.sin(frame * s.speed * 0.7 + i) * 0.22;
        const a = Math.min(1, Math.max(0, f));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });

      // Petals
      petals.forEach(p => {
        p.swayPhase += 0.015;
        p.x += p.vx + Math.sin(p.swayPhase) * p.sway;
        p.y += p.vy; p.angle += p.spin;
        if (p.y > h + 80) { p.y = -60; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w * 0.5, p.h, 0, 0, Math.PI * 2);
        const pg = ctx.createRadialGradient(0, 0, 0, 0, 0, p.h);
        if (isBride) {
          pg.addColorStop(0, 'rgba(255,185,215,1)');
          pg.addColorStop(0.5, 'rgba(255,100,160,0.75)');
          pg.addColorStop(1, 'rgba(200,30,90,0.15)');
        } else {
          pg.addColorStop(0, 'rgba(150,200,255,1)');
          pg.addColorStop(0.5, 'rgba(80,140,255,0.75)');
          pg.addColorStop(1, 'rgba(20,60,200,0.15)');
        }
        ctx.fillStyle = pg; ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, [type]);

  const isBride = type === 'bride';

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: isBride
          ? 'linear-gradient(160deg, #1a0010 0%, #3d0025 30%, #1a0020 60%, #05000e 100%)'
          : 'linear-gradient(160deg, #000d2e 0%, #001560 30%, #000e2a 60%, #05000e 100%)',
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      />
    </>
  );
}
