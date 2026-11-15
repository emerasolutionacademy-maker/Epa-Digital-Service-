import { Language } from '../context/LanguageContext';

export type PlatformId = 'facebook' | 'tiktok' | 'youtube';

export const WHATSAPP_NUMBER = '237688518815';

export interface PlatformService {
  id: string;
  platform: PlatformId;
  name: { fr: string; en: string };
  shortLabel: { fr: string; en: string };
  summary: { fr: string; en: string };
  included: { fr: string[]; en: string[] };
  forWhom: { fr: string; en: string };
  outcome: { fr: string; en: string };
  timeline: { fr: string; en: string };
}

export interface PlatformPageData {
  id: PlatformId;
  title: { fr: string; en: string };
  heroTitle: { fr: string; en: string };
  heroSubtitle: { fr: string; en: string };
  servicesHeading: { fr: string; en: string };
  servicesIntro: { fr: string; en: string };
  services: PlatformService[];
  methodTitle: { fr: string; en: string };
  methodSteps: {
    number: string;
    title: { fr: string; en: string };
    description: { fr: string; en: string };
  }[];
  monetizationTruth: {
    title: { fr: string; en: string };
    intro: { fr: string; en: string };
    commitments: { fr: string[]; en: string[] };
    alternativeRevenueTitle: { fr: string; en: string };
    alternativeRevenues: {
      title: { fr: string; en: string };
      detail: { fr: string; en: string };
    }[];
  };
  faqs: {
    question: { fr: string; en: string };
    answer: { fr: string; en: string };
  }[];
  ctaTitle: { fr: string; en: string };
  ctaSubtitle: { fr: string; en: string };
}

export const PLATFORM_NAMES: Record<PlatformId, string> = {
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

export function buildServiceUrl(platform: PlatformId, serviceId: string): string {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://epadigitalservice.com';
  return `${origin}/${platform}#${serviceId}`;
}

export function buildServiceWhatsAppUrl(
  service: PlatformService,
  lang: Language
): string {
  const platformName = PLATFORM_NAMES[service.platform];
  const serviceName = service.name[lang];
  const serviceUrl = buildServiceUrl(service.platform, service.id);

  const message =
    lang === 'fr'
      ? `Bonjour EPA Digital Service 👋 Je suis intéressé par : ${serviceName} (${platformName}). Voici le lien : ${serviceUrl}. Je souhaite remplir ma commande et avoir plus d'informations.`
      : `Hello EPA Digital Service 👋 I am interested in: ${serviceName} (${platformName}). Here is the link: ${serviceUrl}. I would like to complete my order and get more information.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(lang: Language): string {
  const message =
    lang === 'fr'
      ? `Bonjour EPA Digital Service 👋 Je souhaite obtenir des informations sur vos services digitaux (Facebook, TikTok, YouTube).`
      : `Hello EPA Digital Service 👋 I would like information about your digital services (Facebook, TikTok, YouTube).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PLATFORM_DATA: Record<PlatformId, PlatformPageData> = {
  facebook: {
    id: 'facebook',
    title: { fr: 'Facebook', en: 'Facebook' },
    heroTitle: {
      fr: 'Des pages Facebook pensées pour vendre et inspirer confiance.',
      en: 'Facebook pages built to sell and inspire trust.',
    },
    heroSubtitle: {
      fr: 'En Afrique francophone et anglophone, Facebook reste la première vitrine commerciale. Nous créons et structurons votre page à votre nom, connectée à WhatsApp et prête pour vos clients.',
      en: 'Across Francophone and Anglophone Africa, Facebook remains the leading business storefront. We build and structure your page in your name, connected to WhatsApp and ready for customers.',
    },
    servicesHeading: {
      fr: 'Nos services sur Facebook',
      en: 'Our Facebook Services',
    },
    servicesIntro: {
      fr: 'Cinq formats précis selon votre niveau de développement, de la première vitrine jusqu’aux campagnes publicitaires structurées.',
      en: 'Five focused formats tailored to your stage of growth, from your first business storefront to structured ad campaigns.',
    },
    services: [
      {
        id: 'page-simple',
        platform: 'facebook',
        name: { fr: 'Page simple', en: 'Simple Page' },
        shortLabel: { fr: 'Page simple', en: 'Simple Page' },
        summary: {
          fr: 'Une première présence propre, rassurante et conforme aux standards Meta pour démarrer rapidement votre activité en ligne.',
          en: 'A clean, reassuring initial presence compliant with Meta standards to launch your online activity smoothly.',
        },
        included: {
          fr: [
            'Création ou reprise complète de la page sur votre propre compte personnel',
            'Configuration de la catégorie, de la bio, des horaires et de la localisation',
            'Photo de profil et bannière de couverture adaptées au mobile',
            'Paramétrage des informations de contact et bouton d’appel direct',
            'Sécurisation des accès administrateur',
          ],
          en: [
            'Full page setup or restructuring under your own personal account',
            'Category, bio, business hours, and location setup',
            'Mobile-optimized profile picture and cover banner',
            'Contact details setup and direct action button',
            'Admin access security configuration',
          ],
        },
        forWhom: {
          fr: 'Commerçants débutants, artisans, prestataires locaux et indépendants qui veulent exister proprement sur Facebook.',
          en: 'New merchants, artisans, local service providers, and freelancers wanting a clean presence on Facebook.',
        },
        outcome: {
          fr: 'Une page prête à publier, facilement trouvable par vos clients locaux et entièrement sous votre contrôle.',
          en: 'A ready-to-post page, easy for local customers to find, and 100% under your ownership.',
        },
        timeline: { fr: '2 à 3 jours ouvrés', en: '2 to 3 business days' },
      },
      {
        id: 'page-professionnelle',
        platform: 'facebook',
        name: { fr: 'Page professionnelle', en: 'Professional Page' },
        shortLabel: { fr: 'Page professionnelle', en: 'Professional Page' },
        summary: {
          fr: 'Une vitrine complète avec identité visuelle harmonieuse, messages automatisés et premiers contenus prêts à publier.',
          en: 'A complete business storefront with cohesive branding, automated messaging, and launch-ready starter posts.',
        },
        included: {
          fr: [
            'Tout le contenu de la Page simple',
            'Charte visuelle cohérente (logo adapté, bannière sur mesure, 3 modèles de visuels)',
            'Configuration des réponses automatiques et questions fréquentes Messenger',
            'Rédaction de 3 publications de lancement structurées',
            'Connexion propre avec votre compte Instagram professionnel si existant',
            'Mini-session de prise en main sur WhatsApp',
          ],
          en: [
            'Everything included in the Simple Page',
            'Cohesive visual kit (adapted logo, custom cover banner, 3 post templates)',
            'Messenger automated greetings and FAQ replies setup',
            'Copywriting and layout for 3 launch posts',
            'Clean link to your professional Instagram account if available',
            'Guided handover session via WhatsApp',
          ],
        },
        forWhom: {
          fr: 'PME, cabinets, cliniques, restaurants, salons et marques en croissance souhaitant une image sérieuse.',
          en: 'SMEs, clinics, restaurants, salons, and growing brands aiming for a polished, credible image.',
        },
        outcome: {
          fr: 'Une page structurée comme une marque établie, capable de répondre aux prospects même lorsque vous êtes occupé.',
          en: 'A page structured like an established brand, ready to respond to prospects even when you are busy.',
        },
        timeline: { fr: '4 à 5 jours ouvrés', en: '4 to 5 business days' },
      },
      {
        id: 'page-de-vente',
        platform: 'facebook',
        name: {
          fr: 'Page de vente (catalogue + WhatsApp)',
          en: 'Sales Page (Catalog + WhatsApp)',
        },
        shortLabel: {
          fr: 'Page de vente (catalogue + WhatsApp)',
          en: 'Sales Page (Catalog + WhatsApp)',
        },
        summary: {
          fr: 'Architecture orientée conversion directe : catalogue produits lisible et tunnel rapide vers votre WhatsApp Business.',
          en: 'Direct conversion setup featuring a clear product catalog and a seamless bridge to WhatsApp Business.',
        },
        included: {
          fr: [
            'Structure complète orientée e-commerce et prise de commande locale',
            'Liaison directe avec votre numéro WhatsApp Business et bouton « Envoyer un message WhatsApp »',
            'Mise en ligne structurée de vos premiers produits / services (jusqu’à 10 fiches visuelles)',
            'Organisation en albums / collections claires pour faciliter la navigation mobile',
            'Modèles de légendes vendeuses et réponses rapides pour conclure vos ventes',
            'Formation pratique à la gestion des commandes reçues',
          ],
          en: [
            'Full e-commerce and local order-taking page architecture',
            'Direct integration with WhatsApp Business and "Send WhatsApp Message" CTA',
            'Structured upload of up to 10 flagship products or service cards',
            'Organized albums and collections for effortless mobile browsing',
            'Conversion-focused caption templates and quick-reply scripts',
            'Practical training on handling incoming orders',
          ],
        },
        forWhom: {
          fr: 'Boutiques en ligne, vendeurs de vêtements, cosmétiques, électronique, agroalimentaire et grossistes.',
          en: 'Online shops, fashion, cosmetics, electronics, food sellers, and wholesalers.',
        },
        outcome: {
          fr: 'Un parcours fluide où le client découvre votre produit sur Facebook et finalise sa commande sur votre WhatsApp en deux clics.',
          en: 'A frictionless journey where shoppers browse on Facebook and place orders directly on your WhatsApp in two taps.',
        },
        timeline: { fr: '5 à 7 jours ouvrés', en: '5 to 7 business days' },
      },
      {
        id: 'page-monetisation',
        platform: 'facebook',
        name: {
          fr: 'Page préparée pour la monétisation',
          en: 'Monetization-Ready Page',
        },
        shortLabel: {
          fr: 'Page préparée pour la monétisation',
          en: 'Monetization-Ready Page',
        },
        summary: {
          fr: 'Vérification préalable d’éligibilité pays, mise en conformité éditoriale et plan de contenu adapté aux exigences Meta.',
          en: 'Pre-launch country eligibility check, policy compliance setup, and content roadmap aligned with Meta requirements.',
        },
        included: {
          fr: [
            'Audit et vérification de l’éligibilité de votre pays et de votre catégorie AVANT le démarrage',
            'Configuration complète en mode professionnel / créateur conforme aux politiques de monétisation des partenaires',
            'Nettoyage des contenus à risque (droits d’auteur, musiques, réutilisations non conformes)',
            'Plan éditorial de 30 jours pensé pour la rétention vidéo (Reels & vidéos longues)',
            'Tableau de suivi des critères d’audience et de minutes visionnées',
          ],
          en: [
            'Country and category eligibility verification BEFORE work begins',
            'Full professional / creator setup compliant with Partner Monetization Policies',
            'Audit and cleanup of copyright or policy-risky content',
            '30-day content roadmap designed for video retention (Reels & long-form)',
            'Checklist and tracker for audience and watch-time thresholds',
          ],
        },
        forWhom: {
          fr: 'Créateurs de contenu, médias locaux, éducateurs et entrepreneurs visant les revenus de contenu et partenariats.',
          en: 'Content creators, local media outlets, educators, and entrepreneurs aiming for content revenue and partnerships.',
        },
        outcome: {
          fr: 'Des fondations propres et conformes pour progresser vers les critères d’éligibilité sans risquer de blocage.',
          en: 'Clean, policy-compliant foundations to build toward eligibility criteria without risking strikes or demonetization.',
        },
        timeline: { fr: '5 à 7 jours ouvrés', en: '5 to 7 business days' },
      },
      {
        id: 'publicites-facebook',
        platform: 'facebook',
        name: { fr: 'Publicités Facebook', en: 'Facebook Ads' },
        shortLabel: { fr: 'Publicités Facebook', en: 'Facebook Ads' },
        summary: {
          fr: 'Structuration propre de votre compte publicitaire Meta Business et lancement d’une première campagne ciblée vers WhatsApp ou votre page.',
          en: 'Clean Meta Business Ad Account setup and launch of a targeted campaign driving traffic to WhatsApp or your page.',
        },
        included: {
          fr: [
            'Création et vérification du Meta Business Manager à votre nom',
            'Configuration propre des moyens de paiement disponibles dans votre pays',
            'Définition de l’audience locale ou régionale (villes, centres d’intérêt, langues)',
            'Création des visuels et textes publicitaires adaptés au marché africain',
            'Paramétrage d’une campagne « Messages WhatsApp » ou « Notoriété » et guide de lecture des résultats',
          ],
          en: [
            'Meta Business Manager setup and verification under your ownership',
            'Proper configuration of payment methods supported in your country',
            'Local and regional audience targeting (cities, interests, languages)',
            'Ad creative and copywriting tailored to African consumers',
            'Setup of a WhatsApp Messages or Awareness campaign with a clear reporting guide',
          ],
        },
        forWhom: {
          fr: 'Vendeurs et entreprises disposant déjà d’une offre claire et prêts à toucher de nouveaux clients chaque semaine.',
          en: 'Sellers and businesses with an established offer ready to reach new customers consistently.',
        },
        outcome: {
          fr: 'Un compte publicitaire sain, sans erreur de paramétrage, et des campagnes orientées conversations qualifiées sur WhatsApp.',
          en: 'A healthy ad account free of setup errors, running campaigns focused on qualified WhatsApp conversations.',
        },
        timeline: { fr: '3 à 5 jours ouvrés', en: '3 to 5 business days' },
      },
    ],
    methodTitle: {
      fr: 'Notre méthode sur Facebook',
      en: 'Our Facebook Method',
    },
    methodSteps: [
      {
        number: '01',
        title: { fr: 'Cadrage & vérification', en: 'Scoping & Verification' },
        description: {
          fr: 'Nous échangeons sur WhatsApp pour valider votre nom commercial, vos produits, votre ville cible et l’éligibilité de votre pays si vous visez la monétisation.',
          en: 'We connect on WhatsApp to confirm your brand name, products, target cities, and country eligibility if monetization is a goal.',
        },
      },
      {
        number: '02',
        title: { fr: 'Architecture & visuels', en: 'Architecture & Visuals' },
        description: {
          fr: 'Nous créons la page sur votre compte, réalisons le logo, la couverture et structurons les rubriques, le catalogue et les messages automatiques.',
          en: 'We build the page under your account, craft the profile and cover visuals, and structure sections, catalog, and automated replies.',
        },
      },
      {
        number: '03',
        title: { fr: 'Connexion WhatsApp & tests', en: 'WhatsApp Link & Testing' },
        description: {
          fr: 'Nous lions WhatsApp Business, testons chaque bouton d’action sur mobile Android et iOS, et vérifions la lisibilité de vos offres.',
          en: 'We link WhatsApp Business, test every action button on Android and iOS mobile screens, and verify offer clarity.',
        },
      },
      {
        number: '04',
        title: { fr: 'Remise & formation', en: 'Handover & Training' },
        description: {
          fr: 'Vous êtes administrateur principal unique. Nous vous formons à publier, répondre aux clients et suivre vos statistiques en toute autonomie.',
          en: 'You remain the primary owner. We train you to post, reply to buyers, and track insights independently.',
        },
      },
    ],
    monetizationTruth: {
      title: {
        fr: 'Monétisation en Afrique : la vérité',
        en: 'Monetization in Africa: The Truth',
      },
      intro: {
        fr: 'Les programmes de monétisation Facebook (publicités In-Stream, bonus, étoiles, abonnements) dépendent strictement du pays de résidence, des règles de conformité Meta et des seuils d’audience (abonnés et minutes visionnées), et ces critères évoluent régulièrement. EPA Digital Service ne vend jamais de « compte monétisé garanti », ni d’abonnés ou de vues achetés. Nous préparons techniquement et éditorialement votre page pour remplir les conditions officielles et vérifions l’éligibilité de votre pays avec vous AVANT de commencer.',
        en: 'Facebook monetization programs (In-Stream Ads, bonuses, Stars, subscriptions) strictly depend on your country of residence, Meta policy compliance, and audience thresholds (followers and watch minutes), and these criteria evolve regularly. EPA Digital Service never sells "guaranteed monetized accounts," bought followers, or fake views. We prepare your page technically and editorially to meet official criteria and verify your country eligibility with you BEFORE starting.',
      },
      commitments: {
        fr: [
          'Vérification de la liste des pays éligibles Meta avant le lancement',
          'Votre page est créée à votre nom : vous en restez propriétaire à 100 %',
          'Zéro achat de vues, de likes ou de comptes préfabriqués qui mènent au blocage',
        ],
        en: [
          'Check of Meta’s eligible countries list before launching',
          'Your page is created in your name: you keep 100% ownership',
          'Zero bought views, likes, or pre-made accounts that risk bans',
        ],
      },
      alternativeRevenueTitle: {
        fr: 'Autres sources de revenus concrètes dès le démarrage',
        en: 'Other Real Revenue Streams From Day One',
      },
      alternativeRevenues: [
        {
          title: { fr: 'Vente de vos propres produits ou services', en: 'Selling your own products or services' },
          detail: {
            fr: 'Utilisez votre page et WhatsApp Business pour encaisser directement via Mobile Money ou paiement à la livraison.',
            en: 'Use your page and WhatsApp Business to close sales directly via Mobile Money or cash on delivery.',
          },
        },
        {
          title: { fr: 'Partenariats avec des marques locales', en: 'Local brand partnerships' },
          detail: {
            fr: 'Une page soignée et une audience engagée au Cameroun ou en Côte d’Ivoire attirent des collaborations sponsorisées.',
            en: 'A well-crafted page and engaged local audience attract paid brand sponsorships.',
          },
        },
        {
          title: { fr: 'Affiliation & recommandation', en: 'Affiliate marketing & referrals' },
          detail: {
            fr: 'Recommandez des produits ou services complémentaires avec des liens ou codes de suivi commissionnés.',
            en: 'Recommend complementary tools or products using tracked commission links and codes.',
          },
        },
        {
          title: { fr: 'Lives commerciaux & événements', en: 'Live shopping & live sessions' },
          detail: {
            fr: 'Présentez vos arrivages en direct et répondez aux questions en temps réel pour déclencher des commandes immédiates.',
            en: 'Showcase new stock live and answer buyer questions in real time to drive instant orders.',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          fr: 'Est-ce que je reste propriétaire de ma page Facebook ?',
          en: 'Do I keep full ownership of my Facebook page?',
        },
        answer: {
          fr: 'Oui, à 100 %. La page est créée directement sous votre propre compte Facebook ou Business Manager. À la livraison, vous détenez les droits complets d’administration et EPA Digital Service se retire dès que vous le souhaitez.',
          en: 'Yes, 100%. The page is created directly under your personal Facebook account or Business Manager. Upon handover, you hold full admin ownership.',
        },
      },
      {
        question: {
          fr: 'Puis-je commander une page même si j’en ai déjà une qui est mal configurée ?',
          en: 'Can I order a service even if I already have a poorly configured page?',
        },
        answer: {
          fr: 'Tout à fait. Dans le formulaire de commande, indiquez simplement « Oui » à la question sur le compte existant et collez le lien. Nous auditons et restructurons votre page actuelle sans perdre vos abonnés légitimes.',
          en: 'Absolutely. In the order form, simply select "Yes" for existing account and paste the link. We audit and restructure your current page without losing legitimate followers.',
        },
      },
      {
        question: {
          fr: 'Comment fonctionne la connexion entre Facebook et WhatsApp ?',
          en: 'How does the Facebook to WhatsApp connection work?',
        },
        answer: {
          fr: 'Nous relions votre numéro WhatsApp Business à votre page via un code de validation. Vos visiteurs disposent alors d’un bouton direct « Envoyer un message WhatsApp » sur la page et sous vos publications.',
          en: 'We link your WhatsApp Business number to your page via a verification code. Visitors get a direct "Send WhatsApp Message" button on your page and posts.',
        },
      },
      {
        question: {
          fr: 'Les publicités Facebook fonctionnent-elles avec les cartes bancaires locales au Cameroun et en Afrique ?',
          en: 'Do Facebook Ads work with local payment cards in Cameroon and Africa?',
        },
        answer: {
          fr: 'Oui, avec des cartes prépayées Visa/Mastercard dédiées aux paiements internationaux ou des cartes bancaires compatibles. Nous vous guidons sur les options fiables disponibles dans votre pays lors de la configuration.',
          en: 'Yes, using international prepaid Visa/Mastercard cards or compatible bank cards. We guide you on the reliable options available in your country during setup.',
        },
      },
    ],
    ctaTitle: {
      fr: 'Prêt à lancer une page Facebook solide ?',
      en: 'Ready to launch a solid Facebook page?',
    },
    ctaSubtitle: {
      fr: 'Remplissez notre formulaire de commande en 2 minutes. Nous analysons votre besoin et revenons vers vous sur WhatsApp.',
      en: 'Complete our 2-minute order form. We review your needs and follow up directly on WhatsApp.',
    },
  },

  tiktok: {
    id: 'tiktok',
    title: { fr: 'TikTok', en: 'TikTok' },
    heroTitle: {
      fr: 'Un compte TikTok structuré pour capter l’attention et convertir.',
      en: 'A TikTok account built to capture attention and convert.',
    },
    heroSubtitle: {
      fr: 'TikTok est le levier le plus rapide pour faire connaître une boutique, un talent ou une expertise en Afrique. Nous préparons votre profil, votre identité visuelle et votre stratégie de publication.',
      en: 'TikTok is the fastest lever to grow a shop, talent, or expertise across Africa. We structure your profile, visual branding, and content strategy.',
    },
    servicesHeading: {
      fr: 'Nos services sur TikTok',
      en: 'Our TikTok Services',
    },
    servicesIntro: {
      fr: 'Trois offres complémentaires pour bâtir un compte crédible, reconnaissable dès les 3 premières secondes et conforme aux règles TikTok.',
      en: 'Three complementary services to build a credible account, recognizable within the first 3 seconds and fully compliant with TikTok rules.',
    },
    services: [
      {
        id: 'compte-tiktok-professionnel',
        platform: 'tiktok',
        name: {
          fr: 'Compte TikTok professionnel',
          en: 'Professional TikTok Account',
        },
        shortLabel: {
          fr: 'Compte TikTok professionnel',
          en: 'Professional TikTok Account',
        },
        summary: {
          fr: 'Configuration complète du compte Business ou Créateur avec bio optimisée, lien d’action et identité claire.',
          en: 'Complete Business or Creator account setup with an optimized bio, action link, and clear brand identity.',
        },
        included: {
          fr: [
            'Paramétrage du compte (Business ou Créateur selon votre objectif et l’accès aux sons)',
            'Rédaction d’une bio claire orientée conversion avec appel à l’action',
            'Configuration d’une page multi-liens propre vers votre WhatsApp, Facebook et YouTube',
            'Création ou adaptation de la photo de profil haute lisibilité mobile',
            'Création des 3 premiers scripts vidéo d’introduction adaptés à votre niche',
            'Sécurisation du compte (double authentification et récupération)',
          ],
          en: [
            'Account mode configuration (Business or Creator depending on goals and audio access)',
            'Conversion-focused bio copywriting with clear call to action',
            'Clean multi-link setup pointing to WhatsApp, Facebook, and YouTube',
            'Mobile-crisp profile picture design or adaptation',
            'First 3 introductory video scripts tailored to your niche',
            'Account security setup (2FA and recovery options)',
          ],
        },
        forWhom: {
          fr: 'Boutiques, prestataires de services, coachs, formateurs et jeunes marques souhaitant transformer les vues en clients.',
          en: 'Shops, service providers, coaches, educators, and emerging brands turning views into inquiries.',
        },
        outcome: {
          fr: 'Un profil professionnel qui inspire immédiatement confiance lorsqu’un spectateur clique depuis une vidéo.',
          en: 'A professional profile that builds instant trust the moment a viewer taps from a video.',
        },
        timeline: { fr: '3 à 4 jours ouvrés', en: '3 to 4 business days' },
      },
      {
        id: 'compte-tiktok-monetisation',
        platform: 'tiktok',
        name: {
          fr: 'Compte préparé pour la monétisation',
          en: 'Monetization-Ready Account',
        },
        shortLabel: {
          fr: 'Compte préparé pour la monétisation',
          en: 'Monetization-Ready Account',
        },
        summary: {
          fr: 'Stratégie de contenu, calendrier éditorial, préparation aux lives, partenariats et affiliation adaptés à votre pays.',
          en: 'Content strategy, editorial calendar, live readiness, brand partnerships, and affiliate setup adapted to your country.',
        },
        included: {
          fr: [
            'Vérification préalable des fonctionnalités et programmes disponibles dans votre pays',
            'Stratégie éditoriale orientée vidéos originales (règle des 3 premières secondes, rétention, format > 1 min si pertinent)',
            'Calendrier de publication sur 30 jours avec idées de sujets et formats récurrents',
            'Préparation aux Lives TikTok (cadre, règles communautaires, modération et interactions)',
            'Méthode pour structurer vos partenariats marques et liens d’affiliation',
          ],
          en: [
            'Pre-check of features and monetization programs available in your country',
            'Original-content strategy (3-second hook, retention, >1 min formats where applicable)',
            '30-day posting calendar with recurring topic pillars and formats',
            'TikTok Live readiness (framing, community guidelines, moderation, engagement)',
            'Framework to pitch brand partnerships and set up affiliate links',
          ],
        },
        forWhom: {
          fr: 'Créateurs de contenu sérieux, vulgarisateurs, humoristes, médias et vendeurs en direct sur TikTok.',
          en: 'Committed content creators, educators, entertainers, media voices, and TikTok live sellers.',
        },
        outcome: {
          fr: 'Une ligne éditoriale claire et réaliste pour faire grandir une vraie communauté et diversifier vos revenus sans dépendre d’un seul programme.',
          en: 'A clear, realistic editorial roadmap to grow a genuine community and diversify income beyond a single program.',
        },
        timeline: { fr: '5 à 7 jours ouvrés', en: '5 to 7 business days' },
      },
      {
        id: 'habillage-visuel-tiktok',
        platform: 'tiktok',
        name: {
          fr: 'Habillage visuel TikTok',
          en: 'TikTok Visual Branding',
        },
        shortLabel: {
          fr: 'Habillage visuel TikTok',
          en: 'TikTok Visual Branding',
        },
        summary: {
          fr: 'Cohérence graphique de votre grille TikTok : couvertures de vidéos, bandeaux titres et éléments visuels réutilisables.',
          en: 'Visual consistency across your TikTok grid: video covers, title overlays, and reusable visual templates.',
        },
        included: {
          fr: [
            'Palette de couleurs et choix typographique adaptés à la lecture sur smartphone',
            'Modèles de couvertures de vidéos (3 styles distincts pour vos séries)',
            'Modèles de titres / bandeaux d’accroche compatibles CapCut ou Canva',
            'Modèles de playlists TikTok organisées par thématique',
            'Guide visuel court pour garder une grille harmonieuse à chaque publication',
          ],
          en: [
            'Mobile-readable color palette and typography pairing',
            '3 distinct reusable video cover templates for your content series',
            'Hook title overlays compatible with CapCut or Canva',
            'Themed TikTok playlist covers and structure',
            'Concise style guide to keep your grid cohesive with every post',
          ],
        },
        forWhom: {
          fr: 'Créateurs et marques dont le profil manque d’identité visuelle ou dont les vidéos passent inaperçues dans la grille.',
          en: 'Creators and brands whose profile lacks visual identity or whose videos blend into the feed.',
        },
        outcome: {
          fr: 'Une grille de profil immédiatement reconnaissable qui incite les nouveaux visiteurs à s’abonner et explorer vos séries.',
          en: 'An immediately recognizable profile grid that encourages visitors to follow and binge your series.',
        },
        timeline: { fr: '3 à 5 jours ouvrés', en: '3 to 5 business days' },
      },
    ],
    methodTitle: {
      fr: 'Notre méthode sur TikTok',
      en: 'Our TikTok Method',
    },
    methodSteps: [
      {
        number: '01',
        title: { fr: 'Positionnement & niche', en: 'Positioning & Niche' },
        description: {
          fr: 'Nous clarifions votre promesse en une phrase, votre public francophone ou anglophone et vérifions les règles applicables à votre pays.',
          en: 'We sharpen your one-line value proposition, define your French or English audience, and check country-level rules.',
        },
      },
      {
        number: '02',
        title: { fr: 'Profil & tunnel WhatsApp', en: 'Profile & WhatsApp Funnel' },
        description: {
          fr: 'Nous optimisons la bio, l’image de profil, les playlists et le lien de contact pour transformer l’attention en messages qualifiés.',
          en: 'We optimize your bio, profile photo, playlists, and contact link to turn attention into qualified inquiries.',
        },
      },
      {
        number: '03',
        title: { fr: 'Habillage & calendrier', en: 'Visual Kit & Calendar' },
        description: {
          fr: 'Nous livrons vos gabarits de couvertures vidéo et un calendrier clair avec des formats réalistes à tourner avec votre smartphone.',
          en: 'We deliver your video cover templates and a clear calendar built around formats you can film on your smartphone.',
        },
      },
      {
        number: '04',
        title: { fr: 'Lancement & autonomie', en: 'Launch & Independence' },
        description: {
          fr: 'Nous vous guidons sur les bonnes pratiques de publication, les lives et la lecture des statistiques TikTok sans jamais acheter d’abonnés.',
          en: 'We coach you on posting best practices, lives, and reading TikTok analytics without ever buying followers.',
        },
      },
    ],
    monetizationTruth: {
      title: {
        fr: 'Monétisation en Afrique : la vérité',
        en: 'Monetization in Africa: The Truth',
      },
      intro: {
        fr: 'Sur TikTok, le Fonds / Programme de Récompenses pour les Créateurs dépend directement du pays d’enregistrement du compte, des règles communautaires et des seuils d’audience (ex. 10 000 abonnés et 100 000 vues sur 30 jours dans les pays éligibles), et ces conditions évoluent. La majorité des pays africains ne sont pas encore ouverts aux paiements directs par vues. C’est pourquoi nous vérifions la réalité de votre pays AVANT de commencer, sans jamais promettre de compte monétisé garanti ni recourir à des comptes étrangers risqués.',
        en: 'On TikTok, the Creator Rewards Program depends directly on the country where the account is registered, community guidelines, and audience thresholds (such as 10k followers and 100k views in 30 days in eligible regions), and these rules change over time. Most African countries are not yet open to direct per-view payouts. That is why we verify your country’s reality BEFORE starting—never promising guaranteed monetization or risky foreign-registered shortcuts.',
      },
      commitments: {
        fr: [
          'Transparence totale sur les pays éligibles au programme de vues avant toute commande',
          'Vous créez et conservez l’entière propriété de votre compte TikTok authentique',
          'Aucun achat de faux abonnés ou de vues artificielles qui détruisent la portée organique',
        ],
        en: [
          'Full transparency on country eligibility for view payouts before any order',
          'You create and retain 100% ownership of your authentic TikTok account',
          'Zero bought followers or artificial views that ruin organic reach',
        ],
      },
      alternativeRevenueTitle: {
        fr: 'Comment les créateurs et vendeurs africains gagnent réellement sur TikTok',
        en: 'How African Creators & Sellers Actually Earn on TikTok',
      },
      alternativeRevenues: [
        {
          title: { fr: 'Vente directe de produits et services', en: 'Direct product & service sales' },
          detail: {
            fr: 'Démonstrations courtes qui renvoient vers votre lien WhatsApp en bio pour conclure des ventes locales chaque jour.',
            en: 'Short product demos pointing viewers to your WhatsApp bio link to close daily local orders.',
          },
        },
        {
          title: { fr: 'Partenariats et placements sponsorisés', en: 'Brand deals & sponsored placements' },
          detail: {
            fr: 'Les marques télécoms, e-commerce, cosmétiques et fintech paient les créateurs fiables avec une vraie audience locale.',
            en: 'Telecom, e-commerce, beauty, and fintech brands pay reliable creators who command an authentic local audience.',
          },
        },
        {
          title: { fr: 'Affiliation et codes promo', en: 'Affiliate links & promo codes' },
          detail: {
            fr: 'Percevez une commission sur chaque vente générée via votre code ou lien partenaire.',
            en: 'Earn a commission on every purchase generated through your partner link or promo code.',
          },
        },
        {
          title: { fr: 'Lives interactifs et cadeaux virtuels', en: 'Interactive Lives & virtual gifts' },
          detail: {
            fr: 'Animez des sessions en direct (ventes flash, débats, démonstrations) lorsque les Lives et cadeaux sont disponibles dans votre région.',
            en: 'Host live sessions (flash sales, Q&As, demos) wherever TikTok Live and gifting are available in your region.',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          fr: 'Peut-on monétiser les vues TikTok directement depuis le Cameroun ou la Côte d’Ivoire ?',
          en: 'Can I earn direct per-view TikTok payouts from Cameroon or Côte d’Ivoire?',
        },
        answer: {
          fr: 'À ce jour, les programmes de rémunération directs par vues de TikTok sont limités à certains pays (Europe, Amérique du Nord, et quelques pays spécifiques). Nous ne vendons pas de faux comptes étrangers. En revanche, TikTok reste un moteur puissant pour vendre vos produits, décrocher des partenariats de marques et faire de l’affiliation en Afrique.',
          en: 'Currently, TikTok’s direct per-view creator payouts are restricted to select countries. We do not sell risky foreign-registered accounts. However, TikTok remains a powerhouse for selling your own products, securing brand partnerships, and affiliate income in Africa.',
        },
      },
      {
        question: {
          fr: 'Compte Business ou Compte Personnel / Créateur : lequel choisir ?',
          en: 'Business Account vs. Creator Account: which one should I choose?',
        },
        answer: {
          fr: 'Le compte Business permet d’afficher plus facilement un lien cliquable et des informations commerciales, mais limite l’accès à certaines musiques populaires. Nous choisissons avec vous le mode adapté à votre activité lors du lancement.',
          en: 'A Business Account makes adding clickable links and business info easier, while a Creator Account has broader audio access. We help you choose the right mode for your goals.',
        },
      },
      {
        question: {
          fr: 'Dois-je montrer mon visage pour réussir sur TikTok ?',
          en: 'Do I have to show my face to succeed on TikTok?',
        },
        answer: {
          fr: 'Non. De nombreux comptes commerciaux et éducatifs fonctionnent très bien avec des plans sur les produits, la voix off, des démonstrations mains libres ou du texte rythmé. Nous adaptons les scripts à votre aisance.',
          en: 'No. Many business and educational accounts thrive using product close-ups, voiceovers, hands-only demos, or crisp on-screen text. We adapt scripts to your comfort level.',
        },
      },
    ],
    ctaTitle: {
      fr: 'Prêt à structurer votre compte TikTok ?',
      en: 'Ready to structure your TikTok account?',
    },
    ctaSubtitle: {
      fr: 'Décrivez votre projet dans le formulaire de commande. Nous vérifions vos options et vous répondons sur WhatsApp.',
      en: 'Describe your project in the order form. We verify your options and reply directly on WhatsApp.',
    },
  },

  youtube: {
    id: 'youtube',
    title: { fr: 'YouTube', en: 'YouTube' },
    heroTitle: {
      fr: 'Une chaîne YouTube bâtie pour durer et être trouvée.',
      en: 'A YouTube channel built to last and get discovered.',
    },
    heroSubtitle: {
      fr: 'Contrairement aux flux éphémères, vos vidéos YouTube travaillent pour vous pendant des années. Nous créons une chaîne professionnelle, structurée pour le référencement et éligible dans de nombreux pays africains.',
      en: 'Unlike fleeting feeds, YouTube videos keep working for you for years. We craft a professional channel structured for search discovery and eligible across many African countries.',
    },
    servicesHeading: {
      fr: 'Nos services sur YouTube',
      en: 'Our YouTube Services',
    },
    servicesIntro: {
      fr: 'Trois accompagnements dédiés pour lancer votre chaîne sur des bases solides, structurer vos vidéos et soigner votre image de marque.',
      en: 'Three dedicated services to launch your channel on strong foundations, structure your videos, and elevate your visual brand.',
    },
    services: [
      {
        id: 'chaine-youtube-professionnelle',
        platform: 'youtube',
        name: {
          fr: 'Chaîne YouTube professionnelle',
          en: 'Professional YouTube Channel',
        },
        shortLabel: {
          fr: 'Chaîne YouTube professionnelle',
          en: 'Professional YouTube Channel',
        },
        summary: {
          fr: 'Création ou refonte complète de votre chaîne : nom, identifiant @handle, logo, bannière, présentation et architecture d’accueil.',
          en: 'Complete channel creation or overhaul: channel name, @handle, logo, banner, about copy, and homepage layout.',
        },
        included: {
          fr: [
            'Création de la chaîne sur votre propre compte Google (ou optimisation de la chaîne existante)',
            'Choix et réservation de l’identifiant @handle et mots-clés de chaîne',
            'Création du logo et de la bannière responsive (lisible sur TV, ordinateur et mobile)',
            'Rédaction de la description « À propos » orientée recherche et liens sociaux / WhatsApp',
            'Structuration de la page d’accueil (bande-annonce, sections, playlists thématiques)',
            'Paramétrage YouTube Studio (pays, filigrane vidéo, paramètres par défaut d’importation)',
          ],
          en: [
            'Channel setup under your own Google account (or optimization of an existing channel)',
            '@handle selection and channel-level keyword optimization',
            'Responsive logo and banner art (clean across TV, desktop, and mobile)',
            'Search-ready "About" description and social / WhatsApp links',
            'Homepage layout (channel trailer slot, sections, and themed playlists)',
            'YouTube Studio defaults (country settings, video watermark, upload defaults)',
          ],
        },
        forWhom: {
          fr: 'Formateurs, médias, pasteurs/conférenciers, artistes, experts et entreprises souhaitant une vitrine vidéo durable.',
          en: 'Educators, media outlets, speakers, artists, experts, and businesses building a lasting video hub.',
        },
        outcome: {
          fr: 'Une chaîne sérieuse, structurée comme une véritable chaîne TV numérique, prête à accueillir vos premières vidéos et Shorts.',
          en: 'A credible channel structured like a true digital broadcast hub, ready for your first videos and Shorts.',
        },
        timeline: { fr: '4 à 5 jours ouvrés', en: '4 to 5 business days' },
      },
      {
        id: 'chaine-youtube-monetisation',
        platform: 'youtube',
        name: {
          fr: 'Chaîne préparée pour la monétisation',
          en: 'Monetization-Ready Channel',
        },
        shortLabel: {
          fr: 'Chaîne préparée pour la monétisation',
          en: 'Monetization-Ready Channel',
        },
        summary: {
          fr: 'Plan de vidéos structuré, titres cliquables, miniatures soignées, référencement YouTube (SEO) et suivi précis des seuils YPP.',
          en: 'Structured video roadmap, high-CTR titles, custom thumbnails, YouTube SEO, and YPP threshold tracking.',
        },
        included: {
          fr: [
            'Vérification préalable de l’éligibilité de votre pays au Programme Partenaire YouTube (YPP)',
            'Plan éditorial détaillé de vos 10 premières vidéos (long format + Shorts associés)',
            'Optimisation SEO complète (titres, descriptions structurées, tags, chapitres) sur 3 vidéos pilotes',
            'Création de 3 miniatures personnalisées à fort contraste pour capter le clic honnêtement',
            'Respect strict des règles droits d’auteur (audio libre, séquences autorisées)',
            'Tableau de suivi des seuils (1 000 abonnés & 4 000 h de visionnage ou vues Shorts)',
          ],
          en: [
            'Pre-check of your country’s eligibility for the YouTube Partner Program (YPP)',
            'Detailed editorial plan for your first 10 videos (long-form + companion Shorts)',
            'Full YouTube SEO (titles, structured descriptions, tags, chapters) for 3 pilot videos',
            '3 custom high-contrast thumbnails crafted for honest click-through performance',
            'Strict copyright compliance review (licensed audio & safe footage)',
            'Progress tracker for YPP milestones (1,000 subscribers & 4,000 watch hours or Shorts views)',
          ],
        },
        forWhom: {
          fr: 'Créateurs, vulgarisateurs, chaînes d’actualité, tutoriels et entrepreneurs visant les revenus YouTube et le trafic organique.',
          en: 'Creators, educators, tutorial channels, and entrepreneurs targeting YouTube revenue and organic search traffic.',
        },
        outcome: {
          fr: 'Une méthode claire pour publier des vidéos que les internautes recherchent vraiment, tout en avançant sainement vers les seuils YPP.',
          en: 'A clear system to publish videos viewers actively search for while progressing cleanly toward YPP milestones.',
        },
        timeline: { fr: '6 à 8 jours ouvrés', en: '6 to 8 business days' },
      },
      {
        id: 'identite-visuelle-youtube',
        platform: 'youtube',
        name: {
          fr: 'Identité visuelle de chaîne',
          en: 'Channel Visual Identity',
        },
        shortLabel: {
          fr: 'Identité visuelle de chaîne',
          en: 'Channel Visual Identity',
        },
        summary: {
          fr: 'L’habillage graphique complet de votre chaîne : logo, bannière multi-écrans, gabarits de miniatures et pack d’écran de fin.',
          en: 'Complete channel visual kit: logo, multi-device banner, thumbnail templates, and end-screen graphics.',
        },
        included: {
          fr: [
            'Logo / icône de chaîne optimisé pour le petit format mobile et commentaires',
            'Bannière YouTube calibrée selon la zone de sécurité (Mobile / Desktop / TV)',
            '3 gabarits de miniatures réutilisables (Canva ou PSD selon votre outil)',
            'Visuel d’écran de fin (End Screen) avec emplacements « S’abonner » et « Vidéo suivante »',
            'Filigrane de marque (Branding Watermark) et palette typographique officielle de la chaîne',
          ],
          en: [
            'Channel icon / logo crisp even at tiny mobile and comment sizes',
            'YouTube banner calibrated to safe zones across Mobile, Desktop, and TV',
            '3 reusable thumbnail templates (Canva or layered format)',
            'Custom End Screen frame with Subscribe and Next Video zones',
            'Video branding watermark and official channel typography/color guide',
          ],
        },
        forWhom: {
          fr: 'Chaînes déjà actives ou en lancement qui veulent projeter un niveau visuel professionnel dès la page d’accueil.',
          en: 'Active or launching channels looking to project broadcast-grade visual polish from the homepage.',
        },
        outcome: {
          fr: 'Une identité visuelle mémorable qui augmente la confiance des spectateurs et accélère la production de vos miniatures.',
          en: 'A memorable visual identity that increases viewer trust and speeds up thumbnail production.',
        },
        timeline: { fr: '3 à 5 jours ouvrés', en: '3 to 5 business days' },
      },
    ],
    methodTitle: {
      fr: 'Notre méthode sur YouTube',
      en: 'Our YouTube Method',
    },
    methodSteps: [
      {
        number: '01',
        title: { fr: 'Positionnement & mots-clés', en: 'Positioning & Keywords' },
        description: {
          fr: 'Nous identifions ce que votre audience recherche en Afrique francophone ou anglophone et vérifions l’éligibilité pays du Programme Partenaire.',
          en: 'We research what your audience searches for across Francophone or Anglophone Africa and verify YPP country eligibility.',
        },
      },
      {
        number: '02',
        title: { fr: 'Identité & studio', en: 'Visual Identity & Studio' },
        description: {
          fr: 'Nous créons votre bannière, votre logo, vos playlists et configurons YouTube Studio sur votre compte Google personnel.',
          en: 'We craft your banner, logo, and playlists, and configure YouTube Studio under your personal Google account.',
        },
      },
      {
        number: '03',
        title: { fr: 'Plan vidéo & SEO', en: 'Video Roadmap & SEO' },
        description: {
          fr: 'Nous structurons vos titres, descriptions, miniatures et formats (vidéos longues + Shorts) pour maximiser la découverte organique.',
          en: 'We structure your titles, descriptions, thumbnails, and formats (long-form + Shorts) to maximize organic discovery.',
        },
      },
      {
        number: '04',
        title: { fr: 'Publication & suivi', en: 'Publishing & Tracking' },
        description: {
          fr: 'Nous vous formons à publier proprement, respecter les droits d’auteur et suivre l’avancement de votre chaîne en toute autonomie.',
          en: 'We train you to upload cleanly, respect copyright rules, and monitor your channel growth independently.',
        },
      },
    ],
    monetizationTruth: {
      title: {
        fr: 'Monétisation en Afrique : la vérité',
        en: 'Monetization in Africa: The Truth',
      },
      intro: {
        fr: 'Le Programme Partenaire YouTube (YPP) est disponible dans de nombreux pays africains (dont le Cameroun, la Côte d’Ivoire, le Sénégal, le Nigeria, le Ghana, le Kenya...), mais il exige le respect strict des règles communautaires, des droits d’auteur et l’atteinte de seuils réels (ex. 500 à 1 000 abonnés et 3 000 à 4 000 heures de visionnage public valide, ou millions de vues Shorts), avec des critères qui évoluent. Nous ne garantissons jamais une monétisation automatique et ne vendons jamais de chaînes pré-monétisées ni d’heures achetées. Nous vérifions l’éligibilité de votre pays AVANT de démarrer et préparons votre chaîne dans les règles de l’art.',
        en: 'The YouTube Partner Program (YPP) is available in many African countries (including Cameroon, Côte d’Ivoire, Senegal, Nigeria, Ghana, Kenya...), yet it strictly requires adherence to community & copyright rules and real audience milestones (e.g., 500 to 1,000 subscribers and 3,000 to 4,000 valid public watch hours, or Shorts view thresholds), which evolve over time. We never guarantee automatic monetization and never sell pre-monetized channels or bought watch hours. We check your country’s eligibility BEFORE starting and build your channel properly.',
      },
      commitments: {
        fr: [
          'Vérification de l’éligibilité YPP et des modalités AdSense dans votre pays avant de démarrer',
          'Votre chaîne est créée sur votre propre adresse Google : vous restez seul propriétaire',
          'Aucune heure de visionnage achetée ni réutilisation de vidéos sous droits d’auteur',
        ],
        en: [
          'YPP and AdSense payout availability verified for your country before starting',
          'Your channel is created on your own Google account: you remain the sole owner',
          'Zero bought watch hours or copyrighted video re-uploads',
        ],
      },
      alternativeRevenueTitle: {
        fr: 'Autres sources de revenus à activer avant même les seuils YPP',
        en: 'Additional Revenue Streams Available Even Before YPP Thresholds',
      },
      alternativeRevenues: [
        {
          title: { fr: 'Vente de formations, services ou produits', en: 'Selling courses, services, or products' },
          detail: {
            fr: 'Insérez un lien WhatsApp ou de prise de commande dans chaque description vidéo pour convertir vos spectateurs intéressés.',
            en: 'Place a direct WhatsApp or order link in every video description to convert interested viewers.',
          },
        },
        {
          title: { fr: 'Sponsoring et partenariats avec des marques', en: 'Brand sponsorships & integrations' },
          detail: {
            fr: 'Même avec une niche ciblée (tech, cuisine, immobilier, agriculture, entrepreneuriat), les marques recherchent des intégrations dédiées.',
            en: 'Even focused niche channels (tech, cooking, real estate, agribusiness) attract dedicated brand integrations.',
          },
        },
        {
          title: { fr: 'Affiliation en description et commentaire épinglé', en: 'Affiliate links in descriptions & pinned comments' },
          detail: {
            fr: 'Recommandez le matériel, les livres, les outils ou les boutiques que vous utilisez dans vos vidéos.',
            en: 'Recommend gear, books, tools, or partner stores featured in your videos.',
          },
        },
        {
          title: { fr: 'Lives, masterclasses et communauté', en: 'Live Q&As, masterclasses & community' },
          detail: {
            fr: 'Fédérez une audience fidèle autour de rendez-vous en direct hebdomadaires pour renforcer la confiance et vendre vos offres.',
            en: 'Build a loyal following through weekly live sessions that deepen trust and drive direct sales.',
          },
        },
      ],
    },
    faqs: [
      {
        question: {
          fr: 'Le Cameroun et les pays d’Afrique francophone sont-ils éligibles à la monétisation YouTube ?',
          en: 'Are Cameroon and Francophone African countries eligible for YouTube monetization?',
        },
        answer: {
          fr: 'Oui, plusieurs pays d’Afrique francophone et anglophone (dont le Cameroun, le Sénégal, la Côte d’Ivoire, le Gabon, le Bénin, le Nigeria, le Ghana, le Kenya, etc.) figurent dans la liste officielle YPP, mais la liste et les conditions de paiement AdSense peuvent évoluer. Nous vérifions toujours le statut exact de votre pays avec vous avant de commencer.',
          en: 'Yes, several Francophone and Anglophone African countries (including Cameroon, Senegal, Côte d’Ivoire, Gabon, Benin, Nigeria, Ghana, Kenya, etc.) are supported by YPP, though the list and AdSense payout methods can change. We always verify your exact country status with you before starting.',
        },
      },
      {
        question: {
          fr: 'Faites-vous aussi le montage complet des vidéos ?',
          en: 'Do you also handle full video editing?',
        },
        answer: {
          fr: 'Nos offres principales portent sur la création, la structuration, l’identité visuelle, le référencement (SEO), les miniatures et la stratégie éditoriale de la chaîne. Si vous avez besoin d’un accompagnement spécifique, mentionnez-le dans le message libre de votre commande.',
          en: 'Our core services focus on channel setup, structure, visual identity, YouTube SEO, custom thumbnails, and editorial strategy. If you have specific content needs, mention them in the free message field of your order.',
        },
      },
      {
        question: {
          fr: 'Combien de temps faut-il pour atteindre la monétisation ?',
          en: 'How long does it take to reach monetization?',
        },
        answer: {
          fr: 'Personne ne peut fixer un délai garanti honnête, car cela dépend de votre régularité de publication, de la qualité de vos vidéos et de l’intérêt du public. Notre rôle est de vous éviter les erreurs de débutant et de vous donner une structure optimisée dès la vidéo n°1.',
          en: 'No honest agency can guarantee a fixed timeline, as it depends on your publishing consistency, video quality, and audience response. Our job is to eliminate beginner mistakes and give you an optimized structure from video #1.',
        },
      },
    ],
    ctaTitle: {
      fr: 'Prêt à lancer votre chaîne YouTube sur de vraies bases ?',
      en: 'Ready to launch your YouTube channel on solid foundations?',
    },
    ctaSubtitle: {
      fr: 'Remplissez le formulaire de commande pour nous présenter votre thème. Nous vous recontactons rapidement sur WhatsApp.',
      en: 'Fill in the order form to tell us about your channel topic. We will get back to you promptly on WhatsApp.',
    },
  },
};

export function getAllServicesForPlatform(platform: PlatformId): PlatformService[] {
  return PLATFORM_DATA[platform].services;
}

export function findServiceById(
  platform: PlatformId,
  serviceId: string
): PlatformService | undefined {
  return PLATFORM_DATA[platform].services.find((s) => s.id === serviceId);
}
