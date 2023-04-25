import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest } from '../types';
import useCreateMemberPlatform from 'src/modules/members/hooks/useCreateMemberPlatform';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import { useState } from 'react';

type ApproveAccessRequestParams = {
  id: string;
};

type ApproveAccessRequestResponse = {
  data: AccessRequest;
};

type ApproveAccessRequestError = unknown;

const useApproveAccessRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);
  const { createMemberPlatform } = useCreateMemberPlatform();

  const { fetchApi } = useApi<
    ApproveAccessRequestParams,
    ApproveAccessRequestResponse,
    ApproveAccessRequestError
  >(
    'approveAccessRequest',
    ({ id }) => ({
      method: 'PUT',
      url: `/api/access_requests/${id}/approve`,
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      onSuccess: ({ data }) => {
        toast.info('Yêu cầu đã được chấp nhận');
      },
    },
  );

  const createAccount = async (data: AccessRequest) => {
    if (!data.alumniId && data.email) {
      const toastId = 'create-membet';
      toast.loading('Đang khởi tạo tài khoản cho cựu học sinh', {
        toastId: toastId,
      });
      await createMemberPlatform({
        fullName: data.fullName,
        gradeClass: [
          {
            grade: {
              id: data.alumClass?.gradeId || '',
              value: data.alumClass?.gradeId || '',
              label: data.alumClass?.gradeId || '',
            },
            alumClass: {
              id: data.alumClassId,
              value: data.alumClassId,
              label: data.alumClassId,
            },
          },
        ],
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        tenantId: tenantId,
      });
      toast.dismiss(toastId);
    }
  };

  const approve = async (params: ApproveAccessRequestParams) => {
    setIsLoading(true);
    const res = await fetchApi(params);
    if (res?.data) {
      await createAccount(res.data);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    approve,
  };
};

export default useApproveAccessRequest;
