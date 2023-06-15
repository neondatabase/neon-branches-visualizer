'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../shared/button';

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn('neon')} type="submit" size="xlarge">
      Continue with Neon
    </Button>
  );
};
