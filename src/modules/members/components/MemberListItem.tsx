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
import { AlumniToClass, Member } from '../types';
import { MemberFormValues } from './MemberForm';
import { differenceInHours } from 'date-fns';
import useResendInvitationMemberById from '../hooks/useResendInvitationMemberById';
import { useRecoilValue } from 'recoil';
import { Alumni, currentTenantDataAtom } from '@share/states';
import { isEmpty, sortBy } from 'lodash';
import MemberInforDetails from './MemberInforDetails';
import { Grade } from 'src/modules/gradeAndClass/types';

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

export const getClassesSorted = (alumniToClasses: AlumniToClass[]) => {
  const classesSorted = sortBy(alumniToClasses, ['alumClass.name']);
  return classesSorted;
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
    const initGradeId: string[] = [];
    const initGrades: Grade[] = [];
    data.alumniToClass.filter(it => {
      if (
        it.alumClass?.grade &&
        !initGradeId.includes(it.alumClass.grade?.id as string)
      ) {
        initGradeId.push(it.alumClass.grade?.id as string);
        initGrades.push(it.alumClass?.grade);
      }
    });
    return sortBy(initGrades, ['code']);
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
          {getListGrades().map((grade: Grade) => (
            <Chip
              key={grade.id}
              label={grade.code || `${grade.startYear}-${grade.endYear} `}
            />
          ))}
        </TableCell>
        <TableCell align="left">
          {getClassesSorted(data?.alumniToClass).map(({ alumClass }) => (
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
                id: 'detail',
                text: 'Chi tiết',
                icon: <Icon height={24} icon="ic:outline-remove-red-eye" />,
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
          <MemberInforDetails
            data={data as unknown as Alumni}
            onClose={() => setOpenViewModal(false)}
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
