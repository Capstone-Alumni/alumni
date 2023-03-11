import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { JobApplierInfo } from '../types';
import PdfResumePreview from './PdfResumePreview';

const AdminEventListItem = ({
  data,
  onPreview,
  onDownload,
}: {
  data: JobApplierInfo;
  onPreview: (id: string) => void;
  onDownload: (id: string) => void;
}) => {
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
            <IconButton onClick={() => onPreview(data.resumeUrl)}>
              <Icon height={24} icon="uil:eye" />
            </IconButton>
          </PdfResumePreview>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminEventListItem;
