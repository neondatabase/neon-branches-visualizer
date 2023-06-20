'use client';
import { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '~/components/shared/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/shared/dialog';
import { Label } from '~/components/shared/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/shared/select';
import { TextInput } from '~/components/shared/text-input';
import { regionIds } from '~/utils/neon/regions';
import { createProject } from '../api/actions/create-project';
import { useSession } from 'next-auth/react';

type FormData = {
  pg_version: string;
  name: string;
  region_id: typeof regionIds;
};

export const CreateProject = () => {
  const { handleSubmit, register, control } = useForm<FormData>({
    mode: 'onChange',
  });
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // @ts-ignore
  const onSubmit = async ({ name, pg_version, region_id }) => {
    startTransition(() => {
      createProject({
        name,
        pg_version,
        region_id,
        accessToken: session?.accessToken,
      });
      setOpen(false);
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create a new Project</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="mb-3 flex flex-col space-y-5">
              <div>
                <Label htmlFor="name" className="mb-1.5" size="sm">
                  Project name
                </Label>
                <TextInput
                  id="name"
                  {...register('name', {
                    required: true,
                  })}
                  placeholder="project name"
                />
              </div>

              <div>
                <Label htmlFor="pg_version" className="mb-1.5" size="sm">
                  Postgres version
                </Label>
                <Controller
                  control={control}
                  name="pg_version"
                  render={({ field }) => (
                    <Select required onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Postgres version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="region_id" className="mb-1.5" size="sm">
                  Project region
                </Label>
                <Controller
                  control={control}
                  name="region_id"
                  render={({ field }) => (
                    <Select required onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region for your project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="aws-eu-central-1">
                            EU (Frankfurt)
                          </SelectItem>
                          <SelectItem value="aws-ap-southeast-1">
                            Asia Pacific (Singapore)
                          </SelectItem>
                          <SelectItem value="aws-us-east-2">
                            US East (Ohio)
                          </SelectItem>
                          <SelectItem value="aws-us-west-2">
                            US West (Oregon)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <Button loading={isPending} disabled={isPending} type="submit">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
