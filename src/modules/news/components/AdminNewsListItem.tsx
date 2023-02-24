'use client';
import {
  Link,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { News } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AdminNewsListItem = ({
  data,
  onPublic,
  onDelete,
}: {
  data: News;
  onPublic: (id: string, isPublic: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      <TableRow>
        <TableCell sx={{ maxWidth: '10rem' }} align="left">
          <Link
            sx={{
              color: 'inherit',
            }}
            href={`/admin/news/${data.id}`}
          >
            <Typography>{data.title}</Typography>
          </Link>
        </TableCell>
        <TableCell sx={{ maxWidth: '10rem' }} align="left">
          <Typography>
            {data.authorInfo ? data.authorInfo.fullName : data.authorId}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
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
                marginLeft: 4,
              }}
              color="error"
              onClick={() => onDelete(data.id)}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminNewsListItem;
