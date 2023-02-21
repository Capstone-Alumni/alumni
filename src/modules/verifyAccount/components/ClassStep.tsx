'use client';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material';

import { useRecoilState, useRecoilValue } from 'recoil';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useFormContext } from 'react-hook-form';
import { selectedClassAtom, selectedGradeAtom } from '../states';
import useGetClassList from 'src/modules/gradeAndClass/hooks/useGetClassList';

const ClassStep = () => {
  const { setValue } = useFormContext();
  const selectedGrade = useRecoilValue(selectedGradeAtom);
  const [selectedClass, setSelectedClass] = useRecoilState(selectedClassAtom);
  const { data: classList, isLoading } = useGetClassList(
    selectedGrade?.id || '',
  );

  if (!selectedGrade) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          margin: '2rem 10vw',
        }}
      >
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          Niên khoá: {selectedGrade.name}
        </Typography>

        <Typography mb={4} variant="h4">
          Chọn lớp
        </Typography>

        {selectedClass ? (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Đã chọn:{' '}
            <Typography
              component="span"
              fontWeight={600}
              fontSize={18}
              color="primary"
            >
              {selectedClass.name}
            </Typography>
          </Typography>
        ) : null}

        {isLoading ? <LoadingIndicator /> : null}

        <List sx={{ mb: 2 }}>
          <ListItem>
            <ListItemText>
              <Typography fontWeight={600}>Tên lớp</Typography>
            </ListItemText>
          </ListItem>

          {classList?.data.items.map(item => (
            <MenuItem
              key={item.id}
              onClick={() => {
                setValue('class', item.id);
                setSelectedClass(item);
              }}
            >
              <ListItemText>
                <Typography>{item.name}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ClassStep;
