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
import getRoleName from '@share/utils/getRoleName';
import { useState } from 'react';
import { Member } from '../types';
import MemberForm, { MemberFormValues } from './MemberForm';

const AdminMemberListItem = ({
  data,
  onDelete,
  onEdit,
}: {
  data: Member;
  onEdit: (id: string, data: MemberFormValues) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.account.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{getRoleName(data.accessLevel)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            <Typography>
              {data.lastLogin
                ? formatDate(new Date(data.lastLogin), 'dd/MM/yyyy - HH:mm')
                : 'Chưa đăng nhập'}
            </Typography>
          </Typography>
        </TableCell>
        <TableCell align="center">
          {data.accessLevel === 'SCHOOL_ADMIN' ? null : (
            <IconButton onClick={() => setOpenEditModal(true)}>
              <Icon height={24} icon="uil:pen" />
            </IconButton>
          )}
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          {data.accessLevel === 'SCHOOL_ADMIN' ? null : (
            <IconButton onClick={() => setOpenDeleteModal(true)}>
              <Icon height={24} icon="uil:trash-alt" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Modal open={openEditModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '30rem',
          }}
        >
          <MemberForm
            initialData={data}
            onSubmit={(values: MemberFormValues) => onEdit(data.id, values)}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>

      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá thành viên này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(data.id)}
      />
    </>
  );
};

export default AdminMemberListItem;
