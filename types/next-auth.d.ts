import { AccessLevel, User } from '@prisma/client';
import 'next-auth';
import { User as NextUser } from 'next-auth';
import 'next-auth/jwt';

type Tenant = {
  name: string;
  logo?: string;
  description?: string;
  subdomain: string;
  tenantId: string;
};

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id?: string;
    accessToken?: string;
    user: User;
    tenant?: Tenant;
  }

  interface User extends NextUser {
    id: string;
    email: string;
    tenant: Tenant;
    accessLevel: AccessLevel;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    accessToken?: string;
    user: User;
    currentTenant?: Tenant;
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: User | any;
  }
}
