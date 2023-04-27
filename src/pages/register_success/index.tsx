import Body from '@share/components/layout/Body';
import RegisterSuccess from 'src/modules/landingPage/components/RegisterSuccess';

export default function Page() {
  return (
    <Body sx={{ pt: 10, pb: 4 }}>
      <RegisterSuccess />
    </Body>
  );
}
