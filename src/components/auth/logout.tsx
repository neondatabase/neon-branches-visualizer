'use client';
import { signOut, useSession } from 'next-auth/react';

export const Logout = () => {
  const { data: session } = useSession();

  return (
    session && (
      <button
        className="rounded-md p-2 text-sm hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
        onClick={() => signOut()}
      >
        Logout
      </button>
    )
  );
};
