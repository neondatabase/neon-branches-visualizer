'use server';
import { Neon } from '~/utils/neon/sdk';
import { revalidatePath } from 'next/cache';

export async function createEndpoint({ projectId, accessToken, branchId }) {
  const neon = new Neon(accessToken);

  try {
    const endpoint = await neon.endpoint.create(projectId, branchId);
    revalidatePath('/project/[projectId]');
    return endpoint;
  } catch (error) {
    console.log(error);
  }
}
