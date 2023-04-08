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
    setUploading(true);
    toast.loading('Đang xử lý', { toastId: LOADING_TOAST_ID });

    if (!file) {
      return;
    }

    const jsonData = await parseXLSX(file);

    // format data
    const data = Object.values(jsonData);

    // precheck header
    const formattedData = data.reduce((red: any[], item: any, index) => {
      if (index === 0) {
        return red;
      }

      if (item[1].length === 0 || item[2].length === 0) {
        return red;
      }

      return [...red, { gradeCode: item[1], className: item[2] }];
    }, []);

    if (formattedData.length === 0 && data.length > 1) {
      toast.dismiss(LOADING_TOAST_ID);
      toast.warn('Sai định dạng');
    }

    console.log(formattedData);

    // toast.update(LOADING_TOAST_ID, {
    //   render: `Đang xử lý (0/${formattedData.length})`,
    // });

    await createManyGrade({ data: formattedData });

    toast.dismiss(LOADING_TOAST_ID);
    setUploading(false);

    reload();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button variant="outlined" onClick={noop} disabled={uploading}>
        Tải file lên
      </Button>
      <input
        type="file"
        accept="xlsx"
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

export default UploadGradeFileButton;
