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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { formatDate } from '@share/utils/formatDate';
import Link from '@share/components/NextLinkV2';
import { useState } from 'react';
import { Grade } from '../types';
import GradeForm from './GradeForm';
import ActionButton from '@share/components/ActionButton';
import { CreateGradeParams } from '../hooks/useCreateGrade';
import useCloneGrade from '../hooks/useCloneGrade';
import useGetGradeList from '../hooks/useGetGradeList';
import AdminGradeModBox from './AdminGradeModBox';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';

const AdminGradeListItem = ({
  data,
  onDelete,
  onEdit,
}: {
  data: Grade;
  onEdit: (id: string, data: CreateGradeParams) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const { reload } = useGetGradeList();
  const { cloneGrade } = useCloneGrade();
  const currentUser = useRecoilValue(currentUserInformationDataAtom);

  const cloneHandler = async (id: string) => {
    await cloneGrade({ gradeId: id });
    reload();
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.code}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{data.startYear}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{data.endYear}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatDate(new Date(data.createdAt))}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <Typography>{data._count?.alumClasses}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton>
            <Link href={`/admin/config/grade/${data.id}/class`}>
              <Icon
                height={24}
                icon="material-symbols:meeting-room-outline-rounded"
              />
            </Link>
          </IconButton>
        </TableCell>
        {currentUser?.isOwner ? (
          <TableCell align="center">
            {data.gradeMod.length ? (
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
        ) : (
          <TableCell align="center">
            <Button
              variant="outlined"
              startIcon={<RemoveRedEyeIcon />}
              onClick={() => setOpenRoleModal(true)}
            >
              Xem
            </Button>
          </TableCell>
        )}
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <ActionButton
            actions={[
              {
                id: 'clone-grade-btn',
                icon: <Icon height={24} icon="fa-regular:clone" />,
                text: 'Sao chép',
                tooltip:
                  'Tạo niên khoá liền kề sau, sao chép thông tin về lớp hoc.',
                onClick: () => cloneHandler(data.id),
              },
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
          <AdminGradeModBox
            editable={currentUser?.isOwner}
            gradeId={data.id}
            onClose={() => {
              setOpenRoleModal(false);
              reload();
            }}
          />
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={() => {
          setOpenDeleteModal(false);
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
          <GradeForm
            initialData={data}
            onSubmit={values => onEdit(data.id, values)}
            onClose={() => {
              setOpenEditModal(false);
            }}
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
