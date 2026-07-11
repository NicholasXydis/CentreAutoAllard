import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/hero';
import {Navbar} from '@/components/navbar';
import {SiteShell} from '@/components/site-shell';
import {type LocaleParams} from './layout';

export default async function HomePage({params}: Readonly<{params: Promise<LocaleParams>}>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <SiteShell nav={<Navbar />}>
      <Hero />
    </SiteShell>
  );
}
