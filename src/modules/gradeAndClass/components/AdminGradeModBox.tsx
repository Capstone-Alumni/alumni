import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AutocompleteInput from '@share/components/form/AutoCompleteInput';
import { useForm } from 'react-hook-form';
import useGetMemberListForRole from 'src/modules/members/hooks/useGetMemberListForRole';
import { useEffect, useMemo, useState } from 'react';
import useAddGradeMod from '../hooks/useAddGradeMod';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import useRemoveGradeMod from '../hooks/useRemoveGradeMod';
import useGetGradeById from '../hooks/useGetGradeById';
import LoadingIndicator from '@share/components/LoadingIndicator';

const AdminGradeModBox = ({
  gradeId,
  onClose,
  editable,
}: {
  gradeId: string;
  onClose?: () => void;
  editable?: boolean;
}) => {
  const [removeId, setRemoveId] = useState('');

  const theme = useTheme();
  const { control, handleSubmit, reset } = useForm();

  const {
    getGradeById,
    data: gradeData,
    isLoading: getting,
  } = useGetGradeById(gradeId);
  const { getMemberListForRole, data, isLoading } = useGetMemberListForRole();
  const { addGradeMod, isLoading: adding } = useAddGradeMod();
  const { removeGradeMod } = useRemoveGradeMod();

  const options = useMemo(() => {
    if (!data?.data?.items) {
      return [];
    }

    return data.data.items.map(item => ({
      id: item.id,
      helperText: item?.information?.fullName,
      label: item?.information?.email || '',
      value: item.id,
    }));
  }, [data]);

  const onAddGradeMod = async (values: any) => {
    reset();
    await addGradeMod({ alumniId: values.alumni.id, gradeId });
    getGradeById();
  };

  const onDeleteGradeMod = async (id: string) => {
    setRemoveId(id);
    await removeGradeMod({ alumniId: id, gradeId });
    setRemoveId('');
    getGradeById();
  };

  useEffect(() => {
    getGradeById();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        padding: theme.spacing(4),
        borderRadius: `${theme.shape.borderRadiusSm}px`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: theme.spacing(4),
          right: theme.spacing(4),
        }}
      >
        <ClearIcon />
      </IconButton>

      <Typography variant="h4">Danh sách người đại diện</Typography>
      {gradeData?.data ? (
        <Typography sx={{ mb: 2 }}>
          Niên khoá: {gradeData?.data?.startYear} - {gradeData.data.endYear}
        </Typography>
      ) : null}

      {editable ? (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          <AutocompleteInput
            control={control}
            name="alumni"
            textProps={{
              label: 'Cựu học sinh',
              size: 'small',
            }}
            inputProps={{
              sx: {
                width: '100%',
              },
            }}
            options={options}
            getOptions={name => {
              getMemberListForRole({ name: name, excludeGradeId: gradeId });
            }}
            isLoadingOptions={isLoading}
          />

          <Button
            disabled={adding}
            variant="contained"
            onClick={handleSubmit(onAddGradeMod)}
          >
            Thêm
          </Button>
        </Stack>
      ) : null}

      {getting || !gradeData?.data ? (
        <LoadingIndicator />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="grade table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Họ tên</TableCell>
                <TableCell align="left">Email</TableCell>
                {editable ? <TableCell align="center">Xoá</TableCell> : null}
              </TableRow>
            </TableHead>

            <TableBody>
              {gradeData.data.gradeMod?.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.alumni.information.fullName}</TableCell>
                  <TableCell>{item.alumni.information?.email}</TableCell>
                  {editable ? (
                    <TableCell align="center">
                      <IconButton
                        disabled={removeId === item.alumni.id}
                        onClick={() => onDeleteGradeMod(item.alumni.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {gradeData?.data.gradeMod?.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Không có người đại diện
        </Typography>
      ) : null}
    </Box>
  );
};

export default AdminGradeModBox;
