import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Facebook,
  PlaySquare,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AfricanPattern } from '../components/AfricanPattern';
import { AnimatedCounter, ScrollReveal } from '../components/MotionPrimitives';
import { buildGeneralWhatsAppUrl } from '../data/services';
import { WhatsAppButton } from '../components/WhatsAppIcon';
import { ResilientImage } from '../components/ResilientImage';
import heroCameroonImg from '../assets/images/hero_cameroon_entrepreneurs_1794735531987.jpg';
import fbBeforeImg from '../assets/images/fb_before_demo_1794736227953.jpg';
import fbAfterImg from '../assets/images/fb_after_clean_1794736247230.jpg';
import ttBeforeImg from '../assets/images/tt_before_demo_1794736228649.jpg';
import ttAfterImg from '../assets/images/tt_after_clean_1794736248093.jpg';
import ytBeforeImg from '../assets/images/yt_before_demo_1794736229956.jpg';
import ytAfterImg from '../assets/images/yt_after_clean_1794736248082.jpg';

export function HomePage() {
  const { lang, pick } = useLanguage();

  const platformCards = [
    {
      id: 'facebook',
      to: '/facebook',
      name: 'Facebook',
      icon: Facebook,
      subtitle: {
        fr: 'Vendre et rassurer vos clients',
        en: 'Sell and build customer trust',
      },
      description: {
        fr: 'Page simple, professionnelle, page de vente avec catalogue & WhatsApp, préparation à la monétisation et publicités.',
        en: 'Simple page, pro page, catalog + WhatsApp sales page, monetization prep, and Facebook Ads setup.',
      },
      cta: { fr: 'Voir les services Facebook', en: 'Explore Facebook services' },
    },
    {
      id: 'tiktok',
      to: '/tiktok',
      name: 'TikTok',
      icon: Video,
      subtitle: {
        fr: 'Capter l’attention et convertir',
        en: 'Capture attention and convert',
      },
      description: {
        fr: 'Compte TikTok professionnel, stratégie éditoriale, préparation aux lives, affiliation et habillage visuel cohérent.',
        en: 'Professional TikTok account, content strategy, live readiness, affiliate setup, and cohesive visual branding.',
      },
      cta: { fr: 'Voir les services TikTok', en: 'Explore TikTok services' },
    },
    {
      id: 'youtube',
      to: '/youtube',
      name: 'YouTube',
      icon: PlaySquare,
      subtitle: {
        fr: 'Bâtir une audience durable',
        en: 'Build a lasting audience',
      },
      description: {
        fr: 'Chaîne professionnelle complète, référencement YouTube (SEO), miniatures, plan vidéo et identité visuelle.',
        en: 'Complete professional channel, YouTube SEO, thumbnails, video roadmap, and channel visual identity.',
      },
      cta: { fr: 'Voir les services YouTube', en: 'Explore YouTube services' },
    },
  ];

  const whyUs = [
    {
      number: '01',
      title: { fr: 'Une méthode claire', en: 'A Clear Method' },
      description: {
        fr: 'Chaque projet suit des étapes précises, sans jargon technique inutile. Vous savez exactement ce qui est configuré, pourquoi et dans quel délai indicatif.',
        en: 'Every project follows clear milestones without unnecessary jargon. You know exactly what is configured, why, and within what indicative timeline.',
      },
    },
    {
      number: '02',
      title: {
        fr: 'Votre page vous appartient',
        en: 'Your Page Belongs to You',
      },
      description: {
        fr: 'Nous créons ou structurons vos comptes directement sous vos identifiants personnels. Vous restez propriétaire administrateur unique à 100 %.',
        en: 'We build or structure your accounts directly under your own credentials. You retain 100% primary ownership and admin control.',
      },
    },
    {
      number: '03',
      title: {
        fr: 'Respect strict des règles',
        en: 'Strict Platform Compliance',
      },
      description: {
        fr: 'Zéro compte préfabriqué, zéro achat d’abonnés ou de vues artificielles. Nous bâtissons des fondations saines qui ne risquent pas la suspension.',
        en: 'Zero pre-made accounts, zero bought followers or artificial views. We lay healthy foundations safe from sudden bans.',
      },
    },
    {
      number: '04',
      title: {
        fr: 'Accompagnement FR & EN',
        en: 'Bilingual FR & EN Support',
      },
      description: {
        fr: 'Basés au Cameroun, nous travaillons en français et en anglais avec les réalités commerciales de l’Afrique francophone et anglophone.',
        en: 'Based in Cameroon, we work seamlessly in French and English with deep understanding of Francophone and Anglophone African markets.',
      },
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: {
        fr: 'Remplissez le formulaire',
        en: 'Fill out the order form',
      },
      description: {
        fr: 'Indiquez votre plateforme, le service souhaité, votre activité et vos objectifs en deux minutes.',
        en: 'Specify your platform, desired service, business niche, and goals in two minutes.',
      },
    },
    {
      step: '02',
      title: {
        fr: 'Nous vous contactons sur WhatsApp',
        en: 'We reach out on WhatsApp',
      },
      description: {
        fr: 'Nous validons vos informations, vérifions l’éligibilité de votre pays si nécessaire et cadrons les détails.',
        en: 'We confirm your details, verify country eligibility when relevant, and align on the scope.',
      },
    },
    {
      step: '03',
      title: {
        fr: 'Nous créons et lançons',
        en: 'We build and launch',
      },
      description: {
        fr: 'Configuration technique, identité visuelle, connexion WhatsApp et structuration des premiers contenus.',
        en: 'Technical setup, visual identity, WhatsApp integration, and starter content structure.',
      },
    },
    {
      step: '04',
      title: {
        fr: 'Vous gérez, formation incluse',
        en: 'You manage, training included',
      },
      description: {
        fr: 'Nous vous remettons les accès complets avec une prise en main claire pour publier et vendre en autonomie.',
        en: 'We hand over full ownership along with clear training so you can publish and sell independently.',
      },
    },
  ];

  const realizationSlots = [
    {
      platform: 'Facebook',
      title: {
        fr: 'Transformation Page Commerce & Catalogue',
        en: 'Business Page & Catalog Transformation',
      },
      beforeImage: fbBeforeImg,
      afterImage: fbAfterImg,
      beforeAlt: {
        fr: 'Exemple avant structuration : page Facebook sans identité ni catalogue',
        en: 'Before structuring example: Facebook page without branding or catalog',
      },
      afterAlt: {
        fr: 'Exemple après structuration : page Facebook avec bannière, catalogue produits et bouton WhatsApp',
        en: 'After structuring example: Facebook page with banner, product catalog, and WhatsApp button',
      },
      note: {
        fr: 'Passage d’une page vide et peu rassurante à une vitrine structurée avec bannière, logo, catalogue visuel et bouton WhatsApp direct.',
        en: 'Moving from an unbranded, incomplete page to a structured storefront with banner, logo, visual catalog, and direct WhatsApp button.',
      },
    },
    {
      platform: 'TikTok',
      title: {
        fr: 'Refonte Profil & Habillage TikTok',
        en: 'TikTok Profile & Visual Kit Overhaul',
      },
      beforeImage: ttBeforeImg,
      afterImage: ttAfterImg,
      beforeAlt: {
        fr: 'Exemple avant structuration : profil TikTok sans bio claire ni couvertures harmonieuses',
        en: 'Before structuring example: TikTok profile lacking clear bio or consistent covers',
      },
      afterAlt: {
        fr: 'Exemple après structuration : profil TikTok professionnel avec bio, lien et grille visuelle cohérente',
        en: 'After structuring example: professional TikTok profile with bio, link, and cohesive grid',
      },
      note: {
        fr: 'Clarification de la bio, ajout du lien d’action et mise en place de couvertures vidéo harmonieuses pour inciter à l’abonnement.',
        en: 'Clear bio positioning, clickable action link, and cohesive video cover templates that encourage profile visits and follows.',
      },
    },
    {
      platform: 'YouTube',
      title: {
        fr: 'Structuration Chaîne & Identité Visuelle',
        en: 'YouTube Channel & Visual Identity Setup',
      },
      beforeImage: ytBeforeImg,
      afterImage: ytAfterImg,
      beforeAlt: {
        fr: 'Exemple avant structuration : chaîne YouTube sans bannière ni playlists organisées',
        en: 'Before structuring example: YouTube channel with no banner or organized playlists',
      },
      afterAlt: {
        fr: 'Exemple après structuration : chaîne YouTube avec bannière responsive, miniatures et playlists',
        en: 'After structuring example: YouTube channel with responsive banner, thumbnails, and playlists',
      },
      note: {
        fr: 'Création d’une bannière lisible sur mobile et TV, organisation en playlists thématiques et gabarits de miniatures lisibles.',
        en: 'Mobile and TV-safe channel banner, themed playlist organization, and readable high-contrast thumbnail templates.',
      },
    },
  ];

  const marqueeItems = pick({
    fr: [
      'Facebook Pages & Catalogue',
      'TikTok Pro & Stratégie',
      'YouTube Studio & SEO',
      'Connexion WhatsApp Business',
      'Cameroun · Douala · Yaoundé',
      'Afrique francophone & anglophone',
      '100 % Propriété Client',
    ],
    en: [
      'Facebook Pages & Catalogs',
      'TikTok Pro & Strategy',
      'YouTube Studio & SEO',
      'WhatsApp Business Linking',
      'Cameroon · Douala · Yaoundé',
      'Francophone & Anglophone Africa',
      '100% Client Ownership',
    ],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F7F4EC] pt-10 pb-16 sm:pt-14 sm:pb-24">
        <AfricanPattern variant="light" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#0B2A4A]/70">
                {pick({
                  fr: 'Cameroun · Afrique francophone & anglophone',
                  en: 'Cameroon · Francophone & Anglophone Africa',
                })}
              </p>

              <h1 className="mt-3 font-display text-[clamp(2.15rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-[#0B2A4A]">
                {pick({
                  fr: 'Votre présence digitale, professionnelle et prête à grandir.',
                  en: 'Your digital presence, professional and ready to grow.',
                })}
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0B2A4A]/80">
                {pick({
                  fr: 'EPA Digital Service accompagne les entrepreneurs, vendeurs et créateurs de contenu en Afrique pour bâtir des pages Facebook, comptes TikTok et chaînes YouTube propres, crédibles et prêts pour vos clients.',
                  en: 'EPA Digital Service helps entrepreneurs, merchants, and content creators across Africa build clean, credible Facebook pages, TikTok accounts, and YouTube channels ready for growth.',
                })}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/commander"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B2A4A] shadow-sm transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2A4A]"
                >
                  <span>
                    {pick({
                      fr: 'Démarrer ma commande',
                      en: 'Start my order',
                    })}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>

                <WhatsAppButton href={buildGeneralWhatsAppUrl(lang)}>
                  {pick({
                    fr: 'Écrire sur WhatsApp',
                    en: 'Message on WhatsApp',
                  })}
                </WhatsAppButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-[#0B2A4A]/10 bg-[#0B2A4A] shadow-lg">
                <ResilientImage
                  src={heroCameroonImg}
                  alt={pick({
                    fr: 'Entrepreneurs africains travaillant sur leur présence digitale au Cameroun',
                    en: 'African entrepreneurs planning their digital presence in Cameroon',
                  })}
                  fallbackTitle="EPA Digital Service"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-medium text-[#FFB703]">
                    {pick({
                      fr: 'Accompagnement sur mesure',
                      en: 'Tailored guidance',
                    })}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white/95">
                    {pick({
                      fr: 'Pensé pour les vendeurs, PME et créateurs du continent.',
                      en: 'Built for merchants, SMEs, and creators across the continent.',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Clickable Platform Cards */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {platformCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.id} delay={index * 0.06}>
                  <Link
                    to={card.to}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[#0B2A4A]/10 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:border-[#0B2A4A]/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2A4A]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B2A4A] text-[#FFB703] transition-colors group-hover:bg-[#FFB703] group-hover:text-[#0B2A4A]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-[#0B2A4A]/55">
                          0{index + 1}
                        </span>
                      </div>

                      <h2 className="mt-5 font-display text-xl font-bold text-[#0B2A4A]">
                        {card.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-[#0B2A4A]/70">
                        {pick(card.subtitle)}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[#0B2A4A]/75">
                        {pick(card.description)}
                      </p>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0B2A4A] group-hover:text-[#0B2A4A]">
                      <span className="border-b border-[#FFB703] pb-0.5">
                        {pick(card.cta)}
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scrolling Platform Marquee Banner */}
      <div
        aria-label={pick({
          fr: 'Plateformes et zones accompagnées',
          en: 'Supported platforms and regions',
        })}
        className="overflow-hidden border-y border-[#0B2A4A]/10 bg-[#0B2A4A] py-3.5 text-[#F7F4EC]"
      >
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-4 text-sm font-medium tracking-wide"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="text-[#FFB703]">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Structural Facts Strip with Animated Counters (100% factual, zero invented client stats) */}
      <section className="border-b border-[#0B2A4A]/10 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#0B2A4A]">
                <AnimatedCounter target={3} />
              </p>
              <p className="text-sm font-medium text-[#0B2A4A]/75">
                {pick({
                  fr: 'Plateformes clés maîtrisées (Facebook, TikTok, YouTube)',
                  en: 'Core platforms mastered (Facebook, TikTok, YouTube)',
                })}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#0B2A4A]">
                <AnimatedCounter target={4} />
              </p>
              <p className="text-sm font-medium text-[#0B2A4A]/75">
                {pick({
                  fr: 'Étapes transparentes de la commande à la formation',
                  en: 'Transparent steps from order to handover training',
                })}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#0B2A4A]">
                <AnimatedCounter target={2} />
              </p>
              <p className="text-sm font-medium text-[#0B2A4A]/75">
                {pick({
                  fr: 'Langues d’accompagnement (Français & Anglais)',
                  en: 'Working languages (French & English)',
                })}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#0B2A4A]">
                <AnimatedCounter target={100} suffix="%" />
              </p>
              <p className="text-sm font-medium text-[#0B2A4A]/75">
                {pick({
                  fr: 'Propriété du compte conservée par le client',
                  en: 'Account ownership retained by the client',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous Section */}
      <section className="relative bg-[#F7F4EC] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                {pick({ fr: 'Pourquoi EPA Digital Service', en: 'Why EPA Digital Service' })}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
                {pick({
                  fr: 'Une agence sérieuse, transparente et ancrée sur nos réalités.',
                  en: 'A reliable agency grounded in African market realities.',
                })}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whyUs.map((item, idx) => (
              <ScrollReveal key={item.number} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-[#0B2A4A]/10 bg-white p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-[#FFB703] tabular-nums">
                      {item.number}.
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#0B2A4A]">
                      {pick(item.title)}
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[#0B2A4A]/75">
                    {pick(item.description)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section className="relative overflow-hidden bg-[#0B2A4A] py-16 sm:py-24 text-[#F7F4EC]">
        <AfricanPattern variant="dark" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FFB703]">
                {pick({ fr: 'Comment ça marche', en: 'How it works' })}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {pick({
                  fr: 'Quatre étapes simples pour lancer votre présence.',
                  en: 'Four simple steps to launch your digital presence.',
                })}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, idx) => (
              <ScrollReveal key={step.step} delay={idx * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                  <div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB703] font-display text-sm font-bold text-[#0B2A4A] tabular-nums">
                      {step.step}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {pick(step.title)}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#F7F4EC]/80">
                      {pick(step.description)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/commander"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B2A4A] transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5"
            >
              <span>
                {pick({
                  fr: 'Remplir le formulaire de commande',
                  en: 'Complete the order form',
                })}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Réalisations — Modèles visuels Avant / Après */}
      <section className="bg-[#F7F4EC] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                  {pick({ fr: 'Réalisations & Exemples visuels', en: 'Transformations & Visual Examples' })}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
                  {pick({
                    fr: 'Ce que change une vraie structuration : Avant / Après.',
                    en: 'What Proper Structuring Changes: Before / After.',
                  })}
                </h2>
                <p className="mt-3 text-base text-[#0B2A4A]/75">
                  {pick({
                    fr: 'Aperçu comparatif entre un compte laissé sans structure et l’architecture visuelle que nous livrons. Aucun chiffre ni faux avis client inventé.',
                    en: 'Side-by-side comparison between an unstructured account and the visual architecture we deliver. Zero invented metrics or fake reviews.',
                  })}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#0B2A4A]/70">
                <ShieldCheck className="h-4 w-4 text-[#FFB703] shrink-0" />
                <span>
                  {pick({
                    fr: 'Modèles visuels de référence · Zéro chiffre inventé',
                    en: 'Visual reference examples · Zero invented metrics',
                  })}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {realizationSlots.map((slot, idx) => (
              <ScrollReveal key={slot.platform} delay={idx * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-[#0B2A4A]/12 bg-white p-6">
                  <div className="flex items-center justify-between text-xs font-medium text-[#0B2A4A]/60">
                    <span>{slot.platform}</span>
                    <span>{pick({ fr: 'Exemple Avant / Après', en: 'Before / After Sample' })}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#0B2A4A]">
                    {pick(slot.title)}
                  </h3>

                  {/* Coherent Before / After Visual Mockups */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                        {pick({ fr: 'Avant', en: 'Before' })}
                      </span>
                      <div className="aspect-[3/4] overflow-hidden rounded-xl border border-[#0B2A4A]/12 bg-[#F7F4EC]">
                        <ResilientImage
                          src={slot.beforeImage}
                          alt={pick(slot.beforeAlt)}
                          fallbackTitle={pick({ fr: 'Avant', en: 'Before' })}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0B2A4A]">
                        {pick({ fr: 'Après', en: 'After' })}
                      </span>
                      <div className="aspect-[3/4] overflow-hidden rounded-xl border border-[#FFB703]/70 bg-[#0B2A4A]/5 shadow-sm">
                        <ResilientImage
                          src={slot.afterImage}
                          alt={pick(slot.afterAlt)}
                          fallbackTitle={pick({ fr: 'Après', en: 'After' })}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#0B2A4A]/75">
                    {pick(slot.note)}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion CTA Band */}
      <section className="border-t border-[#0B2A4A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-[#0B2A4A] p-8 sm:p-12 text-white">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {pick({
                    fr: 'Prêt à donner une image professionnelle à votre projet ?',
                    en: 'Ready to give your business or creator brand a professional presence?',
                  })}
                </h2>
                <p className="mt-3 max-w-2xl text-base text-[#F7F4EC]/80">
                  {pick({
                    fr: 'Choisissez votre plateforme et remplissez le formulaire de commande. Nous revenons vers vous rapidement sur WhatsApp pour valider chaque détail.',
                    en: 'Choose your platform and complete our order form. We follow up quickly on WhatsApp to confirm every detail.',
                  })}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#F7F4EC]/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#FFB703]" />
                    {pick({ fr: 'Propriété 100 % client', en: '100% client ownership' })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#FFB703]" />
                    {pick({ fr: 'Formation à la prise en main', en: 'Handover training included' })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#FFB703]" />
                    {pick({ fr: 'Français & Anglais', en: 'French & English' })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                <Link
                  to="/commander"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3.5 text-sm font-semibold text-[#0B2A4A] transition-colors hover:bg-[#E5A400] whitespace-nowrap"
                >
                  <span>
                    {pick({
                      fr: 'Commander maintenant',
                      en: 'Order now',
                    })}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton
                  href={buildGeneralWhatsAppUrl(lang)}
                  className="w-full"
                >
                  {pick({
                    fr: 'Discuter sur WhatsApp',
                    en: 'Chat on WhatsApp',
                  })}
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
