// material
import { Container } from '@mui/material';
import HeaderBreadcrumbs from '@share/components/HeaderBreadcrumbs';
// components
import UserNewForm from '../UserNewForm';

// ----------------------------------------------------------------------

interface UserCreateProps {
  isEdit: boolean;
}
export default function UserCreate({ isEdit }: UserCreateProps) {
  return (
    <Container maxWidth={'lg'}>
      <UserNewForm isEdit={true} />
    </Container>
  );
}