import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Hero } from '~/components/landing/hero';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/projects');
  }

  return <Hero />;
}
