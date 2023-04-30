'use client';

import { Box, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { Report } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'; // import AdminJobPreview from './AdminJobPreview';
import { formatDate } from '@share/utils/formatDate';
import ResponseReportModal from './ResponseReportModal';
import {
  StyledBoxFlex,
  StyledIconWrapperMainShadow,
  StyledIconWrapperRedShadow,
} from '@share/components/styled';
import { useState } from 'react';

const ViewReportListItem = ({
  data,
  onResponse,
  onDelete,
}: {
  data: Report;
  onResponse: () => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <TableRow sx={{ fontSize: '14px', verticalAlign: 'baseline' }}>
        <TableCell align="left" sx={{ cursor: 'pointer', maxWidth: '6rem' }}>
          <Typography fontSize="inherit">{data.fullName}</Typography>
        </TableCell>
        <TableCell align="left" sx={{ maxWidth: '9rem' }}>
          <Typography fontSize="inherit">{data.email}</Typography>
        </TableCell>
        <TableCell align="left" sx={{ maxWidth: '6rem' }}>
          <Typography fontSize="inherit">
            {formatDate(new Date(data.createdAt))}
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          sx={{ maxWidth: '8rem', wordBreak: 'break-word' }}
        >
          <Typography fontSize="inherit">{data.message}</Typography>
        </TableCell>
        <TableCell
          align={data.response ? 'left' : 'center'}
          sx={{ maxWidth: '8rem' }}
        >
          <Typography fontSize="inherit">{data.response}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <StyledBoxFlex>
            <Tooltip
              title={
                data.response ? 'Chỉnh sửa câu trả lời' : 'Trả lời báo lỗi'
              }
            >
              <StyledIconWrapperMainShadow>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ResponseReportModal onResponse={onResponse} data={data}>
                    <QuestionAnswerOutlinedIcon
                      fontSize="small"
                      color="primary"
                      sx={{
                        margin: 'auto',
                      }}
                    />
                  </ResponseReportModal>
                </Box>
              </StyledIconWrapperMainShadow>
            </Tooltip>
            <Tooltip title="Xóa tin này">
              <StyledIconWrapperRedShadow>
                <DeleteOutlineIcon
                  fontSize="small"
                  sx={{
                    margin: 'auto',
                    color: 'rgb(255, 72, 66)',
                  }}
                  onClick={() => setOpenDeleteModal(true)}
                />
              </StyledIconWrapperRedShadow>
            </Tooltip>
          </StyledBoxFlex>
        </TableCell>
      </TableRow>
      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá báo lỗi này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default ViewReportListItem;
