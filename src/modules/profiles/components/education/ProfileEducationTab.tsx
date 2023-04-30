import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCanEditProfile } from '../../helpers/canEditProfile';
import ProfileInfoRow from '../InfoRowCustom';
import {
  useAddUserEducationsMutation,
  useDeleteUserEducationsMutation,
  useGetUserEducationsQuery,
  useUpdateUserEducationsMutation,
} from '@redux/slices/userProfileSlice';
import EducationForm from './EducationForm';
import { toast } from 'react-toastify';
import VisibilityFormDialogs from '../VisibilityFormDialogs';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';

const ProfileEducationTab = () => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [updateUserEducations] = useUpdateUserEducationsMutation();
  const [deleteUserEducation] = useDeleteUserEducationsMutation();
  const [addUserEducation] = useAddUserEducationsMutation();
  const { canEditProfile, userProfileId } = useCanEditProfile();
  const userEducationsResponse = useGetUserEducationsQuery(userProfileId);

  const educationListData = userEducationsResponse?.data?.data?.items;

  const onAddEducation = async (values: any) => {
    try {
      if (!values.startDate || !values.endDate) {
        toast.error('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc');
        return;
      }
      if (
        values.endDate &&
        new Date(values.endDate) <= new Date(values.startDate)
      ) {
        toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      await addUserEducation({ userId: userProfileId, data: values });

      setOpenAddForm(false);

      toast.success('Thêm thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onDeleteEducation = async (id: string) => {
    try {
      await deleteUserEducation({ userId: userProfileId, educationId: id });
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onUpdateEducation = async (id: any, values: any) => {
    try {
      if (!values.startDate || !values.endDate) {
        toast.error('Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc');
        return;
      }
      if (
        values.endDate &&
        new Date(values.endDate) <= new Date(values.startDate)
      ) {
        toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      await updateUserEducations({
        userId: userProfileId,
        educationId: values.id,
        data: values,
      });

      setSelectedEditId(null);

      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (educationListData && educationListData.length === 0 && !canEditProfile) {
    return;
  }

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginBottom: theme.spacing(2),
            }}
          >
            <SchoolIcon
              fontSize="large"
              style={{
                color: theme.palette.primary.main,
                marginRight: theme.spacing(1),
              }}
            />

            <Typography variant="h5">Học vấn</Typography>

            {canEditProfile ? (
              <VisibilityFormDialogs
                name="educationPublicity"
                editType="visibility"
              >
                <VisibilityIcon />
              </VisibilityFormDialogs>
            ) : null}

            <Box sx={{ flex: 1 }} />

            {canEditProfile ? (
              <IconButton
                aria-label="edit-personla-info"
                onClick={() => {
                  setSelectedEditId(null);
                  setOpenAddForm(true);
                }}
              >
                <AddCircleIcon />
              </IconButton>
            ) : null}
          </Box>

          {openAddForm ? (
            <EducationForm
              onSave={(values: any) => onAddEducation(values)}
              onClose={() => setOpenAddForm(false)}
            />
          ) : null}

          <Box sx={{ ml: 5 }}>
            {educationListData && educationListData.length > 0 ? (
              educationListData?.map((item: any, index: any) => (
                <Box key={item.id}>
                  {selectedEditId === item.id ? (
                    <EducationForm
                      defaultValues={item}
                      onSave={(values: any) =>
                        onUpdateEducation(item.id, values)
                      }
                      onClose={() => setSelectedEditId(null)}
                    />
                  ) : (
                    <Box style={{ display: 'flex' }}>
                      <Box style={{ flex: 1 }}>
                        <ProfileInfoRow
                          title="Tên trường"
                          content={item.school}
                        />
                        <ProfileInfoRow title="Cấp" content={item.degree} />
                        <ProfileInfoRow
                          title="Thời gian bắt đầu"
                          content={
                            item.startDate
                              ? `${
                                  item.startDate &&
                                  new Date(item.startDate).toLocaleDateString(
                                    'en-GB',
                                  )
                                }`
                              : null
                          }
                        />
                        <ProfileInfoRow
                          title="Thời gian kết thúc"
                          content={
                            item.endDate
                              ? `${new Date(item.endDate).toLocaleDateString(
                                  'en-GB',
                                )}`
                              : null
                          }
                        />
                      </Box>

                      {canEditProfile ? (
                        <Box>
                          <IconButton
                            onClick={() => {
                              if (openAddForm) {
                                setOpenAddForm(false);
                              }
                              setSelectedEditId(item.id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setOpenConfirmDeleteModal(true)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                          <ConfirmDeleteModal
                            open={openConfirmDeleteModal}
                            title="Bạn muốn xoá thông tin này?"
                            onClose={() => setOpenConfirmDeleteModal(false)}
                            onDelete={() => onDeleteEducation(item.id)}
                          />
                        </Box>
                      ) : null}
                    </Box>
                  )}

                  {index + 1 < educationListData.length ? (
                    <Divider
                      style={{
                        marginTop: theme.spacing(2),
                        marginBottom: theme.spacing(2),
                      }}
                    />
                  ) : null}
                </Box>
              ))
            ) : (
              <Typography>Chưa cập nhật</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileEducationTab;
