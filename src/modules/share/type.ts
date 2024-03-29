// ----------------------------------------------------------------------

import { FormikProps } from 'formik';

export type UserInvoice = {
  id: string;
  createdAt: Date;
  price: number;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserInformation = {
  fullName: string;
  id: string;
  userId: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  name: string;
  userEmail: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  gradeName: string | null;
  gradeCode: string | null;
  className: string | null;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type Education = {
  id: string;
  degree?: string;
  school?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  userId?: string;
  archived?: boolean;
};

export type UserEducations = {
  totalItems: number;
  items: Education[];
  itemPerPage: number;
};

export type Career = {
  id: string;
  jobTitle?: string;
  company?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  userId?: string;
  archived?: boolean;
};

export type UserCareers = {
  totalItems: number;
  items: Career[];
  itemPerPage: number;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type NotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export type Friend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type UserPost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date;
    message: string;
  }[];
};

export type AccountBillingFormikProps = FormikProps<{
  cardName: string;
  cardNumber: string;
  cardExpired: string;
  cardCvv: string;
}>;
