import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function NotFound() {
  const message = "Cette page n'existe pas ou a ete deplacee.";
  const label = "Retour a l'accueil";

  return (
    <main className="container grid min-h-screen place-items-center py-16">
      <div className="max-w-md space-y-5 text-center">
        <h1 className="text-4xl font-bold">Page introuvable</h1>
        <p className="text-muted-foreground">{message}</p>
        <Button asChild>
          <Link href="/fr">{label}</Link>
        </Button>
      </div>
    </main>
  );
}
