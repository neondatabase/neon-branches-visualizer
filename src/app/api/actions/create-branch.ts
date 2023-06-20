'use server';
import { Neon } from '~/utils/neon/sdk';
import { revalidatePath } from 'next/cache';

export async function createBranch({
  projectId,
  name,
  accessToken,
  parent_id,
}) {
  const neon = new Neon(accessToken);

  try {
    const project = await neon.branch.create(projectId, {
      branch: {
        name,
        parent_id,
      },
    });

    revalidatePath('/project/[projectId]');

    return project;
  } catch (error) {
    console.log(error);
  }
}
