import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type SendMessageParams = {
  message: string;
  userReceiveMessageId: string;
};
type SendMessageResponse = unknown;

type SendMessageError = AxiosError;

const useSendMessage = () => {
  const router = useRouter();

  const { fetchApi, isLoading, error } = useApi<
    SendMessageParams,
    SendMessageResponse,
    SendMessageError
  >(
    'sendMessage',
    ({ message, userReceiveMessageId }) => ({
      method: 'POST',
      url: `/api/users/${userReceiveMessageId}/ping`,
      data: { message },
    }),
    {
      onError: () => {
        toast.error('Gửi tin nhắn thất bại. Thử lại sau!');
      },
      onSuccess: () => {
        toast.success('Gửi tin nhắn thành công!');
        // router.push('/Jobs/hosting');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useSendMessage;
