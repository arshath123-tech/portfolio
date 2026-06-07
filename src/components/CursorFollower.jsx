import React, { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const canvasRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const themeColorRef = useRef({ rgb: '6, 182, 212', secondaryRgb: '139, 92, 246' });
  const isHoveringRef = useRef(false);
  const pulseScaleRef = useRef(1);
  const pulseDirRef = useRef(1);
  const mainRotRef = useRef(0);

  useEffect(() => {
    // Disable if user prefers reduced motion or is on touch device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;
    let sparkles = [];

    // Helper to get active theme color safely
    const updateThemeColor = () => {
      try {
        const classList = document.documentElement.classList;
        if (classList.contains('theme-pink')) {
          themeColorRef.current.rgb = '236, 72, 153';
          themeColorRef.current.secondaryRgb = '245, 158, 11';
        } else if (classList.contains('theme-green')) {
          themeColorRef.current.rgb = '16, 185, 129';
          themeColorRef.current.secondaryRgb = '6, 182, 212';
        } else if (classList.contains('theme-orange')) {
          themeColorRef.current.rgb = '249, 115, 22';
          themeColorRef.current.secondaryRgb = '236, 72, 153';
        } else {
          // Default cyan
          themeColorRef.current.rgb = '6, 182, 212';
          themeColorRef.current.secondaryRgb = '139, 92, 246';
        }
      } catch (err) {
        console.error('Error updating theme color in CursorFollower:', err);
      }
    };
    updateThemeColor();

    const observer = new MutationObserver(() => {
      updateThemeColor();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Click triggers extra sparklesburst
    const createBurst = (x, y) => {
      const rgb = isHoveringRef.current ? themeColorRef.current.secondaryRgb : themeColorRef.current.rgb;
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1.5;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 4,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.1,
          rgb
        });
      }
    };

    class Sparkle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Float slightly outward
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.6 + 0.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.2; // slight upward draft
        this.size = Math.random() * 10 + 5;
        this.alpha = 1;
        this.decay = Math.random() * 0.025 + 0.015;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.06;
        this.rgb = isHoveringRef.current ? themeColorRef.current.secondaryRgb : themeColorRef.current.rgb;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.angle += this.spin;
      }
    }

    // Helper to draw a 4-pointed star sparkle
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      // Spawn star sparkles as trail
      // High spawn rate when hovering clickable elements
      const spawnCount = isHoveringRef.current ? 2 : 1;
      for (let i = 0; i < spawnCount; i++) {
        if (Math.random() < 0.8) {
          // Add small coordinate noise to make the trail look organic
          const nx = e.clientX + (Math.random() - 0.5) * 6;
          const ny = e.clientY + (Math.random() - 0.5) * 6;
          sparkles.push(new Sparkle(nx, ny));
        }
      }
    };

    // Click handler to trigger star explosion
    const onMouseDown = (e) => {
      createBurst(e.clientX, e.clientY);
    };

    // Hover detection safely
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function' || typeof target.getAttribute !== 'function') return;
      
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.skills-tab') ||
        target.closest('.orbital-icon') ||
        target.closest('.contact-card') ||
        target.closest('.nav-logo') ||
        target.getAttribute('role') === 'button';

      if (isClickable) {
        isHoveringRef.current = true;
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function' || typeof target.getAttribute !== 'function') return;
      
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.skills-tab') ||
        target.closest('.orbital-icon') ||
        target.closest('.contact-card') ||
        target.closest('.nav-logo') ||
        target.getAttribute('role') === 'button';

      if (isClickable) {
        isHoveringRef.current = false;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Star Sparkles Trail
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.update();

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        // Draw rotated star sparkle
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        const color = `rgba(${s.rgb}, ${s.alpha})`;
        drawStar(0, 0, 4, s.size, s.size * 0.25, color);
        ctx.restore();
      }

      // 2. Animate Main Twinkling Star
      // Gentle pulse
      pulseScaleRef.current += 0.015 * pulseDirRef.current;
      if (pulseScaleRef.current >= 1.25) pulseDirRef.current = -1;
      if (pulseScaleRef.current <= 0.85) pulseDirRef.current = 1;

      // Spin
      // Rotates faster when hovering clickable elements
      mainRotRef.current += isHoveringRef.current ? 0.08 : 0.02;

      // Draw Main Star
      ctx.save();
      ctx.translate(mouseCoords.current.x, mouseCoords.current.y);
      ctx.rotate(mainRotRef.current);
      
      const sizeBase = isHoveringRef.current ? 16 : 10;
      const finalOuterSize = sizeBase * pulseScaleRef.current;
      const finalInnerSize = finalOuterSize * 0.28;
      
      const mainRgb = isHoveringRef.current ? themeColorRef.current.secondaryRgb : themeColorRef.current.rgb;

      // Draw outer glowing layer
      drawStar(0, 0, 4, finalOuterSize + 4, finalInnerSize + 1, `rgba(${mainRgb}, 0.25)`);
      // Draw inner solid layer
      drawStar(0, 0, 4, finalOuterSize, finalInnerSize, `rgba(${mainRgb}, 0.95)`);

      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default CursorFollower;
