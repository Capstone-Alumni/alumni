import { Box, Divider, IconButton, Typography, Grid, Card, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileInfoRow from './InfoRow';
import orange from '@mui/material/colors/orange';

import WorkIcon from '@mui/icons-material/Work';
import WorkForm from './WorkForm';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { F } from 'lodash/fp';

const mockData = [
  {
    id: "1",
    jobTitle: "Fresher",
    company: "FPT Sofware",
    startDate: '2023-01-27T18:04:07.397Z',
    endDate: '2023-01-27T18:04:07.397Z',
    archived: false
  },
  {
    id: "2",
    jobTitle: "Junior",
    company: "National Australia Bank",
    startDate: '2023-01-27T18:04:07.397Z',
    endDate: null,
    archived: false
  }
]

const WorkSection = ({ editable, userCareers }: any) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const workData = userCareers;

  console.log(workData);

  const onAddWork = async (values: any) => {
    console.log("add", values);

    setOpenAddForm(false);
  }

  const onDeleteWork = async (id: string) => {
    const currentData = [...workData];
    const deleteIndex = currentData.findIndex((item) => item.id === id);
    currentData.splice(deleteIndex, 1);
    // await fetchData({
    //   method: 'put',
    //   url: '/api/workExperience',
    //   body: {
    //     work_experience: currentData,
    //   }
    // });
    console.log("delete", currentData);
  }

  const onUpdateWork = async (id: any, values: any) => {
    const currentData = [...workData];
    const updateIndex = currentData.findIndex((item) => item.id === id);
    currentData[updateIndex] = values;
    // await fetchData({
    //   method: 'put',
    //   url: '/api/workExperience',
    //   body: {
    //     work_experience: currentData,
    //   }
    // });

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

export default WorkSection;
