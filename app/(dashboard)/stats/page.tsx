import StatsContainer from '@/components/Stats/StatsContainer';
import { getStatsAction, getChartsDataAction } from '@/utils/actions/actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function StatsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <StatsContainer />
      </div>
    </HydrationBoundary>
  );
}
