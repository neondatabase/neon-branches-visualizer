'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { createEndpoint } from '~/app/api/actions/create-endpoint';
import { Button } from '~/components/shared/button';

export const CreateEndpoint = ({ branchId }) => {
  const pathname = usePathname();
  const projectId = pathname.split('/')[2];

  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  return (
    <form
      action={() => {
        startTransition(() => {
          createEndpoint({
            branchId,
            accessToken: session?.accessToken,
            projectId,
          });
        });
      }}
    >
      <Button
        type="submit"
        loading={isPending}
        appearance="primary"
        size="small"
      >
        Create Endpoint
      </Button>
    </form>
  );
};
