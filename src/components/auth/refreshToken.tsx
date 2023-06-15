'use client';

import { useEffect } from 'react';

export const RefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.NEXTAUTH_URL}/api/auth/session'`);
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  return <></>;
};
