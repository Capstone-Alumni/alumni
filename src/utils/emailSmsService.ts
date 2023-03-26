import axiosInstance from './axios';

export type EmailEntity = {
  to: string;
  subject: string;
  text: string;
};

export type SmsEntity = {
  to: string;
  body: string;
};

axiosInstance.defaults.baseURL = 'https://mail-sms-services.vercel.app';

export const sendMailService = async ({ to, subject, text }: EmailEntity) => {
  await axiosInstance
    .post('mail/send-email', {
      to,
      subject,
      text,
    })
    .then(res => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch(error => {
      return {
        status: 400,
        data: error,
      };
    });
};

export const sendSmsService = async ({ to, body }: SmsEntity) => {
  await axiosInstance
    .post('mail/send-sms', {
      to,
      body,
    })
    .then(res => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch(error => {
      return {
        status: 400,
        data: error,
      };
    });
};
