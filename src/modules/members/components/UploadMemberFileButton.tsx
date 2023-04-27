import { Box, Button, Typography } from '@mui/material';
import {
  currentTenantDataAtom,
  currentUserInformationDataAtom,
} from '@share/states';
import { parseXLSX } from '@share/utils/parseXLSX';
import * as XLSX from 'xlsx';
import { noop } from 'lodash/fp';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useCreateManyMember from '../hooks/useCreateManyMember';
import useGetMemberList from '../hooks/useGetMemberList';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';
import Link from '@share/components/NextLinkV2';
import { TEMPLATE_FILE } from '../constants';
import { useTheme } from '@mui/material';
import { getGradeListParamsAtom } from 'src/modules/gradeAndClass/state';

const LOADING_TOAST_ID = 'member file';

const UploadMemeberFileButton = () => {
  const theme = useTheme();
  const [uploading, setUploading] = useState(false);
  const [importResult, setImportResult] = useState<any>();

  const setParams = useSetRecoilState(getGradeListParamsAtom);
  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);
  const currentUser = useRecoilValue(currentUserInformationDataAtom);
  const classList = currentUser?.alumniToClass?.map(ref => ref.alumClass);
  const gradeList = currentUser?.gradeMod?.map(ref => ref.grade);

  const { data: gradeData } = useGetGradeList();

  useEffect(() => {
    setParams(prev => ({ ...prev, limit: 99 }));
  }, []);

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
      data.forEach((d: any, index) => {
        if (index < 2) {
          return;
        }
        if (
          data.find(
            (d2: any, index2) =>
              d2?.[4] === d?.[4] && d?.[4] && index !== index2,
          )
        ) {
          throw new Error(`Email ${d?.[4]} bị trùng`);
        }
      });

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

      const existingAlumni = await createManyMember({
        data: formattedData,
        tenantId: tenantId,
      });

      if (existingAlumni.length > 0) {
        const existingData = data.splice(0, 2);
        existingAlumni.forEach((al: any, index) => {
          const excelData = data.find((d: any) => d?.[4] === al.email);
          existingData.push(excelData);
        });
        setImportResult(existingData);
      } else {
        setImportResult(formattedData.length);
      }

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

  const downloadResult = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(importResult);
    workbook.SheetNames.push('Sheet 1');
    workbook.Sheets['Sheet 1'] = worksheet;
    XLSX.writeFile(workbook, 'existed.xlsx');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(2),
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Button variant="outlined" onClick={noop} disabled={uploading}>
          Tải file lên
        </Button>
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          disabled={uploading}
          onChange={e => onUploadFile(e.target.files?.[0])}
          onClick={(e: any) => {
            e.target.value = null;
          }}
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

      <Link href={TEMPLATE_FILE} target="_blank">
        File mẫu
      </Link>

      {importResult && importResult.length > 2 ? (
        <Button onClick={downloadResult} color="warning">
          Có {importResult.length - 2} email đã tồn tại
        </Button>
      ) : null}
      {importResult && typeof importResult === 'number' ? (
        <Typography>Đã tải lên thành công {importResult} thành viên</Typography>
      ) : null}
    </Box>
  );
};

export default UploadMemeberFileButton;
