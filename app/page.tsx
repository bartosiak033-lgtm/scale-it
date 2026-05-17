'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const statRef = useRef<HTMLSpanElement | null>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  // Sticky header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animated counter (12h) when hero stat enters view
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const target = 12;
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/maqvgypg', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError('Wysyłka nie powiodła się. Napisz bezpośrednio na scaleit.space@gmail.com.');
      }
    } catch {
      setSubmitError('Problem z połączeniem. Sprawdź internet i spróbuj ponownie.');
    } finally {
      setSubmitting(false);
    }
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
            Early access <span className="arrow">→</span>
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
            <h1>
              Cała obsługa<br />
              klienta.<br />
              <span className="dim">Na autopilocie.</span>
            </h1>
            <p className="lead">
              SCALE IT spina wszystkie aplikacje, z których korzysta Twój biznes —
              Booksy, Versum, Instagram, WhatsApp, kalendarz, płatności — w jeden system.
              Automatyzuje powtarzalne procesy. Zostawia Ci pełną kontrolę z jednego miejsca.
            </p>
            <div className="hero-cta">
              <a href="#kontakt" className="btn btn-pill btn-light">
                Dołącz do early access <span className="arrow">→</span>
              </a>
              <a href="#jak-to-dziala" className="btn btn-ghost">
                Zobacz jak to działa
                <span className="play-dot">▶</span>
              </a>
            </div>
          </div>

          <div className="hero-stat">
            <span className="stat-label">TWOJEJ PRACY</span>
            <span className="stat-number" ref={statRef}>
              {counter}
              <span className="pct">h</span>
            </span>
            <span className="stat-sub">
              ZAOSZCZĘDZONEJ
              <br />
              TYGODNIOWO
            </span>
          </div>
        </div>

        <div className="container hero-features">
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
            </svg>
          } title="Integruje cały stack" desc="Booksy, Versum, IG, WhatsApp." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          } title="Automatyzuje procesy" desc="Od leada po fakturę." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
          } title="Jeden panel kontroli" desc="Wszystko, czym sterujesz." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </svg>
          } title="Pełna analityka" desc="Dane z każdego kanału." />
        </div>
      </section>

      {/* FUNKCJE */}
      <section className="section" id="funkcje">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">FUNKCJE</span>
            <h2>
              Wszystkie narzędzia.
              <br />Wszystkie kanały. Jeden system.
            </h2>
            <p className="section-sub">
              Niezależnie od tego, ilu aplikacji używasz na co dzień —
              SCALE IT spina je w jedną platformę i przejmuje pracę,
              której zespół nie nadąża wykonywać sam.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card feature-big" ref={addReveal}>
              <div className="fc-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                </svg>
              </div>
              <h3>Twój stack w jednym miejscu</h3>
              <p>
                Łączymy aplikacje, których już używasz — Booksy, Versum, Instagram, WhatsApp,
                Google Calendar, Stripe, narzędzia księgowe — w jedną platformę. Jeden login,
                jeden panel, jedno źródło prawdy o klientach.
              </p>
              <ul className="feature-list">
                <li>20+ gotowych integracji ze stackiem branżowym</li>
                <li>Synchronizacja w czasie rzeczywistym</li>
                <li>Custom integracje przez API (plan Enterprise)</li>
              </ul>
            </article>

            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                </svg>
              }
              title="AI receptionist po polsku"
              desc="AI odbiera telefon, gdy zespół nie może — także o 23:00, w weekendy, podczas zabiegów. Rozmawia po polsku, książkuje wizytę bezpośrednio w Twoim kalendarzu."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"/>
                </svg>
              }
              title="Unified inbox"
              desc="Instagram DM, WhatsApp, e-mail, formularze, telefon — wszystkie kanały w jednej skrzynce. Twój zespół odpowiada z jednego miejsca, niezależnie skąd przyszło zapytanie."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 12a9 9 0 1 0 9-9M21 3v6h-6"/>
                </svg>
              }
              title="Workflow automation"
              desc="Klient zarezerwował? Automatycznie SMS potwierdzający, dodanie do kalendarza zespołu, faktura, przypomnienie 24h przed. Każdy proces, który robisz ręcznie, może działać sam."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 21v-1a8 8 0 0 1 16 0v1"/>
                </svg>
              }
              title="CRM 360° — pełna historia klienta"
              desc="Każdy klient ma jeden profil: wizyty z Booksy, rozmowy z Instagrama, historię płatności, preferencje. Zespół wie wszystko, zanim podniesie słuchawkę."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              }
              title="Analityka end-to-end"
              desc="Konwersja na każdym etapie, przychód per usługa, źródła klientów, LTV. Decyzje oparte na danych, nie intuicji. Raporty miesięczne automatycznie na e-mail."
            />
          </div>
        </div>
      </section>

      {/* KORZYŚCI */}
      <section className="section section-alt" id="korzysci">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">KORZYŚCI</span>
            <h2>Liczby, które realnie zmieniają operacje.</h2>
            <p className="section-sub">
              Oczekiwane wyniki dla biznesów wdrażających SCALE IT w pierwszych 90 dniach.
            </p>
          </div>

          <div className="benefits-grid">
            <BTile addReveal={addReveal} stat="20+" title="Integracji w stacku" desc="Booksy, Versum, Meta, Google, Stripe, fakturowanie i wiele więcej — działa z tym, co już masz." />
            <BTile addReveal={addReveal} stat="12h" title="Zaoszczędzonych tygodniowo" desc="Powtarzalna praca z DM-ami, telefonami i Excelem znika. Zespół odzyskuje czas." />
            <BTile addReveal={addReveal} stat="+37%" title="Więcej konwersji" desc="Szybsze odpowiedzi + uratowane leady + smart follow-up dają wymierny wzrost." />
            <BTile addReveal={addReveal} stat="1" title="Panel kontroli" desc="Zamiast 10 zakładek w przeglądarce — wszystko w jednym widoku dla właściciela." />
            <BTile addReveal={addReveal} stat="−68%" title="Mniej zgubionych klientów" desc="Każdy, kto się odezwał — przez telefon, IG, WhatsApp — dostaje odpowiedź." />
            <BTile addReveal={addReveal} stat="3 mies." title="Do pełnego zwrotu" desc="Typowy czas, w którym SCALE IT zwraca koszt wdrożenia." />
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="section" id="jak-to-dziala">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">JAK TO DZIAŁA</span>
            <h2>
              Od chaosu w 10 aplikacjach
              <br />do jednego systemu — w 14 dni.
            </h2>
          </div>

          <div className="steps">
            <Step addReveal={addReveal} num="01" title="Audyt obecnego stacku" desc="Mapujemy wszystkie aplikacje, kanały komunikacji, źródła klientów i procesy, które dziś robisz ręcznie. Wynik: plan integracji szyty na miarę Twojego biznesu." />
            <Step addReveal={addReveal} num="02" title="Podpięcie integracji" desc="Łączymy Booksy, Versum, Instagram, WhatsApp, Google Calendar, Stripe i pozostałe Twoje narzędzia z SCALE IT. Ty wysyłasz dostępy, my robimy resztę." />
            <Step addReveal={addReveal} num="03" title="Konfiguracja automatyzacji" desc="Ustawiamy workflow'y dopasowane do Twoich procesów. Trenujemy AI na Twojej ofercie, języku i preferencjach klientów. System brzmi jak Twój biznes." />
            <Step addReveal={addReveal} num="04" title="Start + ciągłe uczenie" desc="System idzie live. Pierwszy tydzień monitorujemy razem, każdy edge case poprawiamy. Co miesiąc dostajesz raport z rekomendacjami optymalizacji." />
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section className="section section-alt" id="cennik">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">CENNIK</span>
            <h2>Plan dopasowany do skali Twojego biznesu.</h2>
            <p className="section-sub">
              Płacisz za realny zakres — liczbę integracji, automatyzacji, klientów w bazie. Roczna płatność z góry: 10% off.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card" ref={addReveal}>
              <span className="price-name">Starter</span>
              <p className="price-desc">Dla małych biznesów rozpoczynających integrację stacku.</p>
              <div className="price">
                <span className="amount">499</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Do 3 integracji</li>
                <li>Unified inbox (2 kanały)</li>
                <li>Do 500 klientów w bazie</li>
                <li>Podstawowe automatyzacje</li>
                <li>Wsparcie e-mail</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-outline w-full">
                Wybierz Starter
              </a>
            </div>

            <div className="price-card price-card-featured" ref={addReveal}>
              <span className="ribbon">Najczęściej wybierane</span>
              <span className="price-name">Premium</span>
              <p className="price-desc">Dla aktywnych biznesów z multi-kanałową obsługą.</p>
              <div className="price">
                <span className="amount">1 299</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Wszystkie integracje (Booksy, Versum, Meta, Google, Stripe…)</li>
                <li>Unified inbox — wszystkie kanały</li>
                <li>AI receptionist po polsku</li>
                <li>Zaawansowane workflow'y + CRM 360°</li>
                <li>Pełna analityka i raporty</li>
                <li>Wsparcie priorytetowe 7 dni</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-light w-full">
                Wybierz Premium
              </a>
            </div>

            <div className="price-card" ref={addReveal}>
              <span className="price-name">Enterprise</span>
              <p className="price-desc">Dla sieci, dużych zespołów i custom wymagań.</p>
              <div className="price">
                <span className="amount">Indywidualnie</span>
              </div>
              <ul className="price-features">
                <li>Bez limitu klientów i automatyzacji</li>
                <li>Multi-lokalizacja</li>
                <li>Własny głos AI (klonowany)</li>
                <li>Custom integracje przez API</li>
                <li>Dedykowany opiekun</li>
                <li>SLA 99.9%</li>
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
              Dołącz do early access
              <br />i zobacz prototyp
              <br />w 20 minut.
            </h2>
            <p className="section-sub">
              SCALE IT jest w fazie pre-launch. Pierwsze biznesy wchodzące do programu pilotażowego
              dostają 50% rabatu przez 6 miesięcy w zamian za feedback i case study.
            </p>
            <ul className="contact-points">
              <li><span className="check">✓</span> Demo prototypu 1:1</li>
              <li><span className="check">✓</span> Dożywotni rabat dla pilotów</li>
              <li><span className="check">✓</span> Wpływ na to, co budujemy</li>
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
              <input type="text" name="company" placeholder="Nazwa firmy" />
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
              <span>Czego potrzebujesz najbardziej?</span>
              <textarea name="message" rows={4} placeholder="Np. których aplikacji używacie, gdzie tracicie czas, czego brakuje w obecnym stacku..." />
            </label>
            <button type="submit" className="btn btn-pill btn-light w-full" disabled={submitting || submitted}>
              {submitted
                ? 'Dziękujemy! Odezwiemy się ✓'
                : submitting
                ? <>Wysyłam... <span className="arrow">→</span></>
                : <>Dołącz do early access <span className="arrow">→</span></>}
            </button>
            {submitError && <p className="form-error">{submitError}</p>}
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
            <p>Cała obsługa klienta. Na autopilocie.</p>
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
