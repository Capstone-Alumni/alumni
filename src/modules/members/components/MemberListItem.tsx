import { Icon } from '@iconify/react';
import { Box, Modal, TableCell, TableRow, Typography } from '@mui/material';
import ActionButton from '@share/components/ActionButton';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { formatDate } from '@share/utils/formatDate';
import getRoleName from '@share/utils/getRoleName';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Member } from '../types';
import { compareRole } from '../utils';
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
  const { data: session } = useSession();

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
          <ActionButton
            actions={[
              compareRole(session?.user.accessLevel, data.accessLevel) > 0
                ? {
                    id: 'edit',
                    text: 'Chỉnh sửa',
                    icon: <Icon height={24} icon="uil:pen" />,
                    onClick: () => setOpenEditModal(true),
                  }
                : null,
              {
                id: 'delete',
                text: 'Xoá',
                icon: <Icon height={24} icon="uil:trash-alt" />,
                onClick: () => setOpenDeleteModal(true),
              },
            ]}
          />
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
