'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip);

const FEST_DATE = new Date('2027-12-10T09:00:00+04:00');
const INTRO_KEY = 'pulse27.intro';

const DAYS = [
  {
    n: '01', date: 'Fri 10 Dec', title: 'Code & Circuits', theme: 'day1',
    tag: 'Tech day',
    items: ['24h Hackathon kick-off', 'Robo Wars arena', 'AI & startup talks', 'Esports LAN: Valorant / FC'],
  },
  {
    n: '02', date: 'Sat 11 Dec', title: 'Culture Riot', theme: 'day2',
    tag: 'Culture day',
    items: ['Séga x Bollywood dance-off', 'Battle of the Bands', 'Fashion walk', 'Street food village'],
  },
  {
    n: '03', date: 'Sun 12 Dec', title: 'Night Pulse', theme: 'day3',
    tag: 'Annual Day + finale',
    items: ['Hackathon finals', 'Annual Day awards', 'Fireworks over campus', 'DJ night till midnight'],
  },
];

const EVENTS = [
  { cat: 'Tech', title: '24h Hackathon', meta: 'Rs 50,000 prize pool' },
  { cat: 'Tech', title: 'Robo Wars', meta: 'Bots enter, one leaves' },
  { cat: 'Culture', title: 'Battle of the Bands', meta: 'Main stage · Sat 7pm' },
  { cat: 'Culture', title: 'Séga Fusion Dance-off', meta: 'Teams of 4–8' },
  { cat: 'Arts', title: '48h Film Challenge', meta: 'Theme revealed Friday' },
  { cat: 'Arts', title: 'Live Mural Wall', meta: 'Paint the campus' },
  { cat: 'Gaming', title: 'Valorant Cup', meta: '5v5 · double elimination' },
  { cat: 'Tech', title: 'Code Golf', meta: 'Shortest code wins' },
];
const CATS = ['All', 'Tech', 'Culture', 'Arts', 'Gaming'];

const STATS = [
  { n: 40, suf: '+', label: 'events across campus' },
  { n: 3, suf: '', label: 'days, non-stop' },
  { n: 2500, suf: '+', label: 'students expected' },
  { n: 200, pre: 'Rs ', suf: 'K', label: 'in prizes' },
];

const FAQ = [
  { q: 'Who can attend?', a: 'Every VIT Mauritius student gets in free with their student ID. Students from other universities can register for a day pass.' },
  { q: 'Do I need a team for the hackathon?', a: 'Teams of 2–4. Solo? Join the team-matching session on Friday morning and we will find you a crew.' },
  { q: 'Is food included?', a: 'Hackathon teams get meals all 24 hours. Everyone else gets the street food village, open from noon every day.' },
  { q: 'When does registration close?', a: 'Event registrations close on 3 December 2027. Gate entry stays open all three days.' },
];

const BOARD = [
  { name: 'Dr. Anaïs Ramdenee', role: 'Board Chair', org: 'Professor of Computer Science', tone: 'b1',
    at: 'Opening keynote · Fri 10 Dec',
    bio: 'Anaïs has spent 18 years teaching AI and data systems across three continents. She chairs the PULSE board and pushed for the first 24-hour hackathon on campus. Ask her about machine learning for ocean data.' },
  { name: 'Rohan Beeharry', role: 'Hackathon Head Judge', org: 'Founder & CEO, Kreol Labs', tone: 'b2',
    at: 'Hackathon finals · Sun 12 Dec',
    bio: 'Rohan built Kreol Labs from a two-person student project into a 60-person software studio. He judges on one rule: ship something that works. He also mentors two student startups every year.' },
  { name: 'Dr. Mei-Lin Ah-Chuen', role: 'Robo Wars Chief Judge', org: 'Research Director, Indian Ocean Robotics Institute', tone: 'b3',
    at: 'Robo Wars arena · Fri 10 Dec',
    bio: 'Mei-Lin designs underwater drones that map coral reefs. She has built robots for competitions since she was 15 and still keeps her first bot on her desk. She runs the safety checks before every Robo Wars bout.' },
  { name: 'Yash Dookhun', role: 'Investor Panel Lead', org: 'Managing Partner, Lagoon Ventures', tone: 'b4',
    at: 'Startup pitch panel · Fri 10 Dec',
    bio: 'Yash has backed 25 early-stage startups across Africa and the Indian Ocean. At PULSE he hosts the pitch panel, where the best student idea wins a seed grant and six months of mentoring.' },
  { name: 'Sophie Laval', role: 'Culture Night Director', org: 'Creative Director, Studio Ravanne', tone: 'b2',
    at: 'Culture Riot · Sat 11 Dec',
    bio: 'Sophie has staged music and dance shows from Port Louis to Paris. She mixes séga with modern choreography and is directing the PULSE fashion walk and the closing show on Saturday night.' },
  { name: 'Karan Seetul', role: 'Careers & Talent', org: 'Head of Talent, BlueReef Bank', tone: 'b3',
    at: 'Careers corner · all three days',
    bio: 'Karan has hired over 400 graduates into tech roles. He runs the PULSE careers corner with CV reviews, mock interviews and internship offers for standout hackathon teams.' },
  { name: 'Priya Naidoo', role: 'Student President', org: 'PULSE Organising Committee', tone: 'b4',
    at: 'Everywhere, with a walkie-talkie',
    bio: 'A third-year computer engineering student, Priya leads a crew of 120 student volunteers. She came up with the Night Pulse finale and has not slept properly since September.' },
  { name: 'Jean-Marc Topize', role: 'Head of Operations', org: 'Events & Campus Logistics', tone: 'b1',
    at: 'Main courtyard stage · all three days',
    bio: 'Jean-Marc has run large outdoor events for 12 years, from beach festivals to national expos. He makes sure the stage, the sound and the fireworks all happen on time.' },
];

const MANIFESTO =
  "This isn't just a fest. It's the three days you'll still talk about at graduation, where code meets séga, robots meet rhythm, and the whole campus stays awake after dark.";

const TICKER = ['Hackathon', 'Robo Wars', 'Battle of the Bands', 'Séga Night', 'Esports', 'Fashion Walk', 'Fireworks', 'DJ Night'];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge() {
  return (
    <svg viewBox="0 0 200 200" className="badgeSvg" aria-hidden="true">
      <defs>
        <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text>
        <textPath href="#circle" textLength="486" lengthAdjust="spacing">REGISTER NOW • FREE ENTRY • 10–12 DEC • </textPath>
      </text>
      <circle cx="100" cy="100" r="34" className="badgeCore" />
      <text x="100" y="108" textAnchor="middle" className="badgeMid">&apos;27</text>
    </svg>
  );
}

export default function Landing() {
  const root = useRef(null);
  const header = useRef(null);
  const introSkip = useRef(null);
  const flipState = useRef(null);
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(0);
  const [left, setLeft] = useState(null);
  const [member, setMember] = useState(-1);

  // Countdown
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, FEST_DATE - Date.now());
      setLeft({
        d: Math.floor(d / 864e5),
        h: Math.floor(d / 36e5) % 24,
        m: Math.floor(d / 6e4) % 60,
        s: Math.floor(d / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Smooth scroll + all GSAP animations
  useEffect(() => {
    const el = root.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (introSkip.current === null) {
      try {
        introSkip.current = sessionStorage.getItem(INTRO_KEY) === '1';
        sessionStorage.setItem(INTRO_KEY, '1');
      } catch {
        introSkip.current = false;
      }
    }

    let lenis = null;
    const raf = (t) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Header colour follows the section underneath it
    const sections = [...el.querySelectorAll('section[data-tone]')];
    const onScroll = () => {
      const h = header.current;
      if (!h) return;
      const y = h.offsetHeight / 2;
      const s = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      h.dataset.tone = s?.dataset.tone || 'dark';
      h.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Intro: preloader counter -> hero letters rise
    const intro = gsap.context(() => {
      if (reduce) {
        gsap.set('[data-preloader]', { display: 'none' });
        return;
      }
      const tl = gsap.timeline();
      if (!introSkip.current) {
        lenis?.stop();
        const num = el.querySelector('[data-pl-num]');
        const c = { v: 0 };
        tl.to(c, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (num.textContent = String(Math.round(c.v)).padStart(3, '0')) })
          .to('[data-pl-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
          .to('[data-pl-inner]', { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '+=0.1')
          .to('[data-preloader]', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
          .call(() => lenis?.start());
      } else {
        gsap.set('[data-preloader]', { display: 'none' });
      }
      tl.from('[data-hero-char]', { yPercent: 115, rotate: 8, duration: 1.1, stagger: 0.06, ease: 'expo.out' }, introSkip.current ? 0 : '-=0.45')
        .from('[data-ring]', { scale: 0.4, autoAlpha: 0, duration: 1.6, stagger: 0.07, ease: 'expo.out' }, '<')
        .from('[data-hero-fade]', { y: 26, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, '<0.3');
    }, el);

    // Scroll animations
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 64rem) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 63.999rem) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop, mobile } = ctx.conditions;
        if (!desktop && !mobile) return;
        const cleanups = [];

        // Hero parallax
        const heroST = { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('[data-hero-title]', { yPercent: -30, ease: 'none', scrollTrigger: heroST });
        gsap.to('[data-rings]', { scale: 1.45, rotate: 50, opacity: 0.25, ease: 'none', scrollTrigger: heroST });
        gsap.to('[data-hero-meta]', { y: -70, opacity: 0, ease: 'none', scrollTrigger: { ...heroST, end: '55% top' } });

        // Manifesto: words light up as you read
        gsap.fromTo('[data-word]', { opacity: 0.14 }, {
          opacity: 1, stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 75%', end: 'bottom 60%', scrub: 0.4 },
        });

        // Section headings
        gsap.utils.toArray('[data-reveal]').forEach((h) => {
          gsap.from(h, { y: 50, rotation: 0, autoAlpha: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
        });

        // Campus: photo reveals only once it is on screen (no drifting before you scroll)
        gsap.fromTo('[data-campus-frame]', { clipPath: 'inset(6% 10% 6% 10% round 32px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: '[data-campus-frame]', start: 'top 70%', end: 'top 10%', scrub: true },
        });
        gsap.from('[data-campus-caption]', {
          y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-campus-frame]', start: 'top 35%' },
        });
        gsap.from('[data-campus-tag]', {
          y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-campus-frame]', start: 'top 30%' },
        });

        // Days: pinned horizontal carousel on desktop, swipe on mobile
        if (desktop) {
          const track = el.querySelector('[data-track]');
          const bar = el.querySelector('[data-days-bar]');
          const dist = () => track.scrollWidth - window.innerWidth;
          const move = gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-days]',
              start: 'top top',
              end: () => '+=' + dist(),
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
            },
          });
          gsap.utils.toArray('[data-day-card]').forEach((card) => {
            gsap.fromTo(card.querySelector('[data-day-num]'), { xPercent: 12 }, {
              xPercent: -12, ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            });
            gsap.from(card, {
              rotate: 4, scale: 0.92, ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'left 40%', scrub: true },
            });
          });
        } else {
          gsap.from('[data-day-card]', {
            y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '[data-track]', start: 'top 80%' },
          });
        }

        // Marquee rows slide in opposite directions with scroll
        const mq = { trigger: '[data-marquee]', start: 'top bottom', end: 'bottom top', scrub: true };
        gsap.fromTo('[data-marquee-a]', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: mq });
        gsap.fromTo('[data-marquee-b]', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: mq });

        // Event cards
        gsap.from('[data-event-wrap]', {
          y: 70, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-events-grid]', start: 'top 82%' },
        });

        // Stats count up
        gsap.utils.toArray('[data-count]').forEach((n) => {
          const end = Number(n.dataset.count);
          const o = { v: 0 };
          n.textContent = '0';
          gsap.to(o, {
            v: end, duration: 2, ease: 'power2.out',
            scrollTrigger: { trigger: n, start: 'top 88%' },
            onUpdate: () => (n.textContent = Math.round(o.v).toLocaleString('en-US')),
          });
        });
        gsap.from('[data-stat]', {
          y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-stats]', start: 'top 80%' },
        });

        // Board cards
        gsap.from('[data-member]', {
          y: 80, autoAlpha: 0, duration: 1, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-board]', start: 'top 78%' },
        });

        // Credit screen
        gsap.from('[data-credit-char]', {
          yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-credit]', start: 'top 65%' },
        });
        gsap.from('[data-credit-fade]', {
          y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-credit]', start: 'top 55%' },
        });

        // Outro
        gsap.from('[data-outro-char]', {
          yPercent: 110, duration: 1, stagger: 0.035, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-outro]', start: 'top 65%' },
        });

        // Desktop extras: magnetic buttons + glowing cursor
        if (desktop) {
          gsap.utils.toArray('[data-magnetic]').forEach((b) => {
            const xTo = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3' });
            const yTo = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3' });
            const mv = (e) => {
              const r = b.getBoundingClientRect();
              xTo((e.clientX - r.left - r.width / 2) * 0.3);
              yTo((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const lv = () => { xTo(0); yTo(0); };
            b.addEventListener('pointermove', mv);
            b.addEventListener('pointerleave', lv);
            cleanups.push(() => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', lv); });
          });

          const glow = el.querySelector('[data-cursor]');
          const gx = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
          const gy = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });
          const move = (e) => { gx(e.clientX); gy(e.clientY); };
          window.addEventListener('pointermove', move);
          cleanups.push(() => window.removeEventListener('pointermove', move));
        }

        return () => cleanups.forEach((f) => f());
      },
      el
    );

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
      window.removeEventListener('scroll', onScroll);
      intro.revert();
      mm.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  // Event filter: cards glide into their new spots
  const pickCat = (c) => {
    if (c === cat) return;
    flipState.current = Flip.getState('[data-event]');
    setCat(c);
  };
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
    });
    flipState.current = null;
    ScrollTrigger.refresh();
  }, [cat]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div ref={root} className="root">
      <div className="cursor" data-cursor aria-hidden="true" />

      {/* Preloader */}
      <div className="preloader" data-preloader aria-hidden="true">
        <div className="plInner" data-pl-inner>
          <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="plLogo" />
          <span className="plLabel">presents · Annual Fest</span>
          <span className="plNum" data-pl-num>000</span>
          <div className="plBar"><span data-pl-bar /></div>
          <span className="plLabel">Tuning the night…</span>
        </div>
      </div>

      {/* Header */}
      <header ref={header} className="header" data-tone="dark">
        <a href="#top" className="logo">
          <span className="logoMark" />
          PULSE<span className="logoYear">&apos;27</span>
        </a>
        <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="vitPill" />
        <nav className="nav">
          <a href="#days">Days</a>
          <a href="#events">Events</a>
          <a href="#numbers">Numbers</a>
          <a href="#board">Board</a>
          <a href="#faq">FAQ</a>
          <a href="/investors">Investors</a>
        </nav>
        <a href="#register" className="headerCta" data-magnetic>Register</a>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="hero" data-hero data-tone="dark">
          <div className="heroGlow" aria-hidden="true" />
          <div className="rings" data-rings aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="ring" data-ring style={{ '--i': i }} />
            ))}
            <span className="ripple" />
            <span className="ripple r2" />
            <span className="ripple r3" />
          </div>

          <div className="heroInner">
            <div className="heroMeta" data-hero-meta>
              <p className="kicker" data-hero-fade>
                <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
                VIT Mauritius · Annual Fest · 10–12 Dec 2027
              </p>
            </div>

            <h1 className="heroTitle" data-hero-title aria-label="PULSE 27">
              <span className="line">
                {'PULSE'.split('').map((c, i) => (
                  <span key={i} className="char" data-hero-char>{c}</span>
                ))}
              </span>
              <span className="line outline">
                {"'27".split('').map((c, i) => (
                  <span key={i} className="char" data-hero-char>{c}</span>
                ))}
              </span>
            </h1>

            <div className="heroBottom" data-hero-meta>
              <p className="heroSub" data-hero-fade>
                Three days. One island. Zero sleep. Hackathons, séga, robots and a DJ night under the stars.
              </p>
              <div className="heroCtas" data-hero-fade>
                <a href="#register" className="btn btnPrimary" data-magnetic>Get your pass <Arrow /></a>
                <a href="#events" className="btn btnGhost">See the events</a>
              </div>
              <div className="countdown" data-hero-fade aria-label="Countdown to PULSE '27">
                {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([k, l]) => (
                  <div key={k} className="cdCell">
                    <span className="cdNum">{left ? pad(left[k]) : '--'}</span>
                    <span className="cdLabel">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ticker" aria-hidden="true">
            <div className="tickerTrack">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i}>{t}<b>✦</b></span>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="manifesto" data-manifesto data-tone="dark">
          <span className="label">( 01 ) Why PULSE</span>
          <p className="manifestoText">
            {MANIFESTO.split(' ').map((w, i) => (
              <span key={i} data-word>{w} </span>
            ))}
          </p>
        </section>

        {/* Campus */}
        <section className="campus" data-campus data-tone="dark">
          <div className="campusHead">
            <span className="label">( 02 ) The venue</span>
            <h2 className="h2" data-reveal>Our campus<br /><em>becomes the stage.</em></h2>
          </div>
          <div className="campusFrame" data-campus-frame>
            <img src="/vit/campus.jpg" alt="VIT Mauritius campus building" className="campusImg" data-campus-img />
            <div className="campusShade" />
            <div className="campusCaption" data-campus-caption>
              <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="campusLogo" />
              <p>Every block, balcony and lawn turns into a venue for three days. Hackathon rooms upstairs, stages in the courtyard, food under the palms.</p>
            </div>
            <ul className="campusTags" aria-label="Venues">
              {['Main courtyard stage', 'Hack labs', 'Robo arena', 'Food village'].map((t) => (
                <li key={t} data-campus-tag>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Days carousel */}
        <section id="days" className="days" data-days data-tone="dark">
          <div className="daysHead">
            <span className="label">( 03 ) The line-up</span>
            <div className="daysBar"><span data-days-bar /></div>
          </div>
          <div className="track" data-track>
            <div className="trackIntro">
              <h2>Three days,<br /><em>three moods.</em></h2>
              <p>Keep scrolling. Each day hits different.</p>
            </div>
            {DAYS.map((d) => (
              <article key={d.n} className={`dayCard ${d.theme}`} data-day-card>
                <span className="dayNum" data-day-num>{d.n}</span>
                <div className="dayTop">
                  <span className="dayTag">{d.tag}</span>
                  <span className="dayDate">{d.date}</span>
                </div>
                <h3 className="dayTitle">{d.title}</h3>
                <ul className="dayList">
                  {d.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Marquee */}
        <section className="marquee" data-marquee data-tone="coral" aria-hidden="true">
          <div className="mqRow" data-marquee-a>HACK ✦ DANCE ✦ BUILD ✦ SING ✦ COMPETE ✦ HACK ✦ DANCE ✦ BUILD ✦</div>
          <div className="mqRow mqOutline" data-marquee-b>CELEBRATE ✦ CREATE ✦ PERFORM ✦ CELEBRATE ✦ CREATE ✦ PERFORM ✦</div>
        </section>

        {/* Events */}
        <section id="events" className="events" data-tone="light">
          <div className="eventsHead">
            <div>
              <span className="label dark">( 04 ) Events</span>
              <h2 className="h2" data-reveal>Pick your <em>arena.</em></h2>
            </div>
            <div className="filters" role="tablist">
              {CATS.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  className={`filter ${cat === c ? 'active' : ''}`}
                  onClick={() => pickCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="eventsGrid" data-events-grid>
            {EVENTS.map((e) => (
              <div key={e.title} data-event-wrap data-event data-flip-id={e.title} className="eventWrap" style={{ display: cat === 'All' || cat === e.cat ? '' : 'none' }}>
                <a href="#register" className="eventCard">
                  <span className="eventCat">{e.cat}</span>
                  <h3 className="eventTitle">{e.title}</h3>
                  <span className="eventMeta">{e.meta}</span>
                  <span className="eventArrow"><Arrow /></span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section id="numbers" className="stats" data-stats data-tone="lagoon">
          <span className="label dark">( 05 ) By the numbers</span>
          <div className="statsGrid">
            {STATS.map((s) => (
              <div key={s.label} className="stat" data-stat>
                <span className="statNum">
                  {s.pre}<span data-count={s.n}>{s.n.toLocaleString('en-US')}</span>{s.suf}
                </span>
                <span className="statLabel">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Board */}
        <section id="board" className="board" data-tone="dark">
          <div className="boardHead">
            <div>
              <span className="label">( 06 ) Who&apos;s coming</span>
              <h2 className="h2" data-reveal>Meet the <em>board.</em></h2>
            </div>
            <p className="boardIntro">The people judging, mentoring and running PULSE &apos;27. Tap a card to read their story.</p>
          </div>
          <div className="boardGrid" data-board>
            {BOARD.map((m, i) => (
              <article key={m.name} className={`member ${m.tone} ${member === i ? 'open' : ''}`} data-member>
                <button className="memberBtn" onClick={() => setMember(member === i ? -1 : i)} aria-expanded={member === i}>
                  <span className="avatar" aria-hidden="true">
                    <span className="avatarRing" />
                    <span className="avatarInit">{m.name.replace('Dr. ', '').split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
                  </span>
                  <span className="memberRole">{m.role}</span>
                  <span className="memberName">{m.name}</span>
                  <span className="memberOrg">{m.org}</span>
                  <span className="memberPlus" aria-hidden="true" />
                </button>
                <div className="memberBio">
                  <div>
                    <p>{m.bio}</p>
                    <span className="memberAt">Catch them at: {m.at}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="faq" data-tone="dark">
          <div className="faqSide">
            <span className="label">( 07 ) Good to know</span>
            <h2 className="h2" data-reveal>Questions?<br /><em>Sorted.</em></h2>
          </div>
          <div className="faqList">
            {FAQ.map((f, i) => (
              <div key={f.q} className={`faqItem ${open === i ? 'open' : ''}`}>
                <button className="faqQ" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <span className="faqIcon" aria-hidden="true" />
                </button>
                <div className="faqA"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </section>

        {/* Outro */}
        <section id="register" className="outro" data-outro data-tone="coral">
          <div className="badge" data-badge><Badge /></div>
          <h2 className="outroTitle" aria-label="See you there">
            {['SEE YOU', 'THERE.'].map((line, li) => (
              <span key={li} className="line">
                {line.split('').map((c, i) => (
                  <span key={i} className="char" data-outro-char>{c === ' ' ? ' ' : c}</span>
                ))}
              </span>
            ))}
          </h2>
          <div className="presented"><span>Presented by</span><img src="/vit/vit-logo.png" alt="VIT Mauritius" /></div>
          <p className="outroText">Free entry for every VIT Mauritius student. Event slots are limited, so grab yours before 3 December.</p>
          <a href="#register" className="btn btnInk" data-magnetic>Register for PULSE &apos;27 <Arrow /></a>
        </section>
        {/* Developer credit */}
        <section className="credit" data-credit data-tone="dark">
          <span className="label">( Credits )</span>
          <p className="creditSmall">Designed &amp; developed by</p>
          <h2 className="creditName" aria-label="Varshan">
            <span className="line">
              {'VARSHAN'.split('').map((c, i) => (
                <span key={i} className="char" data-credit-char>{c}</span>
              ))}
            </span>
          </h2>
          <p className="creditMeta" data-credit-fade>Logavarshan Sakthivel · Computer Engineering · VIT Mauritius</p>
          <div className="creditLinks" data-credit-fade>
            <a href="https://github.com/varshan-13" target="_blank" rel="noopener noreferrer" className="btn btnGhost">GitHub <Arrow /></a>
            <a href="https://www.linkedin.com/in/logavarshan-sakthivel-978601395" target="_blank" rel="noopener noreferrer" className="btn btnGhost">LinkedIn <Arrow /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="footLogo" />
        <span>PULSE &apos;27 · VIT Mauritius Annual Fest</span>
        <span>10–12 December 2027 · VIT Mauritius campus</span>
        <a href="/investors">Partner with us →</a>
        <span>Developed by Varshan</span>
      </footer>
    </div>
  );
}
