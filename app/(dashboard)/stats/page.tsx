import StatsContainer from '@/components/Stats/StatsContainer';
import { getStatsAction, getChartsDataAction } from '@/utils/actions/actions';

export default async function StatsPage() {
  const stats = await getStatsAction();
  const chartsData = await getChartsDataAction();

  if (!stats) {
    return <h1>no stats found</h1>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
      <StatsContainer
        stat={stats.pending}
        statTitle={'Pending Jobs'}
      ></StatsContainer>
      <StatsContainer
        stat={stats.interview}
        statTitle={'Interviews Set'}
      ></StatsContainer>
      <StatsContainer
        stat={stats.declined}
        statTitle={'Jobs Declined'}
      ></StatsContainer>
    </div>
  );
}
