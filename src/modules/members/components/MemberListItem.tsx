import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
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
          <Typography>{data.user.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{getRoleName(data.accessLevel)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            <Typography>
              {data.accessStatus === 'APPROVED' ? (
                <Button variant="outlined" size="small" color="success">
                  Đã có lớp
                </Button>
              ) : (
                <Button variant="outlined" size="small" color="warning">
                  Chưa chọn lớp
                </Button>
              )}
            </Typography>
          </Typography>
        </TableCell>
        <TableCell align="center">
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
