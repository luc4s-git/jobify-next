'use client';

import { useQuery } from '@tanstack/react-query';
import StatsCard from './StatsCard';
import { getStatsAction } from '@/utils/actions/actions';

export default function StatsContainer() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
      <StatsCard stat={data?.pending || 0} title="Pending Jobs" />
      <StatsCard stat={data?.interview || 0} title="Interviews Set" />
      <StatsCard stat={data?.declined || 0} title="Jobs Declined" />
    </div>
  );
}
