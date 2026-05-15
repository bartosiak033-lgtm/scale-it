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
  clinic: string;
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
    clinic: '',
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
    if (!formData.clinic.trim()) newErrors.clinic = 'Podaj nazwę kliniki';
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
      form.append('clinic', formData.clinic);
      form.append('phone', formData.phone);
      form.append('email', formData.email);
      form.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/maqvgypg', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', clinic: '', phone: '', email: '', message: '' });
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

      <motion.section id="hero" className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] blur-3xl opacity-70" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Dla klinik premium</p>
              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-[4.8rem] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Więcej rezerwacji.<br />
                Mniej straconych możliwości.
              </h1>
              <p className="mt-8 max-w-xl text-lg sm:text-xl leading-9 text-neutral-300">
                Zaprojektowane, aby zwiększać efektywność Twojej kliniki i zapewniać doświadczenie na najwyższym poziomie.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.a
                  whileHover={{ y: -1, scale: 1.01 }}
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_24px_80px_-56px_rgba(255,255,255,0.9)] transition duration-300 hover:shadow-[0_28px_90px_-50px_rgba(255,255,255,0.95)]"
                >
                  Zarezerwuj demo →
                </motion.a>
                <motion.a
                  whileHover={{ y: -1 }}
                  href="#jak-to-dziala"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/10"
                >
                  Zobacz jak to działa
                </motion.a>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Więcej rezerwacji', subtitle: 'Bez dodatkowych działań.' },
                  { title: 'Pełna automatyzacja', subtitle: 'Oszczędność czasu i zasobów.' },
                  { title: 'Prestiż i doświadczenie', subtitle: 'Obsługa na poziomie premium.' },
                  { title: 'Mierzalne efekty', subtitle: 'Wyniki, które robią różnicę.' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={cardHover}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl soft-transition"
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
              whileHover={{ y: -4, scale: 1.002 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="relative flex justify-end lg:justify-start soft-transition"
            >
              <div className="relative w-full max-w-[42rem] animate-float">
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-[80px]" />
                <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_80px_140px_-70px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(129,90,242,0.18),transparent_30%)] opacity-80" />
                  <div className="absolute right-8 top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl opacity-70" />
                  <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl opacity-50" />
                  <div className="relative p-10 sm:p-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Image src="/logo-icon.png" alt="Scale It" width={28} height={28} className="object-contain" />
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white">SCALE IT</span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">Dyskretne wsparcie</span>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-10">
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Więcej rezerwacji</p>
                      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
                        <p className="text-6xl font-semibold text-white">37%</p>
                        <div className="max-w-md">
                          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">ŚREDNIO WIĘCEJ KONWERSJI</p>
                          <p className="mt-3 text-sm leading-7 text-neutral-300">Recepcja obsługuje więcej pacjentów szybciej i bez przerw.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2">
                      {[
                        { label: 'Bez dodatkowej pracy', value: 'Kontakt obsłużony od początku do końca' },
                        { label: 'Naturalny rytm', value: 'Rozmowy brzmią zwyczajnie' },
                        { label: 'Całodobowa obsługa', value: 'Dostępność 24/7' },
                        { label: 'Stylowa prezentacja', value: 'Obsługa w wysokim standardzie' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={cardHover}
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
              Pełna kontrola nad wszystkimi kontaktami. Czytelnie, szybko, elegancko.
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
                className="relative z-20 -mt-12 lg:-ml-12"
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
                { icon: '⚡', title: 'Szybka odpowiedź', desc: 'Każde pytanie obsłużone w sekundach.' },
                { icon: '👁️', title: 'Pełny przegląd', desc: 'Wszystkie rozmowy i rezerwacje na ekranie.' },
                { icon: '🎯', title: 'Wyższe konwersje', desc: 'Mniej zagubionego czasu, więcej transakcji.' }
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
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white">Przygotowane dla klinik premium</h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl">Narzędzia, które usprawniają obsługę i dbają o pierwsze wrażenie.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: '📅', title: 'Rezerwacje', desc: 'Terminy i potwierdzenia bez ręcznej pracy.' },
              { icon: '💬', title: 'Kontakty po wizycie', desc: 'Przypomnienia trafiają w odpowiednim czasie.' },
              { icon: '📲', title: 'Instagram i WhatsApp', desc: 'Wiadomości tam, gdzie pacjent jest.' },
              { icon: '🔄', title: 'Odzyskiwanie rezerwacji', desc: 'Klienci wracają do terminu, który już wybrali.' },
              { icon: '🌐', title: 'Strona kliniki', desc: 'Elegancka prezentacja, która dobrze wygląda.' },
              { icon: '📊', title: 'Wyniki w prostym widoku', desc: 'Dane, które łatwo zrozumieć i wykorzystać.' },
              { icon: '🗂️', title: 'Porządek w danych', desc: 'Pacjenci, terminy i preferencje w jednym miejscu.' },
              { icon: '🤝', title: 'Obsługa premium', desc: 'Każdy kontakt ma szlachetny charakter.' }
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Dyskretna obsługa kontaktu</h2>
            <p className="max-w-2xl text-lg text-neutral-400 font-light">Każdy telefon, wiadomość i rezerwacja obsługiwane z klasą.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              {[
                { step: '1', title: 'Kontakt bez opóźnień', desc: 'Pacjent otrzymuje odpowiedź natychmiast.' },
                { step: '2', title: 'Rezerwacja od ręki', desc: 'Kalendarz jest zawsze aktualny i bez błędów.' },
                { step: '3', title: 'Wysoka jakość rozmowy', desc: 'Rozmowy brzmią naturalnie, jak w eleganckiej recepcji.' }
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
                    <div className="text-neutral-400">Dyskretny kontakt</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Dzień dobry, czy mogę pomóc w ustaleniu terminu konsultacji?</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-white font-semibold">Piątek o 16:30 będzie najlepszy.</div>
                    <div className="rounded-3xl bg-black/40 p-5 text-neutral-300">Termin zapisany i potwierdzony w systemie.</div>
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
            <p className="max-w-2xl text-lg text-neutral-400">Kontakt prowadzony naturalnie, bez zbędnych formalności.</p>
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

      <motion.section id="ekosystem" className="relative overflow-hidden bg-[#06050b] py-24 sm:py-28 lg:py-32" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionFade}>
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_45%)] blur-3xl opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Całość</p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white">Wszystko w jednym miejscu</h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl">Rezerwacje, wiadomości i przypomnienia działają razem bez zakłóceń.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'Obsługa kontaktu', desc: 'Każde zapytanie obsługiwane szybko i dyskretnie.' },
              { title: 'Instagram i WhatsApp', desc: 'Wiadomości trafiają tam, gdzie pacjent jest.' },
              { title: 'Porządek w danych', desc: 'Pacjenci, terminy i preferencje w jednym miejscu.' },
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
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Oferta dla klinik premium</h2>
            <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">Wycena dopasowana do prestiżu Twojej kliniki. Rozmowa, która otwiera nowy standard obsługi.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              whileHover={cardHover}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Pakiet startowy</p>
              <p className="mt-4 text-3xl font-semibold text-white">Dla eleganckich klinik</p>
              <p className="mt-3 text-sm text-neutral-400">Wsparcie kontaktu, które zwiększa liczbę rezerwacji bez zbędnych zmian w zespole.</p>
            </motion.div>
            <motion.div
              whileHover={cardHover}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Ekskluzywna oferta</p>
              <p className="mt-4 text-3xl font-semibold text-white">Dla klinik, które oczekują więcej</p>
              <p className="mt-3 text-sm text-neutral-400">Prestiżowa obsługa pacjenta i pełny porządek w kontaktach.</p>
            </motion.div>
            <motion.div
              whileHover={cardHover}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 soft-transition"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Rozmowa demo</p>
              <p className="mt-4 text-3xl font-semibold text-white">Wycena po spotkaniu</p>
              <p className="mt-3 text-sm text-neutral-400">Zarezerwuj demonstrację i poznaj spersonalizowane rozwiązanie dla swojej kliniki.</p>
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
            <p className="text-lg text-neutral-400">Krótka prezentacja. Zobacz, jak kontakt może działać lepiej.</p>
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
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Nazwa kliniki</label>
                      <input
                        type="text"
                        name="clinic"
                        value={formData.clinic}
                        onChange={handleChange}
                        placeholder="Klinika Nova"
                        className={`w-full bg-black/25 border rounded-2xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition ${errors.clinic ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
                      />
                      {errors.clinic && <p className="text-xs text-red-400 mt-2">{errors.clinic}</p>}
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
                        placeholder="jan@clinic.pl"
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
                    {isSubmitting ? 'Wysyłam...' : 'Wyślij wiadomość'}
                  </button>
                </form>

                <p className="text-sm text-neutral-500">Prywatność kliniki jest dla nas ważna. Bez spamu, tylko konkret.</p>
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