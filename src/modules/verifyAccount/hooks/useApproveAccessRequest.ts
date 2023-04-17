import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest } from '../types';
import useCreateMemberPlatform from 'src/modules/members/hooks/useCreateMemberPlatform';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';

type ApproveAccessRequestParams = {
  id: string;
};

type ApproveAccessRequestResponse = {
  data: AccessRequest;
};

type ApproveAccessRequestError = unknown;

const useApproveAccessRequest = () => {
  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);
  const { createMemberPlatform } = useCreateMemberPlatform();

  const { fetchApi, isLoading } = useApi<
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
        createAccount(data);
      },
    },
  );

  const createAccount = async (data: AccessRequest) => {
    // TODO: change the subject and text to be more realistics
    if (!data.alumniId && data.password) {
      await createMemberPlatform({
        fullName: data.fullName,
        gradeClass: [
          {
            grade: [
              {
                id: data.alumClass?.gradeId || '',
                value: data.alumClass?.gradeId || '',
                label: data.alumClass?.gradeId || '',
              },
            ],
            alumClass: [
              {
                id: data.alumClassId,
                value: data.alumClassId,
                label: data.alumClassId,
              },
            ],
          },
        ],
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        tenantId: tenantId,
        password: data.password,
      });
    }
  };

  return {
    isLoading,
    approve: fetchApi,
  };
};

export default useApproveAccessRequest;
