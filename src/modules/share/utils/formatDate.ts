import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';

export const formatDate = (date: Date) => {
  return format(date, 'dd MMMM, yyyy', {
    locale: vi,
  });
};
