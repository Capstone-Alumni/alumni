import { Box, Divider, IconButton, Typography, Grid, Card, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileInfoRow from './InfoRow';
import orange from '@mui/material/colors/orange';

import WorkIcon from '@mui/icons-material/Work';
import WorkForm from './WorkForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUpdateUserCareersMutation } from 'src/redux/slices/userProfileSlice';


const UserCareers = ({ editable, userCareers, userProfileId }: any) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [updateUserCareers] = useUpdateUserCareersMutation();

  const workData = userCareers;

  const onAddWork = async (values: any) => {

    const data = [...workData, values];

    await updateUserCareers({userId: userProfileId, data});

    setOpenAddForm(false);
  }

  const onDeleteWork = async (id: string) => {
    const currentData = [...workData];

    const deleteIndex = currentData.findIndex((item) => item.id === id);
    currentData.splice(deleteIndex, 1);

    await updateUserCareers({userId: userProfileId, data: currentData});

  }

  const onUpdateWork = async (id: any, values: any) => {
    const currentData = [...workData];

    const updateIndex = currentData.findIndex((item) => item.id === id);
    
    currentData[updateIndex] = values;

    await updateUserCareers({userId: userProfileId, data: currentData});

    setSelectedEditId(null);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
              <Typography variant="h5" style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
                <WorkIcon fontSize="large" style={{ color: theme.palette.primary.main, marginRight: theme.spacing(1) }} />
                Công việc
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
                  <WorkForm defaultValues={{startDate: null, endDate: null}} onSave={(values: any) => onAddWork(values)} />
                )
                : null
            }

            <Box style={{ paddingLeft: theme.spacing(2) }}>
              {
                workData && workData.length > 0
                  ? (
                    workData?.map((item: any, index: number) => (
                      <>
                        {
                          selectedEditId === item.id
                            ? (
                              <WorkForm defaultValues={item} onSave={(values: any) => onUpdateWork(item.id, values)} />
                            )
                            : (
                              <Box style={{ display: 'flex' }}>
                                <Box style={{ flex: 1 }}>
                                  <ProfileInfoRow title="Nơi công tác/Công ty" content={item.company} />
                                  <ProfileInfoRow title="Chức vụ" content={item.jobTitle} />
                                  <ProfileInfoRow title="Thời gian bắt đầu" content={item.startDate ? `${item.startDate && new Date(item.startDate).toLocaleDateString('en-GB')}`: null} />
                                  <ProfileInfoRow title="Thời gian kết thúc" content={item.endDate ? `${new Date(item.endDate).toLocaleDateString('en-GB')}`: null} />
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
                          index + 1 < workData.length
                            ? <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                            : null
                        }
                      </>
                    ))
                  )
                  : (
                    <Typography>Không có thông tin</Typography>
                  )
              }

            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserCareers;
