'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {useTransition} from 'react';
import {cn} from '@/lib/utils';
import {DURATION, EASE, pressableHover, pressableTap, pressTransition} from '@/lib/motion';

function QuebecFlag() {
  const fleur =
    'M0 -4.2C1.2 -2.8 1.8 -1.6 1.6 -0.4C2.4 -1.2 3.3 -1.3 4 -0.4C3.4 0.5 2.5 0.9 1.4 0.7C1.6 1.7 1 2.4 0 3.4C-1 2.4 -1.6 1.7 -1.4 0.7C-2.5 0.9 -3.4 0.5 -4 -0.4C-3.3 -1.3 -2.4 -1.2 -1.6 -0.4C-1.8 -1.6 -1.2 -2.8 0 -4.2Z';

  return (
    <svg className="h-[14px] w-[20px] shrink-0" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect width="20" height="14" fill="#003DA5" />
      <rect x="8" width="4" height="14" fill="white" />
      <rect y="5" width="20" height="4" fill="white" />
      <path d={fleur} fill="white" transform="translate(4 2.8) scale(0.42)" />
      <path d={fleur} fill="white" transform="translate(16 2.8) scale(0.42)" />
      <path d={fleur} fill="white" transform="translate(4 11.2) scale(0.42)" />
      <path d={fleur} fill="white" transform="translate(16 11.2) scale(0.42)" />
    </svg>
  );
}

function CanadaFlag() {
  return (
    <svg className="h-[14px] w-[20px] shrink-0" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect width="20" height="14" fill="white" />
      <rect width="5" height="14" fill="#FF0000" />
      <rect x="15" width="5" height="14" fill="#FF0000" />
      <path
        d="M10 2.1L10.8 4.1L12.4 3.2L11.8 5.2L13.8 5L12.3 6.4L13.4 7.6L11.2 7.8L11.6 9.9L10.3 8.9L10.2 12H9.8L9.7 8.9L8.4 9.9L8.8 7.8L6.6 7.6L7.7 6.4L6.2 5L8.2 5.2L7.6 3.2L9.2 4.1L10 2.1Z"
        fill="#E31B23"
      />
    </svg>
  );
}

export function LangToggle({className}: Readonly<{className?: string}>) {
  const locale = useLocale() as 'fr' | 'en';
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  const nextLocale = locale === 'fr' ? 'en' : 'fr';
  const label = locale === 'fr' ? 'EN' : 'FR';

  function handleSwitch() {
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    startTransition(() => router.push(newPath));
  }

  return (
    <motion.button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={t(nextLocale)}
      whileHover={shouldReduceMotion ? undefined : pressableHover}
      whileTap={shouldReduceMotion ? undefined : pressableTap}
      transition={pressTransition}
      className={cn(
        'flex h-[38px] touch-manipulation items-center gap-2 rounded-full border border-white/20 bg-white/6 px-3 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors hover:bg-white/10 disabled:opacity-50',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={nextLocale}
          initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.85}}
          animate={{opacity: 1, scale: 1}}
          exit={shouldReduceMotion ? undefined : {opacity: 0, scale: 0.85}}
          transition={{duration: DURATION.micro, ease: EASE}}
        >
          {nextLocale === 'fr' ? <QuebecFlag /> : <CanadaFlag />}
        </motion.span>
      </AnimatePresence>
      <span>{label}</span>
    </motion.button>
  );
}
