import { Box, Button, Modal, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { GradeClassForm } from 'src/modules/members/components/MemberForm';
import { FormProvider, useForm } from 'react-hook-form';

const AddGradesAndClasses = ({
  openAddModal,
  setOpenAddModal,
  onAddClass,
  isAdding,
}: {
  openAddModal: boolean;
  setOpenAddModal: (open: boolean) => void;
  onAddClass: (values: any) => void;
  isAdding: boolean;
}) => {
  const theme = useTheme();

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

  return (
    <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
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
            disabled={isAdding}
            onClick={methods.handleSubmit(onAddClass)}
          >
            Thêm
          </Button>
          <Button
            variant="outlined"
            disabled={isAdding}
            onClick={() => setOpenAddModal(false)}
          >
            Đóng
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddGradesAndClasses;
