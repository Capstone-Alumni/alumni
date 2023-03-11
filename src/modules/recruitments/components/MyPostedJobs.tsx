'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import useOwnerDeleteJobById from '../hooks/useOwnerDeleteJobById';
import useOwnerGetJobList from '../hooks/useOwnerGetJobList';
import { getOwnerJobListParamsAtom } from '../states';
import CompanyItem from './CompanyItem';

const HostingEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerJobListParamsAtom);
  const { data, reload, isLoading } = useOwnerGetJobList();
  const { fetchApi: deleteJob, isLoading: isDeleting } =
    useOwnerDeleteJobById();

  const onDeleteJob = async (id: string) => {
    await deleteJob({ jobId: id });
    reload();
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
            companyDetails={item}
            actions={[
              <Link
                key="edit-btn"
                href={`/recruitments/job_details/${item.id}`}
                style={{ width: '100%' }}
              >
                <Button fullWidth variant="outlined">
                  Xem
                </Button>
              </Link>,
              <Link
                key="edit-btn"
                href={`/recruitments/posted_jobs/${item.id}`}
                style={{ width: '100%' }}
                prefetch={false}
              >
                <Button fullWidth variant="outlined">
                  Sửa
                </Button>
              </Link>,
              <IconButton
                key="delete-btn"
                color="error"
                disabled={isDeleting}
                onClick={() => onDeleteJob(item.id)}
              >
                <DeleteOutlineIcon />
              </IconButton>,
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

export default HostingEventListPage;
