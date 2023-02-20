// material

import EditUserInformation from './UserInfo';
import EditUserCareers from './UserCareers';
import EditUserEducation from './UserEducation';

// ----------------------------------------------------------------------

interface UserEditWrapperProps {
  userProfileId?: string;
  userInformation?: any;
  userCareers?: any;
  userEducations?: any;
}
export default function UserEditWrapper({
  userProfileId,
  userInformation,
  userCareers,
  userEducations,
}: UserEditWrapperProps) {
  return (
    <>
      {!userInformation.error && !userInformation.isLoading && (
        <EditUserInformation
          userInformation={userInformation.data.data}
          userProfileId={userProfileId}
        />
      )}
      <br />
      {!userCareers.error && !userCareers.isLoading && (
        <EditUserCareers
          editable={true}
          userInformationData={userInformation.data.data}
          userCareers={userCareers.data.data.items}
          userProfileId={userProfileId}
        />
      )}
      <br />
      {!userEducations.error && !userEducations.isLoading && (
        <EditUserEducation
          editable={true}
          userInformationData={userInformation.data.data}
          userEducations={userEducations.data.data.items}
          userProfileId={userProfileId}
        />
      )}
    </>
  );
}
