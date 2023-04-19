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

export const useCanSendMessage = () => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  let canSendMessage = false;

  if (currentUserInformation?.id) {
    canSendMessage = currentUserInformation?.id !== userProfileId;
    if (currentUserInformation?.pingSent) {
      const array = currentUserInformation?.pingSent.filter(pingSent => {
        return pingSent.pingAlumniId === userProfileId;
      });
      canSendMessage = array.length === 0 && true;
    }
  }

  return {
    canSendMessage,
    userProfileId,
  };
};
