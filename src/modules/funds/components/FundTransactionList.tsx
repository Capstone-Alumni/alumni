'use client';

import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
// import usePublicGetFundTransactionList from '../hooks/usePublicGetFundTransactionList';
// import { getPublicFundTransactionListParamsAtom } from '../states';
import MyAvatar from '@share/components/MyAvatar';
import DataTablePagination from '@share/components/DataTablePagination';
import { getFundTransactionListParamsAtom } from '../states';
import useGetFundTransactionList from '../hooks/useGetFundTransactionList';
import Link from '@share/components/NextLinkV2';
import { formatDate } from '@share/utils/formatDate';
import { formatAmountMoney } from '../utils';

const FundTransactionListTab = () => {
  const pathname = usePathname();
  const fundId = pathname?.split('/')[2] || '';

  const [params, setParams] = useRecoilState(getFundTransactionListParamsAtom);
  const { data, isLoading } = useGetFundTransactionList(fundId);
  console.log(
    '🚀 ~ file: FundTransactionList.tsx:34 ~ FundTransactionListTab ~ data:',
    data,
  );

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        py: 2,
        px: 1,
      }}
    >
      <Typography sx={{ mb: 1 }}>
        Số lượt ủng hộ: <strong>{data?.data.totalItems}</strong>
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="event participant table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Người ủng hộ</TableCell>
              <TableCell align="center">Số tiền</TableCell>
              <TableCell align="center">Thời gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.items.map(row => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  {row.incognito ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Avatar />
                      <Box>
                        <Typography color="text.secondary">
                          Người ủng hộ ẩn danh
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Link
                      href={`/profile/${row.alumni?.id}`}
                      prefetch={false}
                      style={{ color: 'inherit' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <MyAvatar
                          displayName={row?.alumni?.information?.fullName}
                          photoUrl={row?.alumni?.information?.avatarUrl}
                        />
                        <Box>
                          <Typography>
                            {row?.alumni?.information?.fullName}
                          </Typography>
                          {/* <Typography variant="body2">
                            {row?.userInformation?.alumClass?.grade?.code} /{' '}
                            {row?.userInformation?.alumClass?.name}
                          </Typography> */}
                        </Box>
                      </Box>
                    </Link>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={600}>
                    {formatAmountMoney(row.vnp_Amount)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {formatDate(new Date(row.createdAt), 'HH:mm - dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={6}
            currentPage={params.page}
            totalPage={Math.ceil(
              data?.data.totalItems / data?.data.itemPerPage,
            )}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FundTransactionListTab;
