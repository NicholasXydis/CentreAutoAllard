'use client';

import {motion, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {LangToggle} from '@/components/lang-toggle';
import {DURATION, EASE, pressableHover, pressableTap, pressTransition} from '@/lib/motion';

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  const links = [
    {key: 'home' as const, href: `/${locale}`},
    {key: 'services' as const, href: `/${locale}/services`},
    {key: 'contact' as const, href: `/${locale}/contact`}
  ];

  return (
    <motion.header
      initial={shouldReduceMotion ? false : {opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: DURATION.content, ease: EASE}}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-5 lg:pt-5"
    >
      <nav
        aria-label={t('label')}
        className="mx-auto flex h-[64px] w-full max-w-[920px] items-center justify-between rounded-[14px] border border-white/20 bg-[#050b14]/70 px-4 shadow-[0_18px_44px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:h-[70px] sm:px-6 lg:h-[clamp(78px,6vw,96px)] lg:max-w-[clamp(920px,86vw,1440px)] lg:rounded-[clamp(18px,1.4vw,24px)] lg:px-[clamp(2.5rem,4vw,5rem)]"
      >
        <motion.div
          whileHover={shouldReduceMotion ? undefined : pressableHover}
          whileTap={shouldReduceMotion ? undefined : pressableTap}
          transition={pressTransition}
          className="shrink-0 touch-manipulation"
        >
          <Link href={`/${locale}`} className="flex flex-col leading-[1.1]">
            <span className="text-[15px] font-bold italic tracking-tight text-white sm:text-[16px] lg:text-[clamp(1rem,1.35vw,1.375rem)]">
              Centre D&apos;Auto
            </span>
            <span className="text-[15px] font-bold italic tracking-tight text-blue-500 sm:text-[16px] lg:text-[clamp(1rem,1.35vw,1.375rem)]">
              Allard
            </span>
          </Link>
        </motion.div>

        <ul
          className="hidden items-center gap-5 [@media_(orientation:landscape)_and_(max-height:500px)]:flex md:flex md:gap-7 lg:gap-9"
          role="list"
        >
          {links.map(({key, href}) => {
            const active = normalizedPathname === href;
            const base =
              'relative text-[13px] font-medium transition-colors duration-150 lg:text-[clamp(0.875rem,1vw,1.0625rem)]';
            const activeClass = `${base} text-white`;
            const inactiveClass = base + ' text-white/65 hover:text-white';
            return (
              <motion.li
                key={key}
                whileHover={shouldReduceMotion ? undefined : pressableHover}
                whileTap={shouldReduceMotion ? undefined : pressableTap}
                transition={pressTransition}
                className="touch-manipulation"
              >
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={active ? activeClass : inactiveClass}
                >
                  {t(key)}
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-[10px] left-0 h-[3px] w-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                      transition={{duration: DURATION.page, ease: EASE}}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <LangToggle className="h-[40px] shrink-0 lg:h-[clamp(2.75rem,4vw,3.25rem)] lg:px-4 lg:text-[15px]" />
      </nav>
    </motion.header>
  );
}
