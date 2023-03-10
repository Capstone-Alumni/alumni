'use client';

import Linkify from 'react-linkify';
import {
  alpha,
  Button,
  Grid,
  styled,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import * as yup from 'yup';
import { Box, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import { currentUserInformationDataAtom } from '@share/states';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePublicGetJobById from '../hooks/usePublicGetJobById';
import usePublicApplyJobById from '../hooks/usePublicApplyJobById';
import usePublicUpdateResumeById from '../hooks/usePublicUpdateResumeById';
import usePublicGetAppliedJobListById, {
  GetAppliedJobListByIdResponse,
} from '../hooks/usePublicGetAppliedJobListById';
import Image from 'next/image';
import LoadingIndicator from '@share/components/LoadingIndicator';
import EditorPreview from '@share/components/editor/EditorPreview';
import UploadFileInput from '@share/components/form/UploadFileInput';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { JobApplierInfo } from '../types';
import PdfResumePreview from './PdfResumePreview';
import UsersAppliedJobPreview from './UsersAppliedJobPreview';

const StyledGeneralInfomation = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: '1rem',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const StyledGridInfo = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const validationSchema = yup.object({
  resumeUrl: yup.string().required(),
});

const JobDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const jobId = pathname?.split('/')[3] || '';

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      resumeUrl: '',
    },
  });

  const { data, fetchApi, isLoading } = usePublicGetJobById();
  const { fetchApi: postApplyJobApi } = usePublicApplyJobById();
  const { fetchApi: putUpdateResumeByIdApi } = usePublicUpdateResumeById();
  const {
    data: dataGetAppliedJobListById,
    fetchApi: getAppliedJobListByIdApi,
  } = usePublicGetAppliedJobListById();

  useEffect(() => {
    fetchApi({ jobId });
    getAppliedJobListByIdApi({ jobId });
  }, []);

  const handlePostResume = async (value: string) => {
    postApplyJobApi({ jobId, resumeUrl: value });
    getAppliedJobListByIdApi({ jobId });
  };

  const handlePutResume = async (value: string, applicationId: string) => {
    putUpdateResumeByIdApi({ jobId, applicationId, resumeUrl: value });
  };

  const handleCheckUserAppliedJob = (
    viewerId: string,
    dataGetAppliedJobListById: GetAppliedJobListByIdResponse,
  ) => {
    const flag = false;
    for (const application of dataGetAppliedJobListById.data.items) {
      if (application.applicationOwnerId === viewerId) {
        return true;
      }
    }
  };

  const handleCheckUserIsJobOwner = (
    viewerId: string,
    ownerId: string,
  ): boolean => {
    console.log(viewerId, ownerId);
    return viewerId === ownerId ? true : false;
  };

  const getApplicationId = (
    viewerId: string,
    dataGetAppliedJobListById: GetAppliedJobListByIdResponse,
  ): string => {
    for (const application of dataGetAppliedJobListById.data.items) {
      if (application.applicationOwnerId === viewerId) {
        return application.id;
      }
    }
    return '';
  };

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  const { data: jobData } = data;

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: theme.spacing(32),
          mb: 2,
        }}
      >
        <Image
          src={jobData.companyImageUrl}
          alt="Job-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <StyledGeneralInfomation>
          <Typography fontWeight={600} variant="h6">
            Thông tin chung
          </Typography>
          <br />
          <Grid container spacing={0}>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <WorkIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Ngành ngề</Typography>
                  <Typography>{jobData.job}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LanguageIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Website</Typography>
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}
                  >
                    <Typography>{jobData.website}</Typography>
                  </Linkify>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <AttachMoneyIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Mức lương</Typography>
                  <Typography>{jobData.salary || 'Thương lượng'}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LocationOnIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Địa chỉ</Typography>
                  <Typography>{jobData.address}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
          </Grid>
        </StyledGeneralInfomation>
        {currentUserInformation &&
        jobData.recruitmentOwnerId &&
        Boolean(dataGetAppliedJobListById?.status) &&
        handleCheckUserIsJobOwner(
          currentUserInformation.id,
          jobData.recruitmentOwnerId,
        ) ? (
          <Box>
            <UsersAppliedJobPreview data={dataGetAppliedJobListById}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AppRegistrationIcon />}
                sx={{ mb: 1 }}
              >
                Xem thống kê
              </Button>
            </UsersAppliedJobPreview>
          </Box>
        ) : currentUserInformation &&
          Boolean(dataGetAppliedJobListById?.status) &&
          dataGetAppliedJobListById?.data &&
          !handleCheckUserAppliedJob(
            currentUserInformation.userId,
            dataGetAppliedJobListById,
          ) ? (
          <Box>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AppRegistrationIcon />}
              sx={{ mb: 1 }}
            >
              Tải lên CV
              <UploadFileInput
                control={control}
                onSuccess={(value) => handlePostResume(value)}
                name="resumeUrl"
                containerSx={{
                  opacity: '0',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  '& label': {
                    display: 'none',
                  },
                  '& .MuiBox-root': {
                    height: '2.25rem',
                    '& div': {
                      height: '2.25rem',
                      padding: 0,
                    },
                  },
                }}
              />
            </Button>
          </Box>
        ) : (
          currentUserInformation &&
          Boolean(dataGetAppliedJobListById?.status) &&
          dataGetAppliedJobListById?.data &&
          handleCheckUserAppliedJob(
            currentUserInformation.userId,
            dataGetAppliedJobListById,
          ) && (
            <Box>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AppRegistrationIcon />}
                sx={{ mb: 1 }}
              >
                Chỉnh sửa CV
                <UploadFileInput
                  control={control}
                  onSuccess={(value) =>
                    handlePutResume(
                      value,
                      getApplicationId(
                        currentUserInformation.userId,
                        dataGetAppliedJobListById,
                      ),
                    )
                  }
                  name="resumeUrl"
                  containerSx={{
                    opacity: '0',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    '& label': {
                      display: 'none',
                    },
                    '& .MuiBox-root': {
                      height: '2.25rem',
                      '& div': {
                        height: '2.25rem',
                        padding: 0,
                      },
                    },
                  }}
                />
              </Button>
            </Box>
          )
        )}
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
      </Tabs>

      {tabKey === 'description' ? (
        <Box sx={{ my: 2 }}>
          <EditorPreview value={jobData?.description || ''} />
        </Box>
      ) : null}
    </Box>
  );
};

export default JobDetailPage;
