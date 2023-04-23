'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import useOwnerDeleteFundById from '../hooks/useOwnerDeleteFundById';
import useOwnerGetFundList from '../hooks/useOwnerGetFundList';
import { getOwnerFundListParamsAtom } from '../states';
import FundCardItem from './FundCardItem';

const HostingFundListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerFundListParamsAtom);
  const { data, reload, isLoading } = useOwnerGetFundList();
  const { fetchApi: deleteFund, isLoading: isDeleting } =
    useOwnerDeleteFundById();

  const onDeleteFund = async (id: string) => {
    await deleteFund({ fundId: id });
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
          <FundCardItem
            key={item.id}
            data={item}
            actions={[
              <Link
                key="edit-btn"
                href={`/funds/hosting/${item.id}`}
                style={{ width: '100%' }}
              >
                <Button fullWidth variant="outlined">
                  Chỉnh sửa
                </Button>
              </Link>,
              <IconButton
                key="delete-btn"
                color="error"
                disabled={isDeleting}
                onClick={() => onDeleteFund(item.id)}
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

export default HostingFundListPage;
