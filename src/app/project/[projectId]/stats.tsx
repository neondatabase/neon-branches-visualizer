'use client';
import useClipboard from 'react-use-clipboard';
import { Icon } from '~/components/shared/icon';
import { regions } from '~/utils/neon/regions';
import { components } from '~/utils/neon/types';

type ProjectResponse = components['schemas']['ProjectResponse'];

type Props = {
  data?: {
    project: ProjectResponse['project'];
    branchCount: number;
    endpointCount: number;
  };
};

export const Stats = ({ data }: Props) => {
  // @ts-ignore
  const [isCopied, setIsCopied] = useClipboard(data.project.id, {
    successDuration: 2000,
  });

  return (
    <div className="mb-5 flex flex-col justify-between gap-5 rounded-md bg-gray-200 p-5 shadow-sm md:flex-row">
      <div>
        <p className="mb-0.5 text-sm">Project ID</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-1200">
            {
              // @ts-ignore
              data.project.id
            }
          </p>
          <button
            className="rounded-md p-1 ring-offset-gray-100 hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            onClick={setIsCopied}
          >
            {isCopied ? (
              <Icon className="hover h-3.5 w-3.5" name="Check" />
            ) : (
              <Icon className="hover h-3.5 w-3.5" name="Copy" />
            )}
          </button>
        </div>
      </div>

      <div>
        <p className="mb-0.5 text-sm">Project Region</p>
        <p className="text-gray-1200">
          {
            // @ts-ignore
            regions[data.project.region_id]
          }
        </p>
      </div>

      <div>
        <p className="mb-0.5 text-sm">Branches</p>
        <p className="text-gray-1200 md:text-center">
          {
            // @ts-ignore
            data.branchCount
          }
        </p>
      </div>

      <div>
        <p className="mb-0.5 text-sm">Endpoints</p>
        <p className="text-gray-1200 md:text-center">
          {
            // @ts-ignore
            data.endpointCount
          }
        </p>
      </div>
    </div>
  );
};
