//Account
export type UpdateAccountInfoServiceProps = {
  username?: string;
  classId: string;
};

//carrers
export type CreateCareerServiceProps = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  userId: string;
};

export type GetCareerListServiceParams = {
  page: number;
  limit: number;
  name: string;
};

export type GetCareerListServiceProps = {
  userId: string;
  params: GetCareerListServiceParams;
};

export type UpdateCareerInfoByIdServiceProps = {
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};
