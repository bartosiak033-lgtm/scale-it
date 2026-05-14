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
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Smooth scroll behavior */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
      
      {/* Premium gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/[0.08] to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-white/[0.04] to-transparent rounded-full blur-3xl -z-10" />
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-5 border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-white to-neutral-400" />
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Scale It
            </h1>
          </div>

          <button className="group relative px-6 py-2.5 rounded-full text-white font-medium text-sm overflow-hidden">
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-full transition-colors duration-300" />
            <a href="#contact-form" className="relative flex items-center justify-center gap-2 backdrop-blur-sm">
              Umów prezentację
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </a>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-40 pb-24 md:pt-48 md:pb-32 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left Column */}
        <div className="space-y-12 lg:space-y-14">
          {/* Label */}
          <div className="inline-block">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-600 font-semibold">
              Inteligentna recepcja
            </p>
          </div>

          {/* Hero Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="block text-white">Więcej</span>
              <span className="block h-20 sm:h-24 lg:h-32 flex items-center">
                <span className="text-transparent bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text animate-in fade-in">
                  konsultacji.
                </span>
              </span>
              <span className="block text-white">Mniej strat.</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-lg font-light tracking-wide">
            Automatyzujemy kontakt z klientami. Pomagamy klinikom medycyny estetycznej zwiększać rezerwacje o 37% średnio w pierwszy miesiąc.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            {/* Primary CTA */}
            <a href="#contact-form" className="group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-sm overflow-hidden transition-all duration-500 active:scale-95 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                Umów prezentację
              </div>
              <div className="absolute inset-0 rounded-full shadow-lg shadow-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </a>

            {/* Secondary CTA */}
            <button className="group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 text-white font-semibold text-sm border border-white/15 overflow-hidden transition-all duration-500 hover:border-white/40">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 backdrop-blur-sm">
                Posłuchaj nagrania
              </div>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-8 text-sm text-neutral-500">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex-shrink-0 transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>
            <span className="font-medium">Zaufało nam 50+ klinik w Polsce</span>
          </div>
        </div>

        {/* Right Column - Premium Dashboard Card */}
        <div className="relative group h-full min-h-96 lg:min-h-full">
          {/* Animated glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Main card with glassmorphism */}
          <div className="relative h-full bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-2xl border border-white/15 group-hover:border-white/30 rounded-3xl p-8 sm:p-10 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden">
            {/* Card shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative space-y-8">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">Średnie rezultaty</p>
                  <h3 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">
                    +37%
                  </h3>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-3xl sm:text-4xl backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300 flex-shrink-0">
                  📈
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

              {/* Stats Grid */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Konsultacji zaplanowanych", value: "312", icon: "📞" },
                  { label: "Klientów odzyskanych", value: "89%", icon: "✨" },
                  { label: "Czas odpowiedzi", value: "12 sek", icon: "⚡" }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="group/stat relative bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 hover:to-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-white/25 transition-all duration-400 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide">
                          {stat.label}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white group-hover/stat:text-transparent group-hover/stat:bg-gradient-to-r group-hover/stat:from-white group-hover/stat:to-neutral-300 group-hover/stat:bg-clip-text transition-all duration-300">
                          {stat.value}
                        </h4>
                      </div>
                      <span className="text-xl opacity-60 group-hover/stat:opacity-100 transition-opacity duration-300">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer indicator */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-neutral-600 flex items-center gap-2 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
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