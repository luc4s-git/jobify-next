import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { AlignLeft } from 'lucide-react';

import navLinks from '@/utils/links';

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} className="lg:hidden">
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navLinks.map((link) => {
          return (
            <DropdownMenuItem key={link.href} className="gap-x-2">
              {link.icon} <span>{link.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
