import { UserInformation } from '@share/states';
import { Grade } from '../gradeAndClass/types';

export type Event = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description?: string;
  backgroundImage?: string;
  isOffline: boolean;
  location?: string;
  startTime: string | Date;
  endTime: string | Date;
  gradeId: string;
  grade?: Grade;
  isPublicSchool: boolean;
  publicParticipant: boolean;
  userId: string;
  host?: {
    id: string;
    information: UserInformation;
  };
  eventParticipants: EventParticipant[];
  eventInterests: EventInterest[];
};

export type EventParticipant = {
  id: string;
  userId: string;
  eventId: string;
  participant: {
    id: string;
    information: UserInformation;
  };
  createdAt: Date | string;
};

export type EventInterest = {
  id: string;
  interesterId: string;
  eventId: string;
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
