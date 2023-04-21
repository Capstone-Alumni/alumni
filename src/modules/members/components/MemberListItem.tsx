import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Chip,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import ActionButton from '@share/components/ActionButton';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Member } from '../types';
import { MemberFormValues } from './MemberForm';
import { differenceInHours } from 'date-fns';
import useResendInvitationMemberById from '../hooks/useResendInvitationMemberById';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import { isEmpty } from 'lodash';
import MemberViewBox from './MemberViewBox';

export const renderStatus = (
  lastLogin: string | undefined,
  createdAt: string,
) => {
  if (lastLogin) {
    return (
      <Button variant="outlined" color="success">
        Đã đăng nhập
      </Button>
    );
  }

  const dateCreatedAt = new Date(createdAt);
  const dateNow = new Date();

  if (differenceInHours(dateNow, dateCreatedAt) <= 48) {
    return (
      <Button variant="outlined" color="warning">
        Đã gửi lời mời
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="warning">
      Không có phản hồi
    </Button>
  );
};

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
  const [openViewModal, setOpenViewModal] = useState(false);
  const { data: session } = useSession();
  const { resendInvitationMemberById, isLoading: sending } =
    useResendInvitationMemberById();
  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);

  const getListGrades = () => {
    if (isEmpty(data.alumniToClass)) {
      return [];
    }
    const initGradeName: string[] = [];
    data.alumniToClass.filter(it => {
      const code = it.alumClass.grade?.code
        ? it.alumClass.grade?.code
        : it.alumClass.grade?.startYear + ' - ' + it.alumClass.grade?.endYear;
      if (!initGradeName.includes(code as string)) {
        initGradeName.push(code as string);
      }
    });
    return initGradeName;
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data?.information?.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data?.information?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          {getListGrades().map((code: string) => (
            <Chip key={code || ''} label={code || ''} />
          ))}
        </TableCell>
        <TableCell align="left">
          {data?.alumniToClass?.map(({ alumClass }) => (
            <Chip
              key={alumClass.id}
              label={alumClass.name}
              // onDelete={() => onDelete(alumClass.id)}
            />
          ))}
        </TableCell>
        <TableCell align="left">
          {renderStatus(data.lastLogin, data.createdAt)}
        </TableCell>
        <TableCell align="center">
          <ActionButton
            actions={[
              data.lastLogin
                ? null
                : {
                    id: 'resend',
                    text: 'Gửi lại lời mời',
                    icon: <Icon height={24} icon="ic:round-mail-outline" />,
                    onClick: () =>
                      resendInvitationMemberById({
                        alumniId: data.id,
                        tenantId: tenantId,
                      }),
                  },
              {
                id: 'view',
                text: 'Chi tiết',
                icon: <Icon height={24} icon="uil:pen" />,
                onClick: () => setOpenViewModal(true),
              },
              session?.user.isOwner
                ? {
                    id: 'delete',
                    text: 'Xoá',
                    icon: <Icon height={24} icon="uil:trash-alt" />,
                    onClick: () => setOpenDeleteModal(true),
                  }
                : null,
            ]}
          />
        </TableCell>
      </TableRow>

      <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '30rem',
          }}
        >
          <MemberViewBox data={data} onClose={() => setOpenViewModal(false)} />
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
