'use client';
import { Box, Card, Link, Typography } from '@mui/material';
import data from '../__mockData__/getNewsListForSchoolAdmin';

const EveryOneReadPage = () => {
  const newsList = data.data;
  return (
    <>
      <Box>
        <Typography variant="h3">Mọi người cũng đọc</Typography>
        {newsList.items.map((row: any, index: number) => (
          <Card
            sx={{
              display: 'flex',
              marginTop: 3,
            }}
            key={row.id}
          >
            <Typography
              sx={{
                color: '#bfbfbf',
                fontFamily: 'Merriweather',
                fontSize: '56px',
                fontWeight: 600,
                marginRight: '32px',
                width: '40px',
                marginLeft: 0.5,
              }}
            >
              {index + 1}
            </Typography>
            <Box
              sx={{
                height: 150,
                padding: 2,
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 100,
                  backgroundColor: 'red',
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontSize: '20px',
                  fontWeight: 600,
                  paddingLeft: 3,
                  cursor: 'pointer',
                }}
              >
                <Link
                  href={`/news/${row.id}`}
                  sx={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  {row.title}
                </Link>
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default EveryOneReadPage;
