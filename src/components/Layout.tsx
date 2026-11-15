import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { buildGeneralWhatsAppUrl } from '../data/services';
import { ReadingProgressBar } from './MotionPrimitives';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, pick } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update document title by route and language
  useEffect(() => {
    const titles: Record<string, { fr: string; en: string }> = {
      '/': {
        fr: 'EPA Digital Service — Présence digitale professionnelle en Afrique',
        en: 'EPA Digital Service — Professional Digital Presence in Africa',
      },
      '/facebook': {
        fr: 'Services Facebook — EPA Digital Service',
        en: 'Facebook Services — EPA Digital Service',
      },
      '/tiktok': {
        fr: 'Services TikTok — EPA Digital Service',
        en: 'TikTok Services — EPA Digital Service',
      },
      '/youtube': {
        fr: 'Services YouTube — EPA Digital Service',
        en: 'YouTube Services — EPA Digital Service',
      },
      '/commander': {
        fr: 'Commander un service — EPA Digital Service',
        en: 'Order a Service — EPA Digital Service',
      },
      '/a-propos': {
        fr: 'À propos et contact — EPA Digital Service',
        en: 'About & Contact — EPA Digital Service',
      },
    };
    const match = titles[location.pathname] ?? titles['/'];
    document.title = match[lang];
  }, [location.pathname, lang]);

  // Scroll to top or hash anchor on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      }, 90);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash, shouldReduceMotion]);

  const navItems = [
    { to: '/', label: { fr: 'Accueil', en: 'Home' } },
    { to: '/facebook', label: { fr: 'Facebook', en: 'Facebook' } },
    { to: '/tiktok', label: { fr: 'TikTok', en: 'TikTok' } },
    { to: '/youtube', label: { fr: 'YouTube', en: 'YouTube' } },
    { to: '/a-propos', label: { fr: 'À propos', en: 'About' } },
  ];

  const generalWaUrl = buildGeneralWhatsAppUrl(lang);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F4EC] text-[#0B2A4A]">
      <ReadingProgressBar />

      {/* Fixed Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#F7F4EC]/95 backdrop-blur-md border-b border-[#0B2A4A]/10 py-2.5 shadow-sm'
            : 'bg-[#F7F4EC]/85 backdrop-blur-sm border-b border-[#0B2A4A]/5 py-3.5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B2A4A] rounded-md"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="h-7 w-7 shrink-0"
            >
              <rect width="32" height="32" rx="8" fill="#0B2A4A" />
              <path
                d="M16 5L27 16L16 27L5 16L16 5Z"
                stroke="#FFB703"
                strokeWidth="2"
              />
              <path
                d="M16 10.5L21.5 16L16 21.5L10.5 16L16 10.5Z"
                fill="#FFB703"
              />
            </svg>
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[#0B2A4A]">
              EPA Digital Service
            </span>
          </Link>

          {/* Zone 2: Concise single-line navigation */}
          <nav
            aria-label={pick({ fr: 'Navigation principale', en: 'Main navigation' })}
            className="hidden md:flex items-center gap-6 lg:gap-7"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B2A4A] rounded ${
                    isActive
                      ? 'text-[#0B2A4A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FFB703]'
                      : 'text-[#0B2A4A]/70 hover:text-[#0B2A4A]'
                  }`
                }
              >
                {pick(item.label)}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Language Switcher + Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label={pick({ fr: 'Sélecteur de langue', en: 'Language selector' })}
              className="flex items-center rounded-lg border border-[#0B2A4A]/15 bg-white/70 p-0.5 text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                aria-pressed={lang === 'fr'}
                className={`rounded-md px-2 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-[#0B2A4A] text-white'
                    : 'text-[#0B2A4A]/70 hover:text-[#0B2A4A]'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`rounded-md px-2 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#0B2A4A] text-white'
                    : 'text-[#0B2A4A]/70 hover:text-[#0B2A4A]'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/commander"
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-[#FFB703] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0B2A4A] shadow-sm transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2A4A]"
            >
              {pick({ fr: 'Commander', en: 'Order now' })}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={pick({ fr: 'Ouvrir le menu', en: 'Toggle navigation menu' })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0B2A4A]/15 bg-white text-[#0B2A4A] md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#0B2A4A]/10 bg-[#F7F4EC] px-4 pb-5 pt-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center rounded-xl px-3.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0B2A4A] text-white'
                        : 'text-[#0B2A4A] hover:bg-[#0B2A4A]/5'
                    }`
                  }
                >
                  {pick(item.label)}
                </NavLink>
              ))}
              <Link
                to="/commander"
                className="mt-2 flex min-h-[46px] items-center justify-center rounded-xl bg-[#FFB703] px-4 text-base font-semibold text-[#0B2A4A]"
              >
                {pick({ fr: 'Commander un service', en: 'Order a service' })}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content with gentle route transition */}
      <main className="flex-1 pt-[60px] sm:pt-[64px]">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="border-t border-[#0B2A4A]/10 bg-[#0B2A4A] text-[#F7F4EC]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0"
                >
                  <rect width="32" height="32" rx="8" fill="#133B66" />
                  <path
                    d="M16 5L27 16L16 27L5 16L16 5Z"
                    stroke="#FFB703"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 10.5L21.5 16L16 21.5L10.5 16L16 10.5Z"
                    fill="#FFB703"
                  />
                </svg>
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  EPA Digital Service
                </span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#F7F4EC]/80">
                {pick({
                  fr: 'Agence digitale basée au Cameroun. Nous accompagnons les entrepreneurs, vendeurs et créateurs d’Afrique francophone et anglophone pour bâtir des présences Facebook, TikTok et YouTube solides et durables.',
                  en: 'Digital agency based in Cameroon. We help entrepreneurs, sellers, and content creators across Francophone and Anglophone Africa build credible, lasting Facebook, TikTok, and YouTube presences.',
                })}
              </p>
              <p className="text-xs text-[#FFB703]">
                {pick({
                  fr: 'Cameroun · Afrique francophone & anglophone · Bilingue FR / EN',
                  en: 'Cameroon · Francophone & Anglophone Africa · Bilingual FR / EN',
                })}
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                {pick({ fr: 'Navigation', en: 'Navigation' })}
              </h3>
              <ul className="space-y-2 text-sm text-[#F7F4EC]/75">
                <li>
                  <Link to="/" className="hover:text-[#FFB703] transition-colors">
                    {pick({ fr: 'Accueil', en: 'Home' })}
                  </Link>
                </li>
                <li>
                  <Link to="/facebook" className="hover:text-[#FFB703] transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="/tiktok" className="hover:text-[#FFB703] transition-colors">
                    TikTok
                  </Link>
                </li>
                <li>
                  <Link to="/youtube" className="hover:text-[#FFB703] transition-colors">
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link to="/commander" className="hover:text-[#FFB703] transition-colors">
                    {pick({ fr: 'Commander', en: 'Order' })}
                  </Link>
                </li>
                <li>
                  <Link to="/a-propos" className="hover:text-[#FFB703] transition-colors">
                    {pick({ fr: 'À propos et contact', en: 'About & Contact' })}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                {pick({ fr: 'Engagements & Contact', en: 'Commitments & Contact' })}
              </h3>
              <p className="text-sm leading-relaxed text-[#F7F4EC]/75">
                {pick({
                  fr: 'Votre compte reste votre propriété à 100 %. Aucune promesse de monétisation garantie, aucun achat d’abonnés ou de vues.',
                  en: 'Your account remains 100% your property. No guaranteed monetization claims, no bought followers or views.',
                })}
              </p>
              <div className="pt-2">
                <a
                  href={generalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1FAF5B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#19944C]"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>WhatsApp : +237 688 51 88 15</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#F7F4EC]/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} EPA Digital Service.{' '}
              {pick({
                fr: 'Tous droits réservés.',
                en: 'All rights reserved.',
              })}
            </p>
            <p>
              {pick({
                fr: 'Basé au Cameroun · Accompagnement en français et en anglais',
                en: 'Based in Cameroon · Support in French and English',
              })}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button (#1FAF5B with subtle discrete pulse) */}
      <div className="fixed bottom-5 right-5 z-40">
        <span
          aria-hidden="true"
          className="whatsapp-pulse-ring absolute inset-0 rounded-full bg-[#1FAF5B]"
        />
        <a
          href={generalWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={pick({
            fr: 'Discuter avec EPA Digital Service sur WhatsApp',
            en: 'Chat with EPA Digital Service on WhatsApp',
          })}
          className="relative flex h-13 w-13 sm:h-14 sm:w-auto sm:px-5 items-center justify-center gap-2.5 rounded-full bg-[#1FAF5B] text-white shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-[#19944C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1FAF5B]"
        >
          <WhatsAppIcon className="h-6 w-6 shrink-0" />
          <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
