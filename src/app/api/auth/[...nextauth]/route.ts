import NextAuth, { TokenSet, type NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  callbacks: {
    // @ts-ignore
    async jwt({ token, account }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          accessToken: account.access_token,
          // @ts-ignore
          expires_at: Date.now() + account.expires_at * 1000,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch(
            'https://oauth2.neon.tech/oauth2/token',
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                client_id: process.env.NEON_CLIENT_ID,
                client_secret: process.env.NEON_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
              }),
              method: 'POST',
            }
          );

          const tokens: TokenSet = await response.json();
          console.log(tokens);
          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            // @ts-ignore

            expires_at: Date.now() + tokens.expires_at * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      // @ts-ignore
      session.error = token.error;
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
  providers: [
    {
      id: 'neon',
      name: 'Neon',
      type: 'oauth',
      wellKnown: 'https://oauth2.neon.tech/.well-known/openid-configuration',
      authorization: {
        url: 'https://console.neon.tech/oauth_consent',
        params: {
          grant_type: ['authorization_code'],
          scope:
            'openid offline offline_access urn:neoncloud:projects:create urn:neoncloud:projects:read urn:neoncloud:projects:update urn:neoncloud:projects:delete',
        },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
      clientId: process.env.NEON_CLIENT_ID,
      clientSecret: process.env.NEON_CLIENT_SECRET,
    },
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
