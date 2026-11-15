import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  Heart,
  MessageCircle,
  Play,
  Share2,
  ShoppingBag,
  ThumbsUp,
  Tv,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PlatformId } from '../data/services';
import { WhatsAppIcon } from './WhatsAppIcon';

export function PlatformMockup({ platform }: { platform: PlatformId }) {
  const shouldReduceMotion = useReducedMotion();

  const floatAnimation = shouldReduceMotion
    ? undefined
    : {
        y: [0, -7, 0],
        transition: {
          duration: 5.2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  return (
    <motion.div
      animate={floatAnimation}
      className="relative mx-auto w-full max-w-[310px] select-none"
    >
      {/* Phone chassis */}
      <div className="rounded-[2.25rem] border-[6px] border-[#0B2A4A] bg-[#071D34] p-2 shadow-2xl">
        {/* Top speaker notch */}
        <div className="mx-auto mb-2 h-4 w-24 rounded-full bg-[#0B2A4A] flex items-center justify-center">
          <div className="h-1.5 w-10 rounded-full bg-white/15" />
        </div>

        {/* Screen */}
        <div className="overflow-hidden rounded-[1.6rem] bg-white text-[#0B2A4A]">
          {platform === 'facebook' && <FacebookScreen />}
          {platform === 'tiktok' && <TikTokScreen />}
          {platform === 'youtube' && <YouTubeScreen />}
        </div>
      </div>
    </motion.div>
  );
}

function FacebookScreen() {
  const { pick } = useLanguage();

  return (
    <div className="flex flex-col text-left">
      {/* App Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5 bg-white">
        <span className="font-display text-xs font-bold tracking-tight text-[#1877F2]">
          facebook
        </span>
        <span className="text-[11px] font-medium text-slate-500">
          {pick({ fr: 'Page Pro', en: 'Pro Page' })}
        </span>
      </div>

      {/* Cover Banner */}
      <div className="relative h-24 bg-[#0B2A4A] px-3.5 pt-3 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFB703_1px,transparent_1px)] [background-size:10px_10px]" />
        <p className="relative text-[10px] font-medium uppercase tracking-wider text-[#FFB703]">
          Douala · Yaoundé
        </p>
        <p className="relative mt-0.5 font-display text-sm font-bold leading-tight">
          Maison Karité & Soins
        </p>
      </div>

      {/* Avatar & Name */}
      <div className="relative px-3.5 pb-3">
        <div className="-mt-7 mb-2 flex items-end justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#FFB703] font-display text-base font-bold text-[#0B2A4A] shadow-sm">
            MK
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-[#1FAF5B] px-2.5 py-1.5 text-[10px] font-semibold text-white">
            <WhatsAppIcon className="h-3 w-3" />
            <span>WhatsApp</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <h4 className="font-display text-xs font-bold text-[#0B2A4A]">
            Maison Karité Cameroun
          </h4>
          <CheckCircle2 className="h-3.5 w-3.5 text-[#1877F2]" />
        </div>
        <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
          {pick({
            fr: 'Cosmétiques naturels · Livraison Douala, Yaoundé & expéditions Afrique.',
            en: 'Natural skincare · Delivery in Douala, Yaoundé & across Africa.',
          })}
        </p>

        {/* Catalog Grid Preview */}
        <div className="mt-3 rounded-xl bg-[#F7F4EC] p-2.5">
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-[#0B2A4A]">
            <span className="flex items-center gap-1">
              <ShoppingBag className="h-3 w-3 text-[#FFB703]" />
              {pick({ fr: 'Catalogue Boutique', en: 'Shop Catalog' })}
            </span>
            <span className="text-slate-500">
              {pick({ fr: 'Voir tout', en: 'See all' })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white p-2 border border-slate-200/70">
              <div className="h-12 rounded-md bg-gradient-to-br from-[#0B2A4A]/15 to-[#FFB703]/25" />
              <p className="mt-1.5 text-[10px] font-semibold text-[#0B2A4A] truncate">
                {pick({ fr: 'Beurre Pur 250g', en: 'Pure Shea 250g' })}
              </p>
              <p className="text-[9px] text-[#1FAF5B] font-medium">
                {pick({ fr: 'Commander →', en: 'Order →' })}
              </p>
            </div>
            <div className="rounded-lg bg-white p-2 border border-slate-200/70">
              <div className="h-12 rounded-md bg-gradient-to-br from-[#FFB703]/25 to-[#0B2A4A]/10" />
              <p className="mt-1.5 text-[10px] font-semibold text-[#0B2A4A] truncate">
                {pick({ fr: 'Huile Capillaire', en: 'Hair Elixir' })}
              </p>
              <p className="text-[9px] text-[#1FAF5B] font-medium">
                {pick({ fr: 'Commander →', en: 'Order →' })}
              </p>
            </div>
          </div>
        </div>

        {/* Post Action Bar */}
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" /> {pick({ fr: 'J’aime', en: 'Like' })}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" /> {pick({ fr: 'Message', en: 'Message' })}
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="h-3 w-3" /> {pick({ fr: 'Partager', en: 'Share' })}
          </span>
        </div>
      </div>
    </div>
  );
}

function TikTokScreen() {
  const { pick } = useLanguage();

  return (
    <div className="flex flex-col bg-[#0A111A] text-white text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10">
        <span className="font-display text-xs font-bold">@atelier.wax.cm</span>
        <span className="text-[10px] text-[#FFB703] font-medium">
          {pick({ fr: 'Compte Pro', en: 'Pro Account' })}
        </span>
      </div>

      {/* Profile Header */}
      <div className="px-3.5 pt-3 pb-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FFB703] bg-[#0B2A4A] font-display text-base font-bold text-white">
          AW
        </div>
        <h4 className="mt-2 font-display text-xs font-bold">
          Atelier Wax & Couture
        </h4>
        <p className="mt-1 text-[10px] leading-snug text-slate-300">
          {pick({
            fr: 'Mode contemporaine africaine · Sur mesure & prêt-à-porter · Commandes WhatsApp 👇',
            en: 'Contemporary African fashion · Bespoke & ready-to-wear · Order via WhatsApp 👇',
          })}
        </p>

        {/* Action link preview */}
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-medium text-[#FFB703]">
          <span>wa.me/237...</span>
        </div>

        {/* Video Grid with clean cover templates */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-left">
          {[
            { fr: '3 tenues bureau', en: '3 office looks', tone: 'from-[#0B2A4A] to-[#1A4B7C]' },
            { fr: 'Coulisses atelier', en: 'Studio tour', tone: 'from-[#2D2A1E] to-[#5B4712]' },
            { fr: 'Nouvelle coupe', en: 'New tailoring', tone: 'from-[#102E3A] to-[#0B2A4A]' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`relative flex h-28 flex-col justify-between rounded-lg bg-gradient-to-b ${item.tone} p-1.5 border border-white/10`}
            >
              <div className="flex justify-end">
                <Play className="h-3 w-3 text-white/80 fill-white/80" />
              </div>
              <div>
                <div className="rounded bg-[#FFB703] px-1 py-0.5 text-[8px] font-bold text-[#0B2A4A] leading-tight">
                  {pick(item)}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[8px] text-white/80">
                  <Heart className="h-2.5 w-2.5" />
                  <span>Reel</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav simulation */}
        <div className="mt-3 flex items-center justify-around border-t border-white/10 pt-2 text-[9px] text-slate-400">
          <span className="text-white font-semibold">{pick({ fr: 'Profil', en: 'Profile' })}</span>
          <span>{pick({ fr: 'Playlists', en: 'Playlists' })}</span>
          <span className="text-[#FFB703] font-semibold">Live</span>
        </div>
      </div>
    </div>
  );
}

function YouTubeScreen() {
  const { pick } = useLanguage();

  return (
    <div className="flex flex-col bg-white text-[#0B2A4A] text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-5 items-center justify-center rounded bg-[#FF0000] text-white">
            <Play className="h-2.5 w-2.5 fill-white" />
          </div>
          <span className="font-display text-xs font-bold tracking-tight">YouTube</span>
        </div>
        <span className="text-[10px] font-medium text-slate-500">
          {pick({ fr: 'Chaîne Studio', en: 'Studio Channel' })}
        </span>
      </div>

      {/* Responsive Channel Banner */}
      <div className="relative h-20 bg-[#0B2A4A] px-3.5 flex flex-col justify-center text-white overflow-hidden">
        <div className="absolute right-2 top-2 h-16 w-16 rounded-full bg-[#FFB703]/15" />
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#FFB703]">
          {pick({ fr: 'Entreprendre en Afrique', en: 'Business in Africa' })}
        </p>
        <p className="font-display text-sm font-bold leading-tight">
          AgriTech Afrique TV
        </p>
      </div>

      {/* Channel Info */}
      <div className="px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2A4A] font-display text-xs font-bold text-[#FFB703]">
            AT
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-xs font-bold truncate">
              AgriTech Afrique TV
            </h4>
            <p className="text-[10px] text-slate-500">
              @agritechafriquetv · {pick({ fr: 'Chaîne structurée', en: 'Structured channel' })}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex items-center gap-4 border-b border-slate-200 pb-1.5 text-[10px] font-semibold text-slate-500">
          <span className="text-[#0B2A4A] border-b-2 border-[#0B2A4A] pb-1.5 -mb-1.5">
            {pick({ fr: 'Accueil', en: 'Home' })}
          </span>
          <span>{pick({ fr: 'Vidéos', en: 'Videos' })}</span>
          <span>Shorts</span>
          <span>{pick({ fr: 'Playlists', en: 'Playlists' })}</span>
        </div>

        {/* Video Cards with custom Thumbnail layout */}
        <div className="mt-2.5 space-y-2.5">
          {[
            {
              title: {
                fr: 'Comment lancer une unité agroalimentaire rentable au Cameroun',
                en: 'How to launch a profitable agribusiness unit in Cameroon',
              },
              tag: { fr: 'Guide complet', en: 'Full guide' },
              duration: '14:20',
            },
            {
              title: {
                fr: '5 erreurs à éviter sur les chaînes YouTube éducatives',
                en: '5 mistakes to avoid on educational YouTube channels',
              },
              tag: { fr: 'Méthode SEO', en: 'SEO Method' },
              duration: '09:45',
            },
          ].map((vid, idx) => (
            <div key={idx} className="flex gap-2.5 items-start">
              <div className="relative h-14 w-24 shrink-0 rounded-lg bg-[#0B2A4A] p-1.5 flex flex-col justify-between overflow-hidden">
                <span className="inline-block w-fit rounded bg-[#FFB703] px-1 py-0.5 text-[7px] font-bold text-[#0B2A4A]">
                  {pick(vid.tag)}
                </span>
                <span className="self-end rounded bg-black/75 px-1 text-[8px] font-medium text-white tabular-nums">
                  {vid.duration}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold leading-snug text-[#0B2A4A] line-clamp-2">
                  {pick(vid.title)}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[9px] text-slate-500">
                  <Tv className="h-2.5 w-2.5" />
                  <span>{pick({ fr: 'Miniature optimisée', en: 'Optimized thumbnail' })}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-slate-500 border-t border-slate-100 pt-2">
          <Users className="h-3 w-3 text-[#FFB703]" />
          <span>
            {pick({
              fr: 'Chaîne vérifiée & prête pour le référencement',
              en: 'Verified & search-ready channel setup',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
