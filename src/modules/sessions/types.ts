// FE
export type SignUpFormValues = {
  username: string;
  email: string;
  fullName: string;
  gradeClass: Array<{
    grade: { id: string; value: string; label: string };
    alumClass: { id: string; value: string; label: string };
  }>;

  phone?: string;
  dateOfBirth?: Date;
};

export type LinkUpFormValues = {
  email: string;
};

export type VerifyFormValues = {
  fullname: string;
  year: string;
  class: string;
};

export type SignUpFormPayload = {
  username: string;
  email: string;
};

// BE
export type SignUpRequestBody = SignUpFormValues;

export type SignInRequestBody = {
  usernameOrEmail: string;
  password: string;
};

export type UpdatePasswordRequestBody = {
  subdomain: string;
  userId: string;
  password: string;
  newPassword: string;
};
