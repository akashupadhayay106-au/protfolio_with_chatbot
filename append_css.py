import os

css = """
/* Phase 6: Unified CSS Design System */
:root {
  --bg: #07111f !important;
  --bg-soft: #0d1b2e !important;
  --surface: rgba(255,255,255,0.08) !important;
  --surface-solid: #122238 !important;
  --text: #f8fafc !important;
  --muted: #a8b3c7 !important;
  --accent: #67e8f9 !important;
  --accent-2: #8b5cf6 !important;
  --accent-3: #38bdf8 !important;
  --border: rgba(255,255,255,0.14) !important;
  --radius-sm: 10px !important;
  --radius-md: 16px !important;
  --radius-lg: 24px !important;
  --shadow-card: 0 20px 60px rgba(0,0,0,0.28) !important;
  --shadow-glow: 0 0 40px rgba(103,232,249,0.2) !important;
  --transition-fast: 180ms ease !important;
  --transition-normal: 320ms ease !important;
}

/* Phase 7: 3D Animations & Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)
