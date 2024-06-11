'use client';

import { getChartsDataAction } from '@/utils/actions/actions';
import { useQuery } from '@tanstack/react-query';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function ChartsContainer() {
  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  if (!data || data.length < 1) return null;

  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center">
        Monthly Applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="count" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
