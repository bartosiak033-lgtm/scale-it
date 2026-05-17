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

  // Animated counter (100%) when hero stat enters view
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const target = 100;
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
            <span className="badge">DLA KLINIK MEDYCYNY ESTETYCZNEJ</span>
            <h1>
              Ani jeden<br />
              <span className="dim">zgubiony</span><br />
              <span className="dim">pacjent.</span>
            </h1>
            <p className="lead">
              AI receptionist po polsku, który odbiera telefony 24/7,
              odpowiada na Instagram i WhatsApp w 5 sekund, i automatyzuje
              całą obsługę klienta. Działa z Booksy, Versum i Twoim kalendarzem.
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
            <span className="stat-label">ODEBRANYCH POŁĄCZEŃ</span>
            <span className="stat-number" ref={statRef}>
              {counter}
              <span className="pct">%</span>
            </span>
            <span className="stat-sub">
              TAKŻE O 23:00
              <br />
              I W WEEKEND
            </span>
          </div>
        </div>

        <div className="container hero-features">
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/>
            </svg>
          } title="Łapie nieodebrane" desc="AI oddzwania w 5 sekund." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>
            </svg>
          } title="Odpowiada na DM-y" desc="Instagram + WhatsApp 24/7." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
            </svg>
          } title="Łączy Twój stack" desc="Booksy, Versum, Google Cal." />
          <HFItem icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </svg>
          } title="Mierzy każdy lead" desc="Skąd, ile, kiedy, dlaczego." />
        </div>
      </section>

      {/* FUNKCJE */}
      <section className="section" id="funkcje">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">FUNKCJE</span>
            <h2>
              Cały stack obsługi klienta.
              <br />W jednym miejscu.
            </h2>
            <p className="section-sub">
              Klinika ma już Booksy, Instagram, WhatsApp, telefon. SCALE IT spina to wszystko
              i przejmuje pracę, której zespół nie nadąża wykonywać sam.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card feature-big" ref={addReveal}>
              <div className="fc-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                </svg>
              </div>
              <h3>AI receptionist po polsku</h3>
              <p>
                Pacjent dzwoni → 5 sekund później AI oddzwania. Rozmawia po polsku, rozpoznaje
                cel rozmowy, sprawdza dostępność w Twoim kalendarzu, ksiegowuje wizytę i wysyła
                SMS z potwierdzeniem. Działa 24/7, bez przerwy obiadowej.
              </p>
              <ul className="feature-list">
                <li>Natywny polski głos i rozumienie kontekstu kliniki</li>
                <li>Książkowanie do Booksy / Versum / Google Calendar</li>
                <li>Automatyczne SMS-y potwierdzenia + przypomnienia</li>
              </ul>
            </article>

            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"/>
                </svg>
              }
              title="Unified inbox"
              desc="Instagram DM, WhatsApp, formularze ze strony, telefon — wszystkie kanały w jednej kolejce. Zespół (albo AI) odpowiada z jednego miejsca."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              }
              title="AI auto-reply 24/7"
              desc="Pytanie o cennik o 22:30? AI odpowiada w 5 sekund, kwalifikuje leada, proponuje termin. Klient nie zdąży sprawdzić konkurencji."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
                </svg>
              }
              title="Integracje z Twoim stackiem"
              desc="Booksy, Versum, Google Calendar, Stripe — łączy się z tym, co już używasz. Nic nie zmieniasz, dodajesz tylko warstwę nad."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 12a9 9 0 1 0 9-9M21 3v6h-6"/>
                </svg>
              }
              title="Follow-up i cross-sell"
              desc="Po wizycie auto-podziękowanie + przypomnienie o kontynuacji za 4-6 tygodni. System pamięta historię klienta i proponuje sensowne następne zabiegi."
            />
            <FCard
              addReveal={addReveal}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              }
              title="Konwersja end-to-end"
              desc="Każdy lead od pierwszego kontaktu do zapłaty. Ile zgubionych połączeń odzyskało AI, z którego kanału przychodzą najlepsi klienci, gdzie pęka lejek."
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
              Oczekiwane wyniki dla klinik wdrażających SCALE IT w pierwszych 90 dniach.
            </p>
          </div>

          <div className="benefits-grid">
            <BTile addReveal={addReveal} stat="100%" title="Odebranych połączeń" desc="Także w nocy, weekendy, podczas zabiegów. AI nie idzie na obiad." />
            <BTile addReveal={addReveal} stat="<5s" title="Średnia reakcja AI" desc="Klient nie zdąży się rozmyślić — już ma odpowiedź na telefonie albo w DM." />
            <BTile addReveal={addReveal} stat="+37%" title="Więcej rezerwacji" desc="Odzyskane nieodebrane połączenia + błyskawiczne DM-y dają wymierny wzrost." />
            <BTile addReveal={addReveal} stat="−68%" title="Mniej zgubionych leadów" desc="Każdy, kto się odezwał, dostaje odpowiedź. Nawet o 2 w nocy." />
            <BTile addReveal={addReveal} stat="12h" title="Oszczędność co tydzień" desc="Zespół przestaje grzęznąć w powtarzalnych telefonach i DM-ach." />
            <BTile addReveal={addReveal} stat="3 mies." title="Do pełnego zwrotu" desc="Typowy czas, w którym SCALE IT zwraca koszt wdrożenia w odzyskanych pacjentach." />
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="section" id="jak-to-dziala">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">JAK TO DZIAŁA</span>
            <h2>
              Od pierwszego telefonu
              <br />do pełnej automatyzacji — w 14 dni.
            </h2>
          </div>

          <div className="steps">
            <Step addReveal={addReveal} num="01" title="Audyt obecnego stacku" desc="Mapujemy wszystkie kanały, którymi klient się odzywa (telefon, IG, WhatsApp, mail), źródła ruchu i nieodebrane okazje. Plan z konkretną listą dziur do zalatania." />
            <Step addReveal={addReveal} num="02" title="Trening AI" desc="Uczymy AI receptionist Twojej oferty cenowej, języka zespołu, preferencji klientów. AI brzmi jak Twoja klinika, nie jak generyczny bot." />
            <Step addReveal={addReveal} num="03" title="Podpięcie integracji" desc="Łączymy SCALE IT z Booksy/Versum przez Google Calendar, IG i WhatsApp przez Meta API, Twój numer przez Twilio. Ty wysyłasz dostępy, my robimy resztę." />
            <Step addReveal={addReveal} num="04" title="Start + ciągłe uczenie" desc="AI idzie live. Pierwszy tydzień monitorujemy razem, każdy edge case poprawiamy. System uczy się specyfiki Twojej kliniki przez 30 dni." />
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section className="section section-alt" id="cennik">
        <div className="container">
          <div className="section-head" ref={addReveal}>
            <span className="eyebrow">CENNIK</span>
            <h2>Plan dopasowany do skali Twojej kliniki.</h2>
            <p className="section-sub">
              Płacisz za realny wolumen — minuty AI, kanały, integracje. Roczna płatność z góry: 10% off.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card" ref={addReveal}>
              <span className="price-name">Starter</span>
              <p className="price-desc">Dla małych klinik testujących AI obsługę.</p>
              <div className="price">
                <span className="amount">499</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Do 500 minut AI / mies.</li>
                <li>1 kanał: telefon LUB Instagram</li>
                <li>Google Calendar integracja</li>
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
              <p className="price-desc">Dla aktywnych klinik z multi-kanałem.</p>
              <div className="price">
                <span className="amount">1 299</span>
                <span className="currency">zł / mies.</span>
              </div>
              <ul className="price-features">
                <li>Do 2 000 minut AI / mies.</li>
                <li>Wszystkie kanały: telefon + IG + WhatsApp</li>
                <li>Booksy / Versum integracja</li>
                <li>Smart follow-up + cross-sell</li>
                <li>Zaawansowana analityka</li>
                <li>Wsparcie priorytetowe 7 dni</li>
              </ul>
              <a href="#kontakt" className="btn btn-pill btn-light w-full">
                Wybierz Premium
              </a>
            </div>

            <div className="price-card" ref={addReveal}>
              <span className="price-name">Enterprise</span>
              <p className="price-desc">Dla sieci klinik i dużego wolumenu.</p>
              <div className="price">
                <span className="amount">Indywidualnie</span>
              </div>
              <ul className="price-features">
                <li>Bez limitu minut AI</li>
                <li>Multi-lokalizacja</li>
                <li>Własny głos AI (klonowany)</li>
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
              Dołącz do early access
              <br />i zobacz prototyp
              <br />w 20 minut.
            </h2>
            <p className="section-sub">
              SCALE IT jest w fazie pre-launch. Pierwsze 5 klinik wchodzi do programu pilotażowego
              z 50% rabatem przez 6 miesięcy w zamian za feedback i case study.
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
              <span>Klinika</span>
              <input type="text" name="company" placeholder="Nazwa kliniki" />
            </label>
            <label>
              <span>E-mail</span>
              <input type="email" name="email" required placeholder="jan@klinika.pl" />
            </label>
            <label>
              <span>Telefon</span>
              <input type="tel" name="phone" placeholder="+48 ___ ___ ___" />
            </label>
            <label className="full">
              <span>Co Cię najbardziej interesuje?</span>
              <textarea name="message" rows={4} placeholder="Np. ile tracicie nieodebranych połączeń, jakie kanały używacie, czego brakuje w Booksy..." />
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
            <p>AI receptionist dla klinik medycyny estetycznej.</p>
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
