import { authClient } from '@/lib/auth-client';

export const useCurrentUser = () => {
  const { data: session, error } = authClient.useSession();
  // console.log('useCurrentUser, session:', session);
  if (error) {
    // Log error as warning to avoid blocking Next.js error overlay in development
    // for potentially non-critical session fetch errors (e.g. network offline)
    console.warn('useCurrentUser error:', error);
    return null;
  }
  return session?.user;
};
