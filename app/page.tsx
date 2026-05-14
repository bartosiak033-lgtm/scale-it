'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, ChangeEvent, FormEvent } from 'react';

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
    if (!formData.name.trim()) newErrors.name = 'Imię jest wymagane';
    if (!formData.clinic.trim()) newErrors.clinic = 'Nazwa kliniki jest wymagana';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon jest wymagany';
    if (!formData.email.trim()) newErrors.email = 'Email jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Podaj prawidłowy email';
    if (!formData.message.trim()) newErrors.message = 'Wiadomość jest wymagana';
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
        setErrors({ submit: 'Błąd przy wysyłaniu. Spróbuj ponownie.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Błąd sieci. Sprawdź połączenie i spróbuj ponownie.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Smooth scroll behavior */}
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #000000; }

        @keyframes blob {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(16px, -12px, 0) scale(1.08); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate-blob {
          animation: blob 8s ease-in-out infinite alternate;
        }

        .animate-blob-slow {
          animation: blob 12s ease-in-out infinite alternate;
        }

        .animate-blob-slower {
          animation: blob 14s ease-in-out infinite alternate;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.1),transparent_25%)]" />
        <div className="absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] blur-3xl" />
        <div className="absolute left-[10%] top-[18%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#ffffff10] via-[#8b5cf610] to-transparent blur-3xl" />
        <div className="absolute right-[8%] bottom-[14%] w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-[#3b82f610] via-[#ffffff08] to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />
      </div>

      <nav className="sticky top-0 z-50 w-full bg-black/20 border-b border-white/10 backdrop-blur-3xl shadow-[0_20px_80px_-60px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <Image src="/logo-icon.png" alt="Scale It" width={24} height={24} className="object-contain" />
            <div className="hidden sm:block">
              <Image src="/logo-full.png" alt="Scale It" width={140} height={32} className="object-contain" />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm text-neutral-300">
            <a href="#funkcje" className="transition hover:text-white">Funkcje</a>
            <a href="#korzysci" className="transition hover:text-white">Korzyści</a>
            <a href="#jak-to-dziala" className="transition hover:text-white">Jak to działa</a>
            <a href="#cennik" className="transition hover:text-white">Cennik</a>
            <a href="#contact-form" className="transition hover:text-white">Kontakt</a>
          </div>

          <a
            href="#contact-form"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10"
          >
            Zarezerwuj demo
          </a>
        </div>
      </nav>

      <section id="korzysci" className="relative overflow-hidden pt-32 pb-28 lg:pt-36 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-black" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(129,90,242,0.18),transparent_24%),radial-gradient(circle_at_35%_15%,rgba(255,255,255,0.08),transparent_18%)] pointer-events-none" />
        <div className="absolute right-[-120px] top-16 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl opacity-70 animate-blob" />
        <div className="absolute left-[-100px] top-[45%] h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl opacity-50 animate-blob-slow" />
        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_60%)] opacity-30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Dla klinik premium</p>
              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-[5.75rem] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Więcej rezerwacji.<br />
                Mniej utraconych klientów.<br />
                Wyższy standard obsługi.
              </h1>
              <p className="mt-8 max-w-xl text-lg sm:text-xl leading-9 text-neutral-300">
                Automatyzacja kontaktu, która podnosi jakość doświadczenia pacjenta i oszczędza Twój czas.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.a
                  whileHover={{ y: -1, scale: 1.01 }}
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_24px_80px_-56px_rgba(255,255,255,0.9)] transition duration-300 hover:shadow-[0_28px_90px_-50px_rgba(255,255,255,0.95)]"
                >
                  Zarezerwuj demo
                </motion.a>
                <motion.a
                  whileHover={{ y: -1 }}
                  href="#jak-to-dziala"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/10"
                >
                  Zobacz jak działa
                </motion.a>
              </div>
              <div id="funkcje" className="mt-14 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">Więcej rezerwacji</p>
                  <p className="mt-2 text-sm text-neutral-400">Szybszy kontakt z pacjentem, bez zbędnych strat.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">Mniej utraconych klientów</p>
                  <p className="mt-2 text-sm text-neutral-400">Dyskretna automatyzacja zatrzymuje każdy lead.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">Premium doświadczenie</p>
                  <p className="mt-2 text-sm text-neutral-400">Elegancki kontakt zgodny z oczekiwaniami pacjentów premium.</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">Oszczędność czasu</p>
                  <p className="mt-2 text-sm text-neutral-400">Mniej ręcznej pracy, więcej skali i jakości.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="relative flex justify-end lg:justify-start"
            >
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-[80px]" />
                <div className="relative overflow-hidden rounded-[3rem] bg-white/5 border border-white/10 shadow-[0_80px_140px_-70px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                  <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl opacity-70" />
                  <div className="absolute left-8 bottom-10 h-24 w-24 rounded-full bg-cyan-300/10 blur-3xl opacity-50" />
                  <div className="relative p-8">
                    <div className="flex items-center justify-between gap-4">
                      <Image src="/logo-full.png" alt="Scale It" width={140} height={32} className="object-contain" />
                      <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">Dyskretna automatyzacja</span>
                    </div>
                    <div className="mt-12">
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Więcej rezerwacji</p>
                      <h2 className="mt-4 text-6xl font-semibold text-white">37%</h2>
                      <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
                        Mniej utraconych pacjentów dzięki szybszemu i bardziej eleganckiemu doświadczeniu kontaktu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jak to działa */}
      <section id="jak-to-dziala" className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)] blur-3xl opacity-70" />
        <div className="relative space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Jak to działa</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Dyskretna obsługa połączeń</h2>
            <p className="max-w-2xl text-lg text-neutral-400 font-light">Odbieramy każdy telefon elegancko, dokładnie i bez przerw. Pacjenci trafiają tam, gdzie mają trafić.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] blur-3xl opacity-70" />
              <div className="relative space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Status</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Połączenie aktywne</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Transkrypcja</p>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Inteligentna recepcja</p>
                      <p className="text-neutral-300">Cześć! Dzwonisz do kliniki Beauty & Care. Jak się masz? Co mogę dla Ciebie dziś załatwić?</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Pacjent</p>
                      <p className="text-white font-medium">Hej! Chciałbym umówić konsultację zabiegu Botoksu.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Inteligentna recepcja</p>
                      <p className="text-neutral-300">Oczywiście. Mamy wolne terminy w czwartek o 14:00 i w piątek o 16:30. Który pasuje lepiej?</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Pacjent</p>
                      <p className="text-white font-medium">Piątek o 16:30 to idealne.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-300">
                    <span>✓</span>
                    Rezerwacja potwierdzona
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-neutral-300">
                    <p><span className="text-neutral-500">Data:</span> Piątek, 16:30</p>
                    <p><span className="text-neutral-500">Zabieg:</span> Konsultacja Botoksu</p>
                    <p><span className="text-neutral-500">Przypomnienie SMS:</span> Wysłane</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-6">Posłuchaj nagrania</p>
                <div className="space-y-6">
                  <div className="rounded-3xl bg-black/50 p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                      <button className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white/20">
                        ▶
                      </button>
                      <div className="flex-1 space-y-3">
                        <p className="text-sm font-semibold text-white">Przykładowe połączenie</p>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-white to-neutral-400" />
                        </div>
                        <p className="text-xs text-neutral-500">1:25 / 3:42</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400">Nagranie demonstruje pełną rozmowę od odboru do rezerwacji. Naturalny głos, precyzja, profesjonalizm.</p>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: '🎤', title: 'Naturalny głos', desc: 'Rozmowy brzmią jak kontakt z profesjonalną recepcjonistką' },
                  { icon: '⚡', title: 'Błyskawiczna odpowiedź', desc: 'Telefon odbierany w kilka sekund' },
                  { icon: '📅', title: 'Inteligentna rezerwacja', desc: 'Sprawdza dostępność i umawia wizyty' },
                  { icon: '🌙', title: 'Dostępność 24/7', desc: 'Działa całą dobę, także poza godzinami pracy' }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="grid h-12 w-12 place-items-center rounded-3xl bg-white/10 text-2xl">{feature.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="text-xs text-neutral-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale It System Section */}
      <section id="cennik" className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32">
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_45%)] blur-3xl opacity-50" />
        <div className="relative space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Kompletny system</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">Wszystko czego potrzebuje Twoja klinika</h2>
            <p className="max-w-2xl text-lg text-neutral-400 font-light">Scale It to kompleksowy system automatyzacji i wzrostu. Od pierwszej wizyty po lojalność klientów.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🌐',
                title: 'Premium strony internetowe',
                desc: 'Responsywne strony z bookingiem online, które konwertują odwiedzających na klientów.',
                features: ['Rezerwacje online', 'Optymalizacja SEO', 'Projekt mobile first']
              },
              {
                icon: '🎯',
                title: 'Inteligentna recepcja',
                desc: 'Obsługa połączeń 24/7, która umawia konsultacje z najwyższą precyzją.',
                features: ['Dostępność 24/7', 'Naturalny głos', 'Automatyczne rezerwacje']
              },
              {
                icon: '📅',
                title: 'System rezerwacji',
                desc: 'Zaawansowany kalendarz z synchronizacją, przypomnieniami i zarządzaniem terminami.',
                features: ['Synchronizacja kalendarza', 'SMS przypomnienia', 'Rezerwacje online']
              },
              {
                icon: '🤖',
                title: 'Automatyzacje Instagram & WhatsApp',
                desc: 'Automatyczne odpowiedzi na wiadomości, pielęgnacja leadów i sprzedaż przez social media.',
                features: ['Automatyczne odpowiedzi', 'Pielęgnacja leadów', 'Sprzedaż social']
              },
              {
                icon: '📊',
                title: 'CRM i lead management',
                desc: 'Kompletny system zarządzania klientami z historią wizyt i preferencjami.',
                features: ['Historia klientów', 'Segmentacja', 'Personalizacja']
              },
              {
                icon: '📈',
                title: 'Analityka i raporty',
                desc: 'Statystyki przychodów, konwersji i efektywności obsługi.',
                features: ['Śledzenie wyników', 'Konwersje', 'Raporty efektywności']
              },
              {
                icon: '💬',
                title: 'Follow-up klientów',
                desc: 'Automatyczne wiadomości po wizytach i przypomnienia o dalszych zabiegach.',
                features: ['Opieka po wizycie', 'Przypomnienia', 'Budowanie lojalności']
              },
              {
                icon: '🔄',
                title: 'Odzyskiwanie utraconych leadów',
                desc: 'Systemy odzyskiwania klientów, którzy nie sfinalizowali rezerwacji.',
                features: ['Ocena leadów', 'Ponowny kontakt', 'Optymalizacja konwersji']
              }
            ].map((service, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl shadow-black/20 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02]">
                <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-3xl bg-white/10 text-2xl">{service.icon}</div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold text-white leading-tight">{service.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-5 right-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs text-white">→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-neutral-400 mb-6">Wszystko w jednym miejscu. Bez integracji. Bez kosztów ukrytych.</p>
            <a href="#contact-form" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              Zobacz pełny system w akcji
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="max-w-4xl mx-auto px-6 sm:px-8 py-24 md:py-32 lg:py-40">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-600 font-semibold">
            Zaczynamy
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Umów bezpłatną prezentację
          </h2>
          <p className="text-lg text-neutral-400 font-light">
            Pokaże Ci dokładnie, jak Scale It może zwiększyć przychody Twojej kliniki.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Form Card */}
          <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-2xl border border-white/15 group-hover:border-white/30 rounded-3xl p-8 sm:p-10 md:p-12 overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
            
            <div className="relative">
              {/* Success State */}
              {submitSuccess && (
                <div className="mb-8 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-green-300">Wiadomość wysłana!</h3>
                      <p className="text-sm text-green-300/70">Skontaktujemy się z Tobą w ciągu 24 godzin.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jan Kowalski"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.name ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Clinic Name Field */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Nazwa kliniki
                  </label>
                  <input
                    type="text"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    placeholder="Beauty & Care"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.clinic ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.clinic && <p className="text-xs text-red-400 mt-1">{errors.clinic}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+48 123 456 789"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.phone ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jan@clinic.pl"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.email ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Wiadomość
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Powiedz nam o Twojej klinice..."
                    rows={4}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-sm text-red-300">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-4 rounded-xl bg-white text-black font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="relative">
                    {isSubmitting ? 'Wysyłam...' : 'Wyślij wiadomość'}
                  </div>
                  <div className="absolute inset-0 rounded-xl shadow-lg shadow-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>

                {/* Privacy note */}
                <p className="text-xs text-neutral-600 text-center">
                  Respektujemy Twoją prywatność. Nie będziemy wysyłać spamu.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}