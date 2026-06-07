import React, { useEffect, useRef } from 'react';

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 130 });
  const themeColorRef = useRef({ rgb: '6, 182, 212' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Adapt particle count to screens (fewer particles on mobile for speed)
    const particleDensity = width < 768 ? 40 : 85;

    // Helper to get active theme color safely
    const updateThemeColor = () => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const primaryRgb = (computed.getPropertyValue('--accent-primary-rgb') || '').trim();
        if (primaryRgb) {
          themeColorRef.current.rgb = primaryRgb;
        }
      } catch (err) {
        console.error('Error updating theme color in InteractiveCanvas:', err);
      }
    };
    updateThemeColor();

    // Setup class mutation observer safely, delaying reads until style recalculation finishes
    const observer = new MutationObserver(() => {
      requestAnimationFrame(updateThemeColor);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // low speed
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
        this.baseVx = this.vx;
        this.baseVy = this.vy;
      }

      update() {
        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (repulsion)
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.hypot(dx, dy);
          const limit = mouseRef.current.radius;

          if (distance < limit) {
            // Calculate force directed away from mouse
            const force = (limit - distance) / limit;
            const angle = Math.atan2(dy, dx);
            
            // Push away
            this.x += Math.cos(angle) * force * 2;
            this.y += Math.sin(angle) * force * 2;
          }
        }

        // Return velocity slowly to baseline
        this.vx += (this.baseVx - this.vx) * 0.05;
        this.vy += (this.baseVy - this.vy) * 0.05;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${themeColorRef.current.rgb}, 0.5)`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleDensity; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lines first, then particles
      const connectionDistance = 100;
      const rgb = themeColorRef.current.rgb;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const opacity = (connectionDistance - dist) / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${rgb}, ${opacity * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-canvas-container" />;
};

export default InteractiveCanvas;
