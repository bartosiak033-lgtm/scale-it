'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, ChangeEvent, FormEvent } from 'react';

const sectionFade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.16 } }
};

const cardHover = { y: -6, scale: 1.01 };
const buttonHover = { y: -1, scale: 1.01 };

interface FormData {
  name: string;
  business: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    business: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Podaj imię';
    if (!formData.business.trim()) newErrors.business = 'Podaj nazwę firmy';
    if (!formData.phone.trim()) newErrors.phone = 'Podaj telefon';
    if (!formData.email.trim()) newErrors.email = 'Podaj email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Wprowadź poprawny email';
    if (!formData.message.trim()) newErrors.message = 'Napisz krótką wiadomość';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('business', formData.business);
      form.append('phone', formData.phone);
      form.append('email', formData.email);
      form.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/maqvgypg', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', business: '', phone: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({ submit: 'Wysyłka nie powiodła się. Spróbuj ponownie.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Problem z połączeniem. Sprawdź sieć i spróbuj jeszcze raz.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050306] text-white overflow-hidden relative">
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #050306; }

        @keyframes slowFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @keyframes breathe {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }

        @keyframes driftX {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(10px, 0, 0); }
        }

        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate-float {
          animation: slowFloat 18s ease-in-out infinite;
        }

        .animate-glow-breathe {
          animation: breathe 6.8s ease-in-out infinite;
        }

        .animate-drift-x {
          animation: driftX 14s ease-in-out infinite;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
        }

        .soft-transition {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, opacity 0.35s ease;
        }

        .glow-trail:hover {
          box-shadow: 0 0 28px rgba(129, 90, 242, 0.18);
        }

        .chat-device {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(9, 5, 15, 0.82);
          box-shadow: 0 42px 120px -90px rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(20px);
        }

        .chat-float {
          animation: float 14s ease-in-out infinite;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(20px);
        }

        .chat-title {
          color: #f8fafc;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .chat-subtitle {
          color: #a1a1aa;
          font-size: 0.78rem;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .chat-screen {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .chat-bubble {
          max-width: 88%;
          padding: 1rem 1.2rem;
          border-radius: 1.7rem;
          line-height: 1.65;
          font-size: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 45px -24px rgba(0, 0, 0, 0.55);
        }

        .bubble-incoming {
          background: rgba(255, 255, 255, 0.05);
          color: #f8fafc;
          align-self: flex-start;
        }

        .bubble-outgoing {
          background: rgba(129, 90, 242, 0.16);
          color: #ffffff;
          align-self: flex-end;
          border-color: rgba(129, 90, 242, 0.22);
        }

        .bubble-label {
          display: block;
          margin-bottom: 0.45rem;
          color: #9ca3af;
          font-size: 0.75rem;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          background: radial-gradient(circle at top left, rgba(129, 90, 242, 0.34), rgba(20, 20, 30, 0.95));
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chat-note {
          color: #a1a1aa;
          font-size: 0.84rem;
          letter-spacing: 0.04em;
        }

        .chat-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 2rem;
          box-shadow: inset 0 0 70px rgba(129, 90, 242, 0.12);
          pointer-events: none;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(129,90,242,0.16),transparent_22%)] opacity-70" />
        <div className="absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)] blur-3xl" />
        <motion.div
          className="absolute left-[10%] top-[18%] h-[460px] w-[460px] rounded-full bg-violet-500/12 blur-3xl animate-glow-breathe"
          animate={{ x: [0, 10, 0], y: [0, -6, 0], opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[8%] bottom-[12%] h-[560px] w-[560px] rounded-full bg-cyan-300/10 blur-3xl animate-drift-x"
          animate={{ x: [0, -12, 0], y: [0, 6, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
        />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />
      </div>

      <nav className="sticky top-0 z-50 w-full bg-black/15 border-b border-white/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition">
            <Image src="/logo-icon.png" alt="Scale It" width={24} height={24} className="object-contain" />
            <span>Scale It</span>
          </a>
          <div className="hidden lg:flex items-center gap-10 text-sm text-neutral-300">
            <a href="#funkcje" className="transition hover:text-white">Funkcje</a>
            <a href="#jak-to-dziala" className="transition hover:text-white">Jak to działa</a>
            <a href="#demo" className="transition hover:text-white">Prezentacja</a>
            <a href="#contact-form" className="transition hover:text-white">Kontakt</a>
          </div>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Umów prezentację
          </a>
        </div>
      </nav>

      <motion.section id="hero" className="relative overflow-hidden pt-28 pb-32 sm:pt-32 sm:pb-40 lg:pb-44" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[6%] top-[12%] h-[420px] w-[420px] rounded-full bg-violet-500/16 blur-3xl opacity-80" />
          <div className="absolute right-[4%] bottom-[10%] h-[520px] w-[520px] rounded-full bg-cyan-300/12 blur-3xl opacity-75" />
          <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] blur-3xl opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,90,242,0.02),transparent_48%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid gap-20 lg:grid-cols-[0.96fr_1.04fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">DLA FIRM PREMIUM</p>
              <h1 className="mt-8 text-[3.7rem] sm:text-[4.4rem] lg:text-[5.8rem] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Więcej klientów.<br />
                Mniej straconych możliwości.
              </h1>
              <p className="mt-10 max-w-xl text-lg sm:text-xl leading-9 text-neutral-300">
                Nowoczesny system kontaktu i obsługi klienta dla firm premium.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.a
                  whileHover={buttonHover}
                  href="#contact-form"
                  className="inline-flex min-w-[15rem] items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold text-black shadow-[0_28px_90px_-56px_rgba(255,255,255,0.95)] transition duration-300 hover:shadow-[0_32px_100px_-40px_rgba(255,255,255,0.95)]"
                >
                  Zarezerwuj demo
                </motion.a>
                <motion.a
                  whileHover={buttonHover}
                  href="#jak-to-dziala"
                  className="inline-flex min-w-[15rem] items-center justify-center rounded-full border border-white/15 bg-white/5 px-10 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/10"
                >
                  Zobacz działanie
                </motion.a>
              </div>

              <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Więcej kontaktu', subtitle: 'Mniej porzuconych zapytań.' },
                  { title: 'Automatyczny przepływ', subtitle: 'Bez zbędnych interwencji.' },
                  { title: 'Doświadczenie premium', subtitle: 'Komunikacja na najwyższym poziomie.' },
                  { title: 'Mierzalne wyniki', subtitle: 'Efekty, które widać w liczbach.' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={buttonHover}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl soft-transition"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-neutral-400">{item.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.003 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-[44rem] animate-float">
                <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(129,90,242,0.18),transparent_40%)] blur-3xl opacity-80" />
                <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#09050f]/75 shadow-[0_90px_170px_-85px_rgba(0,0,0,0.75)] backdrop-blur-[1.8rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(129,90,242,0.14),transparent_36%)] opacity-75" />
                  <div className="absolute right-8 top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl opacity-70" />
                  <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl opacity-65" />
                  <div className="relative p-10 sm:p-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Image src="/logo-icon.png" alt="Scale It" width={28} height={28} className="object-contain" />
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white">SCALE IT</span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">Premium support</span>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-10">
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Konwersja zapytań</p>
                      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
                        <p className="text-6xl font-semibold text-white">37%</p>
                        <div className="max-w-md">
                          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Więcej umówionych spotkań bez dodatkowego wysiłku</p>
                          <p className="mt-3 text-sm leading-7 text-neutral-300">Klienci otrzymują szybką odpowiedź, ale bez poczucia pośpiechu.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2">
                      {[
                        { label: 'Bez dodatkowej pracy', value: 'Zapytanie obsłużone od początku do końca' },
                        { label: 'Płynny rytm', value: 'Rozmowy brzmią naturalnie' },
                        { label: 'Dostępność 24/7', value: 'Obsługa klienta bez przerw' },
                        { label: 'Styl premium', value: 'Kontakt prowadzony w eleganckim tonie' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={buttonHover}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="rounded-3xl border border-white/10 bg-black/20 p-5 soft-transition"
                        >
                          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">{item.label}</p>
                          <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="korzysci" className="relative overflow-hidden py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(129,90,242,0.12),transparent_35%)] blur-3xl opacity-50" />
        <div className="absolute inset-x-0 bottom-1/3 h-80 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_40%)] blur-3xl opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold"
            >
              Panel zarządzania
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white"
            >
              Wszystkie zapytania.<br />
              Jedno miejsce.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto"
            >
              Kontakty, terminy i rozmowy w jednym, eleganckim widoku.
            </motion.p>
          </div>

          <div className="relative h-auto">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl opacity-40" />
              <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl opacity-30" />
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-0 items-end">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="relative z-10"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_80px_160px_-80px_rgba(0,0,0,0.7)] backdrop-blur-3xl p-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,90,242,0.08),transparent_35%)] rounded-[2rem]" />
                  <Image
                    src="/crm1.png"
                    alt="Panel zarządzania Scale It"
                    width={600}
                    height={500}
                    className="relative w-full h-auto rounded-[1.75rem] object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                className="relative z-20 lg:-mt-16 lg:-ml-12"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_80px_160px_-80px_rgba(0,0,0,0.7)] backdrop-blur-3xl p-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(129,90,242,0.08),transparent_35%)] rounded-[2rem]" />
                  <Image
                    src="/crm2.png"
                    alt="Szczegóły rezerwacji"
                    width={520}
                    height={420}
                    className="relative w-full h-auto rounded-[1.75rem] object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {[
                { icon: '⚡', title: 'Kontakt od razu', desc: 'Każde zapytanie otrzymuje uwagę niemal natychmiast.' },
                { icon: '👁️', title: 'Przejrzysty dzień', desc: 'Cały harmonogram i rozmowy w jednym widoku.' },
                { icon: '🎯', title: 'Większa konwersja', desc: 'Mniej porzuconych zapytań, więcej umówionych spotkań.' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.08 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <p className="text-3xl mb-4">{item.icon}</p>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="funkcje" className="relative overflow-hidden py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(129,90,242,0.14),transparent_30%)] blur-3xl opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Obsługa kontaktu</p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white">Przygotowane dla firm premium</h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl">Narzędzia, które usprawniają obsługę i podnoszą prestiż kontaktu.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: '📅', title: 'Rezerwacje', desc: 'Terminy i potwierdzenia bez ręcznej pracy.' },
              { icon: '📤', title: 'Follow-up', desc: 'Rozmowy pośrodowiska, które podtrzymują relację.' },
              { icon: '📲', title: 'Instagram i WhatsApp', desc: 'Wiadomości tam, gdzie klient już jest.' },
              { icon: '🔄', title: 'Odzyskiwanie zapytań', desc: 'Klienci wracają do pozostawionych terminów.' },
              { icon: '🌐', title: 'Witryna firmy', desc: 'Prestiżowa prezentacja, która wzmacnia markę.' },
              { icon: '📐', title: 'Wyniki w skrócie', desc: 'Najważniejsze dane podane w klarowny sposób.' },
              { icon: '📄', title: 'Porądek w danych', desc: 'Klienci, terminy i preferencje w jednym miejscu.' },
              { icon: '🤝', title: 'Obsługa premium', desc: 'Każdy kontakt prowadzimy z taktem i elegancją.' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={cardHover}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 xl:p-8 shadow-2xl shadow-black/20 soft-transition hover:border-white/20 hover:bg-white/10"
              >
                <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative space-y-5">
                  <div className="grid h-12 w-12 place-items-center rounded-3xl bg-white/10 text-2xl">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="jak-to-dziala" className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] blur-3xl opacity-70" />
        <div className="relative space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Jak to działa</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Dyskretna obsługa klienta</h2>
            <p className="max-w-2xl text-lg text-neutral-400 font-light">Klient już od pierwszego kontaktu otrzymuje obsługę na poziomie ekskluzywnej recepcji.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Kontakt od razu', desc: 'Klient otrzymuje odpowiedź niemal natychmiast.' },
                { step: '2', title: 'Rezerwacja bez luk', desc: 'Kalendarz aktualizuje się automatycznie i bez pomyłek.' },
                { step: '3', title: 'Rozmowa z klasą', desc: 'Każde połączenie brzmi naturalnie i profesjonalnie.' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={cardHover}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-2xl soft-transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-sm font-semibold text-white">{item.step}</div>
                    <div>
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-neutral-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_50px_120px_-80px_rgba(0,0,0,0.65)] backdrop-blur-3xl"
            >
              <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%)] blur-3xl opacity-70" />
              <div className="relative space-y-8">
                <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Nagranie rozmowy</p>
                  <div className="mt-6 flex items-center gap-5">
                    <button className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">▶</button>
                    <div>
                      <p className="text-lg font-semibold text-white">Przykład rozmowy</p>
                      <p className="mt-3 text-sm text-neutral-400">1:25 / 3:42</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <div className="grid gap-4 text-sm">
                    <div className="text-neutral-400">Premium kontakt</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Dzień dobry, czy mogę pomóc w ustaleniu terminu spotkania?</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-white font-semibold">Piątek o 16:30 będzie najlepszy.</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Termin zapisany i potwierdzony od razu.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="demo" className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] blur-3xl opacity-60" />
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Prezentacja</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">Rozmowa, która zamyka termin</h2>
            <p className="max-w-2xl text-lg text-neutral-400">Naturalny kontakt, który konwertuje i buduje zaufanie.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_50px_120px_-80px_rgba(0,0,0,0.65)] backdrop-blur-3xl"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%)] blur-3xl opacity-70" />
            <div className="relative space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Przykład rozmowy</p>
                <div className="mt-6 flex items-center gap-5">
                  <button className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">▶</button>
                  <div>
                    <p className="text-lg font-semibold text-white">Nagranie</p>
                    <p className="mt-3 text-sm text-neutral-400">1:25 / 3:42</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="grid gap-4 text-sm">
                  <div className="text-neutral-400">Dyskretny kontakt</div>
                  <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Dzień dobry, czy mogę pomóc w ustaleniu terminu konsultacji?</div>
                  <div className="rounded-3xl bg-black/40 p-5 text-white font-semibold">Piątek o 16:30 będzie najlepszy.</div>
                  <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Termin zapisany i potwierdzony od razu.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="conversations" className="relative overflow-hidden py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top,rgba(129,90,242,0.14),transparent_40%)] blur-3xl opacity-55" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Realistyczne rozmowy</p>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Prawdziwe konwersacje klient–firma</h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">Instagram DM, WhatsApp i iPhone w ciemnym trybie — zaprojektowane jak realne wiadomości premium.</p>
          </div>

          <div className="grid gap-8 xl:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="chat-device chat-float overflow-hidden rounded-[3rem]"
            >
              <div className="chat-header">
                <div>
                  <p className="chat-subtitle">Instagram DM</p>
                  <p className="chat-title">@sfera.beauty</p>
                </div>
                <div className="chat-avatar">SB</div>
              </div>
              <div className="chat-screen relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="chat-bubble bubble-incoming"
                >
                  <span className="bubble-label">Klient</span>
                  Hej 👋 widziałam efekty na stories, jaki jest najbliższy termin?
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="chat-bubble bubble-outgoing"
                >
                  <span className="bubble-label">Odpowiedź</span>
                  Dzień dobry ✨ Najbliższy wolny termin mamy jutro o 16:30.
                </motion.div>
                <p className="chat-note mt-3">Realistyczny komunikator biznesowy w Instagramowym stylu.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="chat-device chat-float overflow-hidden rounded-[3rem]"
            >
              <div className="chat-header">
                <div>
                  <p className="chat-subtitle">WhatsApp</p>
                  <p className="chat-title">Biuro Prestige</p>
                </div>
                <div className="chat-avatar">BP</div>
              </div>
              <div className="chat-screen relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  className="chat-bubble bubble-outgoing"
                >
                  <span className="bubble-label">Wiadomość</span>
                  Przypomnienie o jutrzejszej wizycie o 14:00.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.22 }}
                  className="chat-bubble bubble-incoming"
                >
                  <span className="bubble-label">Klient</span>
                  Czy nadal są Państwo zainteresowani konsultacją?
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.32 }}
                  className="chat-bubble bubble-outgoing"
                >
                  <span className="bubble-label">Odpowiedź</span>
                  Dziękujemy za kontakt — wracamy z odpowiedzią za kilka minut.
                </motion.div>
                <p className="chat-note mt-3">Autentyczna rozmowa telefoniczna w ciemnym, eleganckim stylu.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="chat-device chat-float overflow-hidden rounded-[3rem]"
            >
              <div className="chat-header">
                <div>
                  <p className="chat-subtitle">iPhone Dark Mode</p>
                  <p className="chat-title">Konsultacja premium</p>
                </div>
                <div className="chat-avatar">IO</div>
              </div>
              <div className="chat-screen relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.14 }}
                  className="chat-bubble bubble-incoming"
                >
                  <span className="bubble-label">Klient</span>
                  Cześć, czy mogę prosić o dostępny termin na konsultację?
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.24 }}
                  className="chat-bubble bubble-outgoing"
                >
                  <span className="bubble-label">Odpowiedź</span>
                  Oczywiście, mamy termin w środę o 17:00. Potwierdzam?
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.34 }}
                  className="chat-bubble bubble-incoming"
                >
                  <span className="bubble-label">Klient</span>
                  Tak, proszę zarezerwować.
                </motion.div>
                <p className="chat-note mt-3">Elegancki iPhone dark mode w stylu premium, bez sztucznego efektu.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="ekosystem" className="relative overflow-hidden bg-[#06050b] py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_45%)] blur-3xl opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Całość</p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white">Wszystko w jednym miejscu</h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl">Rezerwacje, wiadomości i przypomnienia działają razem, bez utraty jakości.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'Obsługa kontaktu', desc: 'Każde zapytanie obsługiwane szybko i dyskretnie.' },
              { title: 'Instagram i WhatsApp', desc: 'Wiadomości trafiają tam, gdzie klient już jest.' },
              { title: 'Porądek w danych', desc: 'Klienci, terminy i preferencje w jednym miejscu.' },
              { title: 'Wyniki w prostym widoku', desc: 'Raporty dostępne w klarownym formacie.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={cardHover}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/25 soft-transition"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">{item.title}</p>
                <p className="mt-4 text-lg font-semibold text-white">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="cennik" className="relative overflow-hidden bg-[#06050b] py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)] blur-3xl opacity-70" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Cennik</p>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Oferta dla firm premium</h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">Oferta stworzona dla firm, które traktują kontakt jako część luksusowego doświadczenia.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              whileHover={cardHover}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Pakiet startowy</p>
              <p className="mt-4 text-3xl font-semibold text-white">Dla eleganckich firm</p>
              <p className="mt-3 text-sm text-neutral-400">Wsparcie kontaktu, które podnosi liczbę rezerwacji bez obciążania zespołu.</p>
            </motion.div>
            <motion.div
              whileHover={cardHover}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Ekskluzywna oferta</p>
              <p className="mt-4 text-3xl font-semibold text-white">Dla firm, które oczekują więcej</p>
              <p className="mt-3 text-sm text-neutral-400">Prestiżowa komunikacja i porądek w każdym kontakcie.</p>
            </motion.div>
            <motion.div
              whileHover={cardHover}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Rozmowa demo</p>
              <p className="mt-4 text-3xl font-semibold text-white">Wycena po spotkaniu</p>
              <p className="mt-3 text-sm text-neutral-400">Zarezerwuj krótką prezentację i poznaj rozwiązanie dopasowane do Twojej firmy.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="contact-form" className="relative overflow-hidden max-w-6xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="relative space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Kontakt</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">Umów prezentację</h2>
            <p className="text-lg text-neutral-400">Krótka prezentacja. Zobacz, jak kontakt może podnieść jakość obsługi.</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/5 p-8 shadow-[0_50px_120px_-70px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(129,90,242,0.14),transparent_25%)] opacity-50" />
              <div className="relative space-y-8">
                {submitSuccess && (
                  <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
                    <div className="flex items-center gap-3 text-green-200">
                      <span className="text-2xl">✓</span>
                      <div>
                        <p className="font-semibold">Wiadomość wysłana!</p>
                        <p className="text-sm text-green-300/80">Odezwemy się w ciągu 24 godzin.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Imię i nazwisko</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jan Kowalski"
                        className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition ${errors.name ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-2">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Nazwa firmy</label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="Moja Firma"
                        className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition ${errors.business ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                      />
                      {errors.business && <p className="text-xs text-red-400 mt-2">{errors.business}</p>}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+48 123 456 789"
                        className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition ${errors.phone ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-2">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jan@firma.pl"
                        className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition ${errors.email ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Wiadomość</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                        placeholder="Napisz krótko, czego potrzebujecie"
                      rows={5}
                      className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-2">{errors.message}</p>}
                  </div>

                  {errors.submit && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{errors.submit}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Wysyłam...' : 'Wyślij zapytanie'}
                  </button>
                </form>

                <p className="text-sm text-neutral-500">Prywatność jest dla nas priorytetem. Tylko konkretne odpowiedzi, bez spamu.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-white/10 bg-[#050306] py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-neutral-300">
            <Image src="/logo-icon.png" alt="Scale It" width={24} height={24} className="object-contain" />
            <span className="text-sm uppercase tracking-[0.35em]">SCALE IT</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
            <a href="#funkcje" className="transition hover:text-white">Funkcje</a>
            <a href="#korzysci" className="transition hover:text-white">Korzyści</a>
            <a href="#jak-to-dziala" className="transition hover:text-white">Jak to działa</a>
            <a href="#cennik" className="transition hover:text-white">Cennik</a>
            <a href="#contact-form" className="transition hover:text-white">Kontakt</a>
          </div>
        </div>
      </footer>
    </main>
  );
}