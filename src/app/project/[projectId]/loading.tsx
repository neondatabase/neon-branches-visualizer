import Link from 'next/link';
import React from 'react';
import { Container } from '../../../components/shared/container';
import { Icon } from '../../../components/shared/icon';

export default function ProjectSkeleton() {
  return (
    <Container className="py-16">
      <div className="mb-5 flex items-center space-x-1">
        <Link
          href="/projects"
          className="dark:focus-visible:ring-green-dark-700 dark:hover:text-gray-dark-1200 rounded-md ring-offset-gray-100 hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          Projects
        </Link>
        <Icon className="h-3.5 w-3.5" name="ChevronRight" />
        <span>
          <p className="h-3 w-32 flex-grow animate-pulse rounded-md bg-gray-700"></p>
        </span>
      </div>

      <h1 className=" mb-5 flex-grow text-3xl font-medium text-gray-1200">
        Project overview
      </h1>

      <StatsPlaceholder />

      <h2 className=" mb-3  text-xl font-medium text-gray-1200">
        Branches overview
      </h2>
      <TreePlaceholder />
    </Container>
  );
}

const TreePlaceholder = () => {
  return (
    <div className="h-[80vh] w-full animate-pulse rounded-md bg-gray-700" />
  );
};

const StatsPlaceholder = () => {
  return (
    <div className="mb-5 flex flex-col justify-between gap-5 rounded-md bg-gray-200 p-5 shadow-sm md:flex-row">
      <div>
        <p className="mb-1 text-sm">Project ID</p>
        <div className="flex items-center space-x-2">
          <p className="h-4 w-44 flex-grow animate-pulse rounded-md bg-gray-700"></p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm">Project Region</p>
        <p className="text-gray-1200">
          <p className="h-4 w-20 flex-grow animate-pulse rounded-md bg-gray-700"></p>
        </p>
      </div>

      <div>
        <p className="mb-1 text-sm">Branches</p>
        <p className="text-gray-1200 md:text-center">
          <p className="h-4 w-20 flex-grow animate-pulse rounded-md bg-gray-700"></p>
        </p>
      </div>

      <div>
        <p className="mb-1 text-sm">Endpoints</p>
        <p className="text-gray-1200 md:text-center">
          <p className="h-4 w-20 flex-grow animate-pulse rounded-md bg-gray-700"></p>
        </p>
      </div>
    </div>
  );
};
