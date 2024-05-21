import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';
import HeroSVG from '@/assets/main.svg';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={LogoSVG} alt="logo"></Image>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            Job <span className="text-primary">Tracking</span> App
          </h1>
          <p className="leading-loose mt-4 max-w-md">
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link
            href={'/add-job'}
            className={buttonVariants({
              variant: 'default',
              className: 'mt-4',
            })}
          >
            Get Started
          </Link>
        </div>
        <Image src={HeroSVG} alt="hero svg" className="hidden lg:block"></Image>
      </section>
    </main>
  );
}
