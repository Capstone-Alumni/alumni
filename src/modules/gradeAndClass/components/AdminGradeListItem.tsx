import { Icon } from '@iconify/react';
import {
  Box,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { formatDate } from '@share/utils/formatDate';
import Link from '@share/components/NextLinkV2';
import { useState } from 'react';
import { Grade } from '../types';
import GradeForm, { GradeFormValues } from './GradeForm';

const AdminGradeListItem = ({
  data,
  onDelete,
  onEdit,
}: {
  data: Grade;
  onEdit: (id: string, data: GradeFormValues) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.code}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatDate(new Date(data.createdAt))}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton>
            <Link
              href={`/admin/config/grade/${data.id}/class`}
              prefetch={false}
            >
              <Icon
                height={24}
                icon="material-symbols:meeting-room-outline-rounded"
              />
            </Link>
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <Icon height={24} icon="uil:pen" />
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <Icon height={24} icon="uil:trash-alt" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Modal open={openEditModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '50rem',
          }}
        >
          <GradeForm
            initialData={data}
            onSubmit={(values: GradeFormValues) => onEdit(data.id, values)}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>

      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá niên khoá này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default AdminGradeListItem;
