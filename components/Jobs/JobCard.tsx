import { Briefcase, CalendarDays, MapPin, RadioTower } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { Separator } from '../ui/separator';

import { JobType } from '@/utils/types/types';
import { Button } from '../ui/button';
import DeleteJobBtn from './DeleteJobBtn';
import Link from 'next/link';
import JobInfo from './JobInfo';
import { Badge } from '../ui/badge';

export default function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <CardHeader className="p-6">
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 pt-0 mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size={'sm'} className="capitalize">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobBtn />
      </CardFooter>
    </Card>
  );
}
