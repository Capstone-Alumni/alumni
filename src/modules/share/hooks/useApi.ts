import { useRecoilState, useRecoilValue } from 'recoil';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import formatSearchParams from '../utils/formatParams';
import { noop } from 'lodash/fp';
import { getSession } from 'next-auth/react';
import {
  currentTenantSubdomainSelector,
  useApiDataAtomFamily,
} from '@share/states';

export type ApiConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params?: object;
  data?: unknown;
  headers?: object;
};

export type AxiosConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers: object;
  data?: unknown;
};

export type ApiOptions<Data, Err, Params> = {
  retainOnUnmount?: boolean;
} & SWRMutationConfiguration<Data, Err, Params, string>;

const useApi = <Params, Data, Err>(
  apiName: string, // should be unique accross the provider
  generateDescription: (params: Params) => ApiConfig,
  apiOptions: ApiOptions<Data, Err, Params> = {
    optimisticData: undefined,
    revalidate: true,
    populateCache: true,
    rollbackOnError: true,
    throwOnError: false,
    onSuccess: noop,
    onError: noop,
    retainOnUnmount: false,
  },
) => {
  const useApiDataAtom = useApiDataAtomFamily<Data>(apiName);
  const [dataAtom, setDataAtom] = useRecoilState(useApiDataAtom);
  const subdomain = useRecoilValue(currentTenantSubdomainSelector);

  const {
    optimisticData,
    revalidate,
    populateCache,
    rollbackOnError,
    throwOnError,
    onSuccess,
    onError,
    retainOnUnmount,
  } = apiOptions;

  const transformAxiosConfig = useCallback(
    async ({
      method,
      url,
      params,
      data,
      headers,
    }: ApiConfig): Promise<AxiosConfig> => {
      const session = await getSession();
      const config: AxiosConfig = {
        method,
        url: params ? url + formatSearchParams(params) : url,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'tenant-id': session?.currentTenant?.tenantId,
          'tenant-userid': session?.user.id, // enhance here
          ...headers,
        },
        data,
      };

      return config;
    },
    [subdomain],
  );

  const fetcher = async (key: string, { arg: params }: { arg: Params }) => {
    const apiConfig = generateDescription(params);
    const axiosConfig = await transformAxiosConfig(apiConfig);

    const response = await axios(axiosConfig);
    const { data } = response;

    return data;
  };

  const { error, trigger, data, reset, isMutating } = useSWRMutation(
    apiName,
    fetcher,
    {
      optimisticData,
      revalidate,
      populateCache,
      rollbackOnError,
      throwOnError,
      onSuccess: (data, key, config) => {
        setDataAtom(data);
        onSuccess?.(data, key, config);
      },
      onError,
    },
  );

  // cache
  useEffect(
    () => () => {
      if (retainOnUnmount) {
        reset();
      }
    },
    [],
  );

  return {
    data: dataAtom,
    error,
    fetchApi: trigger,
    reset,
    isLoading: isMutating,
  };
};

export default useApi;
