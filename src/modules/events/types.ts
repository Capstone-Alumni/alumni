import { AccessLevel } from '@prisma/client';

export type Event = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description?: string;
  isOffline: boolean;
  location?: string;
  registrationTime: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  isEnded: boolean;
  isApproved: boolean;
  publicity: AccessLevel;
  publicParticipant: boolean;
  userId: string;
};

export type GetAdminEventListParams = {
  page: number;
  limit: number;
  archived: boolean;
  approved: boolean;
};

export type GetOwnerEventListParams = {
  page: number;
  limit: number;
};

export type GetPublicEventListParams = {
  page: number;
  limit: number;
};
