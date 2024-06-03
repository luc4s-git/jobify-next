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

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return { jobs: jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}
