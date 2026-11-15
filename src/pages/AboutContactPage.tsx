import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Globe2,
  Languages,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AfricanPattern } from '../components/AfricanPattern';
import { ScrollReveal } from '../components/MotionPrimitives';
import { buildGeneralWhatsAppUrl } from '../data/services';
import { WhatsAppButton } from '../components/WhatsAppIcon';
import { ResilientImage } from '../components/ResilientImage';
import aboutAgencyImg from '../assets/images/about_agency_studio_1794735532192.jpg';
import creatorStudioImg from '../assets/images/creator_studio_africa_1794735533209.jpg';

export function AboutContactPage() {
  const { lang, pick } = useLanguage();

  const charter = [
    {
      title: {
        fr: 'Propriété totale du client',
        en: '100% Client Ownership',
      },
      detail: {
        fr: 'Chaque page Facebook, compte TikTok ou chaîne YouTube est créé ou configuré sous vos propres accès. Nous ne gardons jamais votre compte en otage.',
        en: 'Every Facebook page, TikTok account, or YouTube channel is built under your own credentials. You are never locked out of your own asset.',
      },
    },
    {
      title: {
        fr: 'Zéro achat d’abonnés, de likes ou de vues',
        en: 'Zero Bought Followers, Likes, or Views',
      },
      detail: {
        fr: 'Les chiffres artificiels ruinent la portée organique et mènent au blocage. Nous bâtissons une structure saine orientée vers de vrais clients et spectateurs.',
        en: 'Artificial numbers destroy organic reach and trigger account bans. We build healthy foundations aimed at real buyers and viewers.',
      },
    },
    {
      title: {
        fr: 'Aucune fausse promesse de monétisation',
        en: 'No False Monetization Promises',
      },
      detail: {
        fr: 'Nous vérifions avec vous la disponibilité réelle des programmes dans votre pays avant de démarrer et présentons les leviers commerciaux immédiats.',
        en: 'We verify actual country program availability with you before starting and focus on immediate commercial revenue channels.',
      },
    },
    {
      title: {
        fr: 'Accompagnement bilingue adapté au terrain',
        en: 'Bilingual Ground-Level Support',
      },
      detail: {
        fr: 'Basés au Cameroun, nous comprenons les habitudes de paiement (Mobile Money, paiement à la livraison), les connexions mobiles et la communication WhatsApp.',
        en: 'Based in Cameroon, we understand local payment realities (Mobile Money, cash on delivery), mobile-first browsing, and WhatsApp commerce.',
      },
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F7F4EC] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <AfricanPattern variant="light" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/65">
                {pick({ fr: 'À propos & Contact', en: 'About & Contact' })}
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[#0B2A4A]">
                {pick({
                  fr: 'Construire des présences digitales sérieuses pour les marchés africains.',
                  en: 'Building credible digital presences for African markets.',
                })}
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#0B2A4A]/80">
                {pick({
                  fr: 'EPA Digital Service est une agence digitale basée au Cameroun. Notre mission est simple : permettre aux entrepreneurs, commerçants et créateurs d’Afrique francophone et anglophone de disposer de comptes sociaux propres, structurés et prêts à générer de vrais résultats.',
                  en: 'EPA Digital Service is a digital agency based in Cameroon. Our mission is straightforward: equip entrepreneurs, merchants, and creators across Francophone and Anglophone Africa with clean, structured social channels ready for real business outcomes.',
                })}
              </p>

              <div className="mt-7 flex flex-wrap gap-6 text-sm font-medium text-[#0B2A4A]/80">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FFB703]" />
                  {pick({ fr: 'Basé au Cameroun', en: 'Based in Cameroon' })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-[#FFB703]" />
                  {pick({
                    fr: 'Afrique francophone & anglophone',
                    en: 'Francophone & Anglophone Africa',
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Languages className="h-4 w-4 text-[#FFB703]" />
                  {pick({ fr: 'Français & Anglais', en: 'French & English' })}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#0B2A4A]/12 bg-[#0B2A4A] shadow-lg">
                <ResilientImage
                  src={aboutAgencyImg}
                  alt={pick({
                    fr: 'Espace de travail d’EPA Digital Service au Cameroun',
                    en: 'EPA Digital Service creative workspace in Cameroon',
                  })}
                  fallbackTitle="EPA Digital Service — Cameroun"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charte & Éthique */}
      <section className="border-t border-[#0B2A4A]/10 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="overflow-hidden rounded-2xl border border-[#0B2A4A]/10 bg-[#F7F4EC]">
                  <ResilientImage
                    src={creatorStudioImg}
                    alt={pick({
                      fr: 'Créatrice de contenu africaine préparant une présentation produit sur smartphone',
                      en: 'African content creator preparing a smartphone product showcase',
                    })}
                    fallbackTitle="EPA Digital Service"
                    className="h-full w-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                  <ShieldCheck className="h-4 w-4 text-[#FFB703]" />
                  <span>{pick({ fr: 'Notre charte', en: 'Our Charter' })}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
                  {pick({
                    fr: 'Des règles strictes au service de votre confiance.',
                    en: 'Strict standards built around your long-term trust.',
                  })}
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {charter.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#0B2A4A]/10 bg-[#F7F4EC]/60 p-5"
                    >
                      <div className="flex items-start gap-2.5">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#FFB703]" />
                        <h3 className="font-display text-base font-bold text-[#0B2A4A]">
                          {pick(item.title)}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#0B2A4A]/75">
                        {pick(item.detail)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Direct */}
      <section className="relative overflow-hidden bg-[#0B2A4A] py-16 sm:py-24 text-white">
        <AfricanPattern variant="dark" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB703]">
                {pick({ fr: 'Contact direct', en: 'Direct Contact' })}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight">
                {pick({
                  fr: 'Échangeons sur votre projet dès aujourd’hui.',
                  en: 'Let’s discuss your project today.',
                })}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#F7F4EC]/80">
                {pick({
                  fr: 'Que vous soyez à Douala, Yaoundé, Abidjan, Dakar, Libreville, Kinshasa, Lagos ou ailleurs, tout l’accompagnement s’effectue à distance avec un suivi réactif sur WhatsApp.',
                  en: 'Whether you are in Douala, Yaoundé, Abidjan, Dakar, Libreville, Kinshasa, Lagos, or elsewhere, our full workflow runs smoothly online with responsive WhatsApp support.',
                })}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <WhatsAppButton href={buildGeneralWhatsAppUrl(lang)}>
                  {pick({
                    fr: 'Discuter sur WhatsApp (+237 688 51 88 15)',
                    en: 'Chat on WhatsApp (+237 688 51 88 15)',
                  })}
                </WhatsAppButton>

                <Link
                  to="/commander"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3 text-sm font-semibold text-[#0B2A4A] transition-colors hover:bg-[#E5A400] whitespace-nowrap"
                >
                  <span>
                    {pick({
                      fr: 'Remplir le formulaire de commande',
                      en: 'Fill out the order form',
                    })}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#FFB703]">
                    WhatsApp
                  </p>
                  <p className="mt-1 font-display text-lg font-bold tabular-nums">
                    +237 688 51 88 15
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#FFB703]">
                    {pick({ fr: 'E-mail professionnel', en: 'Business Email' })}
                  </p>
                  <a
                    href="mailto:contact@epadigitalservice.com"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#FFB703] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#FFB703]" />
                    <span>contact@epadigitalservice.com</span>
                  </a>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#FFB703]">
                    {pick({ fr: 'Horaires d’accompagnement', en: 'Support Hours' })}
                  </p>
                  <p className="mt-1 text-sm text-[#F7F4EC]/85">
                    {pick({
                      fr: 'Lundi – Samedi · 08h30 – 19h00 (WAT / UTC+1)',
                      en: 'Monday – Saturday · 08:30 – 19:00 (WAT / UTC+1)',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
