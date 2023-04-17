import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { currentUserInformationDataAtom } from '@share/states';
import { useRecoilValue } from 'recoil';
import { useCanEditProfile } from '../../helpers/canEditProfile';
import { groupBy } from 'lodash/fp';
import { Class } from 'src/modules/gradeAndClass/types';
import { Stack } from '@mui/material';
import { ClassModBadge } from '../ClassModBadge';
import useDeleteAlumToClassById from 'src/modules/members/hooks/useDeleteAlumniToClass';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { useState } from 'react';

const CurrentGradeClassSection = () => {
  const theme = useTheme();

  const [openLeaveModelId, setOpenLeaveModelId] = useState('');
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const { canEditProfile, userProfileId } = useCanEditProfile();
  const groupedClass = groupBy<{
    id: string;
    isClassMod: boolean;
    alumClass: Class;
  }>(({ alumClass }) => alumClass.gradeId)(
    currentUserInformation?.alumniToClass,
  );

  const { deleteAlumToClassById, isLoading: deleting } =
    useDeleteAlumToClassById();

  console.log(groupedClass);

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
          <Groups2Icon
            fontSize="large"
            style={{
              color: theme.palette.primary.main,
              marginRight: theme.spacing(1),
            }}
          />
          <Typography variant="h5">Niên khoá và lớp</Typography>
        </Box>

        <Box sx={{ ml: 5 }}>
          {Object.keys(groupedClass).map((gradeId, index) => {
            const group = groupedClass[gradeId];
            const grade = group[0].alumClass?.grade;

            if (!grade) {
              return null;
            }

            const gradeTitle = grade.code
              ? `${grade.code} (${grade.startYear} - ${grade.endYear})`
              : `${grade.startYear} - ${grade.endYear}`;

            return (
              <Box key={gradeId}>
                {index > 0 ? <Divider sx={{ my: 2 }} /> : null}
                <Typography sx={{ mb: 0.25 }}>
                  <strong>Niên khoá</strong>: {gradeTitle}
                </Typography>
                {group.map(cl => (
                  <Stack key={cl.id} direction="row" alignItems="center">
                    <Typography>
                      <strong>Lớp:</strong> {cl.alumClass.name}{' '}
                    </Typography>
                    {cl.isClassMod ? <ClassModBadge /> : null}

                    <Box sx={{ flex: 1 }} />

                    {canEditProfile ? (
                      <IconButton
                        disabled={deleting}
                        onClick={() => setOpenLeaveModelId(cl.id)}
                      >
                        <ExitToAppIcon color="error" />
                      </IconButton>
                    ) : null}

                    <ConfirmDeleteModal
                      open={openLeaveModelId === cl.id}
                      title={
                        <Typography>
                          Bạn đang thoát khỏi lớp{' '}
                          <strong>{cl.alumClass.name}</strong> niên khoá{' '}
                          <strong>
                            {grade.startYear} - {grade.endYear}
                          </strong>
                          . Thao tác này không thể hoàn tác. Bạn có chắc chắn
                          muốn tiếp tục?
                        </Typography>
                      }
                      onClose={() => setOpenLeaveModelId('')}
                      onDelete={() => {
                        deleteAlumToClassById({
                          memberId: currentUserInformation?.id || '',
                          alumToClassId: cl.id,
                        });
                      }}
                    />
                  </Stack>
                ))}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentGradeClassSection;
