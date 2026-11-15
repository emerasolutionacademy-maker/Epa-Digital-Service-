import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  ShieldAlert,
  Target,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  buildServiceWhatsAppUrl,
  PLATFORM_DATA,
  PlatformId,
} from '../data/services';
import { AfricanPattern } from '../components/AfricanPattern';
import { ScrollReveal } from '../components/MotionPrimitives';
import { PlatformMockup } from '../components/PlatformMockups';
import { WhatsAppButton } from '../components/WhatsAppIcon';

export function PlatformPage({ platform }: { platform: PlatformId }) {
  const { lang, pick } = useLanguage();
  const data = PLATFORM_DATA[platform];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* a) Hero avec mockup animé de la plateforme */}
      <section className="relative overflow-hidden bg-[#F7F4EC] pt-10 pb-16 sm:pt-14 sm:pb-20">
        <AfricanPattern variant="light" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0B2A4A]/65">
                {pick(data.title)} · EPA Digital Service
              </p>

              <h1 className="mt-3 font-display text-[clamp(2.1rem,3.8vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-[#0B2A4A]">
                {pick(data.heroTitle)}
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0B2A4A]/80">
                {pick(data.heroSubtitle)}
              </p>

              {/* Quick anchor jump links to services */}
              <div className="mt-6 flex flex-wrap gap-2">
                {data.services.map((srv) => (
                  <a
                    key={srv.id}
                    href={`#${srv.id}`}
                    className="rounded-lg border border-[#0B2A4A]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#0B2A4A] transition-colors hover:border-[#0B2A4A]/40 hover:bg-[#0B2A4A] hover:text-white whitespace-nowrap"
                  >
                    {pick(srv.shortLabel)}
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={`/commander?platform=${platform}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B2A4A] shadow-sm transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>
                    {pick({
                      fr: `Commander un service ${data.title.fr}`,
                      en: `Order a ${data.title.en} service`,
                    })}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlatformMockup platform={platform} />
            </div>
          </div>
        </div>
      </section>

      {/* b) Nos services sur cette plateforme (section détaillée par service) */}
      <section className="border-t border-[#0B2A4A]/10 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                {pick({ fr: 'Catalogue détaillé', en: 'Detailed Services' })}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
                {pick(data.servicesHeading)}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#0B2A4A]/75">
                {pick(data.servicesIntro)}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 space-y-10">
            {data.services.map((service, index) => {
              const waUrl = buildServiceWhatsAppUrl(service, lang);
              return (
                <ScrollReveal key={service.id}>
                  <article
                    id={service.id}
                    className="scroll-mt-24 rounded-2xl border border-[#0B2A4A]/12 bg-[#F7F4EC]/55 p-6 sm:p-8 lg:p-10"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-2.5 text-xs font-medium text-[#0B2A4A]/65">
                          <span className="font-display font-bold text-[#0B2A4A] tabular-nums">
                            0{index + 1}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{pick(data.title)}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-[#FFB703]" />
                            {pick({ fr: 'Délai indicatif :', en: 'Indicative timeline:' })}{' '}
                            {pick(service.timeline)}
                          </span>
                        </div>

                        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#0B2A4A]">
                          {pick(service.name)}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-[#0B2A4A]/80">
                          {pick(service.summary)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0">
                        <WhatsAppButton href={waUrl}>
                          {pick({
                            fr: 'Demander ce service sur WhatsApp',
                            en: 'Inquire on WhatsApp',
                          })}
                        </WhatsAppButton>
                        <Link
                          to={`/commander?platform=${platform}&service=${service.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0B2A4A]/20 bg-white px-5 py-3 text-sm font-semibold text-[#0B2A4A] transition-colors hover:border-[#0B2A4A] hover:bg-[#0B2A4A] hover:text-white whitespace-nowrap"
                        >
                          <span>
                            {pick({
                              fr: 'Pré-remplir ma commande',
                              en: 'Pre-fill order form',
                            })}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 border-t border-[#0B2A4A]/10 pt-8 lg:grid-cols-12">
                      {/* Ce qui est inclus */}
                      <div className="lg:col-span-6">
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0B2A4A]">
                          {pick({ fr: 'Ce qui est inclus', en: 'What is included' })}
                        </h4>
                        <ul className="mt-4 space-y-2.5">
                          {pick(service.included).map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[#0B2A4A]/85"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB703]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pour qui & Ce que le client obtient */}
                      <div className="space-y-6 lg:col-span-6">
                        <div className="rounded-xl border border-[#0B2A4A]/10 bg-white p-5">
                          <div className="flex items-center gap-2 text-sm font-bold text-[#0B2A4A]">
                            <UserCheck className="h-4 w-4 text-[#FFB703] shrink-0" />
                            <h4>{pick({ fr: 'Pour qui', en: 'Who it is for' })}</h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[#0B2A4A]/80">
                            {pick(service.forWhom)}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#0B2A4A]/10 bg-white p-5">
                          <div className="flex items-center gap-2 text-sm font-bold text-[#0B2A4A]">
                            <Target className="h-4 w-4 text-[#FFB703] shrink-0" />
                            <h4>
                              {pick({
                                fr: 'Ce que vous obtenez',
                                en: 'What you get',
                              })}
                            </h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[#0B2A4A]/80">
                            {pick(service.outcome)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* c) Notre méthode en étapes */}
      <section className="border-t border-[#0B2A4A]/10 bg-[#F7F4EC] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
                {pick({ fr: 'Déroulement', en: 'Workflow' })}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0B2A4A]">
                {pick(data.methodTitle)}
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.methodSteps.map((step, idx) => (
              <ScrollReveal key={step.number} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-[#0B2A4A]/10 bg-white p-6">
                  <span className="font-display text-sm font-bold text-[#FFB703] tabular-nums">
                    {step.number}.
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0B2A4A]">
                    {pick(step.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0B2A4A]/75">
                    {pick(step.description)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* d) Bloc « Monétisation en Afrique : la vérité » */}
      <section className="relative overflow-hidden bg-[#0B2A4A] py-16 sm:py-24 text-[#F7F4EC]">
        <AfricanPattern variant="dark" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFB703]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>
                    {pick({
                      fr: 'Transparence & règles officielles',
                      en: 'Transparency & Official Rules',
                    })}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  {pick(data.monetizationTruth.title)}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#F7F4EC]/85">
                  {pick(data.monetizationTruth.intro)}
                </p>

                <ul className="mt-6 space-y-3">
                  {pick(data.monetizationTruth.commitments).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-white"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB703]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold text-[#FFB703]">
                    {pick(data.monetizationTruth.alternativeRevenueTitle)}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {data.monetizationTruth.alternativeRevenues.map((rev, i) => (
                      <div
                        key={i}
                        className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                      >
                        <h4 className="font-display text-sm font-semibold text-white">
                          {pick(rev.title)}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#F7F4EC]/75">
                          {pick(rev.detail)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* e) Questions fréquentes (accordéon) */}
      <section className="bg-[#F7F4EC] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2A4A]/60">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2A4A]">
              {pick({
                fr: `Questions fréquentes sur ${data.title.fr}`,
                en: `Frequently Asked Questions about ${data.title.en}`,
              })}
            </h2>
          </ScrollReveal>

          <div className="mt-8 space-y-3">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#0B2A4A]/12 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-[#0B2A4A] transition-colors hover:bg-[#F7F4EC]/50 cursor-pointer"
                  >
                    <span>{pick(faq.question)}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#0B2A4A]/70 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#0B2A4A]/10 px-6 py-5 text-sm sm:text-base leading-relaxed text-[#0B2A4A]/80">
                      {pick(faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* f) Appel à l'action vers le formulaire de commande */}
      <section className="border-t border-[#0B2A4A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 rounded-3xl bg-[#F7F4EC] border border-[#0B2A4A]/10 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2A4A]">
                {pick(data.ctaTitle)}
              </h2>
              <p className="mt-3 text-base text-[#0B2A4A]/75">
                {pick(data.ctaSubtitle)}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to={`/commander?platform=${platform}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-4 text-sm sm:text-base font-semibold text-[#0B2A4A] shadow-sm transition-all duration-150 hover:bg-[#E5A400] hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>
                  {pick({
                    fr: 'Aller au formulaire de commande',
                    en: 'Go to the order form',
                  })}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
