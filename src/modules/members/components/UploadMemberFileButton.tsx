import { Box, Button } from '@mui/material';
import { currentTenantDataAtom } from '@share/states';
import { parseXLSX } from '@share/utils/parseXLSX';
import { noop } from 'lodash/fp';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import useCreateManyMember from '../hooks/useCreateManyMember';
import useGetMemberList from '../hooks/useGetMemberList';
import { getLowerRole } from '../utils';

const LOADING_TOAST_ID = 'member file';

const UploadMemeberFileButton = () => {
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();

  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);

  const { createManyMember } = useCreateManyMember();
  const { reload } = useGetMemberList();

  const roleList = getLowerRole(session?.user.accessLevel);

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

      if (
        item[0].length === 0 ||
        item[1].length < 8 ||
        !roleList.includes(item[2])
      ) {
        return red;
      }

      return [
        ...red,
        { email: item[0], password: item[1], accessLevel: item[2] },
      ];
    }, []);

    if (formattedData.length === 0 && data.length > 1) {
      toast.dismiss(LOADING_TOAST_ID);
      toast.warn('Sai định dạng');
    }

    // toast.update(LOADING_TOAST_ID, {
    //   render: `Đang xử lý (0/${formattedData.length})`,
    // });

    await createManyMember({ data: formattedData, tenantId: tenantId });

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

export default UploadMemeberFileButton;
