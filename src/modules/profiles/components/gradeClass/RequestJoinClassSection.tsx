import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/material';
import { useState } from 'react';
import useRequestJoinClass from 'src/modules/verifyAccount/hooks/useRequestJoinClass';
import { GradeClassForm } from 'src/modules/members/components/MemberForm';
import { FormProvider, useForm } from 'react-hook-form';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useGetOwnedAccessRequestList from 'src/modules/verifyAccount/hooks/useGetOwnedAccessRequestList';
import { formatDate } from '@share/utils/formatDate';
import useWithdrawRequestJoinClass from 'src/modules/verifyAccount/hooks/useWithdrawRequestJoinClass';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';

const RequestJoinClassSection = () => {
  const theme = useTheme();

  const [openAddModel, setOpenAddModel] = useState(false);
  const [openWithdrawModelId, setOpenWithdrawModelId] = useState('');

  const {
    data: accessRequestData,
    isLoading: getting,
    reload,
  } = useGetOwnedAccessRequestList();
  const { requestJoinClass, isLoading: requesting } = useRequestJoinClass();
  const { withdrawRequestJoinClass, isLoading: withdrawing } =
    useWithdrawRequestJoinClass();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      gradeClass: [
        {
          grade: [],
          alumClass: [],
        },
      ],
    },
  });

  const onRequestJoinClass = async (values: any) => {
    await requestJoinClass({ alumClassId: values.gradeClass[0].alumClass.id });
    methods.reset();
    reload();
    setOpenAddModel(false);
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
          <AddHomeWorkIcon
            fontSize="large"
            style={{
              color: theme.palette.primary.main,
              marginRight: theme.spacing(1),
            }}
          />
          <Typography variant="h5">Gia nhập thêm lớp</Typography>

          <Box sx={{ flex: 1 }} />

          <IconButton onClick={() => setOpenAddModel(true)}>
            <AddCircleIcon />
          </IconButton>

          <Modal open={openAddModel} onClose={() => setOpenAddModel(false)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '30rem',
                padding: theme.spacing(4),
                borderRadius: `${theme.shape.borderRadiusSm}px`,
                backgroundColor: theme.palette.background.default,
              }}
            >
              <FormProvider {...methods}>
                <GradeClassForm multiple={false} getAll />
              </FormProvider>

              <Stack direction="row" gap={1} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  disabled={requesting}
                  onClick={methods.handleSubmit(onRequestJoinClass)}
                >
                  Gửi yêu cầu
                </Button>
                <Button
                  variant="outlined"
                  disabled={requesting}
                  onClick={() => setOpenAddModel(false)}
                >
                  Đóng
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Box>

        <Box sx={{ ml: 5 }}>
          {getting ? (
            <LoadingIndicator />
          ) : (
            accessRequestData?.data?.items.map(
              ({ id, alumClass, requestStatus, createdAt }, index) => {
                const grade = alumClass?.grade;

                if (!grade) {
                  return null;
                }

                const gradeTitle = grade.code
                  ? `${grade.code} (${grade.startYear} - ${grade.endYear})`
                  : `${grade.startYear} - ${grade.endYear}`;

                return (
                  <Box key={id}>
                    {index > 0 ? <Divider sx={{ my: 2 }} /> : null}
                    <Stack direction="row" gap={1} alignItems="center">
                      {renderLongApproveStatus(requestStatus)}
                      <Box sx={{ flex: 1 }} />
                      <IconButton onClick={() => setOpenWithdrawModelId(id)}>
                        <Tooltip title="thu hổi">
                          <HighlightOffIcon />
                        </Tooltip>
                      </IconButton>
                    </Stack>
                    <Typography sx={{ mb: 0.25 }}>
                      <strong>Niên khoá</strong>: {gradeTitle}
                    </Typography>
                    <Typography>
                      <strong>Lớp:</strong> {alumClass.name}{' '}
                    </Typography>
                    <Typography>
                      <strong>Ngày tạo:</strong>{' '}
                      {formatDate(new Date(createdAt))}
                    </Typography>

                    <ConfirmDeleteModal
                      open={openWithdrawModelId === id}
                      title={
                        <Typography>
                          Bạn đang thu hồi yêu cầu gia nhập lớp{' '}
                          <strong>{alumClass.name}</strong> niên khoá{' '}
                          <strong>
                            {grade.startYear} - {grade.endYear}
                          </strong>
                          . Thao tác này không thể hoàn tác. Bạn có chắc chắn
                          muốn tiếp tục?
                        </Typography>
                      }
                      onClose={() => setOpenWithdrawModelId('')}
                      onDelete={async () => {
                        await withdrawRequestJoinClass({ requestId: id });
                        reload();
                      }}
                    />
                  </Box>
                );
              },
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export const renderLongApproveStatus = (status: number) => {
  if (status === 0) {
    return (
      <>
        <HourglassEmptyIcon color="warning" />
        <Typography fontWeight={600}>Đang chờ xét duyệt</Typography>
      </>
    );
  }

  if (status === 1) {
    return (
      <>
        <CheckCircleOutlineIcon color="success" />
        <Typography fontWeight={600}>Đã được chấp nhận</Typography>
      </>
    );
  }

  if (status === 2) {
    return (
      <>
        <RemoveCircleOutlineIcon color="error" />
        <Typography fontWeight={600}>Đã bị từ chối</Typography>
      </>
    );
  }

  return null;
};

export default RequestJoinClassSection;
