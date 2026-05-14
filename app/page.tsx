'use client';

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
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* Ultra Premium Ambient Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

        {/* Subtle purple ambient glow */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-900/15 via-purple-900/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-violet-400/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-400/50 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] bg-[length:20px_20px]" />
      </div>

      {/* Ultra Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-6 backdrop-blur-xl bg-black/20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Premium logo with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-lg blur-lg" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-violet-500" />
              </div>
            </div>
            <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Scale It
            </h1>
          </div>

          <a href="#contact-form" className="group relative px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 text-white font-medium text-sm overflow-hidden transition-all duration-500 hover:bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-center gap-2">
              Umów prezentację
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5">→</span>
            </div>
          </a>
        </div>
      </nav>

      {/* Ultra Premium Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-48 pb-32 md:pt-56 md:pb-40 grid lg:grid-cols-2 gap-20 md:gap-28 items-center relative">
        {/* Left Column */}
        <div className="space-y-16 lg:space-y-18">
          {/* Premium Label */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 animate-pulse" />
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200 font-semibold">
              Inteligentna recepcja
            </p>
          </div>

          {/* Ultra Luxury Headline */}
          <div className="space-y-8">
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
              <span className="block text-white">Więcej</span>
              <span className="block relative">
                <span className="text-transparent bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text">
                  konsultacji.
                </span>
                {/* Subtle glow behind text */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 blur-2xl -z-10 opacity-50" />
              </span>
              <span className="block text-white">Mniej strat.</span>
            </h2>
          </div>

          {/* Premium Description */}
          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl font-light tracking-wide">
            Automatyzujemy kontakt z klientami. Pomagamy klinikom medycyny estetycznej zwiększać rezerwacje o <span className="text-purple-300 font-semibold">37%</span> średnio w pierwszy miesiąc.
          </p>

          {/* Ultra Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            {/* Primary CTA - Ultra Luxury */}
            <a href="#contact-form" className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-white to-neutral-100 text-black font-semibold text-sm overflow-hidden transition-all duration-700 active:scale-95 inline-block shadow-2xl shadow-white/10 hover:shadow-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3">
                <span>Umów prezentację</span>
                <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  <span className="text-xs">→</span>
                </div>
              </div>
              {/* Premium glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            </a>

            {/* Secondary CTA - Glassmorphism */}
            <button className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/5 backdrop-blur-xl text-white font-semibold text-sm border border-white/10 overflow-hidden transition-all duration-700 hover:border-purple-400/30 hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center gap-3">
                <span>Posłuchaj nagrania</span>
                <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs">▶</span>
                </div>
              </div>
            </button>
          </div>

          {/* Premium Social Proof */}
          <div className="flex items-center gap-6 pt-12 text-sm text-neutral-400">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-400/30 flex-shrink-0 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                />
              ))}
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white">50+ klinik zaufało Scale It</p>
              <p className="text-xs text-neutral-500">Średni wzrost rezerwacji o 37%</p>
            </div>
          </div>
        </div>

        {/* Right Column - Ultra Premium Dashboard Card */}
        <div className="relative group h-full min-h-96 lg:min-h-full">
          {/* Ultra glow effect with purple */}
          <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Main card with ultra glassmorphism */}
          <div className="relative h-full bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-3xl border border-white/[0.12] group-hover:border-purple-400/30 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-700 overflow-hidden">
            {/* Premium shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="relative space-y-10">
              {/* Card Header with luxury styling */}
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <p className="text-xs uppercase tracking-[0.15em] text-purple-200 font-semibold">Średnie rezultaty</p>
                  </div>
                  <h3 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                    +37%
                  </h3>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-violet-600/20 flex items-center justify-center text-4xl sm:text-5xl backdrop-blur-sm border border-purple-400/30 group-hover:border-purple-300/50 transition-all duration-500 flex-shrink-0 shadow-lg shadow-purple-500/10">
                  📈
                </div>
              </div>

              {/* Luxury divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

              {/* Premium Stats Grid */}
              <div className="space-y-4 sm:space-y-5">
                {[
                  { label: "Konsultacji zaplanowanych", value: "312", icon: "📞", color: "from-blue-400 to-cyan-400" },
                  { label: "Klientów odzyskanych", value: "89%", icon: "✨", color: "from-purple-400 to-pink-400" },
                  { label: "Czas odpowiedzi", value: "12 sek", icon: "⚡", color: "from-green-400 to-emerald-400" }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group/stat relative bg-gradient-to-r from-white/[0.05] to-transparent hover:from-white/[0.08] hover:to-white/[0.02] rounded-2xl p-5 sm:p-6 border border-white/[0.08] hover:border-purple-400/25 transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    {/* Subtle stat glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover/stat:opacity-[0.03] transition-opacity duration-500`} />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <p className="text-sm text-neutral-400 font-medium uppercase tracking-wide group-hover/stat:text-purple-200 transition-colors duration-300">
                          {stat.label}
                        </p>
                        <h4 className="text-3xl sm:text-4xl font-bold text-white group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-white group-hover/stat:to-purple-100 group-hover/stat:bg-clip-text transition-all duration-500">
                          {stat.value}
                        </h4>
                      </div>
                      <div className={`text-2xl opacity-70 group-hover/stat:opacity-100 transition-all duration-300 transform group-hover/stat:scale-110 p-2 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium footer indicator */}
              <div className="pt-6 border-t border-white/[0.08]">
                <p className="text-xs text-neutral-500 flex items-center gap-2 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Dane oparte na rzeczywistych wynikach z naszych klientów
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Receptionist Demo Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32 lg:py-40">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-600 font-semibold">
            Jak to działa
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            AI recepcjonistka w akcji
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl font-light">
            Obsługuje połączenia tak jak doświadczona recepcjonistka. 24/7. Bez przerw.
          </p>
        </div>

        {/* Main Demo Container */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Call Interface */}
          <div className="relative group">
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Phone-like interface */}
            <div className="relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-2xl border border-white/15 group-hover:border-white/30 rounded-3xl p-8 overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              
              <div className="relative space-y-8">
                {/* Call Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-600 uppercase tracking-wide font-semibold">Status</p>
                      <h3 className="text-2xl font-bold text-white">Połączenie aktywne</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm text-green-400 font-medium">Online</span>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div className="text-sm text-neutral-500">
                    <span className="font-mono">02:34</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                {/* Conversation Transcript */}
                <div className="space-y-4">
                  <p className="text-xs text-neutral-600 uppercase tracking-wide font-semibold">Transkrypcja</p>
                  
                  <div className="space-y-3">
                    {/* AI message */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">AI Recepcja</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        Cześć! Dzwonisz do kliniki Beauty & Care. Jak się masz? Co mogę dla Ciebie dzisiaj zrobić?
                      </p>
                    </div>

                    {/* User message */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Pacjent</p>
                      <p className="text-sm text-white font-medium leading-relaxed">
                        Hej! Chciałbym umówić konsultację zabiegu Botoksu.
                      </p>
                    </div>

                    {/* AI message */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">AI Recepcja</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        Oczywiście! Mamy dostępne terminy w czwartek o 14:00 i piątek o 16:30. Który Ci bardziej odpowiada?
                      </p>
                    </div>

                    {/* User message */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500">Pacjent</p>
                      <p className="text-sm text-white font-medium leading-relaxed">
                        Piątek o 16:30 to idealne.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                {/* Booking Confirmation */}
                <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <p className="text-sm font-semibold text-green-300">Rezerwacja potwierdzona</p>
                  </div>
                  <div className="space-y-2 text-sm text-neutral-300">
                    <p><span className="text-neutral-500">Data:</span> Piątek, 16:30</p>
                    <p><span className="text-neutral-500">Zabieg:</span> Konsultacja Botoksu</p>
                    <p><span className="text-neutral-500">Przypomnienie SMS:</span> Wysłane</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Audio Player & Features */}
          <div className="space-y-8">
            {/* Audio Player */}
            <div className="bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-2xl border border-white/15 hover:border-white/30 rounded-3xl p-8 transition-all duration-300">
              <p className="text-xs text-neutral-600 uppercase tracking-wide font-semibold mb-6">Posłuchaj nagrania</p>
              
              <div className="space-y-4">
                {/* Player */}
                <div className="bg-black/40 rounded-2xl p-6 flex items-center gap-6">
                  <button className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full" />
                    <span className="relative text-xl">▶</span>
                  </button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium text-white">Przykładowe połączenie</div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div className="bg-gradient-to-r from-white to-neutral-400 h-1 rounded-full w-1/3" />
                    </div>
                    <div className="text-xs text-neutral-500">1:25 / 3:42</div>
                  </div>
                </div>

                <p className="text-sm text-neutral-400">
                  Nagranie demonstruje pełną rozmowę od odboru do rezerwacji. Naturalny głos, precyzja, profesjonalizm.
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                { icon: "🎤", title: "Naturalny głos", desc: "Odróżnić od AI jest prawie niemożliwe" },
                { icon: "⚡", title: "Natychmiastowa odpowiedź", desc: "Każde połączenie odbierane w 2-3 sekundy" },
                { icon: "📅", title: "Inteligentna rezerwacja", desc: "Sprawdza dostępność i umawia pacjentów" },
                { icon: "🌙", title: "24/7 dostępność", desc: "Działa non-stop, nawet w nocy i weekendy" }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  className="group/feature bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                      <p className="text-xs text-neutral-500">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scale It System Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32 lg:py-40">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-600 font-semibold">
            Kompletny system
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Wszystko czego potrzebuje Twoja klinika
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl font-light">
            Scale It to kompleksowy system automatyzacji i wzrostu. Od pierwszej wizyty po lojalność klientów.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: "🌐",
              title: "Premium strony internetowe",
              desc: "Responsywne strony z bookingiem online, które konwertują odwiedzających na klientów.",
              features: ["Booking online", "SEO optimized", "Mobile first"]
            },
            {
              icon: "🎯",
              title: "AI recepcjonistka",
              desc: "Inteligentna recepcja odbiera połączenia 24/7 i umawia konsultacje automatycznie.",
              features: ["24/7 dostępność", "Naturalny głos", "Automatyczne rezerwacje"]
            },
            {
              icon: "📅",
              title: "System rezerwacji",
              desc: "Zaawansowany kalendarz z synchronizacją, przypomnieniami i zarządzaniem terminami.",
              features: ["Sync z kalendarzem", "SMS przypomnienia", "Online booking"]
            },
            {
              icon: "🤖",
              title: "Automatyzacje Instagram & WhatsApp",
              desc: "Automatyczne odpowiedzi na wiadomości, lead nurturing i sprzedaż przez social media.",
              features: ["Auto odpowiedzi", "Lead nurturing", "Social selling"]
            },
            {
              icon: "📊",
              title: "CRM i lead management",
              desc: "Kompletny system zarządzania klientami z historią wizyt i preferencjami.",
              features: ["Historia klientów", "Segmentacja", "Personalizacja"]
            },
            {
              icon: "📈",
              title: "Analityka i raporty",
              desc: "Szczegółowe statystyki przychodów, konwersji i efektywności marketingu.",
              features: ["ROI tracking", "Conversion metrics", "Performance reports"]
            },
            {
              icon: "💬",
              title: "Follow-up klientów",
              desc: "Automatyczne wiadomości po wizytach, przypomnienia o kolejnych zabiegach.",
              features: ["Post-visit care", "Retention campaigns", "Loyalty building"]
            },
            {
              icon: "🔄",
              title: "Odzyskiwanie utraconych leadów",
              desc: "Inteligentne systemy odzyskiwania klientów, którzy nie dokonali rezerwacji.",
              features: ["Lead scoring", "Re-engagement", "Conversion optimization"]
            }
          ].map((service, i) => (
            <div 
              key={i} 
              className="group relative bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-2xl border border-white/15 hover:border-white/30 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative space-y-6">
                {/* Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-white/60 to-white/40 flex-shrink-0" />
                      <span className="text-xs text-neutral-500 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs text-white">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-sm text-neutral-500 mb-6">
            Wszystko w jednym miejscu. Bez integracji. Bez kosztów ukrytych.
          </p>
          <a 
            href="#contact-form" 
            className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Zobacz pełny system w akcji
          </a>
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