import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { useState, useTransition } from 'react';
import cx from 'classnames';
import { Button } from '../../../components/shared/button';
import { deleteBranch } from '~/app/api/actions/delete-branch';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

// @ts-ignore
export const DeleteBranch = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = node;
  const pathname = usePathname();
  const projectId = pathname.split('/')[2];

  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession();

  return (
    <>
      <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogPrimitive.Trigger asChild>
          <Button appearance="danger">Delete Branch</Button>
        </AlertDialogPrimitive.Trigger>
        <>
          <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay asChild>
              <div className="fixed inset-0 z-20 bg-black/90" />
            </AlertDialogPrimitive.Overlay>

            <div className="fixed inset-0 z-30 flex items-center justify-center">
              <AlertDialogPrimitive.Content asChild forceMount>
                <form
                  className={cx(
                    'relative bg-gray-300 shadow-lg',
                    'w-[95vw] max-w-sm rounded-md p-4',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2'
                  )}
                >
                  <AlertDialogPrimitive.Title className="mb-3 text-sm font-medium text-gray-1200">
                    Delete Branch {name}
                  </AlertDialogPrimitive.Title>
                  <AlertDialogPrimitive.Description className="mb-2 text-sm text-gray-1100">
                    This action cannot be undone. This will permanently delete
                    your branch.
                  </AlertDialogPrimitive.Description>
                  <div className="flex justify-end space-x-2">
                    <AlertDialogPrimitive.Cancel asChild>
                      <Button size="small" appearance="outlined">
                        Cancel
                      </Button>
                    </AlertDialogPrimitive.Cancel>
                    <>
                      <Button
                        onClick={() => {
                          startTransition(() => {
                            deleteBranch({
                              branchId: id,
                              accessToken: session?.accessToken,
                              projectId,
                            });
                            setIsOpen(false);
                          });
                        }}
                        loading={isPending}
                        type="submit"
                        size="small"
                        appearance="danger"
                      >
                        Delete
                      </Button>
                    </>
                  </div>
                </form>
              </AlertDialogPrimitive.Content>
            </div>
          </AlertDialogPrimitive.Portal>
        </>
      </AlertDialogPrimitive.Root>
    </>
  );
};
