'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/shared/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/shared/dialog';
import { Label } from '~/components/shared/label';
import { TextInput } from '~/components/shared/text-input';
import { createBranch } from '../../api/actions/create-branch';
import { useSession } from 'next-auth/react';
import { Icon } from '~/components/shared/icon';
import { usePathname } from 'next/navigation';

type FormData = {
  name: string;
};

export const CreateBranch = ({ node }) => {
  const pathname = usePathname();
  const projectId = pathname.split('/')[2];

  const { handleSubmit, register } = useForm<FormData>({
    mode: 'onChange',
  });
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // @ts-ignore
  const onSubmit = async ({ name }) => {
    startTransition(() => {
      createBranch({
        name,
        parent_id: node.id,
        accessToken: session?.accessToken,
        projectId: projectId,
      });
      setOpen(false);
    });
  };

  return (
    <>
      {node.endpoint && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100">
              <Icon
                name="Plus"
                className="z-10 hidden h-6 w-6 rounded-full bg-gray-400 p-1 text-gray-1200 shadow-md group-focus-within:inline group-hover:inline"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a new branch</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="mb-3 flex flex-col space-y-5">
                <div>
                  <Label htmlFor="name" className="mb-1.5" size="sm">
                    Branch name
                  </Label>
                  <TextInput
                    id="name"
                    {...register('name', {
                      required: true,
                    })}
                    placeholder="Branch name"
                  />
                </div>
              </div>
              <Button loading={isPending} disabled={isPending} type="submit">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
