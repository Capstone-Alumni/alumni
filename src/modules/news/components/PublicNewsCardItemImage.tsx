import { Card } from '@mui/material';

const PublicNewsCardItemImage = ({
  srcImg,
  sx,
}: {
  srcImg: string;
  sx: any;
}) => {
  return (
    <Card
      sx={{
        height: sx.height,
        backgroundImage: `url(${srcImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export default PublicNewsCardItemImage;
