import { Box, Divider, IconButton, Typography, Grid, Card, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileInfoRow from './InfoRow';
import orange from '@mui/material/colors/orange';

import WorkIcon from '@mui/icons-material/Work';
import EducationForm from './EducationForm';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { F } from 'lodash/fp';
import { useUpdateUserEducationsMutation } from 'src/redux/slices/userProfileSlice';

const mockData = [
  {
    id: "1",
    school: "Hung Vuong",
    degree: "Cap 3",
    startDate: "2023-01-27T18:04:07.397Z",
    endDate: "2023-01-27T18:04:07.397Z",
    archived: false
  },
  {
    id: "2",
    jobTitle: "Nhat Tao",
    company: "Cap 2",
    startDate: "2023-01-27T18:04:07.397Z",
    endDate: null,
    archived: false
  }
]

const UserEducation = ({ editable, userEducations, userProfileId }: any) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [updateUserEducations] = useUpdateUserEducationsMutation();
  const educationData = mockData;

  const onAddWork = async (values: any) => {
    console.log("add", values);

    const data = [...educationData, values];

    await updateUserEducations({userId: userProfileId, ...data});

    setOpenAddForm(false);
  }

  const onDeleteWork = async (id: string) => {
    const currentData = [...educationData];

    const deleteIndex = currentData.findIndex((item) => item.id === id);

    currentData.splice(deleteIndex, 1);

    await updateUserEducations({userId: userProfileId, ...currentData});

    console.log("delete", currentData);
  }

  const onUpdateWork = async (id: any, values: any) => {
    const currentData = [...educationData];
    
    const updateIndex = currentData.findIndex((item) => item.id === id);

    currentData[updateIndex] = values;

    await updateUserEducations({userId: userProfileId, ...currentData});

    console.log("update", currentData);

    setSelectedEditId(null);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
              <Typography variant="h5" style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
                <WorkIcon fontSize="large" style={{ color: orange[900], marginRight: theme.spacing(1) }} />
                Học vấn
              </Typography>
              {
                editable
                  ? (
                    <IconButton aria-label="edit-personla-info" onClick={() => setOpenAddForm(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  )
                  : null
              }
            </Box>
          </Stack>
          <div

          >

            {
              openAddForm
                ? (
                  <EducationForm defaultValues={{ startDate: null, endDate: null }} onSave={(values: any) => onAddWork(values)} />
                )
                : null
            }

            <Box style={{ paddingLeft: theme.spacing(2) }}>
              {
                educationData && educationData.length > 0
                  ? (
                    educationData?.map((item: any, index: number) => (
                      <>
                        {
                          selectedEditId === item.id
                            ? (
                              <EducationForm defaultValues={item} onSave={(values: any) => onUpdateWork(item.id, values)} />
                            )
                            : (
                              <Box style={{ display: 'flex' }}>
                                <Box style={{ flex: 1 }}>
                                  <ProfileInfoRow title="Tên trường" content={item.school} />
                                  <ProfileInfoRow title="Cấp" content={item.degree} />
                                  <ProfileInfoRow title="Thời gian bắt đầu" content={item.startDate ? `${item.startDate && new Date(item.startDate).toLocaleDateString('en-GB')}` : null} />
                                  <ProfileInfoRow title="Thời gian kết thúc" content={item.endDate ? `${new Date(item.endDate).toLocaleDateString('en-GB')}` : null} />
                                </Box>

                                {
                                  editable
                                    ? (
                                      <Box>
                                        <IconButton onClick={() => setSelectedEditId(item.id)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => onDeleteWork(item.id)}><DeleteIcon color="error" /></IconButton>
                                      </Box>
                                    )
                                    : null
                                }
                              </Box>
                            )
                        }

                        {
                          index + 1 < educationData.length
                            ? <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                            : null
                        }
                      </>
                    ))
                  )
                  : (
                    <Typography>Không có công việc</Typography>
                  )
              }

            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserEducation;
