'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types/types';
import { CustomFormField, CustomFormSelect } from './FormComponents';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

import { createJobAction } from '@/utils/actions/actions';
import { useToast } from '../ui/use-toast';

export function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const { toast } = useToast();

  function onSubmit(values: CreateAndEditJobType) {
    createJobAction(values);
    toast({
      title: 'Job created',
      description:
        'You job was successfully created, check it out at all jobs page.',
    });
  }

  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />
          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button type="submit" className="self-end capitalize">
            create job
          </Button>
        </div>
      </form>
    </Form>
  );
}
