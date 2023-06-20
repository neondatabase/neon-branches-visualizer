import cx from 'classnames';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import useClipboard from 'react-use-clipboard';
import { format } from 'date-fns';
import { CreateBranch } from './create-branch';

import { DeleteBranch } from './delete-branch';
import { Icon } from '../../../components/shared/icon';
import { Divider } from '../../../components/shared/divider';
import { Button } from '../../../components/shared/button';
import { EndpointBadge, EndpointDot } from '~/components/endpoint';
import { CreateEndpoint } from './create-endpoint';

const dialogVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.1,
    },
  },
};

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

interface TreeNodeProps extends DialogPrimitive.DialogProps {
  node: {
    name: string;
    id: string;
    endpoint?: {
      autoscaling_limit_max_cu: number;
      autoscaling_limit_min_cu: number;
      branch_id: string;
      created_at: string;
      current_state: 'idle';
      disabled: boolean;
      host: string;
      id: string;
      last_active: string;
      passwordless_access: boolean;
      pooler_enabled: boolean;
      pooler_mode: 'transaction';
      project_id: string;
      proxy_host: 'eu-central-1.aws.neon.tech';
      region_id: 'aws-eu-central-1';
      settings: { pg_settings: {} };
      type: 'read_write' | 'read_only';
    };
  };
}

export const TreeNode = ({ node }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isCopied, setIsCopied] = useClipboard(node.id, {
    successDuration: 2000,
  });

  const [isEndpointCopied, setIsEndpointCopied] = useClipboard(node.id, {
    successDuration: 2000,
  });

  return (
    <>
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <div className="group flex items-center">
          <DialogPrimitive.Trigger asChild>
            <button
              className={cx(
                'bg-gray-400 text-xs hover:bg-gray-500',
                !node.endpoint &&
                  'dark:border-gray-dark-700 border-2 border-dashed border-gray-700',
                'relative rounded-md shadow-md',
                'm-1 px-5 py-2.5',
                'dark:focus-visible:ring-green-dark-700 ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
                'select-none'
              )}
            >
              {node.endpoint && (
                <EndpointDot state={node.endpoint.current_state} />
              )}
              <h3 className="text-ellipsis text-center text-gray-1200">
                {node.name}
              </h3>
            </button>
          </DialogPrimitive.Trigger>

          <CreateBranch node={node} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay forceMount asChild>
                <motion.div
                  className="fixed inset-0 z-10 bg-black/40"
                  initial="hidden"
                  animate="visible"
                  variants={overlayVariants}
                  exit="exit"
                />
              </DialogPrimitive.Overlay>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={dialogVariants}
                exit="exit"
                className="fixed inset-0 z-20 overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden text-gray-1100">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full items-end pl-10 sm:pl-16">
                    <DialogPrimitive.Content asChild forceMount>
                      <div
                        className={cx(
                          'pointer-events-auto w-screen max-w-2xl',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
                          'flex h-[92%] flex-col rounded-t-md bg-gray-300 shadow-xl'
                        )}
                      >
                        {/* Header */}
                        <div className="rounded-t-md bg-gray-200 p-4 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <h3 className="text-xl text-gray-1200">
                              Branch Overview
                            </h3>

                            <DialogPrimitive.Close
                              className={cx(
                                'rounded-full p-1',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 '
                              )}
                            >
                              <Icon
                                name="Cross"
                                className="h-4 w-4  hover:text-gray-1200"
                              />
                            </DialogPrimitive.Close>
                          </div>
                        </div>

                        <div className="space-y-8 px-4 py-6 sm:px-6">
                          <div>
                            <h4 className="mb-3 text-lg font-light text-gray-1200">
                              Branch Details
                            </h4>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm">Branch Name</dt>
                                <DialogPrimitive.Title asChild>
                                  <dd className="mt-1 flex items-center text-gray-1200">
                                    {node.name}{' '}
                                  </dd>
                                </DialogPrimitive.Title>
                              </div>

                              <div className="sm:col-span-1">
                                <dt className="text-sm">Branch ID</dt>
                                <dd className="mt-1 flex items-center space-x-2">
                                  <span className=" text-gray-1200">
                                    {node.id}
                                  </span>
                                  <button
                                    className="dark:focus-visible:ring-green-dark-700 dark:hover:text-gray-dark-1200 rounded-md p-1 ring-offset-gray-100 hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                                    onClick={setIsCopied}
                                  >
                                    {isCopied ? (
                                      <Icon
                                        className="hover h-3.5 w-3.5"
                                        name="Check"
                                      />
                                    ) : (
                                      <Icon
                                        className="hover h-3.5 w-3.5"
                                        name="Copy"
                                      />
                                    )}
                                  </button>
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <Divider className="py-5" />

                          <div>
                            <h4 className="mb-3 text-lg font-light text-gray-1200">
                              Branch Endpoint
                            </h4>
                            {!node.endpoint && (
                              <>
                                <p className="mt-1 text-sm">
                                  This branch has no endpoints. Create an
                                  endpoint to be able to connect to the branch
                                </p>
                                <div className="mt-4">
                                  <CreateEndpoint branchId={node.id} />
                                </div>
                              </>
                            )}

                            {node.endpoint && (
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                  <dt className="text-sm">Endpoint ID</dt>
                                  <dd className="mt-1 text-gray-1200">
                                    {node?.endpoint?.id}
                                  </dd>
                                </div>

                                <div className="sm:col-span-1">
                                  <dt className="text-sm">Endpoint host</dt>
                                  <dd className="mt-1 flex items-center space-x-2">
                                    <span className="text-ellipsis text-gray-1200">
                                      {node.endpoint.host}
                                    </span>
                                    <button
                                      className="dark:focus-visible:ring-green-dark-700 dark:hover:text-gray-dark-1200 rounded-md p-1 ring-offset-gray-100 hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                                      onClick={setIsEndpointCopied}
                                    >
                                      {isEndpointCopied ? (
                                        <Icon
                                          className="hover h-3.5 w-3.5"
                                          name="Check"
                                        />
                                      ) : (
                                        <Icon
                                          className="hover h-3.5 w-3.5"
                                          name="Copy"
                                        />
                                      )}
                                    </button>
                                  </dd>
                                </div>

                                <div className="sm:col-span-1">
                                  <dt className="text-sm">Created At</dt>
                                  <dd className="mt-1 flex items-center space-x-2">
                                    <span className=" text-gray-1200">
                                      {format(
                                        new Date(node.endpoint.created_at),
                                        'dd MMM yyyy HH:mm'
                                      )}
                                    </span>
                                  </dd>
                                </div>

                                <div className="sm:col-span-1">
                                  <dt className="text-sm">Current state</dt>
                                  <dd className="mt-1 flex items-center space-x-2">
                                    <span className=" text-gray-1200">
                                      <EndpointBadge
                                        state={node.endpoint.current_state}
                                      />
                                    </span>
                                  </dd>
                                </div>

                                <div className="sm:col-span-1">
                                  <dt className="text-sm">Endpoint type</dt>
                                  <dd className="mt-1 flex items-center space-x-2">
                                    <span className=" text-gray-1200">
                                      {node.endpoint.type}
                                    </span>
                                  </dd>
                                </div>
                              </dl>
                            )}
                          </div>

                          <Divider className="py-5" />

                          <div className="">
                            <h4 className="mb-3 text-lg font-light text-gray-1200">
                              Delete branch
                            </h4>
                            <p className="mb-4 mt-1 text-sm">
                              The branch and all of its data will be permanently
                              deleted. This action is irreversible and can not
                              be undone. Note that deleting a branch will also
                              delete the endpoint. Making it inaccessible.
                            </p>

                            <DeleteBranch node={node} />
                          </div>
                        </div>
                      </div>
                    </DialogPrimitive.Content>
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </>
  );
};
