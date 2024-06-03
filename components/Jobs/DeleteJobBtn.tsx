'use client';

import { Button } from '../ui/button';
import { deleteJobAction } from '@/utils/actions/actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from '../ui/use-toast';

export default function DeleteJobBtn({ jobId }: { jobId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
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
        title: 'Job Deleted',
        description: 'Your job was successfully deleted.',
      });
    },
  });

  const handleDeletion = () => {
    mutate(jobId);
  };

  return (
    <Button
      size={'sm'}
      className="capitalize"
      onClick={handleDeletion}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
