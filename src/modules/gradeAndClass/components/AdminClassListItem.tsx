import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { formatDate } from '@share/utils/formatDate';
import { useState } from 'react';
import { Class } from '../types';
import ClassForm, { ClassFormValues } from './ClassForm';
import ActionButton from '@share/components/ActionButton';
import AdminClassModBox from './AdminClassModBox';

const AdminClassListItem = ({
  data,
  onDelete,
  onEdit,
  reload,
}: {
  data: Class;
  onEdit: (id: string, data: ClassFormValues) => void;
  onDelete: (id: string) => void;
  reload: () => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.name}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatDate(new Date(data.createdAt))}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <Typography>{data._count?.alumniToClass}</Typography>
        </TableCell>
        <TableCell align="center">
          {data.alumniToClass?.length ? (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setOpenRoleModal(true)}
            >
              Sửa
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenRoleModal(true)}
            >
              Thêm
            </Button>
          )}
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <ActionButton
            actions={[
              {
                id: 'edit-role-btn',
                icon: <Icon height={24} icon="uil:pen" />,
                text: 'Người đại diện',
                onClick: () => setOpenRoleModal(true),
              },
              {
                id: 'edit-grade-btn',
                icon: <Icon height={24} icon="uil:pen" />,
                text: 'Chỉnh sửa',
                onClick: () => setOpenEditModal(true),
              },
              {
                id: 'delete-grade-btn',
                icon: <Icon height={24} icon="uil:trash-alt" />,
                text: 'Xoá',
                onClick: () => setOpenDeleteModal(true),
              },
            ]}
          />
        </TableCell>
      </TableRow>

      <Modal
        open={openRoleModal}
        onClose={() => {
          setOpenRoleModal(false);
          reload();
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '50rem',
          }}
        >
          <AdminClassModBox
            classId={data.id}
            onClose={() => {
              setOpenRoleModal(false);
              reload();
            }}
          />
        </Box>
      </Modal>

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
