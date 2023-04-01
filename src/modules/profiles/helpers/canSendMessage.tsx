import { currentUserInformationDataAtom } from '@share/states';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';

export const useCanEditProfile = () => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  const canEditProfile = currentUserInformation?.userId === userProfileId;

  return {
    canEditProfile,
    userProfileId,
  };
};

export const useCanSendMessage = (pings: any) => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  let canSendMessage = false;

  if (currentUserInformation?.userId) {
    canSendMessage = currentUserInformation?.userId !== userProfileId;
    if (currentUserInformation?.ping) {
      const array = currentUserInformation?.ping.filter((ping) => {
        return ping.pingAlumniInfoId === userProfileId;
      });
      canSendMessage = array.length === 0 && true;
    }
  }

  return {
    canSendMessage,
    userProfileId,
  };
};
