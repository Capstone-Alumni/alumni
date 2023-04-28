// import {
//   useGetUserCareersQuery,
//   useGetUserEducationsQuery,
//   useGetUserInformationQuery,
// } from 'src/redux/slices/userProfileSlice';
import {
  useGetUserInformationQuery,
  useUpdateUserInformationMutation,
} from '@redux/slices/userProfileSlice';
import { useState } from 'react';
import { useCanEditProfile } from '../../helpers/canEditProfile';
import ProfileInformationEditSection from './ProfileInformationEditSection';
import ProfileInformationViewSection from './ProfileInformationViewSection';

const ProfileInformationTab = () => {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const { canEditProfile, userProfileId } = useCanEditProfile();
  const userInformationResponse = useGetUserInformationQuery(userProfileId);
  const [updateUserInformation] = useUpdateUserInformationMutation();

  // const userInformationResponse = useGetUserInformationQuery(userProfileId);
  // const userCareersResponse = useGetUserCareersQuery(userProfileId);
  // const userEducationsResponse = useGetUserEducationsQuery(userProfileId);

  return (
    <>
      {mode === 'view' ? (
        <ProfileInformationViewSection
          userInformation={userInformationResponse}
          openEdit={canEditProfile ? () => setMode('edit') : null}
        />
      ) : (
        <ProfileInformationEditSection
          userInformation={userInformationResponse?.data?.data?.information}
          userProfileId={userProfileId}
          onSave={async values => {
            await updateUserInformation(values);
            setMode('view');
          }}
          onCancel={() => setMode('view')}
        />
      )}
    </>
  );
};

export default ProfileInformationTab;
