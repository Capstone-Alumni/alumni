'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LoadingIndicator from '@share/components/LoadingIndicator';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import useOwnerDeleteJobById from '../hooks/useOwnerDeleteJobById';
import useOwnerGetJobList from '../hooks/useOwnerGetJobList';
import { getOwnerJobListParamsAtom } from '../states';
import CompanyItem from './CompanyItem';
import { useState } from 'react';
import AdminJobPreview from './AdminJobPreview';

const HostingEventListPage = () => {
  const [params, setParams] = useRecoilState(getOwnerJobListParamsAtom);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [jobId, setJobId] = useState('');
  const { data, reload, isLoading } = useOwnerGetJobList();
  const { fetchApi: deleteJob, isLoading: isDeleting } =
    useOwnerDeleteJobById();

  const onDeleteJob = async () => {
    await deleteJob({ jobId: jobId as string });
    reload();
  };

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
              <>
                <CompanyItem
                  isPostedJobs
                  key={item.id}
                  companyDetails={item}
                  actions={[
                    item.isApproved ? (
                      <Link
                        key="edit-btn"
                        href={`/recruitments/job_details/${item.id}`}
                        style={{ width: '100%' }}
                      >
                        <Button fullWidth variant="outlined">
                          Xem
                        </Button>
                      </Link>
                    ) : (
                      <AdminJobPreview data={item}>
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{ marginRight: '2rem' }}
                        >
                          Xem tóm tắt
                        </Button>
                      </AdminJobPreview>
                    ),
                    <Link
                      key="edit-btn"
                      href={`/recruitments/posted_jobs/${item.id}`}
                      prefetch={false}
                    >
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>,
                    <IconButton
                      key="delete-btn"
                      color="error"
                      disabled={isDeleting}
                      onClick={() => {
                        setJobId(item.id);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>,
                  ]}
                />
              </>
            ))}
          </Grid>
          <ConfirmDeleteModal
            open={openDeleteModal}
            title="Bạn muốn xoá công việc này?"
            onClose={() => setOpenDeleteModal(false)}
            onDelete={() => onDeleteJob()}
          />
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

export default HostingEventListPage;
