export type Job = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description: string;
  companyName: string;
  position: string;
  job: string;
  website: string;
  address: string;
  startTime?: string | Date;
  expiredAt?: string | Date;
  isApproved: boolean;
  recruitmentOwnerId: string;
  recruitmentOwnerInfoId: string;
  salary: string;
  type: string;
};

export type EventParticipant = {
  id: string;
  userId: string;
  eventId: string;
  participantInformation: any;
};

export type EventInterest = {
  id: string;
  userId: string;
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
