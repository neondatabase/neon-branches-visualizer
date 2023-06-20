'use server';
import { Neon } from '~/utils/neon/sdk';
import { revalidatePath } from 'next/cache';

export async function deleteBranch({ projectId, branchId, accessToken }) {
  const neon = new Neon(accessToken);
  try {
    const project = await neon.branch.delete(projectId, branchId);

    revalidatePath('/project/[projectId]');

    return project;
  } catch (error) {
    console.log(error);
  }
}
