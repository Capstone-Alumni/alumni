import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type ResendInvitationMemberByIdDataParams = {
  tenantId: string;
  alumniId: string;
};

type ResendInvitationMemberByIdDataResponse = unknown;

type ResendInvitationMemberByIdDataError = unknown;

const useResendInvitationMemberById = () => {
  const { fetchApi, isLoading } = useApi<
    ResendInvitationMemberByIdDataParams,
    ResendInvitationMemberByIdDataResponse,
    ResendInvitationMemberByIdDataError
  >(
    'ResendInvitationMemberById',
    data => ({
      method: 'POST',
      url: '/platformHost/api/resend_invitation',
      data: data,
    }),
    {
      onSuccess: () => {
        toast.success('Đã gửi lời mới');
      },
    },
  );

  return {
    isLoading,
    resendInvitationMemberById: fetchApi,
  };
};

export default useResendInvitationMemberById;
