import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileInfoRow from './InfoRow';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormDialogs from '@share/components/material-ui/dialog/FormDialogs';
import SchoolIcon from '@mui/icons-material/School';
import EducationForm from './EducationForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUpdateUserEducationsMutation } from 'src/redux/slices/userProfileSlice';

const UserEducation = ({
  editable,
  userEducations,
  userProfileId,
  userInformationData,
  currentUser,
}: any) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [updateUserEducations] = useUpdateUserEducationsMutation();

  const educationData = userEducations;

  const onCloseForm = () => {
    setOpenAddForm(false);
  };

  const onAddWork = async (values: any) => {
    const data = [...educationData, values];

    try {
      await updateUserEducations({ userId: userProfileId, data });

      setOpenAddForm(false);

      toast.success('Thêm thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onDeleteWork = async (id: string) => {
    const currentData = [...educationData];

    const deleteIndex = currentData.findIndex(item => item.id === id);

    currentData.splice(deleteIndex, 1);

    try {
      await updateUserEducations({ userId: userProfileId, data: currentData });
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const onUpdateWork = async (id: any, values: any) => {
    const currentData = [...educationData];

    const updateIndex = currentData.findIndex(item => item.id === id);

    currentData[updateIndex] = values;

    try {
      await updateUserEducations({ userId: userProfileId, data: currentData });

      setSelectedEditId(null);

      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: theme.spacing(2),
              }}
            >
              <Box
                style={{
                  display: 'flex',
                }}
              >
                {' '}
                <Typography
                  variant="h5"
                  style={{
                    display: 'flex',
                    fontWeight: 'bold',
                    alignItems: 'center',
                  }}
                >
                  <SchoolIcon
                    fontSize="large"
                    style={{
                      color: theme.palette.primary.main,
                      marginRight: theme.spacing(1),
                    }}
                  />
                  Học vấn
                </Typography>
                {editable ? (
                  <IconButton
                    aria-label="edit-personla-info"
                    onClick={() => setOpenAddForm(true)}
                  >
                    <AddCircleIcon />
                  </IconButton>
                ) : null}
              </Box>
              {currentUser?.data?.userId === userInformationData?.userId && (
                <FormDialogs
                  name="educationPublicity"
                  userInformation={userInformationData}
                  editType="visibility"
                >
                  <Box
                    sx={{
                      height: '24px',
                      cursor: 'pointer',
                    }}
                  >
                    <VisibilityIcon />
                  </Box>
                </FormDialogs>
              )}
            </Box>
          </Stack>
          <div>
            {openAddForm ? (
              <EducationForm
                defaultValues={{ startDate: null, endDate: null }}
                onSave={(values: any) => onAddWork(values)}
                onClose={onCloseForm}
              />
            ) : null}

            <Box style={{ paddingLeft: theme.spacing(2) }}>
              {educationData && educationData.length > 0 ? (
                educationData?.map((item: any, index: number) => (
                  <div key={index}>
                    {selectedEditId === item.id ? (
                      <EducationForm
                        defaultValues={item}
                        onSave={(values: any) => onUpdateWork(item.id, values)}
                        onClose={onCloseForm}
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

                        {editable ? (
                          <Box>
                            <IconButton
                              onClick={() => setSelectedEditId(item.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDeleteWork(item.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Box>
                        ) : null}
                      </Box>
                    )}

                    {index + 1 < educationData.length ? (
                      <Divider
                        style={{
                          marginTop: theme.spacing(2),
                          marginBottom: theme.spacing(2),
                        }}
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <Typography>Chưa cập nhật</Typography>
              )}
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserEducation;
