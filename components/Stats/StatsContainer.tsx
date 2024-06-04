export default function StatsContainer({
  stat,
  statTitle,
}: {
  stat: number;
  statTitle: string;
}) {
  return (
    <div className="flex items-center justify-between bg-muted md:px-5 px-4 py-6 rounded-lg border">
      <h2 className="text-2xl font-semibold">{statTitle}</h2>
      <span className="text-4xl font-semibold text-primary">{stat}</span>
    </div>
  );
}
