// material
import { Container } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGetUserInformationQuery, useGetUserCareersQuery, useGetUserEducationsQuery } from 'src/redux/slices/userProfileSlice';

import EditUserInformation from './EditUserInformation';
import EditUserCareers from './EditUserCareers';
import EditUserEducation from './EditUserEducation';

// ----------------------------------------------------------------------

interface UserCreateProps {
  isEdit: boolean;
}
export default function UserCreate({ isEdit }: UserCreateProps) {

  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf("/") + 1);

  const { data: information, error: errorInformation, isLoading: isLoadingInformation } = useGetUserInformationQuery(userProfileId);
  const { data: careers, error: errorCareers, isLoading: isLoadingCareers } = useGetUserCareersQuery(userProfileId);
  const { data: education, error: errorEducation, isLoading: isLoadingEducation } = useGetUserEducationsQuery(userProfileId);

  return (
    <Container maxWidth={'lg'}>
      {!errorInformation && !isLoadingInformation && <EditUserInformation currentUser={information.data.information} />}
      <br/>
      {!errorCareers && !isLoadingCareers && <EditUserCareers editable={true} userCareers={careers.data.items} userProfileId={userProfileId}/>}
      <br/>
      {!errorEducation && !isLoadingEducation && <EditUserEducation editable={true} userEducations={education.data.items} userProfileId={userProfileId}/>}
    </Container>
  );
}
