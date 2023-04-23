import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPublicEventListParamsAtom } from '../states';
import {
  EventParticipant,
  GetPublicEventParticipantListParams,
} from '../types';

type PublicGetEventParticipantListParams =
  GetPublicEventParticipantListParams & {
    eventId: string;
  };

type PublicGetEventParticipantListResponse = {
  data: {
    totalItems: number;
    items: EventParticipant[];
    itemPerPage: number;
  };
  status: true;
};

type PublicGetEventParticipantListError = AxiosError;

const usePublicGetEventParticipantList = (eventId: string) => {
  const params = useRecoilValue(getPublicEventListParamsAtom);
  const resetParams = useResetRecoilState(getPublicEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    PublicGetEventParticipantListParams,
    PublicGetEventParticipantListResponse,
    PublicGetEventParticipantListError
  >(`publicGetEventParticipantList/${eventId}`, ({ eventId, ...params }) => ({
    method: 'GET',
    url: `/api/events/public/${eventId}/participants`,
    params,
  }));

  useEffect(() => resetParams, []);

  useEffect(() => {
    fetchApi({ ...params, eventId });
  }, [params]);

  const reload = () => {
    fetchApi({ ...params, eventId });
  };

  return {
    isLoading,
    fetchApi,
    data,
    reload,
  };
};

export default usePublicGetEventParticipantList;
