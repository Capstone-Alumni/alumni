'use client';
import {
  Box,
  Chip,
  styled,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { News, TagsNews } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { useState } from 'react';
import { formatDate } from '@share/utils/formatDate';
import AdminNewsPreview from './AdminNewsPreview';
import Link from '@share/components/NextLinkV2';

const StyledBoxFlex = styled('div')(({ theme }) => ({
  gap: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledIconWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  minHeight: '30px',
  hight: '30px',
  minWidth: '30px',
  width: '30px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px 0 rgba(255, 72, 66, 0.24)',
}));

const StyledIconWrapper1 = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  minHeight: '30px',
  hight: '30px',
  minWidth: '30px',
  width: '30px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 8px 16px 0 ${theme.palette.primary.lighter}`,
}));

const AdminNewsListItem = ({
  data,
  onPublic,
  onDelete,
}: {
  data: News;
  onPublic: (id: string, isPublic: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <>
      <TableRow sx={{ verticalAlign: 'baseline' }}>
        <TableCell sx={{ maxWidth: '10rem' }} align="left">
          <AdminNewsPreview data={data}>
            <Tooltip
              title="Xem với chế độ công khai"
              sx={{ cursor: 'pointer' }}
            >
              <Typography fontSize={14} noWrap>
                {data.title}
              </Typography>
            </Tooltip>
          </AdminNewsPreview>
        </TableCell>
        <TableCell sx={{ maxWidth: '6rem' }} align="left">
          <Typography fontSize={14}>
            {data.authorInfo ? data.authorInfo.fullName : data.authorId}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ maxWidth: '7rem' }}>
          <Typography fontSize={14}>
            {formatDate(new Date(data.createdAt))}
          </Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: '10rem' }}>
          {data.tagsNews
            ? data.tagsNews.map((tag: TagsNews) => (
                <Chip
                  key={tag.id}
                  sx={{
                    margin: 0.5,
                    height: '26px',
                    border: '1px solid #c9c6c6',
                  }}
                  label={tag.tagName}
                />
              ))
            : null}
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <Tooltip title="Công khai tin này cho mọi người.">
            <Switch
              checked={data.isPublic}
              onChange={() => onPublic(data.id, data.isPublic)}
            />
          </Tooltip>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <StyledBoxFlex>
            <Tooltip title="Xóa tin này">
              <StyledIconWrapper>
                <DeleteOutlineIcon
                  fontSize="small"
                  sx={{
                    margin: 'auto',
                    color: 'rgb(255, 72, 66)',
                  }}
                  onClick={() => setOpenDeleteModal(true)}
                />
              </StyledIconWrapper>
            </Tooltip>
            <Tooltip title="Chỉnh sửa tin">
              <StyledIconWrapper1>
                <Link prefetch={false} href={`/admin/action/news/${data.id}`}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <EditOutlinedIcon
                      fontSize="small"
                      sx={{
                        margin: 'auto',
                      }}
                    />
                  </Box>
                </Link>
              </StyledIconWrapper1>
            </Tooltip>
          </StyledBoxFlex>
        </TableCell>
      </TableRow>
      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá tin tức này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default AdminNewsListItem;
