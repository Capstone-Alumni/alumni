import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { toast } from 'react-toastify';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ScopePublicity } from '@prisma/client';
import { useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';

type BasicSelectProps = {
  name: string;
  value: string;
  userId: string;
};
export default function BasicSelect({ name, value, userId }: BasicSelectProps) {
  const [updateUserInformation, { isLoading: isUpdating }] =
    useUpdateUserInformationMutation();
  const handleChange = async (event: SelectChangeEvent) => {
    try {
      await updateUserInformation({
        userId,
        [name]: event.target.value,
      });
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="privacy-label" size="small">
          Privacy
        </InputLabel>
        <Select
          labelId="privacy-label"
          id="demo-simple-select"
          value={value}
          label="Privacy"
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={ScopePublicity.SCHOOL}>Toàn trường</MenuItem>
          <MenuItem value={ScopePublicity.GRADE}>Khối</MenuItem>
          <MenuItem value={ScopePublicity.CLASS}>Lớp</MenuItem>
          <MenuItem value={ScopePublicity.PRIVATE}>Chỉ mình tôi</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
