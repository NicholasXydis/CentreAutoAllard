'use client';

import {LayoutGrid, Mail, Phone} from 'lucide-react';
import {motion, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {MotionPressable} from '@/components/motion-primitives';
import {Button} from '@/components/ui/button';
import {site} from '@/config/site';
import {pageCascade, staggerContainer, staggerItem} from '@/lib/motion';

export function Hero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const nav = useTranslations('nav');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="wide-page flex min-h-dvh items-start px-4 pb-10 pt-[clamp(12rem,31dvh,19rem)] sm:px-6 sm:pb-12 sm:pt-32 [@media_(min-width:768px)_and_(max-width:1023px)_and_(orientation:portrait)]:pt-[clamp(17rem,28dvh,21rem)] [@media_(min-width:820px)_and_(min-height:1100px)_and_(orientation:portrait)]:pt-[30dvh]">
      <div className="wide-standard-container mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-none">
        <motion.div
          variants={pageCascade}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="show"
          className="page-card flex flex-col items-center text-center"
        >
          <motion.h1
            variants={staggerItem}
            className="page-heading drop-shadow-[0_2px_28px_rgba(0,0,0,0.9)]"
          >
            {t('title')}
          </motion.h1>

          <motion.div variants={staggerItem} className="page-divider" />

          <motion.p
            variants={staggerItem}
            className="mt-4 max-w-[310px] text-[11px] font-bold uppercase leading-[1.7] tracking-[0.22em] text-white/82 sm:mt-5 sm:max-w-[420px] sm:text-[12px] sm:leading-[1.8] sm:tracking-[0.3em]"
          >
            {t('eyebrow')}
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="mt-4 max-w-[330px] text-[14px] leading-[1.62] text-white/82 sm:text-[15px] lg:max-w-[450px]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-6 flex w-full flex-col gap-2.5 sm:mt-7 sm:gap-3"
          >
            <MotionPressable>
              <Button
                asChild
                size="lg"
                className="wide-action h-[52px] w-full rounded-[12px] bg-blue-600 text-[15px] font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.52)] transition-colors hover:bg-blue-500 sm:h-[58px]"
              >
                <a href={`tel:${site.phone}`}>
                  <Phone className="h-[20px] w-[20px]" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </Button>
            </MotionPressable>

            <MotionPressable>
              <Link
                href={`/${locale}/contact`}
                className="wide-action flex h-[52px] items-center justify-center gap-3 rounded-[12px] border border-white/16 bg-white/[0.07] px-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-colors hover:border-blue-400/55 hover:bg-white/[0.11] sm:h-[58px]"
              >
                <Mail className="h-[20px] w-[20px] text-white" aria-hidden="true" />
                {nav('contact')}
              </Link>
            </MotionPressable>

            <MotionPressable>
              <Link
                href={`/${locale}/services`}
                className="wide-action flex h-[52px] items-center justify-center gap-3 rounded-[12px] border border-white/16 bg-white/[0.07] px-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-colors hover:border-blue-400/55 hover:bg-white/[0.11] sm:h-[58px]"
              >
                <LayoutGrid className="h-[20px] w-[20px] text-white" aria-hidden="true" />
                {t('explore')}
              </Link>
            </MotionPressable>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
