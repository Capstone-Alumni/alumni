'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import useUserGetAppliedJobList from '../hooks/useUserGetAppliedJobList';
import { getUserGetAppliedJobListParamsAtom } from '../states';
import CompanyItem from './CompanyItem';
import PdfResumePreview from './PdfResumePreview';

const AppliedJobListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(
    getUserGetAppliedJobListParamsAtom,
  );
  const { data, isLoading } = useUserGetAppliedJobList();

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {data.data && data.data.items.length > 0 ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              mb: 2,
            }}
          >
            {data?.data.items.map(item => (
              <CompanyItem
                key={item.id}
                companyDetails={item.recruitment}
                actions={[
                  <Link
                    key="edit-btn"
                    href={`/recruitments/job_details/${item.recruitment.id}`}
                    style={{ width: '100%' }}
                  >
                    <Button fullWidth variant="outlined">
                      Xem
                    </Button>
                  </Link>,
                  <PdfResumePreview
                    resumeUrl={item.resumeUrl}
                    key="preview-user-pdf"
                  >
                    <IconButton key="delete-btn" color="default">
                      <VisibilityIcon />
                    </IconButton>
                  </PdfResumePreview>,
                ]}
              />
            ))}
          </Grid>
          <Pagination
            sx={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
            color="primary"
            count={Math.ceil(data?.data.totalItems / data?.data.itemPerPage)}
            page={params.page}
            onChange={(_, nextPage) => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        </>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ margin: 'auto', mt: 2 }}>
            Chưa có việc làm nào
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default AppliedJobListPage;
