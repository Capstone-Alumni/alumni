import { useAppSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { usePathname } from 'next/navigation';

export const useCanEditProfile = () => {
  const currentUser = useAppSelector((state: RootState) => state.currentUser);
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  const canEditProfile = currentUser?.data?.userId === userProfileId;

  return {
    canEditProfile,
    userProfileId,
  };
};
