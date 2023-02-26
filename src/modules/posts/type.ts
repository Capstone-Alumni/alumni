import { AccessLevel } from '@prisma/client';
import { Information } from '../profiles/types';

export type Post = {
  id: string;
  content: string;
  publicity: AccessLevel;
  authorInformation: Information;
};
