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
import { useState } from 'react';
import { Class } from '../types';
import ClassForm, { ClassFormValues } from './ClassForm';

const AdminClassListItem = ({
  data,
  onDelete,
  onEdit,
}: {
  data: Class;
  onEdit: (id: string, data: ClassFormValues) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.name}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
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
          <ClassForm
            initialData={data}
            onSubmit={(values: ClassFormValues) => onEdit(data.id, values)}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>

      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá lớp này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default AdminClassListItem;
