import { Skeleton } from '../ui/skeleton';

export default function StatsLoadingCard() {
  return (
    <div className="flex flex-col gap-2 items-start md:px-10 px-8 py-6 rounded-lg border">
      <Skeleton className="w-full h-[16px] rounded-full" />
      <Skeleton className="w-3/4 h-[16px] rounded-full" />
    </div>
  );
}
