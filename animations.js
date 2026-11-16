/**
 * Engineering Animations — Bobby Shi Portfolio
 */

(function () {
  'use strict';

  /* ─── 1. INJECT SHARED CSS ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── Scroll-reveal ── */
    .sr-hidden {
      opacity: 0; transform: translateY(32px);
      transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
    }
    .sr-hidden.sr-visible { opacity: 1; transform: translateY(0); }
    .sr-left {
      opacity: 0; transform: translateX(-40px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .sr-left.sr-visible  { opacity: 1; transform: translateX(0); }
    .sr-right {
      opacity: 0; transform: translateX(40px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .sr-right.sr-visible { opacity: 1; transform: translateX(0); }
    .sr-d1 { transition-delay: 0.08s !important; }
    .sr-d2 { transition-delay: 0.16s !important; }
    .sr-d3 { transition-delay: 0.24s !important; }
    .sr-d4 { transition-delay: 0.32s !important; }

    /* ── Page transition wipe ── */
    #page-wipe {
      position: fixed; inset: 0; z-index: 99999;
      background: #1a1917;
      transform: translateY(0);
      transition: transform 0.55s cubic-bezier(.76,0,.24,1);
      pointer-events: none;
    }
    #page-wipe.wiped-out { transform: translateY(-100%); }
    #page-wipe.wiping-in { transform: translateY(0) !important; transition: transform 0.4s cubic-bezier(.76,0,.24,1); }

    /* ── Scan-line reveal ── */
    .scan-reveal { position: relative; overflow: hidden; }
    .scan-reveal::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(to bottom, transparent 40%, rgba(200,96,42,0.06) 50%, transparent 60%);
      transform: translateY(-120%); transition: transform 0s;
    }
    .scan-reveal.scanning::after { transform: translateY(120%); transition: transform 0.9s linear; }

    /* ── Buttons ── */
    .btn { position: relative; overflow: hidden; isolation: isolate; }
    .btn-ripple {
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.25); transform: scale(0);
      animation: btn-ripple-anim 0.55s linear; pointer-events: none;
    }
    @keyframes btn-ripple-anim { to { transform: scale(4); opacity: 0; } }

    .btn-primary::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background: var(--accent, #c8602a); transform: scaleX(0);
      transform-origin: left; transition: transform 0.3s cubic-bezier(.22,1,.36,1);
    }
    .btn-primary:hover::before { transform: scaleX(1); }
    .btn-primary:hover { color: #fff; }

    .btn-ghost::before, .btn-ghost::after {
      content: ''; position: absolute; background: var(--ink, #1a1917);
      transition: transform 0.25s ease;
    }
    .btn-ghost::before { top: 0; left: 0; width: 100%; height: 1px; transform: scaleX(0); transform-origin: left; }
    .btn-ghost::after  { bottom: 0; right: 0; width: 100%; height: 1px; transform: scaleX(0); transform-origin: right; }
    .btn-ghost:hover::before, .btn-ghost:hover::after { transform: scaleX(1); }
    .btn-ghost:hover { letter-spacing: 0.1em; }
    .btn-magnetic { transition: transform 0.2s cubic-bezier(.22,1,.36,1) !important; }

    /* ── Cards ── */
    .card { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease !important; }
    .card:hover {
      transform: translateY(-8px) scale(1.012) !important;
      box-shadow: 0 20px 48px rgba(200,96,42,.12), 0 4px 12px rgba(0,0,0,.08) !important;
    }
    .card:hover .card-link { color: var(--accent) !important; border-color: var(--accent) !important; letter-spacing: 0.12em; }
    .card-link { transition: color .2s, border-color .2s, letter-spacing .25s; }

    /* ── Skill chips ── */
    .skill-chip {
      transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s !important;
      cursor: default;
    }
    .skill-chip:hover {
      border-color: var(--accent) !important; color: var(--accent) !important;
      background: rgba(200,96,42,0.06) !important; transform: translateY(-2px);
    }

    /* ── Nav underline ── */
    .nav-links a { position: relative; }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 100%; height: 1px; background: var(--accent, #c8602a);
      transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
    }
    .nav-links a:hover::after { transform: scaleX(1); }

    /* ── Nav HUD readout ── */
    #eng-nav-hud {
      position: absolute;
      left: 50%; transform: translateX(-50%);
      font-family: 'Courier New', monospace;
      font-size: .6rem;
      color: rgba(200,96,42,0.55);
      letter-spacing: .14em;
      pointer-events: none;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.4s;
      line-height: 1.4;
      text-align: center;
    }
    #eng-nav-hud.visible { opacity: 1; }

    /* ── Progress bar ── */
    #eng-progress {
      position: fixed; top: 0; left: 0; height: 2px; width: 0%;
      background: linear-gradient(to right, var(--accent, #c8602a), #e8803a);
      z-index: 9999; transition: width 0.1s linear;
    }

    /* ── Speedometer scroll indicator ── */
    #speed-indicator {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      width: 56px;
      height: 56px;
      z-index: 999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s;
    }
    #speed-indicator.visible { opacity: 1; }
    #speed-indicator svg { width: 100%; height: 100%; }
    #speed-needle {
      transform-origin: 28px 36px;
      transform: rotate(-80deg);
      transition: transform 0.3s cubic-bezier(.22,1,.36,1);
    }

    /* ── Blueprint overlay ── */
    #bp-overlay {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(rgba(200,96,42,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,96,42,0.018) 1px, transparent 1px),
        linear-gradient(rgba(200,96,42,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,96,42,0.045) 1px, transparent 1px);
      background-size: 13px 13px, 13px 13px, 52px 52px, 52px 52px;
    }
    #bp-overlay::before {
      content: ''; position: absolute;
      top: 64px; left: 12px; right: 12px; bottom: 12px;
      border: 1px solid rgba(200,96,42,0.12);
    }
    #bp-overlay::after {
      content: ''; position: absolute;
      top: 70px; left: 18px; right: 18px; bottom: 18px;
      border: 1px solid rgba(200,96,42,0.07);
    }

    /* ── Corner L-marks ── */
    .bp-corner {
      position: fixed; width: 22px; height: 22px;
      border-color: rgba(200,96,42,0.28); border-style: solid;
      pointer-events: none; z-index: 1;
    }
    .bp-corner-tl { top: 64px;  left: 12px;  border-width: 1px 0 0 1px; }
    .bp-corner-tr { top: 64px;  right: 12px; border-width: 1px 1px 0 0; }
    .bp-corner-bl { bottom: 12px; left: 12px;  border-width: 0 0 1px 1px; }
    .bp-corner-br { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }

    /* ── Title block ── */
    #bp-title-block {
      position: fixed; bottom: 18px; right: 18px;
      pointer-events: none; z-index: 1;
      font-family: 'Courier New', monospace;
      font-size: .55rem; letter-spacing: .12em;
      color: rgba(200,96,42,0.35);
      text-align: right; line-height: 1.7;
      border-top: 1px solid rgba(200,96,42,0.15);
      border-left: 1px solid rgba(200,96,42,0.15);
      padding: .35rem .5rem .1rem .6rem;
    }
    #bp-title-block span { display: block; }
    #bp-title-block .bp-title-name { color: rgba(200,96,42,0.55); font-size: .6rem; }

    /* ── Dimension ticks ── */
    #bp-ticks-left {
      position: fixed; left: 12px; top: 64px; bottom: 12px;
      width: 6px; pointer-events: none; z-index: 1;
      display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end;
    }
    #bp-ticks-left span { display: block; height: 1px; background: rgba(200,96,42,0.2); width: 6px; }
    #bp-ticks-left span:nth-child(5n+1) { width: 10px; background: rgba(200,96,42,0.32); }
    #bp-ticks-bottom {
      position: fixed; bottom: 12px; left: 12px; right: 12px;
      height: 6px; pointer-events: none; z-index: 1;
      display: flex; justify-content: space-between; align-items: flex-start;
    }
    #bp-ticks-bottom span { display: block; width: 1px; background: rgba(200,96,42,0.2); height: 6px; }
    #bp-ticks-bottom span:nth-child(5n+1) { height: 10px; background: rgba(200,96,42,0.32); }

    /* ── Center crosshair ── */
    #bp-crosshair {
      position: fixed; pointer-events: none; z-index: 1;
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 28px; height: 28px;
    }
    #bp-crosshair::before, #bp-crosshair::after {
      content: ''; position: absolute; background: rgba(200,96,42,0.12);
    }
    #bp-crosshair::before { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
    #bp-crosshair::after  { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }

    /* ── Section title cursor ── */
    .section-title-cursor::after {
      content: '_'; display: inline-block;
      color: var(--accent, #c8602a);
      animation: blink-cursor 1.1s step-end infinite;
      margin-left: 2px; font-weight: 300;
    }
    @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    /* ── Hero grid ── */
    .hero-grid-overlay {
      position: absolute; inset: 0; z-index: 1; pointer-events: none;
      background-image:
        linear-gradient(rgba(200,96,42,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,96,42,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: 0; animation: grid-fade-in 1.8s 0.4s forwards;
    }
    @keyframes grid-fade-in { to { opacity: 1; } }

    /* ── Project hero animations ── */
    .project-hero .project-tag,
    .project-hero h1,
    .project-hero p {
      opacity: 0; transform: translateY(18px);
      animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
    }
    .project-hero .project-tag  { animation-delay: 0.15s; }
    .project-hero h1             { animation-delay: 0.28s; }
    .project-hero p:nth-child(3) { animation-delay: 0.4s; }
    @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

    /* ── Tachometer needle ── */
    .hero-tacho line[x1="100"] {
      transform-origin: 100px 180px;
      animation: needle-sweep 2s 1s cubic-bezier(.22,1,.36,1) forwards;
      opacity: 0;
    }
    @keyframes needle-sweep {
      0%  { opacity: 1; transform: rotate(-60deg); }
      70% { transform: rotate(35deg); }
      100%{ opacity: 1; transform: rotate(0deg); }
    }

    /* ── Contact link shimmer ── */
    .contact-link {
      position: relative;
      overflow: hidden;
    }
    .contact-link::after {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(200,96,42,0.06), transparent);
      transition: left 0s;
    }
    .contact-link:hover::after {
      left: 150%;
      transition: left 0.5s ease;
    }

    /* ── Back link animation ── */
    .back-link {
      transition: gap 0.2s ease, color 0.2s;
    }
    .back-link:hover {
      gap: 0.8rem !important;
    }

    /* ── Project nav hover ── */
    .project-nav a {
      transition: color 0.2s, letter-spacing 0.25s, gap 0.2s;
    }
    .project-nav a:hover {
      letter-spacing: 0.15em;
    }

    /* ── Card image zoom ── */
    .card { overflow: hidden; }
    .card-img {
      transition: transform 0.5s cubic-bezier(.22,1,.36,1), filter 0.3s !important;
    }
    .card:hover .card-img {
      transform: scale(1.04);
      filter: contrast(1.05) saturate(1.1);
    }

    /* ── Form input focus line ── */
    .form-input, .form-textarea {
      position: relative;
      transition: border-color 0.2s, box-shadow 0.2s !important;
    }
    .form-input:focus, .form-textarea:focus {
      box-shadow: 0 2px 0 var(--accent) !important;
    }

    /* ── Custom cursor (desktop only) ── */
    #eng-cursor-dot, #eng-cursor-ring { position: fixed; top: 0; left: 0; pointer-events: none; }
  `;
  document.head.appendChild(style);


  /* ─── 2. PAGE TRANSITION WIPE ───────────────────────────────────── */
  const wipe = document.createElement('div');
  wipe.id = 'page-wipe';
  document.body.prepend(wipe);
  // Wipe out on load
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { wipe.classList.add('wiped-out'); });
  });
  // Wipe in on link click
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || a.hasAttribute('download')) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      wipe.classList.remove('wiped-out');
      wipe.classList.add('wiping-in');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });


  /* ─── 3. BLUEPRINT OVERLAY + DETAILS ────────────────────────────── */
  const bpOverlay = document.createElement('div');
  bpOverlay.id = 'bp-overlay';
  document.body.prepend(bpOverlay);

  ['bp-corner-tl','bp-corner-tr','bp-corner-bl','bp-corner-br'].forEach(cls => {
    const c = document.createElement('div');
    c.className = 'bp-corner ' + cls;
    document.body.appendChild(c);
  });

  const titleBlock = document.createElement('div');
  titleBlock.id = 'bp-title-block';
  titleBlock.innerHTML = `
    <span class="bp-title-name">R. SHI — PORTFOLIO</span>
    <span>MECH. ENGINEERING · UIUC</span>
    <span>REV.01 · ${new Date().getFullYear()}</span>
  `;
  document.body.appendChild(titleBlock);

  const ticksLeft = document.createElement('div');
  ticksLeft.id = 'bp-ticks-left';
  for (let i = 0; i < 20; i++) ticksLeft.appendChild(document.createElement('span'));
  document.body.appendChild(ticksLeft);

  const ticksBottom = document.createElement('div');
  ticksBottom.id = 'bp-ticks-bottom';
  for (let i = 0; i < 30; i++) ticksBottom.appendChild(document.createElement('span'));
  document.body.appendChild(ticksBottom);

  const crosshair = document.createElement('div');
  crosshair.id = 'bp-crosshair';
  document.body.appendChild(crosshair);


  /* ─── 4. PROGRESS BAR ────────────────────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'eng-progress';
  document.body.prepend(progressBar);

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ─── 5. MINI SPEEDOMETER ────────────────────────────────────────── */
  const speedo = document.createElement('div');
  speedo.id = 'speed-indicator';
  speedo.innerHTML = `
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <!-- Arc -->
      <path d="M 8 40 A 22 22 0 0 1 48 40" fill="none" stroke="rgba(200,96,42,0.15)" stroke-width="1.5"/>
      <path d="M 8 40 A 22 22 0 0 1 48 40" fill="none" stroke="rgba(200,96,42,0.6)" stroke-width="1.5"
            stroke-dasharray="69" stroke-dashoffset="69" id="speedo-arc" style="transition:stroke-dashoffset 0.3s ease"/>
      <!-- Tick marks -->
      <line x1="8"  y1="40" x2="11" y2="35" stroke="rgba(200,96,42,0.4)" stroke-width="1"/>
      <line x1="14" y1="22" x2="17" y2="26" stroke="rgba(200,96,42,0.4)" stroke-width="1"/>
      <line x1="28" y1="18" x2="28" y2="22" stroke="rgba(200,96,42,0.4)" stroke-width="1"/>
      <line x1="42" y1="22" x2="39" y2="26" stroke="rgba(200,96,42,0.4)" stroke-width="1"/>
      <line x1="48" y1="40" x2="45" y2="35" stroke="rgba(200,96,42,0.4)" stroke-width="1"/>
      <!-- Needle -->
      <line id="speed-needle" x1="28" y1="36" x2="28" y2="22" stroke="#c8602a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Center -->
      <circle cx="28" cy="36" r="2.5" fill="#c8602a"/>
      <!-- Label -->
      <text x="28" y="50" text-anchor="middle" font-family="Courier New" font-size="5" fill="rgba(200,96,42,0.5)" letter-spacing="0.5">SCROLL</text>
    </svg>`;
  document.body.appendChild(speedo);

  const speedArc = document.getElementById('speedo-arc');
  const speedNeedle = document.getElementById('speed-needle');
  let lastScrollY = 0, scrollVelocity = 0;

  const updateSpeedo = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = window.scrollY / max;
    // needle: -80deg (left) to +80deg (right)
    const deg = -80 + pct * 160;
    speedNeedle.style.transform = `rotate(${deg}deg)`;
    // arc fill
    const arcLen = 69;
    speedArc.style.strokeDashoffset = arcLen - (pct * arcLen);
    speedo.classList.toggle('visible', window.scrollY > 100);
  };
  window.addEventListener('scroll', updateSpeedo, { passive: true });


  /* ─── 6. NAV HUD ─────────────────────────────────────────────────── */
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.style.position = 'fixed';
    const hud = document.createElement('div');
    hud.id = 'eng-nav-hud';
    navbar.appendChild(hud);

    let hudVisible = false;
    const updateHud = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.round((window.scrollY / max) * 100);
      const shouldShow = window.scrollY > 20;
      if (shouldShow !== hudVisible) { hud.classList.toggle('visible', shouldShow); hudVisible = shouldShow; }
      if (shouldShow) hud.innerHTML = `SCROLL ${String(pct).padStart(3,'0')}% &nbsp;·&nbsp; Y ${String(Math.round(window.scrollY)).padStart(5,'0')}px`;
    };
    window.addEventListener('scroll', updateHud, { passive: true });
    const toggleNav = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', toggleNav, { passive: true });
    toggleNav();
  }


  /* ─── 7. HERO GRID OVERLAY ───────────────────────────────────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'hero-grid-overlay';
    hero.appendChild(gridOverlay);
  }


  /* ─── 8. SCROLL REVEAL ───────────────────────────────────────────── */
  const revealSelectors = [
    'section > p.section-label', 'section > h2.section-title', 'section > .divider',
    '.about-grid > *', '.about-text > p', '.skills-row',
    '.project-section', '.card', '.contact-form-wrap', '.contact-info', '.hero-ctas',
    '.project-meta', '.contact-grid > *',
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('sr-hidden') && !el.classList.contains('sr-left') && !el.classList.contains('sr-right')) {
        el.classList.add('sr-hidden');
        const d = Math.min(i, 4);
        if (d > 0) el.classList.add(`sr-d${d}`);
      }
    });
  });

  const aboutGrid = document.querySelector('.about-grid');
  if (aboutGrid) {
    const ch = aboutGrid.children;
    if (ch[0]) { ch[0].classList.remove('sr-hidden'); ch[0].classList.add('sr-left'); }
    if (ch[1]) { ch[1].classList.remove('sr-hidden'); ch[1].classList.add('sr-right'); }
  }

  const srObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-visible'); srObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.sr-hidden, .sr-left, .sr-right').forEach(el => srObs.observe(el));


  /* ─── 9. SCAN-LINE ON SECTION TITLES ─────────────────────────────── */
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(el => el.classList.add('scan-reveal'));
  const scanObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('scanning'); scanObs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  sectionTitles.forEach(el => scanObs.observe(el));


  /* ─── 10. BUTTON RIPPLE + MAGNETIC ────────────────────────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('btn-magnetic');
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.18}px,${(e.clientY-r.top-r.height/2)*0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });


  /* ─── 11. CARD 3D TILT ────────────────────────────────────────────── */
  document.querySelectorAll('.card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '800px';
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-8px) scale(1.012) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
      card.style.boxShadow = `${-x*16}px ${y*16+16}px 48px rgba(200,96,42,.15)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });
  });


  /* ─── 13. TYPEWRITER ON HERO EYEBROW ─────────────────────────────── */
  const eyebrow = document.querySelector('.hero-eyebrow, .contact-eyebrow');
  if (eyebrow) {
    const original = eyebrow.textContent.trim();
    eyebrow.textContent = '';
    eyebrow.style.opacity = '1';
    eyebrow.style.animation = 'none';
    let i = 0;
    const type = () => {
      if (i <= original.length) {
        eyebrow.textContent = original.slice(0, i) + (i < original.length ? '▮' : '');
        i++;
        setTimeout(type, i === original.length + 1 ? 0 : 38);
      } else {
        eyebrow.textContent = original;
      }
    };
    setTimeout(type, 400);
  }


  /* ─── 14. MAGNETIC NAV LINKS ─────────────────────────────────────── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const r = link.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      link.style.transform = `translate(${x}px, ${y}px)`;
    });
    link.addEventListener('mouseleave', () => { link.style.transform = ''; });
  });


  /* ─── 15. SECTION TITLE CURSOR BLINK ────────────────────────────── */
  let cursorAdded = 0;
  sectionTitles.forEach(el => {
    if (cursorAdded >= 2) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('section-title-cursor');
          setTimeout(() => el.classList.remove('section-title-cursor'), 3000);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    cursorAdded++;
  });


  /* ─── 16. CUSTOM CURSOR (desktop only) ───────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.id = 'eng-cursor-dot';
    dot.style.cssText = `width:6px;height:6px;border-radius:50%;background:var(--accent,#c8602a);z-index:9999;opacity:0;transition:transform 0.06s linear,opacity 0.3s;mix-blend-mode:multiply;`;
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.id = 'eng-cursor-ring';
    ring.style.cssText = `width:28px;height:28px;border-radius:50%;border:1px solid rgba(200,96,42,0.4);z-index:9998;opacity:0;transition:transform 0.18s cubic-bezier(.22,1,.36,1),opacity 0.3s,width 0.2s,height 0.2s;`;
    document.body.appendChild(ring);

    document.addEventListener('mousemove', (e) => {
      const mx = e.clientX, my = e.clientY;
      dot.style.opacity = '1'; ring.style.opacity = '1';
      dot.style.transform  = `translate(${mx-3}px,${my-3}px)`;
      ring.style.transform = `translate(${mx-14}px,${my-14}px)`;
    });
    document.querySelectorAll('a,button,.btn,.card,.skill-chip,.contact-link').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='44px';ring.style.height='44px';ring.style.borderColor='rgba(200,96,42,0.7)'; dot.style.transform += ' scale(1.5)'; });
      el.addEventListener('mouseleave', () => { ring.style.width='28px';ring.style.height='28px';ring.style.borderColor='rgba(200,96,42,0.4)'; });
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  }


  /* ─── 17. CARD LINK ARROW ANIMATION ──────────────────────────────── */
  document.querySelectorAll('.card-link').forEach(link => {
    const original = link.textContent;
    link.addEventListener('mouseenter', () => {
      link.textContent = original.replace('→', '');
      link.style.paddingRight = '1.2rem';
      link.style.position = 'relative';
      if (!link.querySelector('.arrow-anim')) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow-anim';
        arrow.textContent = '→';
        arrow.style.cssText = 'position:absolute;right:0;transition:transform 0.2s ease;display:inline-block;';
        link.appendChild(arrow);
      }
    });
    link.addEventListener('mousemove', () => {
      const arrow = link.querySelector('.arrow-anim');
      if (arrow) arrow.style.transform = 'translateX(3px)';
    });
    link.addEventListener('mouseleave', () => {
      link.textContent = original;
      link.style.paddingRight = '';
    });
  });

})();
