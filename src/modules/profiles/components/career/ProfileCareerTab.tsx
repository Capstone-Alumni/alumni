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
import { orange } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCanEditProfile } from '../../helpers/canEditProfile';
import ProfileInfoRow from '../InfoRowCustom';
import {
  useAddUserCareersMutation,
  useDeleteUserCareersMutation,
  useGetUserCareersQuery,
  useUpdateUserCareersMutation,
} from '@redux/slices/userProfileSlice';
import CareerForm from './CareerForm';
import { toast } from 'react-toastify';
import VisibilityFormDialogs from '../VisibilityFormDialogs';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';

const ProfileCareerTab = () => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const { canEditProfile, userProfileId } = useCanEditProfile();
  const userCareersResponse = useGetUserCareersQuery(userProfileId);
  const [updateUserCareers] = useUpdateUserCareersMutation();
  const [addUserCareer] = useAddUserCareersMutation();
  const [deleteUserCareer] = useDeleteUserCareersMutation();

  const careerListData = userCareersResponse?.data?.data?.items;

  const onAddWork = async (values: any, isWorking: boolean) => {
    try {
      if (!isWorking && !values.endDate) {
        toast.error('Vui lòng nhật ngày kết thúc');
        return;
      }
      if (!values.startDate) {
        toast.error('Vui lòng nhật ngày bắt đầu');
        return;
      }
      if (
        values.endDate &&
        new Date(values.endDate).setHours(0, 0, 0, 0) <=
          new Date(values.startDate).setHours(0, 0, 0, 0)
      ) {
        toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      await addUserCareer({ userId: userProfileId, data: values });
      toast.success('Thêm thành công');
      setOpenAddForm(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onDeleteWork = async (id: string) => {
    try {
      await deleteUserCareer({ userId: userProfileId, careerId: id });
      toast.success('Xóa công việc thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onUpdateWork = async (values: any, isWorking: boolean) => {
    try {
      if (!isWorking && !values.endDate) {
        toast.error('Vui lòng nhật ngày kết thúc');
        return;
      }
      if (!values.startDate) {
        toast.error('Vui lòng nhật ngày bắt đầu');
        return;
      }
      if (
        values.endDate &&
        new Date(values.endDate).setHours(0, 0, 0, 0) <=
          new Date(values.startDate).setHours(0, 0, 0, 0)
      ) {
        toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      }
      await updateUserCareers({
        userId: userProfileId,
        careerId: values.id,
        data: values,
      });

      setSelectedEditId(null);

      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (careerListData && careerListData.length === 0 && !canEditProfile) {
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
            <WorkIcon fontSize="large" style={{ color: orange[900] }} />

            <Typography variant="h5">Kinh nghiệm làm việc</Typography>

            {canEditProfile ? (
              <VisibilityFormDialogs
                name="careerPublicity"
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
            <CareerForm
              onSave={(values: any, isWorking: boolean) =>
                onAddWork(values, isWorking)
              }
              onClose={() => setOpenAddForm(false)}
            />
          ) : null}

          <Box sx={{ ml: 5 }}>
            {careerListData && careerListData.length > 0 ? (
              careerListData?.map((item: any, index: any) => (
                <Box key={item.id}>
                  {selectedEditId === item.id ? (
                    <CareerForm
                      defaultValues={item}
                      onSave={(values: any, isWorking: boolean) =>
                        onUpdateWork(values, isWorking)
                      }
                      onClose={() => setSelectedEditId(null)}
                    />
                  ) : (
                    <Box style={{ display: 'flex' }}>
                      <Box style={{ flex: 1 }}>
                        <ProfileInfoRow
                          title="Nơi công tác/Công ty"
                          content={item.company}
                        />
                        <ProfileInfoRow
                          title="Chức vụ"
                          content={item.jobTitle}
                        />
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
                              : 'Đang công tác/làm việc'
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
                            onDelete={() => onDeleteWork(item.id)}
                          />
                        </Box>
                      ) : null}
                    </Box>
                  )}

                  {index + 1 < careerListData.length ? (
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

export default ProfileCareerTab;
