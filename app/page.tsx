'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const statRef = useRef<HTMLSpanElement | null>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  // Sticky header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animated counter (37%) when hero stat enters view
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const target = 37;
    const duration = 1400;
    let raf = 0;
    let started = false;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setCounter(Math.round(eased * target));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = revealRefs.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      el.classList.add('reveal');
      revealRefs.current.push(el);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    }, 900);
  };

  return (
    <>
      {/* HEADER */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a href="#hero" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="url(#logoGrad)" strokeWidth="1.5" />
              <path
                d="M20 11c-1-1.5-2.5-2-4-2-2.5 0-4 1.5-4 3.5 0 4 8 3 8 7 0 2-1.5 3.5-4 3.5-1.5 0-3-.5-4-2"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <span>
              SCALE IT<sup>®</sup>
            </span>
          </a>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <a href="#funkcje" onClick={closeMenu}>Funkcje</a>
            <a href="#korzysci" onClick={closeMenu}>Korzyści</a>
            <a href="#jak-to-dziala" onClick={closeMenu}>Jak to działa</a>
            <a href="#cennik" onClick={closeMenu}>Cennik</a>
            <a href="#kontakt" onClick={closeMenu}>Kontakt</a>
          </nav>

          <a href="#kontakt" className="btn btn-pill btn-outline">
            Zarezerwuj demo <span className="arrow">→</span>
          </a>

          <button
            className="hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="badge">DLA USŁUG PREMIUM</span>
            <h1>
              Więcej rezerwacji.<br />
              <span className="dim">Mniej straconych</span><br />
              <span className="dim">możliwości.</span>
            </h1>
            <p className="lead">
              Zaprojektowane, aby zwiększać efektywność Twojego biznesu
              i zapewniać doświadczenie na najwyższym poziomie.
            </p>
            <div className="hero-cta">
              <a href="#kontakt" className="btn btn-pill btn-light">
                Zarezerwuj demo <span className="arrow">→</span>
              </a>
              <a href="#jak-to-dziala" className="btn btn-ghost">
                Zobacz jak to działa
                <span className="play-dot">▶</span>
              </a>
            </div>
          </div>

          <div className="hero-stat">
            <span className="stat-label">WIĘCEJ REZERWACJI</span>
            <span className="stat-number" ref={statRef}>
              {counter}
              <span className="pct">%</span>
            </span>
            <span className="stat-sub">
              ŚREDNIO WIĘCEJ
              <br />
              KONWERSJI
            </span>
          </div>
        </div>

        <div className="container hero-features">
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" />
            </svg>
          } title="Więcej rezerwacji" desc="Bez dodatkowych działań." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" /><path d="M12 7v5l3 2" />
            </svg>
          } title="Pełna automatyzacja" desc="Oszczędność czasu i zasobów." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
            </svg>
          } title="Prestiż i doświadczenie" desc="Obsługa na poziomie premium." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </svg>
          } title="Mierzalne efekty" desc="Wyniki, które robią różnicę." />
        </div>
      </section>

      {/* FUNKCJE */}
      <section className="section" id="funkcje">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">FUNKCJE</span>
            <h2>
              Wszystko, czego potrzebujesz
              <br />w jednym miejscu.
            </h2>
            <p className="section-sub">
              Zaprojektowane dla zespołów, które nie chcą tracić czasu na ręczne procesy
              i dla klientów, którzy oczekują obsługi premium.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card feature-big" ref={addReveal}>
              <div className="fc-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              </div>
              <h3>Inteligentny kalendarz rezerwacji</h3>
              <p>
                Klient sam wybiera termin 24/7. System dobiera optymalne sloty i unika luk w grafiku — tak, by każda godzina była zarezerwowana.
              </p>
              <ul className="feature-list">
                <li>Synchronizacja Google / Outlook / iCal</li>
                <li>Automatyczne przesuwanie terminów</li>
                <li>Multi-lokalizacja i multi-team</li>
              </ul>
            </article>

            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                </svg>
              }
              title="Automatyczna komunikacja"
              desc="SMS, e-mail, WhatsApp — w jednym przepływie. Przypomnienia, potwierdzenia i follow-up bez angażowania zespołu."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              }
              title="CRM klienta premium"
              desc="Pełna historia wizyt, preferencji i wydatków. Twój zespół zna klienta zanim podniesie słuchawkę."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3" />
                </svg>
              }
              title="Płatności online"
              desc="Zintegrowane płatności — Stripe, BLIK, karty. Klient płaci wygodnie, Ty masz przychód bez czekania."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              }
              title="Analityka i raporty"
              desc="Widzisz wszystko: konwersję, źródła ruchu, lojalność, LTV. Decyzje oparte na danych, nie intuicji."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" />
                </svg>
              }
              title="Integracje"
              desc="Łączy się z tym, czego już używasz: Google, Meta, Stripe, Twilio, Slack i ponad 200 innymi narzędziami."
            />
          </div>
        </div>
      </section>

      {/* KORZYŚCI */}
      <section className="section section-alt" id="korzysci">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">KORZYŚCI</span>
            <h2>Liczby, które mówią same za siebie.</h2>
            <p className="section-sub">
              Wyniki obserwowane u klientów wdrażających SCALE IT w pierwszych 90 dniach.
            </p>
          </div>

          <div className="benefits-grid">
            <BTile addReveal={addReveal} stat="+37%" title="Więcej rezerwacji" desc="Klienci rezerwują, gdy są gotowi — także w nocy i w weekendy." />
            <BTile addReveal={addReveal} stat="−68%" title="Mniej no-show" desc="Automatyczne przypomnienia w wielu kanałach skutecznie redukują nieobecności." />
            <BTile addReveal={addReveal} stat="12h" title="Oszczędzonych co tydzień" desc="Zespół przestaje grzęznąć w telefonach, mailach i Excelu." />
            <BTile addReveal={addReveal} stat="4.9★" title="Średnia ocen klientów" desc="Premium doświadczenie od pierwszego kontaktu po follow-up." />
            <BTile addReveal={addReveal} stat="×2.4" title="Wyższy LTV klienta" desc="Powracające wizyty i programy lojalnościowe działają w tle." />
            <BTile addReveal={addReveal} stat="90d" title="Do pełnego zwrotu" desc="Typowy czas, w którym SCALE IT zwraca koszt wdrożenia." />
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="section" id="jak-to-dziala">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">JAK TO DZIAŁA</span>
            <h2>
              Od pierwszej rozmowy
              <br />do pełnego wdrożenia — w 14 dni.
            </h2>
          </div>

          <div className="steps">
            <Step addReveal={addReveal} num="01" title="Audyt i strategia" desc="Analizujemy Twój obecny proces rezerwacji, źródła klientów i wąskie gardła. Przygotowujemy plan wdrożenia szyty na miarę." />
            <Step addReveal={addReveal} num="02" title="Konfiguracja i integracje" desc="Łączymy SCALE IT z Twoimi narzędziami — kalendarzami, płatnościami, kanałami komunikacji. Ty nie robisz nic." />
            <Step addReveal={addReveal} num="03" title="Szkolenie zespołu" desc="Krótki onboarding online + dokumentacja. Twój zespół jest gotowy w jeden dzień, nie miesiąc." />
            <Step addReveal={addReveal} num="04" title="Start i optymalizacja" desc="Uruchamiamy system i monitorujemy wyniki. Co miesiąc dostajesz raport z rekomendacjami optymalizacji." />
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section className="section section-alt" id="cennik">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">CENNIK</span>
            <h2>Jasno. Bez ukrytych kosztów.</h2>
            <p className="section-sub">
              Wybierz plan dopasowany do skali Twojego biznesu. Możesz zmienić go w dowolnym momencie.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card" ref={addReveal}>
              <span className="price-name">Starter</span>
              <p className="price-desc">Dla małych zespołów rozpoczynających digitalizację.</p>
              <div className="price">
                <span className="amount">499</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Do 2 użytkowników</li>
                <li>Inteligentny kalendarz</li>
                <li>SMS + e-mail (do 500/mies.)</li>
                <li>Podstawowe raporty</li>
                <li>Wsparcie e-mail</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-outline w-full">
                Wybierz Starter
              </a>
            </div>

            <div className="price-card price-card-featured" ref={addReveal}>
              <span className="ribbon">Najczęściej wybierane</span>
              <span className="price-name">Premium</span>
              <p className="price-desc">Dla rozwijających się biznesów premium.</p>
              <div className="price">
                <span className="amount">1 299</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Do 10 użytkowników</li>
                <li>Wszystko ze Starter</li>
                <li>WhatsApp + płatności online</li>
                <li>CRM klienta + segmenty</li>
                <li>Zaawansowana analityka</li>
                <li>Wsparcie priorytetowe 7 dni</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-light w-full">
                Wybierz Premium
              </a>
            </div>

            <div className="price-card" ref={addReveal}>
              <span className="price-name">Enterprise</span>
              <p className="price-desc">Dla sieci lokalizacji i zespołów premium.</p>
              <div className="price">
                <span className="amount">Indywidualnie</span>
              </div>
              <ul className="price-features">
                <li>Bez limitu użytkowników</li>
                <li>Wszystko z Premium</li>
                <li>Multi-lokalizacja</li>
                <li>Dedykowany opiekun</li>
                <li>SLA 99.9%</li>
                <li>Integracje na zamówienie</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-outline w-full">
                Porozmawiajmy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="section" id="kontakt">
        <div className="container contact-wrap">
          <div className="contact-text" ref={addReveal}>
            <span className="eyebrow">KONTAKT</span>
            <h2>
              Zarezerwuj demo
              <br />i zobacz różnicę
              <br />w 20 minut.
            </h2>
            <p className="section-sub">
              Pokażemy Ci SCALE IT na Twoim realnym przypadku — bez prezentacji w PowerPoincie, bez zobowiązań.
            </p>
            <ul className="contact-points">
              <li><span className="check">✓</span> Demo 1:1 z konsultantem</li>
              <li><span className="check">✓</span> Plan wdrożenia w 48h</li>
              <li><span className="check">✓</span> Wycena Twojego ROI</li>
            </ul>

            <div className="contact-direct">
              <span className="cd-label">Lub odezwij się bezpośrednio:</span>
              <a href="mailto:scaleit.space@gmail.com" className="cd-link">
                <span className="cd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                </span>
                scaleit.space@gmail.com
              </a>
              <a href="tel:+48692961751" className="cd-link">
                <span className="cd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>
                </span>
                +48 692 961 751
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} ref={addReveal}>
            <label>
              <span>Imię i nazwisko</span>
              <input type="text" name="name" required placeholder="Jan Kowalski" />
            </label>
            <label>
              <span>Firma</span>
              <input type="text" name="company" placeholder="Twoja firma" />
            </label>
            <label>
              <span>E-mail</span>
              <input type="email" name="email" required placeholder="jan@firma.pl" />
            </label>
            <label>
              <span>Telefon</span>
              <input type="tel" name="phone" placeholder="+48 ___ ___ ___" />
            </label>
            <label className="full">
              <span>O czym chciał(a)byś porozmawiać?</span>
              <textarea name="message" rows={4} placeholder="Krótko opisz swoją sytuację..." />
            </label>
            <button type="submit" className="btn btn-pill btn-light w-full" disabled={submitting || submitted}>
              {submitted
                ? 'Dziękujemy! Odezwiemy się ✓'
                : submitting
                ? <>Wysyłam... <span className="arrow">→</span></>
                : <>Zarezerwuj demo <span className="arrow">→</span></>}
            </button>
            <p className="form-note">
              Klikając przycisk akceptujesz politykę prywatności. Odezwiemy się w ciągu 24h roboczych.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="foot-brand">
            <a href="#hero" className="logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="#a78bfa" strokeWidth="1.5" />
                <path
                  d="M20 11c-1-1.5-2.5-2-4-2-2.5 0-4 1.5-4 3.5 0 4 8 3 8 7 0 2-1.5 3.5-4 3.5-1.5 0-3-.5-4-2"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>SCALE IT<sup>®</sup></span>
            </a>
            <p>Więcej rezerwacji. Mniej straconych możliwości.</p>
          </div>

          <div className="foot-col">
            <h5>Produkt</h5>
            <a href="#funkcje">Funkcje</a>
            <a href="#korzysci">Korzyści</a>
            <a href="#jak-to-dziala">Jak to działa</a>
            <a href="#cennik">Cennik</a>
          </div>

          <div className="foot-col">
            <h5>Firma</h5>
            <a href="#">O nas</a>
            <a href="#">Blog</a>
            <a href="#">Praca</a>
            <a href="#kontakt">Kontakt</a>
          </div>

          <div className="foot-col">
            <h5>Kontakt</h5>
            <a href="mailto:scaleit.space@gmail.com">scaleit.space@gmail.com</a>
            <a href="tel:+48692961751">+48 692 961 751</a>
            <p className="muted">Pn–Pt 9:00–18:00</p>
          </div>
        </div>

        <div className="container foot-bottom">
          <span>© 2026 SCALE IT. Wszelkie prawa zastrzeżone.</span>
          <div className="foot-legal">
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- helpers ---------- */

function HFItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="hf-item">
      <div className="hf-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function FCard({
  addReveal,
  icon,
  title,
  desc,
}: {
  addReveal: (el: HTMLElement | null) => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <article className="feature-card" ref={addReveal}>
      <div className="fc-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function BTile({
  addReveal,
  stat,
  title,
  desc,
}: {
  addReveal: (el: HTMLElement | null) => void;
  stat: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="benefit-tile" ref={addReveal}>
      <span className="big-stat">{stat}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function Step({
  addReveal,
  num,
  title,
  desc,
}: {
  addReveal: (el: HTMLElement | null) => void;
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="step" ref={addReveal}>
      <span className="step-num">{num}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
