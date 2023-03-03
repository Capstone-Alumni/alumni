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
  useGetUserCareersQuery,
  useUpdateUserCareersMutation,
} from '@redux/slices/userProfileSlice';
import CareerForm from './CareerForm';
import { toast } from 'react-toastify';
import VisibilityFormDialogs from '../VisibilityFormDialogs';

const ProfileCareerTab = () => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const { canEditProfile, userProfileId } = useCanEditProfile();
  const userCareersResponse = useGetUserCareersQuery(userProfileId);
  const [updateUserCareers] = useUpdateUserCareersMutation();

  const careerListData = userCareersResponse?.data?.data?.items;

  const onAddWork = async (values: any) => {
    const data = [...careerListData, values];

    try {
      await updateUserCareers({ userId: userProfileId, data });
      toast.success('Thêm thành công');
      setOpenAddForm(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onDeleteWork = async (id: string) => {
    const currentData = [...careerListData];

    const deleteIndex = currentData.findIndex(item => item.id === id);
    currentData.splice(deleteIndex, 1);

    try {
      await updateUserCareers({ userId: userProfileId, data: currentData });
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onUpdateWork = async (id: any, values: any) => {
    const currentData = [...careerListData];

    const updateIndex = currentData.findIndex(item => item.id === id);

    currentData[updateIndex] = values;

    try {
      await updateUserCareers({ userId: userProfileId, data: currentData });

      setSelectedEditId(null);

      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
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
            <VisibilityFormDialogs name="careerPublicity" editType="visibility">
              <VisibilityIcon />
            </VisibilityFormDialogs>
          ) : null}

          <Box sx={{ flex: 1 }} />

          {canEditProfile ? (
            <IconButton
              aria-label="edit-personla-info"
              onClick={() => setOpenAddForm(true)}
            >
              <AddCircleIcon />
            </IconButton>
          ) : null}
        </Box>

        {openAddForm ? (
          <CareerForm
            onSave={(values: any) => onAddWork(values)}
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
                    onSave={(values: any) => onUpdateWork(item.id, values)}
                    onClose={() => setSelectedEditId(null)}
                  />
                ) : (
                  <Box style={{ display: 'flex' }}>
                    <Box style={{ flex: 1 }}>
                      <ProfileInfoRow
                        title="Nơi công tác/Công ty"
                        content={item.company}
                      />
                      <ProfileInfoRow title="Chức vụ" content={item.jobTitle} />
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
                        <IconButton onClick={() => setSelectedEditId(item.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteWork(item.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
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
            <Typography>Không có công việc</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCareerTab;
