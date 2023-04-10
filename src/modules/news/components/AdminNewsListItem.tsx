'use client';
import {
  Chip,
  Link,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { News, TagsNews } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { useState } from 'react';
import { formatDate } from '@share/utils/formatDate';

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
        <TableCell sx={{ maxWidth: '10rem' }} align="left">
          <Link
            sx={{
              color: 'inherit',
            }}
            href={`/admin/action/news/${data.id}`}
          >
            <Typography noWrap>{data.title}</Typography>
          </Link>
        </TableCell>
        <TableCell sx={{ maxWidth: '10rem' }} align="left">
          <Typography>
            {data.authorInfo ? data.authorInfo.fullName : data.authorId}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatDate(new Date(data.createdAt))}</Typography>
        </TableCell>
        <TableCell>
          {data.tagsNews
            ? data.tagsNews.map((tag: TagsNews) => (
                <Chip
                  key={tag.id}
                  sx={{
                    margin: 0.5,
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
          <Tooltip title="Xóa tin này!">
            <DeleteOutlineIcon
              sx={{
                margin: 'auto',
              }}
              color="error"
              onClick={() => setOpenDeleteModal(true)}
            />
          </Tooltip>
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
