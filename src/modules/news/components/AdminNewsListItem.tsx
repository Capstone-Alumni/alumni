'use client';
import {
  Box,
  Chip,
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
import {
  StyledBoxFlex,
  StyledIconWrapperMainShadow,
  StyledIconWrapperRedShadow,
} from '@share/components/styled';

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
      <TableRow>
        <TableCell sx={{ maxWidth: '10rem', fontSize: '14px' }} align="left">
          <AdminNewsPreview data={data}>
            <Tooltip
              title="Xem với chế độ công khai"
              sx={{ cursor: 'pointer' }}
            >
              <Typography fontSize="inherit" noWrap>
                {data.title}
              </Typography>
            </Tooltip>
          </AdminNewsPreview>
        </TableCell>
        <TableCell sx={{ maxWidth: '6rem' }} align="left">
          <Typography fontSize="inherit">
            {data.authorInfo ? data.authorInfo.fullName : data.authorId}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ maxWidth: '7rem' }}>
          <Typography fontSize="inherit">
            {formatDate(new Date(data.createdAt))}
          </Typography>
        </TableCell>
        <TableCell sx={{ maxWidth: '10rem' }}>
          {data.tagsNews ? (
            <Box display="flex" alignItems="center">
              {data.tagsNews
                .slice(0, data.tagsNews.length > 2 ? 2 : 1)
                .map((tag: TagsNews) => (
                  <Chip
                    key={tag.id}
                    sx={{
                      margin: 0.5,
                      height: '26px',
                      border: '1px solid #c9c6c6',
                    }}
                    label={tag.tagName}
                  />
                ))}
              {data.tagsNews.length > 2 && (
                <Typography
                  fontSize="inherit"
                  color="#c9c6c6"
                  variant="caption"
                  sx={{ marginLeft: '0.25rem' }}
                >
                  +5
                </Typography>
              )}
            </Box>
          ) : null}
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
            <Tooltip title="Chỉnh sửa tin">
              <StyledIconWrapperMainShadow>
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
        title="Bạn muốn xoá tin tức này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default AdminNewsListItem;
