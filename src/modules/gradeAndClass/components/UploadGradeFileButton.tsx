import { Box, Button } from '@mui/material';
import { parseXLSX } from '@share/utils/parseXLSX';
import { noop } from 'lodash/fp';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCreateManyGrade from '../hooks/useCreateManyGrade';
import useGetGradeList from '../hooks/useGetGradeList';

const LOADING_TOAST_ID = 'grade file';

const UploadGradeFileButton = () => {
  const [uploading, setUploading] = useState(false);

  const { createManyGrade } = useCreateManyGrade();
  const { reload } = useGetGradeList();

  const onUploadFile = async (file?: File) => {
    if (!file) {
      return;
    }

    setUploading(true);
    toast.loading('Đang xử lý', { toastId: LOADING_TOAST_ID });

    const jsonData = await parseXLSX(file);

    // format data
    const data = Object.values(jsonData);

    // precheck header
    const formattedData = data.reduce((red: any[], item: any, index) => {
      if (index === 0 || index === 1) {
        return red;
      }

      // Contains all item
      if (item.length < 4) {
        return red;
      }

      // Start year
      if (typeof item[2] !== 'number') {
        return red;
      }

      // valid class list
      for (let i = 3; i + 1 < item.length; ++i) {
        if (typeof item[i] !== 'string') {
          return red;
        }

        if (item[i].length === 0 && item[i + 1].length > 0) {
          return red;
        }
      }

      return [
        ...red,
        {
          code: item[1],
          startYear: item[2] - 3,
          endYear: item[2],
          classNameList: item.slice(3, -1),
        },
      ];
    }, []);

    if (formattedData.length < data.length - 2) {
      toast.dismiss(LOADING_TOAST_ID);
      toast.warn('Sai định dạng');
    } else {
      await createManyGrade({ data: formattedData });
      reload();

      toast.dismiss(LOADING_TOAST_ID);
    }
    setUploading(false);
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
  );
};

export default UploadGradeFileButton;
