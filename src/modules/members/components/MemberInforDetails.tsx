import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Alumni } from '@share/states';
import { formatDate } from '@share/utils/formatDate';
import ClearIcon from '@mui/icons-material/Clear';

const MemberInforDetails = ({
  data,
  onClose,
}: {
  data: Alumni;
  onClose: () => void;
}) => {
  const theme = useTheme();

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
      <Typography variant="h4" sx={{ mb: 2 }}>
        Thông tin thành viên
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Họ và tên</Typography>
        <Typography>{data.information?.fullName}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Email</Typography>
        <Typography>{data.information?.email}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Số điện thoại</Typography>
        <Typography>
          {data.information?.phone ? data.information?.phone : 'Không cung cấp'}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Ngày sinh</Typography>
        <Typography>
          {data.information?.dateOfBirth
            ? formatDate(new Date(data.information?.dateOfBirth))
            : 'Không cung cấp'}
        </Typography>
      </Box>

      {/* <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Lớp - Niên khoá</Typography>
        {grades && (
          <>
            {grades.map((grade: Grade) => (
              <Typography key={grade.id}>
                {grade.code ? `${grade.code} ` : ''}
                {grade?.startYear} - {grade.endYear}
              </Typography>
            ))}
          </>
        )}
      </Box> */}

      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 1 }} fontWeight={600}>
            Lớp
          </Typography>
          <Typography>-</Typography>
          <Typography sx={{ ml: 1 }} fontWeight={600}>
            Niên khoá
          </Typography>
        </Box>
        {data.alumniToClass?.map(({ alumClass }) => (
          <Box
            key={alumClass.id || ''}
            sx={{
              display: 'flex',
            }}
          >
            <Typography sx={{ mr: 1 }}>{alumClass.name}</Typography>
            <Typography>-</Typography>
            <Typography sx={{ ml: 1 }}>
              {alumClass.grade?.code ? `${alumClass.grade.code} ` : ''}(
              {alumClass.grade?.startYear} - {alumClass.grade?.endYear})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MemberInforDetails;
