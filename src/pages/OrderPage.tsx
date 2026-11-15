import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Edit3,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getAllServicesForPlatform,
  PLATFORM_DATA,
  PLATFORM_NAMES,
  PlatformId,
  WHATSAPP_NUMBER,
} from '../data/services';
import { AfricanPattern } from '../components/AfricanPattern';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface OrderFormState {
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  platform: PlatformId;
  serviceId: string;
  desiredAccountName: string;
  businessDomain: string;
  hasExistingAccount: 'non' | 'oui';
  existingAccountLink: string;
  mainGoal: 'vendre' | 'monetiser' | 'notoriete';
  contentLanguage: 'fr' | 'en' | 'bilingue';
  styleColors: string;
  desiredTimeline: string;
  freeMessage: string;
  consent: boolean;
}

const COUNTRIES = [
  'Cameroun',
  'Côte d’Ivoire',
  'Sénégal',
  'Gabon',
  'Congo-Brazzaville',
  'RD Congo',
  'Bénin',
  'Togo',
  'Burkina Faso',
  'Mali',
  'Niger',
  'Guinée',
  'Tchad',
  'Nigeria',
  'Ghana',
  'Kenya',
  'Maroc',
  'Tunisie',
  'Autre pays',
];

function isValidPlatform(value: string | null): value is PlatformId {
  return value === 'facebook' || value === 'tiktok' || value === 'youtube';
}

export function OrderPage() {
  const { lang, pick } = useLanguage();
  const [searchParams] = useSearchParams();

  const initialPlatform: PlatformId = isValidPlatform(searchParams.get('platform'))
    ? (searchParams.get('platform') as PlatformId)
    : 'facebook';

  const initialServiceParam = searchParams.get('service');
  const initialServices = getAllServicesForPlatform(initialPlatform);
  const matchedService = initialServices.find((s) => s.id === initialServiceParam);

  const [form, setForm] = useState<OrderFormState>({
    fullName: '',
    whatsapp: '',
    email: '',
    country: 'Cameroun',
    city: '',
    platform: initialPlatform,
    serviceId: matchedService ? matchedService.id : initialServices[0].id,
    desiredAccountName: '',
    businessDomain: '',
    hasExistingAccount: 'non',
    existingAccountLink: '',
    mainGoal: 'vendre',
    contentLanguage: lang === 'en' ? 'en' : 'fr',
    styleColors: '',
    desiredTimeline: '',
    freeMessage: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormState, string>>>({});
  const [showSummary, setShowSummary] = useState(false);

  // Sync if user navigates to /commander?platform=...&service=...
  useEffect(() => {
    const pParam = searchParams.get('platform');
    const sParam = searchParams.get('service');
    if (isValidPlatform(pParam)) {
      const platformServices = getAllServicesForPlatform(pParam);
      const found = platformServices.find((s) => s.id === sParam);
      setForm((prev) => ({
        ...prev,
        platform: pParam,
        serviceId: found ? found.id : platformServices[0].id,
      }));
      setShowSummary(false);
    }
  }, [searchParams]);

  const availableServices = useMemo(
    () => getAllServicesForPlatform(form.platform),
    [form.platform]
  );

  const selectedService = useMemo(
    () =>
      availableServices.find((s) => s.id === form.serviceId) ?? availableServices[0],
    [availableServices, form.serviceId]
  );

  // Progress bar calculation
  const progressPercent = useMemo(() => {
    const checks = [
      form.fullName.trim().length >= 2,
      form.whatsapp.trim().length >= 6,
      form.country.trim().length > 0,
      form.city.trim().length >= 2,
      Boolean(form.platform),
      Boolean(form.serviceId),
      form.desiredAccountName.trim().length >= 2,
      form.businessDomain.trim().length >= 2,
      form.hasExistingAccount === 'non' || form.existingAccountLink.trim().length >= 4,
      Boolean(form.mainGoal),
      Boolean(form.contentLanguage),
      form.consent,
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [form]);

  const handlePlatformChange = (nextPlatform: PlatformId) => {
    const nextServices = getAllServicesForPlatform(nextPlatform);
    setForm((prev) => ({
      ...prev,
      platform: nextPlatform,
      serviceId: nextServices[0].id,
    }));
  };

  const updateField = <K extends keyof OrderFormState>(
    key: K,
    value: OrderFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof OrderFormState, string>> = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = pick({
        fr: 'Veuillez saisir votre nom complet.',
        en: 'Please enter your full name.',
      });
    }

    const phoneDigits = form.whatsapp.replace(/[^\d+]/g, '');
    if (phoneDigits.length < 8) {
      nextErrors.whatsapp = pick({
        fr: 'Veuillez saisir un numéro WhatsApp valide (avec indicatif pays si hors Cameroun).',
        en: 'Please enter a valid WhatsApp number (include country code).',
      });
    }

    if (form.email.trim().length > 0) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      if (!emailOk) {
        nextErrors.email = pick({
          fr: 'Le format de l’adresse e-mail semble invalide.',
          en: 'This email format appears invalid.',
        });
      }
    }

    if (!form.country.trim()) {
      nextErrors.country = pick({
        fr: 'Veuillez sélectionner votre pays.',
        en: 'Please select your country.',
      });
    }

    if (form.city.trim().length < 2) {
      nextErrors.city = pick({
        fr: 'Veuillez indiquer votre ville.',
        en: 'Please enter your city.',
      });
    }

    if (form.desiredAccountName.trim().length < 2) {
      nextErrors.desiredAccountName = pick({
        fr: 'Indiquez le nom souhaité pour votre page, compte ou chaîne.',
        en: 'Enter the desired name for your page, account, or channel.',
      });
    }

    if (form.businessDomain.trim().length < 2) {
      nextErrors.businessDomain = pick({
        fr: 'Précisez votre domaine d’activité ou thématique.',
        en: 'Specify your business sector or content niche.',
      });
    }

    if (
      form.hasExistingAccount === 'oui' &&
      form.existingAccountLink.trim().length < 4
    ) {
      nextErrors.existingAccountLink = pick({
        fr: 'Merci de coller le lien ou l’identifiant du compte existant.',
        en: 'Please paste the link or handle of your existing account.',
      });
    }

    if (!form.consent) {
      nextErrors.consent = pick({
        fr: 'Veuillez confirmer votre accord pour continuer.',
        en: 'Please confirm your consent to continue.',
      });
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowSummary(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goalLabel = {
    vendre: { fr: 'Vendre des produits / services', en: 'Sell products / services' },
    monetiser: { fr: 'Préparer la monétisation', en: 'Prepare for monetization' },
    notoriete: { fr: 'Gagner en notoriété', en: 'Build brand awareness' },
  }[form.mainGoal];

  const contentLangLabel = {
    fr: { fr: 'Français', en: 'French' },
    en: { fr: 'Anglais', en: 'English' },
    bilingue: { fr: 'Bilingue (Français & Anglais)', en: 'Bilingual (French & English)' },
  }[form.contentLanguage];

  const buildOrderWhatsAppUrl = (): string => {
    const platformName = PLATFORM_NAMES[form.platform];
    const serviceName = selectedService.name[lang];

    const lines =
      lang === 'fr'
        ? [
            'Bonjour EPA Digital Service 👋',
            'Voici ma commande complète :',
            '',
            `• Nom complet : ${form.fullName.trim()}`,
            `• WhatsApp : ${form.whatsapp.trim()}`,
            `• E-mail : ${form.email.trim() || 'Non renseigné'}`,
            `• Pays : ${form.country}`,
            `• Ville : ${form.city.trim()}`,
            `• Plateforme : ${platformName}`,
            `• Service souhaité : ${serviceName}`,
            `• Nom souhaité du compte : ${form.desiredAccountName.trim()}`,
            `• Domaine d’activité : ${form.businessDomain.trim()}`,
            `• Compte déjà existant : ${
              form.hasExistingAccount === 'oui'
                ? `Oui (${form.existingAccountLink.trim()})`
                : 'Non'
            }`,
            `• Objectif principal : ${goalLabel.fr}`,
            `• Langue du contenu : ${contentLangLabel.fr}`,
            `• Style et couleurs préférés : ${
              form.styleColors.trim() || 'À définir ensemble'
            }`,
            `• Délai souhaité : ${form.desiredTimeline.trim() || 'Standard'}`,
            `• Message libre : ${form.freeMessage.trim() || 'Aucun message supplémentaire'}`,
            '',
            'Consentement confirmé : Je confirme l’exactitude de ces informations et souhaite être contacté sur WhatsApp.',
          ]
        : [
            'Hello EPA Digital Service 👋',
            'Here is my complete service order:',
            '',
            `• Full name: ${form.fullName.trim()}`,
            `• WhatsApp: ${form.whatsapp.trim()}`,
            `• Email: ${form.email.trim() || 'Not provided'}`,
            `• Country: ${form.country}`,
            `• City: ${form.city.trim()}`,
            `• Platform: ${platformName}`,
            `• Desired service: ${serviceName}`,
            `• Desired account name: ${form.desiredAccountName.trim()}`,
            `• Business / Niche: ${form.businessDomain.trim()}`,
            `• Existing account: ${
              form.hasExistingAccount === 'oui'
                ? `Yes (${form.existingAccountLink.trim()})`
                : 'No'
            }`,
            `• Main goal: ${goalLabel.en}`,
            `• Content language: ${contentLangLabel.en}`,
            `• Preferred style & colors: ${
              form.styleColors.trim() || 'To be discussed'
            }`,
            `• Desired timeline: ${form.desiredTimeline.trim() || 'Standard'}`,
            `• Additional notes: ${form.freeMessage.trim() || 'None'}`,
            '',
            'Consent confirmed: I confirm these details are accurate and agree to be contacted on WhatsApp.',
          ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  return (
    <section className="relative bg-[#F7F4EC] py-12 sm:py-16">
      <AfricanPattern variant="light" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
            {pick({ fr: 'Formulaire de commande', en: 'Order Form' })}
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
            {showSummary
              ? pick({
                  fr: 'Vérifiez votre récapitulatif avant envoi',
                  en: 'Review your order summary before sending',
                })
              : pick({
                  fr: 'Commandez votre présence digitale',
                  en: 'Order your digital presence',
                })}
          </h1>
          <p className="mt-3 text-base text-[#0B2A4A]/75">
            {showSummary
              ? pick({
                  fr: 'Relisez attentivement vos informations puis envoyez votre commande directement sur notre WhatsApp officiel.',
                  en: 'Carefully verify your information, then send your order directly to our official WhatsApp.',
                })
              : pick({
                  fr: 'Ce formulaire est obligatoire avant toute commande : il nous permet de vérifier l’éligibilité de votre pays et de préparer un accompagnement précis dès notre premier message WhatsApp.',
                  en: 'This form is required before any order: it allows us to check your country eligibility and prepare precise guidance from our very first WhatsApp message.',
                })}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 rounded-xl border border-[#0B2A4A]/10 bg-white p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0B2A4A]">
              <span>
                {showSummary
                  ? pick({
                      fr: 'Étape 2 / 2 : Récapitulatif prêt à envoyer',
                      en: 'Step 2 / 2: Summary ready to send',
                    })
                  : pick({
                      fr: 'Étape 1 / 2 : Complétude du formulaire',
                      en: 'Step 1 / 2: Form completion',
                    })}
              </span>
              <span className="tabular-nums text-[#0B2A4A]">
                {showSummary ? '100%' : `${progressPercent}%`}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#0B2A4A]/10">
              <div
                className="h-full rounded-full bg-[#FFB703] transition-all duration-300"
                style={{ width: `${showSummary ? 100 : progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Summary View or Form View */}
        {showSummary ? (
          <div className="rounded-2xl border border-[#0B2A4A]/12 bg-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0B2A4A]">
              <CheckCircle2 className="h-5 w-5 text-[#FFB703]" />
              <span>
                {pick({
                  fr: 'Récapitulatif complet de votre demande',
                  en: 'Complete summary of your request',
                })}
              </span>
            </div>

            <dl className="mt-6 grid gap-x-8 gap-y-5 border-y border-[#0B2A4A]/10 py-6 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Nom complet', en: 'Full name' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">{form.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Numéro WhatsApp', en: 'WhatsApp number' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A] tabular-nums">
                  {form.whatsapp}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'E-mail', en: 'Email' })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {form.email.trim() || pick({ fr: 'Non renseigné', en: 'Not provided' })}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Localisation', en: 'Location' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">
                  {form.city}, {form.country}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Plateforme', en: 'Platform' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">
                  {PLATFORM_NAMES[form.platform]}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Service souhaité', en: 'Desired service' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">
                  {pick(selectedService.name)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Nom souhaité du compte', en: 'Desired account name' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">
                  {form.desiredAccountName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Domaine d’activité', en: 'Business / Niche' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">
                  {form.businessDomain}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Compte déjà existant', en: 'Existing account' })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {form.hasExistingAccount === 'oui'
                    ? `${pick({ fr: 'Oui', en: 'Yes' })} — ${form.existingAccountLink}`
                    : pick({ fr: 'Non', en: 'No' })}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Objectif principal', en: 'Main goal' })}
                </dt>
                <dd className="mt-1 font-semibold text-[#0B2A4A]">{pick(goalLabel)}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Langue du contenu', en: 'Content language' })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {pick(contentLangLabel)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({
                    fr: 'Style et couleurs préférés',
                    en: 'Preferred style & colors',
                  })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {form.styleColors.trim() ||
                    pick({ fr: 'À définir ensemble', en: 'To be discussed' })}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Délai souhaité', en: 'Desired timeline' })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {form.desiredTimeline.trim() ||
                    pick({ fr: 'Standard', en: 'Standard' })}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-[#0B2A4A]/60">
                  {pick({ fr: 'Message libre', en: 'Additional notes' })}
                </dt>
                <dd className="mt-1 font-medium text-[#0B2A4A]">
                  {form.freeMessage.trim() ||
                    pick({ fr: 'Aucun message supplémentaire', en: 'None' })}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setShowSummary(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0B2A4A]/20 bg-white px-5 py-3.5 text-sm font-semibold text-[#0B2A4A] transition-colors hover:bg-[#F7F4EC] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <Edit3 className="h-4 w-4" />
                <span>
                  {pick({ fr: 'Modifier mes réponses', en: 'Edit my answers' })}
                </span>
              </button>

              <a
                href={buildOrderWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1FAF5B] px-6 py-4 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-150 hover:bg-[#19944C] hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <span>
                  {pick({
                    fr: 'Envoyer ma commande sur WhatsApp',
                    en: 'Send my order on WhatsApp',
                  })}
                </span>
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleReviewSubmit}
            noValidate
            className="space-y-8 rounded-2xl border border-[#0B2A4A]/12 bg-white p-6 sm:p-10 shadow-sm"
          >
            {/* Section 1: Coordonnées */}
            <div>
              <h2 className="font-display text-lg font-bold text-[#0B2A4A]">
                01. {pick({ fr: 'Vos coordonnées', en: 'Your Contact Details' })}
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Nom complet *', en: 'Full name *' })}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder={pick({
                      fr: 'Ex. Jean-Paul Kamga',
                      en: 'e.g. Jean-Paul Kamga',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Numéro WhatsApp *', en: 'WhatsApp number *' })}
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'E-mail (facultatif)', en: 'Email (optional)' })}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="nom@exemple.com"
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-semibold text-[#0B2A4A]"
                    >
                      {pick({ fr: 'Pays *', en: 'Country *' })}
                    </label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => updateField('country', e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-3 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-[#0B2A4A]"
                    >
                      {pick({ fr: 'Ville *', en: 'City *' })}
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder={pick({ fr: 'Douala / Abidjan', en: 'Douala / Lagos' })}
                      className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-3 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                    />
                    {errors.city && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Plateforme & Service */}
            <div className="border-t border-[#0B2A4A]/10 pt-8">
              <h2 className="font-display text-lg font-bold text-[#0B2A4A]">
                02. {pick({ fr: 'Plateforme & service souhaité', en: 'Platform & Service' })}
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <span className="block text-sm font-semibold text-[#0B2A4A]">
                    {pick({ fr: 'Plateforme *', en: 'Platform *' })}
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {(['facebook', 'tiktok', 'youtube'] as PlatformId[]).map((pid) => {
                      const active = form.platform === pid;
                      return (
                        <button
                          key={pid}
                          type="button"
                          onClick={() => handlePlatformChange(pid)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                            active
                              ? 'border-[#0B2A4A] bg-[#0B2A4A] text-white shadow-sm'
                              : 'border-[#0B2A4A]/15 bg-[#F7F4EC]/50 text-[#0B2A4A] hover:border-[#0B2A4A]/40'
                          }`}
                        >
                          {PLATFORM_NAMES[pid]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serviceId"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Service souhaité *', en: 'Desired service *' })}
                  </label>
                  <select
                    id="serviceId"
                    value={form.serviceId}
                    onChange={(e) => updateField('serviceId', e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  >
                    {availableServices.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {pick(srv.name)}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-[#0B2A4A]/65">
                    {pick(PLATFORM_DATA[form.platform].services.find((s) => s.id === form.serviceId)?.summary ?? { fr: '', en: '' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Détails du projet */}
            <div className="border-t border-[#0B2A4A]/10 pt-8">
              <h2 className="font-display text-lg font-bold text-[#0B2A4A]">
                03. {pick({ fr: 'Votre projet', en: 'Your Project Details' })}
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="desiredAccountName"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({
                      fr: 'Nom souhaité du compte / de la page *',
                      en: 'Desired account / page name *',
                    })}
                  </label>
                  <input
                    id="desiredAccountName"
                    type="text"
                    required
                    value={form.desiredAccountName}
                    onChange={(e) => updateField('desiredAccountName', e.target.value)}
                    placeholder={pick({
                      fr: 'Ex. Maison Ébène Douala',
                      en: 'e.g. Maison Ébène Douala',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                  {errors.desiredAccountName && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.desiredAccountName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="businessDomain"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({
                      fr: 'Domaine d’activité *',
                      en: 'Business / Content niche *',
                    })}
                  </label>
                  <input
                    id="businessDomain"
                    type="text"
                    required
                    value={form.businessDomain}
                    onChange={(e) => updateField('businessDomain', e.target.value)}
                    placeholder={pick({
                      fr: 'Ex. Mode, cosmétique, restaurant, éducation...',
                      en: 'e.g. Fashion, skincare, food, education...',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                  {errors.businessDomain && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.businessDomain}</span>
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <span className="block text-sm font-semibold text-[#0B2A4A]">
                    {pick({
                      fr: 'Avez-vous déjà un compte / une page existante ? *',
                      en: 'Do you already have an existing account / page? *',
                    })}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {(['non', 'oui'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField('hasExistingAccount', opt)}
                        className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                          form.hasExistingAccount === opt
                            ? 'border-[#0B2A4A] bg-[#0B2A4A] text-white'
                            : 'border-[#0B2A4A]/20 bg-[#F7F4EC]/50 text-[#0B2A4A]'
                        }`}
                      >
                        {opt === 'oui'
                          ? pick({ fr: 'Oui, j’en ai déjà un', en: 'Yes, I already have one' })
                          : pick({ fr: 'Non, à créer de zéro', en: 'No, create from scratch' })}
                      </button>
                    ))}
                  </div>

                  {form.hasExistingAccount === 'oui' && (
                    <div className="mt-3">
                      <label
                        htmlFor="existingAccountLink"
                        className="block text-xs font-semibold text-[#0B2A4A]"
                      >
                        {pick({
                          fr: 'Lien ou identifiant du compte existant *',
                          en: 'Link or handle of the existing account *',
                        })}
                      </label>
                      <input
                        id="existingAccountLink"
                        type="text"
                        value={form.existingAccountLink}
                        onChange={(e) =>
                          updateField('existingAccountLink', e.target.value)
                        }
                        placeholder="https://..."
                        className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                      />
                      {errors.existingAccountLink && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.existingAccountLink}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mainGoal"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Objectif principal *', en: 'Main objective *' })}
                  </label>
                  <select
                    id="mainGoal"
                    value={form.mainGoal}
                    onChange={(e) =>
                      updateField(
                        'mainGoal',
                        e.target.value as OrderFormState['mainGoal']
                      )
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  >
                    <option value="vendre">
                      {pick({
                        fr: 'Vendre mes produits ou services',
                        en: 'Sell my products or services',
                      })}
                    </option>
                    <option value="monetiser">
                      {pick({
                        fr: 'Préparer mon compte à la monétisation',
                        en: 'Prepare my account for monetization',
                      })}
                    </option>
                    <option value="notoriete">
                      {pick({
                        fr: 'Gagner en notoriété et crédibilité',
                        en: 'Build awareness and credibility',
                      })}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contentLanguage"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Langue du contenu *', en: 'Content language *' })}
                  </label>
                  <select
                    id="contentLanguage"
                    value={form.contentLanguage}
                    onChange={(e) =>
                      updateField(
                        'contentLanguage',
                        e.target.value as OrderFormState['contentLanguage']
                      )
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  >
                    <option value="fr">{pick({ fr: 'Français', en: 'French' })}</option>
                    <option value="en">{pick({ fr: 'Anglais', en: 'English' })}</option>
                    <option value="bilingue">
                      {pick({
                        fr: 'Bilingue (Français & Anglais)',
                        en: 'Bilingual (French & English)',
                      })}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="styleColors"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({
                      fr: 'Style et couleurs préférés',
                      en: 'Preferred style and colors',
                    })}
                  </label>
                  <input
                    id="styleColors"
                    type="text"
                    value={form.styleColors}
                    onChange={(e) => updateField('styleColors', e.target.value)}
                    placeholder={pick({
                      fr: 'Ex. Sobre et élégant, bleu et or, ou dynamique...',
                      en: 'e.g. Clean and modern, navy and gold, or bold...',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="desiredTimeline"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Délai souhaité', en: 'Desired timeline' })}
                  </label>
                  <input
                    id="desiredTimeline"
                    type="text"
                    value={form.desiredTimeline}
                    onChange={(e) => updateField('desiredTimeline', e.target.value)}
                    placeholder={pick({
                      fr: 'Ex. Cette semaine, sous 7 jours, flexible...',
                      en: 'e.g. This week, within 7 days, flexible...',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="freeMessage"
                    className="block text-sm font-semibold text-[#0B2A4A]"
                  >
                    {pick({ fr: 'Message libre', en: 'Additional details' })}
                  </label>
                  <textarea
                    id="freeMessage"
                    rows={4}
                    value={form.freeMessage}
                    onChange={(e) => updateField('freeMessage', e.target.value)}
                    placeholder={pick({
                      fr: 'Précisez vos besoins particuliers, vos produits phares ou vos questions...',
                      en: 'Share any specific needs, flagship products, or questions...',
                    })}
                    className="mt-1.5 w-full rounded-xl border border-[#0B2A4A]/20 bg-[#F7F4EC]/40 px-4 py-3 text-sm text-[#0B2A4A] focus:border-[#0B2A4A] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="border-t border-[#0B2A4A]/10 pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateField('consent', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#0B2A4A]/30 text-[#0B2A4A] focus:ring-[#0B2A4A]"
                />
                <span className="text-sm leading-relaxed text-[#0B2A4A]/85">
                  {pick({
                    fr: 'Je confirme l’exactitude de ces informations, j’ai compris que je reste propriétaire de mon compte et que les programmes de monétisation dépendent des règles et de l’éligibilité de mon pays, et j’accepte d’être contacté sur WhatsApp par EPA Digital Service. *',
                    en: 'I confirm these details are accurate, I understand that I retain full ownership of my account and that monetization depends on platform rules and country eligibility, and I agree to be contacted on WhatsApp by EPA Digital Service. *',
                  })}
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-[#0B2A4A]/65">
                <ShieldCheck className="h-4 w-4 text-[#FFB703] shrink-0" />
                <span>
                  {pick({
                    fr: 'Aucune donnée bancaire demandée ici.',
                    en: 'No payment details are requested here.',
                  })}
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFB703] px-7 py-4 text-sm sm:text-base font-semibold text-[#0B2A4A] shadow-sm transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>
                  {pick({
                    fr: 'Voir le récapitulatif de ma commande',
                    en: 'Review my order summary',
                  })}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
