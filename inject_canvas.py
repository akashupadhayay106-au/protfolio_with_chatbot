import os

css_addition = """
/* Phase 7 & 8: Network Canvas & Spotlight */
.bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    pointer-events: none;
    background-color: var(--bg);
}

.mouse-spotlight {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(circle 600px at var(--spotlight-x, 50vw) var(--spotlight-y, 50vh), var(--shadow-glow), transparent 80%);
}

@media (prefers-reduced-motion: reduce) {
    .bg-canvas, .mouse-spotlight {
        display: none !important;
    }
}
"""

js_addition = """
// Phase 7 & 8: Network Canvas & Spotlight Logic
document.addEventListener("DOMContentLoaded", () => {
    // Spotlight
    const spotlight = document.querySelector('.mouse-spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            if(window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                requestAnimationFrame(() => {
                    spotlight.style.setProperty('--spotlight-x', e.clientX + 'px');
                    spotlight.style.setProperty('--spotlight-y', e.clientY + 'px');
                });
            }
        });
    }

    // Network Canvas
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let animationFrameId;
    let isVisible = true;
    
    // Performance configs
    const connectionDistance = 150;
    
    function init() {
        width = canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
        height = canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 80;
        
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    function animate() {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, width, height);
        
        // Update & Draw particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce
            if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
            if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(103, 232, 249, 0.5)';
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distSq = dx * dx + dy * dy;
                
                if (distSq < connectionDistance * connectionDistance) {
                    let opacity = 1 - Math.sqrt(distSq) / connectionDistance;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(103, 232, 249, ${opacity * 0.2})`;
                    ctx.stroke();
                }
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
        init();
        animate();
    }
    
    window.addEventListener('resize', () => {
        if (!prefersReducedMotion.matches) {
            cancelAnimationFrame(animationFrameId);
            init();
            animate();
        }
    });
    
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });
});
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_addition)

with open('script.js', 'a', encoding='utf-8') as f:
    f.write(js_addition)
