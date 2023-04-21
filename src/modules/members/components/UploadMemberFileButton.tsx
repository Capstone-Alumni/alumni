import { Box, Button } from '@mui/material';
import {
  currentTenantDataAtom,
  currentUserInformationDataAtom,
} from '@share/states';
import { parseXLSX } from '@share/utils/parseXLSX';
import { noop } from 'lodash/fp';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import useCreateManyMember from '../hooks/useCreateManyMember';
import useGetMemberList from '../hooks/useGetMemberList';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';

const LOADING_TOAST_ID = 'member file';

const UploadMemeberFileButton = () => {
  const [uploading, setUploading] = useState(false);

  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);
  const currentUser = useRecoilValue(currentUserInformationDataAtom);
  const classList = currentUser?.alumniToClass?.map(ref => ref.alumClass);
  const gradeList = currentUser?.gradeMod?.map(ref => ref.grade);

  const { data: gradeData } = useGetGradeList();

  const { createManyMember } = useCreateManyMember();
  const { reload } = useGetMemberList();

  const onUploadFile = async (file?: File) => {
    setUploading(true);
    toast.loading('Đang xử lý', { toastId: LOADING_TOAST_ID });

    if (!file) {
      return;
    }

    const jsonData = await parseXLSX(file);

    // format data
    const data = Object.values(jsonData);

    // precheck header
    try {
      const formattedData = data.reduce((red: any[], item: any, index) => {
        if (index < 2) {
          return red;
        }

        if (item[1].length === 0) {
          throw new Error('invalid format');
        }

        if (item[2]?.split(' ').length !== 3) {
          throw new Error('invalid format');
        }

        const startYear = parseInt(item[2].split(' ')[0], 10);
        const endYear = parseInt(item[2].split(' ')[2], 10);
        const grade = gradeList?.find(
          grade => grade.startYear === startYear && grade.endYear === endYear,
        ); // grade mod
        const alumClass = classList?.find(
          alumClass =>
            alumClass.name === item[3] &&
            alumClass.grade?.startYear === startYear &&
            alumClass.grade?.endYear === endYear,
        ); // class mod
        if (!currentUser?.isOwner && !grade && !alumClass) {
          throw new Error('unauthorize');
        }

        let alumClassId;
        gradeData.data.items.forEach(grade => {
          if (grade.startYear === startYear && grade.endYear === endYear) {
            grade.alumClasses?.forEach(alumClass => {
              if (alumClass.name === item[3]) {
                alumClassId = alumClass.id;
              }
            });
          }
        });

        if (!alumClassId) {
          throw new Error(
            `Không tìm thấy lớp ${item[3]} của niên khoá ${item[2]}`,
          );
        }

        let dateOfBirth = null;
        if (item[6]) {
          const parts = item[6].split('/');
          if (parts.length !== 3) {
            throw new Error(`Ngày sinh ${item[6]} khÔng hợp lệ`);
          }
          try {
            dateOfBirth = new Date(
              Number(parts[2]),
              Number(parts[1]) - 1,
              Number(parts[0]),
            );
          } catch (err) {
            throw new Error(`Ngày sinh ${item[6]} khÔng hợp lệ`);
          }
        }

        return [
          ...red,
          {
            fullName: item[1],
            gradeClass: [
              {
                alumClass: [
                  {
                    value: alumClassId,
                  },
                ],
              },
            ],
            email: item?.[4],
            phone: item?.[5],
            dateOfBirth: dateOfBirth,
            facebook: item?.[7],
          },
        ];
      }, []);

      await createManyMember({ data: formattedData, tenantId: tenantId });

      toast.dismiss(LOADING_TOAST_ID);
      setUploading(false);
      reload();
    } catch (err) {
      toast.dismiss(LOADING_TOAST_ID);
      if (err.message.includes('invalid format')) {
        toast.warn('Sai định dạng');
      } else if (err.message.includes('unauthorize')) {
        toast.warn('Danh sách niên khoá/lớp không nằm trong quyền hạn của bạn');
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button variant="outlined" onClick={noop} disabled={uploading}>
        Tải file lên
      </Button>
      <input
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        disabled={uploading}
        onChange={e => onUploadFile(e.target.files?.[0])}
        style={{
          width: '100px',
          height: '30px',
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
        }}
      />
    </Box>
  );
};

export default UploadMemeberFileButton;
