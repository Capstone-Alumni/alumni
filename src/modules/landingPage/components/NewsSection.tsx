'use client';

import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useGetNewsForPublicQuery } from 'src/redux/slices/newsSlice';
import SectionTemplate from './SectionTemplate';
import NewsCard from './NewsCard';

const StyledFooterSectionBox = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '3rem',
  width: '100%',
  alignItems: 'center',
}));

const StyledLine = styled('div')(({ theme }) => ({
  height: '2px',
  width: '100%',
  backgroundColor: 'rgb(230, 235, 245)',
}));

const NewsSection = () => {
  const theme = useTheme();

  const { data: newsListData, isLoading } = useGetNewsForPublicQuery({
    params: {
      page: 1,
      limit: 3,
      title: '',
      content: '',
    },
  });

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(0),
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing(2),
            margin: 'auto',
          }}
        >
          <SectionTemplate
            headerContent={
              <Typography variant="h3" color="primary" textAlign="center">
                Tin tức mới nhất
              </Typography>
            }
            footer={false}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: theme.spacing(6),
              }}
            >
              {isLoading ? <LoadingIndicator /> : null}
              {newsListData?.data.items.map((item: any) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  sx={{
                    width: '45%',
                    height: '300px',
                    imgWidth: 500,
                    imgHeight: 300,
                    typoVariant: 'h5',
                    marginImg: 2,
                  }}
                />
              ))}
            </Box>
          </SectionTemplate>
          <StyledFooterSectionBox>
            <StyledLine></StyledLine>
            <Link
              href="/news"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
              prefetch={false}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '1.5rem',
                  padding: '0 2rem',
                  height: '40px',
                  width: '150px',
                }}
              >
                Xem thêm
              </Button>
            </Link>
            <StyledLine></StyledLine>
          </StyledFooterSectionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsSection;
