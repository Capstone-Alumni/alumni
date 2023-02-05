import { Card } from '@mui/material';
import Image from 'next/image';
import parse from 'html-react-parser';

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
      }}
    >
      {!srcImg.startsWith('/logo') ? (
        <>{parse(srcImg)}</>
      ) : (
        <Image
          src={srcImg}
          alt="logo"
          width={sx.imgWidth}
          height={sx.imgHeight}
        />
      )}
    </Card>
  );
};

export default PublicNewsCardItemImage;
