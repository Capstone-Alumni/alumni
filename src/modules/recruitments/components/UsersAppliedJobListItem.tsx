import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { JobApplierInfo } from '../types';
import PdfResumePreview from './PdfResumePreview';

const AdminEventListItem = ({ data }: { data: JobApplierInfo }) => {
  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.applicationOwner?.information.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.applicationOwner?.information?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {data.applicationOwner?.information?.phone || 'Chưa cập nhật'}
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
