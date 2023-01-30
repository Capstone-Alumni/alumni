// material
import { Container } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGetUserInformationQuery, useGetUserCareersQuery, useGetUserEducationQuery } from 'src/redux/slices/userProfileSlice';

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
  const { data: education, error: errorEducation, isLoading: isLoadingEducation } = useGetUserEducationQuery(userProfileId);

  return (
    <Container maxWidth={'lg'}>
      {/* <UserNewForm isEdit={true} /> */}
      {!errorInformation && !isLoadingInformation && <EditUserInformation currentUser={information.data.information} />}
      <br/>
      {!errorCareers && !isLoadingCareers && <EditUserCareers userCareers={careers.data} />}
      <br/>
      {!errorEducation && !isLoadingEducation && <EditUserEducation currentUser={information} />}
    </Container>
  );
}
