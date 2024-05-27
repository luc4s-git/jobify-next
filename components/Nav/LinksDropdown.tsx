import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { AlignLeft } from 'lucide-react';
import navLinks from '@/utils/data/links';
import Link from 'next/link';

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant={'outline'} size={'icon'}>
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 lg:hidden" align="start">
        {navLinks.map((link) => {
          return (
            <DropdownMenuItem asChild key={link.href} className="gap-x-2">
              <Link href={link.href} className="cursor-pointer">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
