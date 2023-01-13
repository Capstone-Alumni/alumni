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
};

export type GetCareerListServiceParams = {
  page: number;
  limit: number;
};

export type UpdateCareerInfoByIdServiceProps = {
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};
