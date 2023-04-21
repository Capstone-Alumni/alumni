import { toast } from 'react-toastify';
import cuid from 'cuid';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';
import useCreateManyMemberTenant from './useCreateManyMemberTenant';
// import { Alumni } from '@share/states';

type CreateManyMemberParams = {
  tenantId: string;
  data: MemberFormValues[];
};

type CreateManyMemberResponse = {
  data: {
    newAlumni: Array<MemberFormValues & { alumniId: string }>;
    existingAlumni: Array<MemberFormValues & { alumniId: string }>;
  };
  status: boolean;
};

type CreateManyMemberError = unknown;

const useCreateManyMember = () => {
  const { createManyMemberTenant } = useCreateManyMemberTenant();

  const { fetchApi, isLoading } = useApi<
    CreateManyMemberParams,
    CreateManyMemberResponse,
    CreateManyMemberError
  >(
    'createManyMember',
    ({ data, tenantId }) => ({
      method: 'POST',
      url: '/platformHost/api/members/patch',
      data: {
        tenantId,
        data,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
    },
  );

  const createManyMember = async (params: CreateManyMemberParams) => {
    // write list ko co email
    const tenantMember = params.data
      .filter(d => !d.email)
      .map(d => ({ ...d, tenantId: params.tenantId, alumniId: cuid() }));

    const platformMember = params.data.filter(d => d.email);
    const res = await fetchApi({
      data: platformMember,
      tenantId: params.tenantId,
    });

    if (res?.status) {
      // dual write new alumni
      const { newAlumni } = res.data;
      const dualWriteAlumni = newAlumni.concat(tenantMember);
      await createManyMemberTenant({ data: dualWriteAlumni });

      // tao file excel existin
      const { existingAlumni } = res.data;
      return existingAlumni;
    }
    return [];
  };

  return {
    isLoading,
    createManyMember,
  };
};

export default useCreateManyMember;
