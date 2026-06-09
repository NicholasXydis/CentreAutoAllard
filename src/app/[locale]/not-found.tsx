import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="container grid min-h-screen place-items-center px-4 py-16">
      <div className="max-w-md space-y-5 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">
          Cette page n&apos;existe pas ou a été déplacée. / This page does not exist or has moved.
        </p>
        <Button asChild>
          <Link href="/fr">Retour / Back</Link>
        </Button>
      </div>
    </main>
  );
}
