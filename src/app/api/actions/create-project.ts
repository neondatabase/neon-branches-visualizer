'use server';
import { Neon } from '~/utils/neon/sdk';
import { revalidatePath } from 'next/cache';

export async function createProject({
  name,
  pg_version,
  region_id,
  accessToken,
}) {
  const neon = new Neon(accessToken);

  try {
    const project = await neon.project.create({
      project: {
        name,
        pg_version: Number(pg_version),
        region_id,
      },
    });

    revalidatePath('/projects');

    return project;
  } catch (error) {
    console.log(error);
  }
}
