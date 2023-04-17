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
import useAddClassMod from '../hooks/useAddClassMod';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import useRemoveClassMod from '../hooks/useRemoveClassMod';
import useGetClassById from '../hooks/useGetClassById';
import LoadingIndicator from '@share/components/LoadingIndicator';

const AdminClassModBox = ({
  classId,
  onClose,
}: {
  classId: string;
  onClose?: () => void;
}) => {
  const [removeId, setRemoveId] = useState('');

  const theme = useTheme();
  const { control, handleSubmit, reset } = useForm();

  const {
    getClassById,
    data: classData,
    isLoading: getting,
  } = useGetClassById(classId);
  const { getMemberListForRole, data, isLoading } = useGetMemberListForRole();
  const { addClassMod, isLoading: adding } = useAddClassMod();
  const { removeClassMod } = useRemoveClassMod();

  const options = useMemo(() => {
    if (!data?.data?.items) {
      return [];
    }

    return data.data.items.map(item => ({
      id: item.id,
      helperText: item.information.fullName,
      label: item.information.email || '',
      value: item.id,
    }));
  }, [data]);

  const onAddClassMod = async (values: any) => {
    reset();
    await addClassMod({ alumniId: values.alumni.id, classId });
    getClassById();
  };

  const onDeleteClassMod = async (id: string) => {
    setRemoveId(id);
    await removeClassMod({ alumniId: id, classId });
    setRemoveId('');
    getClassById();
  };

  useEffect(() => {
    getClassById();
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
      {classData?.data.name ? (
        <Typography sx={{ mb: 2 }}>Lớp: {classData.data.name}</Typography>
      ) : null}

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
            getMemberListForRole({ name: name, excludeClassId: classId });
          }}
          isLoadingOptions={isLoading}
        />

        <Button
          disabled={adding}
          variant="contained"
          onClick={handleSubmit(onAddClassMod)}
        >
          Thêm
        </Button>
      </Stack>

      {getting || !classData?.data ? (
        <LoadingIndicator />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Class table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Họ tên</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="center">Xoá</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {classData.data.alumniToClass?.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.alumni.information.fullName}</TableCell>
                  <TableCell>{item.alumni.information?.email}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      disabled={removeId === item.alumni.id}
                      onClick={() => onDeleteClassMod(item.alumni.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {classData?.data.alumniToClass?.length === 0 ? (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Không có người đại diện
        </Typography>
      ) : null}
    </Box>
  );
};

export default AdminClassModBox;
