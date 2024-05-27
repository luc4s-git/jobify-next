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

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) redirect('/');

  return userId;
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
