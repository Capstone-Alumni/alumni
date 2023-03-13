import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { JobApplierInfo } from '../types';
import PdfResumePreview from './PdfResumePreview';

const AdminEventListItem = ({ data }: { data: JobApplierInfo }) => {
  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.applicationOwnerInfo.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.applicationOwnerInfo?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {data.applicationOwnerInfo?.phone || 'Chưa cập nhật'}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '2rem' }}>
          <PdfResumePreview resumeUrl={data.resumeUrl}>
            <IconButton>
              <Icon height={24} icon="uil:eye" />
            </IconButton>
          </PdfResumePreview>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminEventListItem;
