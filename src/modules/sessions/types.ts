// FE
export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  password: string;
};

// BE
export type SignUpRequestBody = {
  username: string;
  email: string;
  password: string;
};

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
