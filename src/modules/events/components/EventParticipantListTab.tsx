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
import { useRecoilState } from 'recoil';
import usePublicGetEventParticipantList from '../hooks/usePublicGetEventParticipantList';
import { getPublicEventParticipantListParamsAtom } from '../states';
import MyAvatar from '@share/components/MyAvatar';
import DataTablePagination from '@share/components/DataTablePagination';
import { formatDate } from '@share/utils/formatDate';
import Link from '@share/components/NextLinkV2';

const EventParticipantListTab = ({ eventId }: { eventId: string }) => {
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
              <TableCell align="right">Ngày đăng ký</TableCell>
              {/* <TableCell align="center">Niên khoá</TableCell>
              <TableCell align="center">Lớp</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.items.map(row => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  <Link
                    href={`/profile/${row.participant?.information?.alumniId}`}
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
                        size="small"
                        displayName={row.participant?.information.fullName}
                        photoUrl={row.participant?.information.avatarUrl}
                      />
                      <Typography fontWeight={600}>
                        {row.participant?.information.fullName}
                      </Typography>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {formatDate(new Date(row.createdAt))}
                </TableCell>
                {/* <TableCell align="center">
                  {row.participant?.information.alumClass?.grade?.code}
                </TableCell>
                <TableCell align="center">
                  {row.participant?.information.alumClass?.name}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={2}
            currentPage={params.page}
            totalPage={Math.ceil(
              (data?.data.totalItems || 1) / (data?.data.itemPerPage || 1),
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
