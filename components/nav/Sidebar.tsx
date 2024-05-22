import Image from 'next/image';
import LogoSVG from '@/assets/logo.svg';

export default function Sidebar() {
  return (
    <aside className="py-4 px-8 bg-muted h-full flex flex-col items-center">
      <Image src={LogoSVG} alt="jobify logo"></Image>
    </aside>
  );
}
