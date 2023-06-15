import Link from 'next/link';
import { components } from '~/utils/neon/types';
import { regions } from '~/utils/neon/regions';

type ProjectResponse = components['schemas']['ProjectResponse'];

export const Card = ({ project }: ProjectResponse) => {
  return (
    <Link
      className="group rounded-md bg-gray-200 p-5  shadow ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700  focus-visible:ring-offset-2"
      href={`/project/${project.id}`}
    >
      <div>
        <h2 className="mb-0.5 text-lg text-gray-1200 group-hover:text-green-900">
          {project.name}
        </h2>
        <p className="mb-3 text-xs">{project.id}</p>
        <div className="flex items-center space-x-1 text-sm">
          <p className="flex-grow">
            {
              // @ts-ignore
              regions[project.region_id]
            }
          </p>

          <p className="flex items-center space-x-1">
            {/* <Icon className="h-4 w-4" name="Database" /> */}
            <span>v{project.pg_version}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
