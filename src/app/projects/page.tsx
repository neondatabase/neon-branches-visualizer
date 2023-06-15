import { Card } from './project-card';
import { redirect } from 'next/navigation';
import { Neon } from '~/utils/neon/sdk';
import { Container } from '~/components/shared/container';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

// import { CreateProject } from '../../components/create-project';

async function getProjects() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  try {
    const neon = new Neon(session.accessToken);

    const projects = await neon.project.getAll();

    return projects;
  } catch (error) {
    console.log(error);
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <Container>
      <div className="h-auto py-16">
        {projects && (
          <>
            <h1 className="mb-5 text-3xl font-medium text-gray-1200">
              Projects
            </h1>
            {projects.length === 0 ? (
              // <CreateProject />
              "You don't have projects"
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                  <Card key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
