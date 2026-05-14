'use client';

import Image from 'next/image';
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

      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/15 backdrop-blur-3xl shadow-[0_20px_80px_-60px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <Image src="/logo-icon.png" alt="Scale It" width={24} height={24} className="object-contain" />
            <div className="hidden sm:block">
              <Image src="/logo-full.png" alt="Scale It" width={140} height={32} className="object-contain" />
            </div>
          </div>

          <a
            href="#contact-form"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_-50px_rgba(255,255,255,0.85)] transition duration-300 hover:shadow-[0_20px_70px_-46px_rgba(255,255,255,0.9)]"
          >
            Zarezerwuj demo
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-32 lg:pt-36 lg:pb-36">
        <div className="absolute inset-0 -z-10 bg-black" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.06),transparent_34%)] pointer-events-none" />
        <div className="absolute left-1/4 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl opacity-60 animate-blob" />
        <div className="absolute right-12 top-[22%] h-52 w-52 rounded-full bg-violet-500/10 blur-3xl opacity-70 animate-blob animation-delay-200" />
        <div className="absolute left-8 bottom-16 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl opacity-50 animate-blob-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_42%)] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Dla klinik premium</p>
              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold leading-[0.88] tracking-[-0.04em] text-white opacity-0 animate-fade-in-up animation-delay-200">
                Recepcja AI, która działa w tle, a efekt widać od pierwszego telefonu.
              </h1>
              <p className="mt-8 max-w-xl text-xl sm:text-2xl leading-[1.6] text-neutral-300 opacity-0 animate-fade-in-up animation-delay-400">
                Spokojna obsługa pacjentów. Wysoka jakość. Dyskretny styl.
              </p>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 animate-fade-in-up animation-delay-600">
                <a href="#contact-form" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_24px_80px_-56px_rgba(255,255,255,0.9)] transition duration-300 hover:shadow-[0_28px_90px_-50px_rgba(255,255,255,0.95)]">
                  Zarezerwuj demo
                </a>
                <a href="#contact-form" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/10">
                  Zapytaj o wdrożenie
                </a>
              </div>
              <p className="mt-10 text-sm text-neutral-500 opacity-0 animate-fade-in-up animation-delay-800">
                Ponad 50 klinik premium zaufało naszej recepcji AI.
              </p>
            </div>

            <div className="relative flex justify-end lg:justify-start opacity-0 animate-fade-in-up animation-delay-800">
              <div className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white/5 p-8 shadow-[0_60px_120px_-60px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
                <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl animate-blob-slower" />
                <div className="absolute -left-10 bottom-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl animate-blob-slow" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between gap-4">
                    <Image src="/logo-full.png" alt="Scale It" width={140} height={32} className="object-contain" />
                    <span className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-neutral-400">W tle AI</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Rezultat</p>
                    <h2 className="text-5xl font-semibold text-white">37% więcej rezerwacji</h2>
                    <p className="max-w-md text-base leading-7 text-neutral-400">
                      Subtelna technologia, która podnosi jakość kontaktu i buduje wrażenie premium.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] bg-white/5 p-5 text-sm text-neutral-300">
                    <p className="font-medium text-white">Projektowana dla klinik, które stawiają na elegancję.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Receptionist Demo Section */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)] blur-3xl opacity-70" />
        <div className="relative space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold">Jak to działa</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">AI recepcjonistka w akcji</h2>
            <p className="max-w-2xl text-lg text-neutral-400 font-light">Obsługuje połączenia tak jak doświadczona recepcjonistka. 24/7. Bez przerw.</p>
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
                      <p className="text-xs text-neutral-500">AI Recepcja</p>
                      <p className="text-neutral-300">Cześć! Dzwonisz do kliniki Beauty & Care. Jak się masz? Co mogę dla Ciebie dzisiaj zrobić?</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Pacjent</p>
                      <p className="text-white font-medium">Hej! Chciałbym umówić konsultację zabiegu Botoksu.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">AI Recepcja</p>
                      <p className="text-neutral-300">Oczywiście! Mamy dostępne terminy w czwartek o 14:00 i piątek o 16:30. Który Ci bardziej odpowiada?</p>
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
                  { icon: '🎤', title: 'Naturalny głos', desc: 'Odróżnić od AI jest prawie niemożliwe' },
                  { icon: '⚡', title: 'Natychmiastowa odpowiedź', desc: 'Każde połączenie odbierane w 2-3 sekundy' },
                  { icon: '📅', title: 'Inteligentna rezerwacja', desc: 'Sprawdza dostępność i umawia pacjentów' },
                  { icon: '🌙', title: '24/7 dostępność', desc: 'Działa non-stop, nawet w nocy i weekendy' }
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
      <section className="relative overflow-hidden max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28 lg:py-32">
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
                features: ['Booking online', 'SEO optimized', 'Mobile first']
              },
              {
                icon: '🎯',
                title: 'AI recepcjonistka',
                desc: 'Inteligentna recepcja odbiera połączenia 24/7 i umawia konsultacje automatycznie.',
                features: ['24/7 dostępność', 'Naturalny głos', 'Automatyczne rezerwacje']
              },
              {
                icon: '📅',
                title: 'System rezerwacji',
                desc: 'Zaawansowany kalendarz z synchronizacją, przypomnieniami i zarządzaniem terminami.',
                features: ['Sync z kalendarzem', 'SMS przypomnienia', 'Online booking']
              },
              {
                icon: '🤖',
                title: 'Automatyzacje Instagram & WhatsApp',
                desc: 'Automatyczne odpowiedzi na wiadomości, lead nurturing i sprzedaż przez social media.',
                features: ['Auto odpowiedzi', 'Lead nurturing', 'Social selling']
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
                desc: 'Szczegółowe statystyki przychodów, konwersji i efektywności marketingu.',
                features: ['ROI tracking', 'Conversion metrics', 'Performance reports']
              },
              {
                icon: '💬',
                title: 'Follow-up klientów',
                desc: 'Automatyczne wiadomości po wizytach, przypomnienia o kolejnych zabiegach.',
                features: ['Post-visit care', 'Retention campaigns', 'Loyalty building']
              },
              {
                icon: '🔄',
                title: 'Odzyskiwanie utraconych leadów',
                desc: 'Inteligentne systemy odzyskiwania klientów, którzy nie dokonali rezerwacji.',
                features: ['Lead scoring', 'Re-engagement', 'Conversion optimization']
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