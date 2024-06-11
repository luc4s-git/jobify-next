'use server';

import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import prisma from '../db/db';

import {
  JobType,
  CreateAndEditJobType,
  createAndEditJobSchema,
} from '../types/types';
import { Prisma } from '@prisma/client';

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) redirect('/');

  return userId;
}

export async function getSingleJobAction(
  jobId: string
): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id: jobId,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }

  if (!job) {
    redirect('/jobs');
  }

  return job;
}

export async function updateJobAction(
  jobId: string,
  values: CreateAndEditJobType
) {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id: jobId,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}

export async function deleteJobAction(jobId: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id: jobId,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // development add delay to test the pending state for the form

    createAndEditJobSchema.parse(values); // throw error in case of not receiving any values

    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

type GetAllJobsActionType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: { contains: search },
          },
          {
            company: { contains: search },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;
    // page skip
    //    1 0
    //    2 10
    //    3 20

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const count: number = await prisma.job.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { jobs: jobs, count: count, page: 1, totalPages: totalPages };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
} | null> {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    // overwrite the default stats
    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch (error) {
    redirect('/jobs');
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect('/jobs');
  }
}
