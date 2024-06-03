'use client';

import { Button } from '../ui/button';
import { deleteJobAction } from '@/utils/actions/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';

export default function DeleteJobBtn({ jobId }: { jobId: string }) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

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
