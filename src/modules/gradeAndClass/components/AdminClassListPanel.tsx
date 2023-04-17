/** HOLD: NOT RENDER  */

import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { selectedGradeAtom } from '../state';
import useCreateClass from '../hooks/useCreateClass';
import useDeleteClassById from '../hooks/useDeleteClassById';
import useUpdateClassById from '../hooks/useUpdateClassById';
import { useState } from 'react';
import { useTheme } from '@mui/material';

const AdminClassListPanel = () => {
  const theme = useTheme();

  const [inputClassName, setInputClassName] = useState('');
  const selectedGrade = useRecoilValue(selectedGradeAtom);

  const { createClass } = useCreateClass();
  const { deleteClassById } = useDeleteClassById();
  const { updateClassById } = useUpdateClassById();

  const onAddClass = async (values: { name: string }) => {
    await createClass({ ...values, gradeId: selectedGrade?.id || '' });
  };

  const onDelete = async (classId: string) => {
    await deleteClassById({ classId });
  };

  const onUpdate = async (classId: string, { name }: { name: string }) => {
    await updateClassById({ classId, name });
  };

  if (selectedGrade === null) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6">Danh sách lớp</Typography>
      <Typography variant="body2">
        Niên khoá {selectedGrade?.startYear} - {selectedGrade?.endYear}
      </Typography>

      <form
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(1),
        }}
        onSubmit={e => {
          e.preventDefault();
          if (inputClassName) {
            onAddClass({ name: inputClassName });
            setInputClassName('');
          }
        }}
      >
        <TextField
          fullWidth
          label="Tên lớp"
          value={inputClassName}
          size="small"
          onChange={e => setInputClassName(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Thêm
        </Button>
      </form>

      <Stack direction="row" gap={1} flexWrap="wrap">
        {selectedGrade?.alumClasses?.map(({ id, name }) => (
          <Chip key={id} label={name} onDelete={() => onDelete(id)} />
        ))}
      </Stack>
    </Box>
  );
};

export default AdminClassListPanel;
