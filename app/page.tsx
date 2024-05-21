import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="m-auto mt-5 text-center">
      <Button variant={'ghost'}>
        <Camera />
      </Button>
    </div>
  );
}
