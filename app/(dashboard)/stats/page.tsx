import { getStatsAction } from '@/utils/actions/actions';

export default async function StatsPage() {
  const stats = await getStatsAction();

  return <div>StatsPage</div>;
}
