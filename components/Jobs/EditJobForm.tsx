'use client';

import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from '@/utils/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSingleJobAction, updateJobAction } from '@/utils/actions/actions';
import { useToast } from '../ui/use-toast';
import CustomFormSelect, { CustomFormField } from './FormComponents';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditJobForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          variant: 'destructive',
          title: 'Oops, something went wrong!',
          description: 'There was a problem with your request.',
        });
        return;
      }

      toast({
        title: 'Job Updated',
        description: 'Your job was successfully updated.',
      });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/jobs');
    },
  });

  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className="bg-muted p-8 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Edit Job</h2>
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
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
              </>
            ) : (
              'Edit job'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
