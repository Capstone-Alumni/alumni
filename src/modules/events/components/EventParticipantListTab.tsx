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
import usePublicGetEventParticipantList from '../hooks/usePublicGetEventParticipantList';
import { getPublicEventParticipantListParamsAtom } from '../states';
import MyAvatar from '@share/components/MyAvatar';
import DataTablePagination from '@share/components/DataTablePagination';

const EventParticipantListTab = () => {
  const pathname = usePathname();
  const eventId = pathname?.split('/')[2] || '';

  const [params, setParams] = useRecoilState(
    getPublicEventParticipantListParamsAtom,
  );
  const { data, isLoading } = usePublicGetEventParticipantList(eventId);

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
              <TableCell align="left">Tên</TableCell>
              <TableCell align="center">Niên khoá</TableCell>
              <TableCell align="center">Lớp</TableCell>
              <TableCell align="left">Ngày đăng ký</TableCell>
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
                    <Typography>
                      {row.participantInformation.fullName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {row.participantInformation.alumClass?.grade?.code}
                </TableCell>
                <TableCell align="center">
                  {row.participantInformation.alumClass?.name}
                </TableCell>
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

export default EventParticipantListTab;
