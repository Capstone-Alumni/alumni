'use client';

import Linkify from 'react-linkify';
import {
  alpha,
  Button,
  Grid,
  Link,
  Stack,
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
import usePublicDeleteResumeById from '../hooks/usePublicDeleteResumeById';
import usePublicGetAppliedJobListById, {
  GetAppliedJobListByIdResponse,
} from '../hooks/usePublicGetAppliedJobListById';
import Image from 'next/image';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { EditorPreview } from '@share/components/editor';
import UploadFileInput from '@share/components/form/UploadFileInput';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import UsersAppliedJobPreview from './UsersAppliedJobPreview';
import MyAvatar from '@share/components/MyAvatar';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

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
  resumeUrl: yup.string().required('Bắt buộc'),
});

const JobDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const [postCVSuccess, setPostCVSuccess] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const jobId = pathname?.split('/')[3] || '';

  const resolver = useYupValidateionResolver(validationSchema);

  const { control } = useForm({
    resolver,
    defaultValues: {
      resumeUrl: '',
    },
  });

  const { data, fetchApi, isLoading } = usePublicGetJobById();
  const { fetchApi: postApplyJobApi } = usePublicApplyJobById();
  const { fetchApi: putUpdateResumeByIdApi } = usePublicUpdateResumeById();
  const { fetchApi: deleteResumeByIdApi } = usePublicDeleteResumeById();
  const {
    data: dataGetAppliedJobListById,
    fetchApi: getAppliedJobListByIdApi,
  } = usePublicGetAppliedJobListById();

  useEffect(() => {
    fetchApi({ jobId });
    getAppliedJobListByIdApi({ jobId });
  }, []);

  const handlePostResume = async (value: string) => {
    setPostCVSuccess(true);
    await postApplyJobApi({ jobId, resumeUrl: value });
    await getAppliedJobListByIdApi({ jobId });
  };

  const handlePutResume = async (value: string, applicationId: string) => {
    await putUpdateResumeByIdApi({ jobId, applicationId, resumeUrl: value });
    await getAppliedJobListByIdApi({ jobId });
  };

  const handleDeleteResume = async (applicationId: string) => {
    await deleteResumeByIdApi({ jobId, applicationId });
    await getAppliedJobListByIdApi({ jobId });
  };

  const handleCheckUserAppliedJob = (
    viewerId: string,
    dataGetAppliedJobListById: GetAppliedJobListByIdResponse,
  ) => {
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
    return viewerId === ownerId;
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

  // prettier-ignore

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
          src={jobData?.companyImageUrl || '/side_background.png'}
          alt="Job-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Typography variant="h3" sx={{ mb: 1 }}>
        {jobData.title}
      </Typography>

      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
        <MyAvatar
          displayName={jobData.recruitmentOwner?.information?.fullName}
          photoUrl={jobData.recruitmentOwner?.information?.avatarUrl}
        />

        <Stack direction="column">
          <Link href={`/profile/${jobData.recruitmentOwner?.id}`}>
            <Typography fontWeight={600}>
              {jobData.recruitmentOwner?.information?.fullName}
            </Typography>
          </Link>
          <Typography>{jobData.recruitmentOwner?.information?.email}</Typography>
        </Stack>
      </Stack>

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
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <WorkIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Yêu cầu kinh nghiệm</Typography>
                  <Typography>{jobData.yearsOfExperience}</Typography>
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
                Danh sách ứng viên
              </Button>
            </UsersAppliedJobPreview>
          </Box>
        ) : currentUserInformation &&
          Boolean(dataGetAppliedJobListById?.status) &&
          dataGetAppliedJobListById?.data &&
          !handleCheckUserAppliedJob(
            currentUserInformation.id,
            dataGetAppliedJobListById,
          ) ? (
          <Box>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AppRegistrationIcon />}
              sx={{ mb: 1 }}
            >
              Tải lên hồ sơ
              <UploadFileInput
                fileType={{ 'application/pdf': ['.pdf'] }}
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
            <Typography variant="body2" color="#919eab" textAlign="center">
                  Định dạng .pdf tối đa 5MB
                </Typography>
          </Box>
        ) : (
          currentUserInformation &&
            Boolean(dataGetAppliedJobListById?.status) &&
            dataGetAppliedJobListById?.data &&
            handleCheckUserAppliedJob(
              currentUserInformation.id,
              dataGetAppliedJobListById,
            ) && (
              <Box>
                <Box>
                  <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    startIcon={<PlaylistRemoveIcon />}
                    sx={{ mb: 1 }}
                    onClick={() => handleDeleteResume(getApplicationId(
                      currentUserInformation.id,
                      dataGetAppliedJobListById,
                    ))}
                  >
                    Huỷ hồ sơ
                  </Button>
                </Box>
                <Box>     
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AppRegistrationIcon />}
                    sx={{ mb: 1 }}
                  >
                    Đổi hồ sơ
                    <UploadFileInput
                      maxSize={5000000}
                      control={control}
                      fileType={{ 'application/pdf': ['.pdf'] }}
                      onSuccess={(value) =>
                        handlePutResume(
                          value,
                          getApplicationId(
                            currentUserInformation.id,
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
                  <Typography variant="body2" color="#919eab" textAlign="center">
                    Định dạng .pdf tối đa 5MB
                  </Typography>
                </Box>
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
