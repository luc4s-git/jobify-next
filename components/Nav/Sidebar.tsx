'use client';

import navLinks from '@/utils/data/links';
import LogoSVG from '@/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full flex flex-col items-center">
      <Image src={LogoSVG} alt="jobify logo"></Image>
      <div className="flex flex-col mt-20 gap-y-4 w-full">
        {navLinks.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? 'default' : 'link'}
            >
              <Link className="flex gap-x-2 items-center" href={link.href}>
                {link.icon}
                <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
