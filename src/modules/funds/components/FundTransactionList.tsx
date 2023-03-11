'use client';

import {
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

const FundTransactionListTab = () => {
  const pathname = usePathname();
  const fundId = pathname?.split('/')[2] || '';

  const [params, setParams] = useRecoilState(getFundTransactionListParamsAtom);
  const { data, isLoading } = useGetFundTransactionList(fundId);

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
      <TableContainer component={Paper}>
        <Table aria-label="event participant table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Người ủng hộ</TableCell>
              <TableCell align="center">Niên khoá</TableCell>
              <TableCell align="center">Lớp</TableCell>
              <TableCell align="center">Số tiền</TableCell>
              <TableCell align="left">Thời gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.items.map(row => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <MyAvatar />
                    <Typography>{row?.userInformation?.fullName}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row?.userInformation?.alumClass?.grade?.code}
                </TableCell>
                <TableCell align="center">
                  {row?.userInformation?.alumClass?.name}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell>{new Date(row.createdAt).toDateString()}</TableCell>
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
