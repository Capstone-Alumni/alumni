// FE
export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
