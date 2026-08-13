import React, { useEffect, useRef } from 'react';

export default function Background3D() {
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

    /* ─────────────── LAYER 1 : STARS (300 multi-layer parallax) ─────────────── */
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.2,
      opacity: Math.random() * 0.85 + 0.1,
      speed: Math.random() * 0.6 + 0.04,
      layer: Math.floor(Math.random() * 3),
    }));

    /* ─────────────── LAYER 2 : SHOOTING STARS (8) ─────────────── */
    const createShot = () => ({
      x: Math.random() * w * 0.7,
      y: Math.random() * h * 0.35,
      len: Math.random() * 220 + 100,
      speed: Math.random() * 12 + 7,
      angle: Math.PI / 5 + (Math.random() - 0.5) * 0.4,
      active: false, progress: 0,
      timer: Math.random() * 280 + 40,
    });
    const shootingStars = Array.from({ length: 8 }, createShot);

    /* ─────────────── LAYER 3 : BOKEH BLOBS (22) ─────────────── */
    const bokeh = Array.from({ length: 22 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 200 + 60,
      opacity: Math.random() * 0.1 + 0.02,
      color: [[245,200,66],[255,107,157],[168,85,247],[34,211,238],[255,180,100]][Math.floor(Math.random()*5)],
      vx: (Math.random()-0.5)*0.22, vy: (Math.random()-0.5)*0.22,
      pulse: Math.random()*Math.PI*2,
    }));

    /* ─────────────── LAYER 4 : ROSE PETALS (35) ─────────────── */
    const petals = Array.from({ length: 35 }, () => ({
      x: Math.random()*window.innerWidth, y: -80-Math.random()*window.innerHeight,
      w: Math.random()*14+6, h: Math.random()*10+4,
      opacity: Math.random()*0.35+0.06,
      vx: (Math.random()-0.5)*0.7, vy: Math.random()*0.9+0.25,
      angle: Math.random()*Math.PI*2, spin: (Math.random()-0.5)*0.024,
      sway: Math.random()*0.7, swayPhase: Math.random()*Math.PI*2,
    }));

    /* ─────────────── LAYER 5 : MANDALAS (4) ─────────────── */
    const mandalas = [
      { x:w*0.1,  y:h*0.2,  r:140, speed:0.0025, opacity:0.055, color:[245,200,66],  petals:8 },
      { x:w*0.9,  y:h*0.7,  r:110, speed:-0.003, opacity:0.05,  color:[255,107,157], petals:12 },
      { x:w*0.5,  y:h*0.88, r:80,  speed:0.004,  opacity:0.04,  color:[168,85,247],  petals:6 },
      { x:w*0.75, y:h*0.15, r:65,  speed:-0.005, opacity:0.04,  color:[34,211,238],  petals:10 },
    ];
    const mandalaAngles = mandalas.map(()=>0);

    /* ─────────────── LAYER 6 : DASHED RINGS (4) ─────────────── */
    const rings = [
      { x:w*0.08, y:h*0.08, r:220, opacity:0.035, color:[245,200,66],  speed:0.0018 },
      { x:w*0.92, y:h*0.92, r:260, opacity:0.03,  color:[255,107,157], speed:-0.0013 },
      { x:w*0.5,  y:h*0.12, r:180, opacity:0.04,  color:[168,85,247],  speed:0.0025 },
      { x:w*0.15, y:h*0.85, r:140, opacity:0.03,  color:[34,211,238],  speed:-0.002 },
    ];
    const ringAngles = rings.map(()=>0);

    /* ─────────────── LAYER 7 : CONSTELLATION NODES (30) ─────────────── */
    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
      r: Math.random()*1.6+0.5,
    }));

    /* ─────────────── LAYER 8 : FIREFLIES / SPIRIT ORBS (25) ─────────────── */
    const fireflies = Array.from({ length: 25 }, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      r: Math.random()*3+1.5,
      color: [[245,200,66],[255,107,157],[168,85,247]][Math.floor(Math.random()*3)],
      phase: Math.random()*Math.PI*2,
      phaseSpeedX: Math.random()*0.008+0.003,
      phaseSpeedY: Math.random()*0.007+0.003,
      ampX: Math.random()*60+20,
      ampY: Math.random()*50+20,
      cx: Math.random()*window.innerWidth,
      cy: Math.random()*window.innerHeight,
      blinkPhase: Math.random()*Math.PI*2,
      blinkSpeed: Math.random()*0.04+0.015,
    }));

    /* ─────────────── LAYER 9 : SACRED GEOMETRY HEXAGONS (6) ─────────────── */
    const hexagons = Array.from({ length: 6 }, () => ({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*80+40,
      angle: Math.random()*Math.PI*2,
      speed: (Math.random()-0.5)*0.004,
      opacity: Math.random()*0.06+0.015,
      color: [[245,200,66],[255,107,157],[168,85,247]][Math.floor(Math.random()*3)],
      vx: (Math.random()-0.5)*0.1, vy: (Math.random()-0.5)*0.1,
    }));

    /* ─────────────── LAYER 10 : AURORA WAVE BANDS (3) ─────────────── */
    const aurora = Array.from({ length: 3 }, (_, i) => ({
      yBase: h * (0.25 + i * 0.25),
      amp: 40 + i * 20,
      freq: 0.003 + i * 0.001,
      phase: Math.random()*Math.PI*2,
      speed: 0.004 + i*0.002,
      color: [[120,40,220],[200,30,80],[30,60,200]][i],
      opacity: 0.025 + i*0.01,
    }));

    /* ─────────────── LAYER 11 : GOLD DUST SPARKS (60) ─────────────── */
    const sparks = Array.from({ length: 60 }, () => ({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*1.2+0.3,
      opacity: Math.random()*0.5+0.1,
      phase: Math.random()*Math.PI*2,
      speed: Math.random()*0.06+0.02,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    }));

    /* ─────────────── LAYER 12 : LOTUS FLOWERS (4) ─────────────── */
    const lotuses = [
      { x:w*0.05, y:h*0.5,  r:55, angle:0, speed:0.002,  opacity:0.055, color:[255,107,157] },
      { x:w*0.95, y:h*0.4,  r:45, angle:0, speed:-0.003, opacity:0.05,  color:[245,200,66] },
      { x:w*0.3,  y:h*0.02, r:35, angle:0, speed:0.004,  opacity:0.04,  color:[168,85,247] },
      { x:w*0.7,  y:h*0.98, r:40, angle:0, speed:-0.002, opacity:0.045, color:[34,211,238] },
    ];

    /* ═══════════════════════════ DRAW HELPERS ═══════════════════════════ */

    const drawMandala = (x, y, r, angle, opacity, color, petalCount) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      for (let i = 0; i < petalCount; i++) {
        ctx.rotate((Math.PI*2)/petalCount);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(r*0.45,-r*0.18, r*0.55,r*0.18, 0,r*0.98);
        ctx.bezierCurveTo(-r*0.55,r*0.18, -r*0.45,-r*0.18, 0,0);
        ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},1)`;
        ctx.lineWidth=0.7; ctx.stroke();
      }
      // rings
      [0.28,0.55,0.82].forEach(scale => {
        ctx.beginPath();
        ctx.arc(0,0,r*scale,0,Math.PI*2);
        ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},${0.5-scale*0.3})`;
        ctx.lineWidth=0.5; ctx.stroke();
      });
      ctx.restore();
    };

    const drawHexagon = (x, y, r, angle, opacity, color) => {
      ctx.save();
      ctx.translate(x,y); ctx.rotate(angle);
      ctx.globalAlpha=opacity;
      // outer hex
      ctx.beginPath();
      for(let i=0;i<6;i++) {
        const a = (Math.PI/3)*i;
        i===0 ? ctx.moveTo(r*Math.cos(a),r*Math.sin(a)) : ctx.lineTo(r*Math.cos(a),r*Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},1)`;
      ctx.lineWidth=0.8; ctx.stroke();
      // inner hex
      ctx.beginPath();
      for(let i=0;i<6;i++) {
        const a = (Math.PI/3)*i + Math.PI/6;
        i===0 ? ctx.moveTo(r*0.55*Math.cos(a),r*0.55*Math.sin(a)) : ctx.lineTo(r*0.55*Math.cos(a),r*0.55*Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},0.5)`;
      ctx.lineWidth=0.5; ctx.stroke();
      // center star lines
      for(let i=0;i<6;i++) {
        const a = (Math.PI/3)*i;
        ctx.beginPath();
        ctx.moveTo(0,0); ctx.lineTo(r*Math.cos(a),r*Math.sin(a));
        ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},0.2)`;
        ctx.lineWidth=0.4; ctx.stroke();
      }
      ctx.restore();
    };

    const drawRing = (x, y, r, angle, opacity, color) => {
      ctx.save();
      ctx.translate(x,y); ctx.rotate(angle);
      ctx.globalAlpha=opacity;
      ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},1)`;
      ctx.lineWidth=1; ctx.setLineDash([5,20]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(0,0,r*0.72,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},0.35)`;
      ctx.lineWidth=0.5; ctx.setLineDash([3,15]); ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    };

    const drawLotus = (x, y, r, angle, opacity, color) => {
      ctx.save();
      ctx.translate(x,y); ctx.rotate(angle);
      ctx.globalAlpha=opacity;
      const petalCount=8;
      for(let i=0;i<petalCount;i++) {
        const a = (Math.PI*2/petalCount)*i;
        ctx.save();
        ctx.rotate(a);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(r*0.3,-r*0.15, r*0.3,r*0.85, 0,r);
        ctx.bezierCurveTo(-r*0.3,r*0.85, -r*0.3,-r*0.15, 0,0);
        ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},1)`;
        ctx.lineWidth=0.7; ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0,0,r*0.18,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${color[0]},${color[1]},${color[2]},0.6)`;
      ctx.lineWidth=0.8; ctx.stroke();
      ctx.restore();
    };

    /* ═══════════════════════════ MAIN LOOP ═══════════════════════════ */
    let frame=0;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      frame++;

      /* — L10: AURORA WAVE BANDS (bottom layer after clear) — */
      aurora.forEach(a => {
        a.phase += a.speed;
        ctx.save();
        ctx.globalAlpha = a.opacity;
        ctx.beginPath();
        ctx.moveTo(0, a.yBase);
        for(let x2=0; x2<=w; x2+=4) {
          const y2 = a.yBase + Math.sin(x2*a.freq + a.phase)*a.amp
                              + Math.sin(x2*a.freq*0.5 + a.phase*1.3)*a.amp*0.4;
          ctx.lineTo(x2, y2);
        }
        ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
        const grad = ctx.createLinearGradient(0, a.yBase-a.amp, 0, a.yBase+a.amp*2);
        grad.addColorStop(0,'transparent');
        grad.addColorStop(0.4,`rgba(${a.color[0]},${a.color[1]},${a.color[2]},0.5)`);
        grad.addColorStop(1,'transparent');
        ctx.fillStyle=grad; ctx.fill();
        ctx.restore();
      });

      /* — L3: BOKEH BLOBS — */
      bokeh.forEach(b => {
        b.x+=b.vx; b.y+=b.vy; b.pulse+=0.007;
        if(b.x<-b.r) b.x=w+b.r; if(b.x>w+b.r) b.x=-b.r;
        if(b.y<-b.r) b.y=h+b.r; if(b.y>h+b.r) b.y=-b.r;
        const pr = b.r + Math.sin(b.pulse)*22;
        const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,pr);
        g.addColorStop(0,`rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.opacity})`);
        g.addColorStop(0.5,`rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.opacity*0.45})`);
        g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(b.x,b.y,pr,0,Math.PI*2); ctx.fill();
      });

      /* — L6: DASHED RINGS — */
      rings.forEach((ring,i) => {
        ringAngles[i]+=ring.speed;
        drawRing(ring.x,ring.y,ring.r,ringAngles[i],ring.opacity,ring.color);
      });

      /* — L12: LOTUS FLOWERS — */
      lotuses.forEach(l => {
        l.angle+=l.speed;
        drawLotus(l.x,l.y,l.r,l.angle,l.opacity,l.color);
      });

      /* — L9: HEXAGONS — */
      hexagons.forEach(hx => {
        hx.x+=hx.vx; hx.y+=hx.vy; hx.angle+=hx.speed;
        if(hx.x<-hx.r) hx.x=w+hx.r; if(hx.x>w+hx.r) hx.x=-hx.r;
        if(hx.y<-hx.r) hx.y=h+hx.r; if(hx.y>h+hx.r) hx.y=-hx.r;
        drawHexagon(hx.x,hx.y,hx.r,hx.angle,hx.opacity,hx.color);
      });

      /* — L5: MANDALAS — */
      mandalas.forEach((m,i) => {
        mandalaAngles[i]+=m.speed;
        drawMandala(m.x,m.y,m.r,mandalaAngles[i],m.opacity,m.color,m.petals);
      });

      /* — L7: CONSTELLATION — */
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0||n.x>w) n.vx*=-1;
        if(n.y<0||n.y>h) n.vy*=-1;
      });
      for(let i=0;i<nodes.length;i++) {
        for(let j=i+1;j<nodes.length;j++) {
          const d=Math.hypot(nodes[i].x-nodes[j].x, nodes[i].y-nodes[j].y);
          if(d<175) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
            ctx.strokeStyle=`rgba(245,200,66,${(1-d/175)*0.13})`;
            ctx.lineWidth=0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach((n,i) => {
        const f=Math.sin(frame*0.028+i)*0.3+0.5;
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*5);
        g.addColorStop(0,`rgba(245,200,66,${f*0.18})`); g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(n.x,n.y,n.r*5,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`rgba(245,200,66,${f*0.7})`;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
      });

      /* — L8: FIREFLIES — */
      fireflies.forEach((ff,i) => {
        ff.phase+=0.015;
        const blink=Math.sin(ff.blinkPhase+=ff.blinkSpeed)*0.5+0.6;
        ff.x=ff.cx+Math.sin(ff.phase*ff.phaseSpeedX*80)*ff.ampX;
        ff.y=ff.cy+Math.sin(ff.phase*ff.phaseSpeedY*80+1.2)*ff.ampY;
        if(ff.x<0) ff.x=0; if(ff.x>w) ff.x=w;
        if(ff.y<0) ff.y=0; if(ff.y>h) ff.y=h;
        const g=ctx.createRadialGradient(ff.x,ff.y,0,ff.x,ff.y,ff.r*8);
        g.addColorStop(0,`rgba(${ff.color[0]},${ff.color[1]},${ff.color[2]},${blink*0.5})`);
        g.addColorStop(0.4,`rgba(${ff.color[0]},${ff.color[1]},${ff.color[2]},${blink*0.15})`);
        g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(ff.x,ff.y,ff.r*8,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`rgba(255,255,255,${blink*0.9})`;
        ctx.beginPath(); ctx.arc(ff.x,ff.y,ff.r*0.7,0,Math.PI*2); ctx.fill();
      });

      /* — L1: STARS — */
      stars.forEach((s,i) => {
        const f=s.opacity+Math.sin(frame*s.speed*0.7+i)*0.22;
        const a=Math.min(1,Math.max(0,f));
        if(s.r>1.3) {
          const sg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4.5);
          sg.addColorStop(0,`rgba(255,255,255,${a*0.35})`); sg.addColorStop(1,'transparent');
          ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(s.x,s.y,s.r*4.5,0,Math.PI*2); ctx.fill();
        }
        // 4-point star shape for bright stars
        if(s.r>1.6) {
          ctx.save();
          ctx.translate(s.x,s.y);
          ctx.fillStyle=`rgba(255,255,240,${a*0.8})`;
          const rs=s.r*1.4;
          for(let p=0;p<4;p++) {
            ctx.rotate(Math.PI/2);
            ctx.beginPath(); ctx.moveTo(0,0);
            ctx.lineTo(rs*0.25,rs*0.25); ctx.lineTo(0,rs); ctx.lineTo(-rs*0.25,rs*0.25);
            ctx.closePath(); ctx.fill();
          }
          ctx.restore();
        } else {
          ctx.fillStyle=`rgba(255,255,255,${a})`;
          ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
        }
      });

      /* — L11: GOLD DUST SPARKS — */
      sparks.forEach((sp,i) => {
        sp.x+=sp.vx; sp.y+=sp.vy; sp.phase+=sp.speed;
        if(sp.x<0) sp.x=w; if(sp.x>w) sp.x=0;
        if(sp.y<0) sp.y=h; if(sp.y>h) sp.y=0;
        const a=(Math.sin(sp.phase)*0.4+0.5)*sp.opacity;
        ctx.fillStyle=`rgba(245,200,66,${a})`;
        ctx.beginPath(); ctx.arc(sp.x,sp.y,sp.r,0,Math.PI*2); ctx.fill();
      });

      /* — L2: SHOOTING STARS — */
      shootingStars.forEach(ss => {
        ss.timer--;
        if(ss.timer<=0 && !ss.active) {
          ss.x=Math.random()*w*0.7; ss.y=Math.random()*h*0.4;
          ss.len=Math.random()*220+100; ss.speed=Math.random()*12+7;
          ss.angle=Math.PI/5+(Math.random()-0.5)*0.4;
          ss.active=true; ss.progress=0;
        }
        if(ss.active) {
          ss.progress++;
          const tot=42; const t=ss.progress/tot;
          const op=t<0.3?t/0.3:t>0.7?(1-t)/0.3:1;
          const sx=ss.x+Math.cos(ss.angle)*ss.speed*ss.progress;
          const sy=ss.y+Math.sin(ss.angle)*ss.speed*ss.progress;
          const ex=sx-Math.cos(ss.angle)*ss.len;
          const ey=sy-Math.sin(ss.angle)*ss.len;
          const g=ctx.createLinearGradient(ex,ey,sx,sy);
          g.addColorStop(0,'transparent');
          g.addColorStop(0.5,`rgba(255,255,255,${op*0.5})`);
          g.addColorStop(1,`rgba(245,200,66,${op})`);
          ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(sx,sy);
          ctx.strokeStyle=g; ctx.lineWidth=2.2; ctx.stroke();
          // head glow
          const hg=ctx.createRadialGradient(sx,sy,0,sx,sy,8);
          hg.addColorStop(0,`rgba(255,255,200,${op})`); hg.addColorStop(1,'transparent');
          ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(sx,sy,8,0,Math.PI*2); ctx.fill();
          if(ss.progress>=tot) { ss.active=false; ss.timer=Math.random()*200+80; }
        }
      });

      /* — L4: ROSE PETALS — */
      petals.forEach(p => {
        p.swayPhase+=0.015;
        p.x+=p.vx+Math.sin(p.swayPhase)*p.sway;
        p.y+=p.vy; p.angle+=p.spin;
        if(p.y>h+80) { p.y=-60; p.x=Math.random()*w; }
        ctx.save();
        ctx.translate(p.x,p.y); ctx.rotate(p.angle);
        ctx.globalAlpha=p.opacity;
        ctx.beginPath();
        ctx.ellipse(0,0,p.w*0.5,p.h,0,0,Math.PI*2);
        const pg=ctx.createRadialGradient(0,0,0,0,0,p.h);
        pg.addColorStop(0,'rgba(255,185,215,1)');
        pg.addColorStop(0.5,'rgba(255,120,175,0.75)');
        pg.addColorStop(1,'rgba(255,70,130,0.15)');
        ctx.fillStyle=pg; ctx.fill();
        ctx.restore();
      });

      /* — NEBULA / DUST OVERLAY — */
      const nx=Math.sin(frame*0.0009)*35, ny=Math.cos(frame*0.0007)*25;
      [[w*0.3+nx, h*0.35+ny, [100,40,210]], [w*0.7-nx, h*0.6-ny, [200,30,80]], [w*0.15+ny, h*0.75+nx, [30,60,210]]].forEach(([cx,cy,col])=>{
        const nb=ctx.createRadialGradient(cx,cy,0,cx,cy,w*0.42);
        nb.addColorStop(0,`rgba(${col[0]},${col[1]},${col[2]},0.04)`);
        nb.addColorStop(0.5,`rgba(${col[0]},${col[1]},${col[2]},0.015)`);
        nb.addColorStop(1,'transparent');
        ctx.fillStyle=nb; ctx.fillRect(0,0,w,h);
      });

      animId=requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top:0, left:0,
        width:'100%', height:'100%',
        zIndex:1, pointerEvents:'none',
      }}
    />
  );
}
