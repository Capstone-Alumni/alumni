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
  approvedStatus: -1 | 0 | 1;
  publicity: AccessLevel;
  publicParticipant: boolean;
  userId: string;
  hostInformation?: {
    id: string;
    userId: string;
    email: string;
    fullName: string;
  };
  eventParticipants: EventParticipant[];
};

export type EventParticipant = {
  id: string;
  userId: string;
  eventId: string;
  participantInformation: any;
};

export type GetAdminEventListParams = {
  page: number;
  limit: number;
  approved: number | undefined;
};

export type GetOwnerEventListParams = {
  page: number;
  limit: number;
};

export type GetOwnerGoingEventListParams = {
  page: number;
  limit: number;
};

export type GetOwnerInterestEventListParams = {
  page: number;
  limit: number;
};

export type GetPublicEventListParams = {
  page: number;
  limit: number;
};

export type GetPublicEventParticipantListParams = {
  page: number;
  limit: number;
};
