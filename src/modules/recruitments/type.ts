//BE
export type CreateRecruitmentProps = {
  companyName: string;
  website: string;
  job: string;
  address: string;
  position: string;
  title: string;
  description: string;
  type: string; // parttime, full time, etc ..
  salary: string;
  startAt: string | null;
  expiredAt: string | null;
};

export type UpdateRecruitmentProps = {
  companyName?: string;
  website?: string;
  job?: string;
  address?: string;
  position?: string;
  title?: string;
  description?: string;
  type?: string; // parttime, full time, etc ..
  salary?: string;
  startAt?: string;
  expiredAt?: string;
};

export type GetListRecruitmentParams = {
  page: number;
  limit: number;
  companyName?: string;
  job?: string;
  position?: string;
  type?: string;
  salary?: string;
};
