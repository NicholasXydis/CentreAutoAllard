import Image from 'next/image';

export function SiteShell({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative min-h-dvh overflow-x-hidden bg-[#050912] text-white"
    >
      <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/shop-front.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-center lg:hidden"
        />
        <Image
          src="/shop-front.webp"
          alt=""
          width={1022}
          height={1538}
          sizes="(min-width: 1024px) min(100vw, 2560px), 1px"
          className="wide-storefront-image"
        />
      </div>
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_90%_42%_at_50%_18%,rgba(96,165,250,0.15),transparent_64%),linear-gradient(to_bottom,rgba(2,6,14,0.18)_0%,rgba(2,6,14,0.38)_24%,rgba(2,6,14,0.66)_54%,rgba(5,9,18,0.76)_100%)]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.42),transparent_20%,transparent_80%,rgba(0,0,0,0.42))]"
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-dvh">{children}</div>
    </main>
  );
}
