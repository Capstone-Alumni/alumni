import 'next-auth';
import { User as NextUser } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id?: string;
    accessToken?: string;
    user: User;
    currentTenant?: {
      tenantId: string;
      subdomain: string;
    };
  }

  interface User extends NextUser {
    id: string;
    email: string;
    tenant: {
      tenantId: string;
      subdomain: string;
    };
    accessLevel: string;
    accessStatus: string;
    accessMode: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    accessToken?: string;
    user: User;
    currentTenant?: {
      tenantId: string;
      subdomain: string;
    };
  }
}
