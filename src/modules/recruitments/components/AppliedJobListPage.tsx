'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
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
  const { data, reload, isLoading } = useUserGetAppliedJobList();

  const onDeleteJob = async (id: string) => {
    // await deleteJob({ jobId: id });
    // reload();
  };

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  return (
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
  );
};

export default AppliedJobListPage;
