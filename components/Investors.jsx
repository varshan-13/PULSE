'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: 2500, suf: '+', label: 'students on campus' },
  { n: 40, suf: '+', label: 'events over 3 days' },
  { n: 15, suf: 'K+', label: 'social reach' },
  { n: 300, suf: '+', label: 'hackathon builders' },
];

const WHY = [
  { n: '01', title: 'Meet future engineers', body: 'Put your brand in front of 2,500+ tech, design and business students before they graduate.' },
  { n: '02', title: 'Own a moment', body: 'Name the hackathon, the main stage or the DJ night. Your logo is on the moment people film.' },
  { n: '03', title: 'Hire early', body: 'Judge the hackathon, run a workshop and meet the top builders first. Many are looking for internships.' },
];

const TIERS = [
  { name: 'Title Partner', price: 'Rs 300,000', perks: ['"PULSE \'27 presented by" naming', 'Main stage LED + all posters', 'Hackathon judge seat', '10-min keynote slot', 'Booth in prime spot'], featured: true },
  { name: 'Gold', price: 'Rs 150,000', perks: ['Name one event (e.g. Robo Wars)', 'Logo on stage + lanyards', 'Workshop slot', 'Booth on campus'] },
  { name: 'Silver', price: 'Rs 75,000', perks: ['Logo on posters + website', 'Booth in food village', 'Social media shout-outs'] },
  { name: 'Community', price: 'Rs 25,000', perks: ['Logo on website', 'Goodies in welcome kits', 'Thank-you at closing'] },
];

const STEPS = [
  { t: 'Say hello', d: 'Fill in the form below. We reply within 48 hours.' },
  { t: 'Pick your package', d: 'Choose a tier or ask us for a custom plan.' },
  { t: 'Plan together', d: 'We agree on placements, booth and activations.' },
  { t: 'Show up', d: '10–12 December 2027. We send you a full report afterwards.' },
];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Investors() {
  const root = useRef(null);
  const header = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = root.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    const raf = (t) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

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

    const ctx = gsap.context(() => {
      if (reduce) return;
      // Hero: words rise in
      gsap.from('[data-inv-word]', { yPercent: 115, duration: 1.1, stagger: 0.07, ease: 'expo.out', delay: 0.15 });
      gsap.from('[data-inv-fade]', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.6 });

      // Count-ups
      gsap.utils.toArray('[data-count]').forEach((n) => {
        const end = Number(n.dataset.count);
        const o = { v: 0 };
        n.textContent = '0';
        gsap.to(o, {
          v: end, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: n, start: 'top 90%' },
          onUpdate: () => (n.textContent = Math.round(o.v).toLocaleString('en-US')),
        });
      });

      // Headings + cards
      gsap.utils.toArray('[data-reveal]').forEach((h) => {
        gsap.from(h, { y: 50, autoAlpha: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
      });
      gsap.from('[data-why]', { y: 70, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '[data-why-grid]', start: 'top 80%' } });
      gsap.from('[data-tier]', { y: 80, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '[data-tiers]', start: 'top 80%' } });

      // Placement marquee slides with scroll
      gsap.fromTo('[data-place]', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '[data-place-wrap]', start: 'top bottom', end: 'bottom top', scrub: true } });

      // Steps: line draws down as you scroll, steps light up
      gsap.fromTo('[data-steps-line]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray('[data-step]').forEach((s) => {
        gsap.fromTo(s, { opacity: 0.25 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: s, start: 'top 75%', end: 'top 55%', scrub: true } });
      });

      gsap.from('[data-form]', { y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-form]', start: 'top 85%' } });
    }, el);

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
      window.removeEventListener('scroll', onScroll);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={root} className="root inv">
      <header ref={header} className="header" data-tone="dark">
        <a href="/" className="logo">
          <span className="logoMark" />
          PULSE<span className="logoYear">&apos;27</span>
        </a>
        <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="vitPill" />
        <nav className="nav">
          <a href="/">← Back to the fest</a>
          <a href="#tiers">Packages</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="headerCta">Become a partner</a>
      </header>

      <main>
        <section className="invHero" data-tone="dark">
          <div className="heroGlow" aria-hidden="true" />
          <p className="kicker" data-inv-fade>For investors &amp; sponsors · PULSE &apos;27 · 10–12 Dec 2027</p>
          <h1 className="invTitle">
            {['Back the', "island's", 'loudest', 'three days.'].map((w, i) => (
              <span key={i} className="line"><span className={`char ${i === 3 ? 'accent' : ''}`} data-inv-word>{w}</span></span>
            ))}
          </h1>
          <p className="invSub" data-inv-fade>
            PULSE is VIT Mauritius&apos;s annual tech and culture fest. Partner with us to reach thousands of students, build your brand on campus and meet the next wave of talent.
          </p>
          <div className="heroCtas" data-inv-fade>
            <a href="#tiers" className="btn btnPrimary">See packages <Arrow /></a>
            <a href="#contact" className="btn btnGhost">Talk to the team</a>
          </div>
          <div className="invStats">
            {STATS.map((s) => (
              <div key={s.label} className="invStat">
                <span className="invStatNum"><span data-count={s.n}>{s.n.toLocaleString('en-US')}</span>{s.suf}</span>
                <span className="cdLabel">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="invWhy" data-tone="light">
          <span className="label dark">( 01 ) Why partner</span>
          <h2 className="h2" data-reveal>Your brand, <em>where students are.</em></h2>
          <div className="whyGrid" data-why-grid>
            {WHY.map((w) => (
              <article key={w.n} className="whyCard" data-why>
                <span className="whyNum">{w.n}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="placeWrap" data-place-wrap data-tone="coral" aria-hidden="true">
          <div className="mqRow" data-place>MAIN STAGE LED ✦ HACKATHON NAMING ✦ LANYARDS ✦ MERCH ✦ SOCIAL REELS ✦ FOOD VILLAGE ✦</div>
        </section>

        <section id="tiers" className="tiers" data-tone="dark">
          <span className="label">( 02 ) Packages</span>
          <h2 className="h2" data-reveal>Pick your <em>level.</em></h2>
          <div className="tierGrid" data-tiers>
            {TIERS.map((t) => (
              <article key={t.name} className={`tier ${t.featured ? 'featured' : ''}`} data-tier>
                {t.featured && <span className="tierBadge">Most visibility</span>}
                <h3 className="tierName">{t.name}</h3>
                <span className="tierPrice">{t.price}</span>
                <ul>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                <a href="#contact" className="tierCta">Choose {t.name} <Arrow /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="steps" data-tone="lagoon">
          <span className="label dark">( 03 ) How it works</span>
          <h2 className="h2" data-reveal>Four steps <em>to the stage.</em></h2>
          <ol className="stepList" data-steps>
            <span className="stepsLine" data-steps-line />
            {STEPS.map((s, i) => (
              <li key={s.t} className="step" data-step>
                <span className="stepNum">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{s.t}</h3><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="contact" data-tone="dark">
          <div>
            <span className="label">( 04 ) Contact</span>
            <h2 className="h2" data-reveal>Let&apos;s make<br /><em>PULSE &apos;27 happen.</em></h2>
            <p className="invSub">Tell us a little about your company and we will send the full sponsorship deck.</p>
          </div>
          <form className="form" data-form onSubmit={submit}>
            {sent ? (
              <div className="formDone">
                <span className="logoMark" />
                <h3>Thanks, we got it.</h3>
                <p>The PULSE partnerships team will reach out within 48 hours.</p>
              </div>
            ) : (
              <>
                <label>Your name<input required name="name" placeholder="Jane Doe" /></label>
                <label>Company<input required name="company" placeholder="Company Ltd" /></label>
                <label>Work email<input required type="email" name="email" placeholder="jane@company.mu" /></label>
                <label>Package
                  <select name="tier" defaultValue="Title Partner">
                    {TIERS.map((t) => <option key={t.name}>{t.name}</option>)}
                    <option>Custom</option>
                  </select>
                </label>
                <label className="full">Message<textarea name="msg" rows={4} placeholder="What would you like to do at PULSE?" /></label>
                <button type="submit" className="btn btnPrimary full">Send enquiry <Arrow /></button>
              </>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <img src="/vit/vit-logo.png" alt="VIT Mauritius" className="footLogo" />
        <span>PULSE &apos;27 · VIT Mauritius Annual Fest</span>
        <span>10–12 December 2027 · VIT Mauritius campus</span>
        <span>Developed by Varshan</span>
        <a href="/">← Back to the fest</a>
      </footer>
    </div>
  );
}
