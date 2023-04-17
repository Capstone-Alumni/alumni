import { currentUserInformationDataAtom } from '@share/states';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';

export const useCanEditProfile = () => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  const canEditProfile = currentUserInformation?.id === userProfileId;

  return {
    canEditProfile,
    userProfileId,
  };
};
