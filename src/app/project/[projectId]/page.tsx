import Link from 'next/link';
import { Stats } from './stats';
import { Tree } from './tree';
import { redirect } from 'next/navigation';
import { Neon } from '~/utils/neon/sdk';
import { Icon } from '~/components/shared/icon';
import { Container } from '~/components/shared/container';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';

async function getProject(projectId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const neon = new Neon(session.accessToken);
  try {
    const project = await neon.project.get(projectId);
    if (!project) {
      redirect('/404');
    }

    const {
      '0': branchCount,
      '1': endpointCount,
      '2': branches,
    } = await Promise.all([
      neon.branch.getAll(projectId),
      neon.endpoint.getAll(projectId),
      neon.branch.getBranchesWithEndpoints(projectId),
    ]);

    type Branch = (typeof branches)[number] & {
      children?: Branch[];
    };

    const makeTree = (nodes: Branch[]): Branch[] => {
      const nodesMap = new Map<string | undefined, Branch>(
        nodes.map((node) => [node.id, node])
      );

      const virtualRoot = {} as Partial<Branch>;
      nodes.forEach((node, i) => {
        const parent = nodesMap.get(node.parent_id) ?? virtualRoot;
        (parent.children ??= []).push(node);
      });

      return virtualRoot.children ?? [];
    };

    const tree = makeTree(branches)[0];

    return {
      project,
      tree,
      branchCount: branchCount.length,
      endpointCount: endpointCount.length,
    };
  } catch (error) {
    // @ts-ignore
    if (error.status === 404) {
      console.log(error);

      redirect('/404');
    }
    if (error.status === 401) {
      console.log(error);
      redirect('/');
    }
    console.log(error);
  }
}
// @ts-ignore

export default async function Project({ params }) {
  const data = await getProject(params.projectId);

  return (
    <Container className="py-16">
      <div className="mb-5 flex items-center space-x-1">
        <Link
          href="/projects"
          className="rounded-md ring-offset-gray-100 hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          Projects
        </Link>
        <Icon className="h-3.5 w-3.5" name="ChevronRight" />
        <span>{data?.project.name}</span>
      </div>
      <h1 className="mb-5 flex-grow text-3xl font-medium text-gray-1200">
        Project overview
      </h1>
      <Stats data={data} />
      <h2 className="mb-3  text-xl font-medium text-gray-1200">
        Branches overview
      </h2>
      <Tree data={data?.tree} />
    </Container>
  );
}
