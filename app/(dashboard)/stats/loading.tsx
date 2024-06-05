import StatsLoadingCard from '@/components/Stats/StatsLoadingCard';

export default function loading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
      <StatsLoadingCard />
      <StatsLoadingCard />
      <StatsLoadingCard />
    </div>
  );
}
