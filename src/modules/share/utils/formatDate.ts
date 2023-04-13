import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';

export const formatDate = (date: Date, formatTime = 'dd MMMM, yyyy') => {
  return format(date, formatTime, {
    locale: vi,
  });
};

export const formatDateEvent = (date: Date, formatTime = 'EEEE, dd MMMM') => {
  return format(date, formatTime, {
    locale: vi,
  });
};
