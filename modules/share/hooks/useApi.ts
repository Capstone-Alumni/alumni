import isEqual from 'lodash/fp/isEqual';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useRef } from 'react';
import {
  RecoilState, useRecoilCallback, useRecoilValue, useResetRecoilState,
} from 'recoil';
import { apiCallAtomFamily, isPending } from 'share/state';
import { ApiCallState } from 'share/types';
import formatSearchParams from 'share/utils/formatParams';
import { getUserInformation, logOut } from 'share/utils/cookies';
import history from 'BrowserHistory';

export type ApiConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  params?: any;
  headers?: any;
  data?: any;
  useToken: boolean;
};

export type AxiosConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers: any;
  data?: any;
  cancelToken: any;
};

export type ApiOptions = {
  retainOnUnmount: boolean;
};

const useApi = <Params, Data, Err>(
  apiName: string,
  generateApiConfig: (params: Params) => ApiConfig,
  apiOptions: ApiOptions,
) => {
  type ApiState = ApiCallState<Params, Data, Err>;
  type ApiAtom = RecoilState<ApiState>;

  const abortController = useRef<null | CancelTokenSource>(null);
  const apiCallAtom: ApiAtom = apiCallAtomFamily(apiName);
  const apiCallState: ApiState = useRecoilValue(apiCallAtom);
  const resetApiCallState = useResetRecoilState(apiCallAtom);

  const transformAxiosConfig = ({
    method, url, params, data, headers, useToken,
  }: ApiConfig): AxiosConfig => {
    const config: AxiosConfig = {
      method,
      url: params ? url + formatSearchParams(params) : url,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
      cancelToken: abortController.current?.token,
    };

    if (useToken) {
      config.headers.Authorization = getUserInformation('AuthToken');
    }

    return config;
  };

  const callApi = useRecoilCallback(
    ({ snapshot, set }) => async (params: Params) => {
      // If is calling api with the same param -> abort
      const apiState = snapshot.getLoadable(apiCallAtom).valueMaybe();

      if (apiState && isPending(apiState)) {
        if (isEqual(params, apiState.params)) {
          const error = new Error('Deduplication');
          error.name = 'DedupError';
          throw error;
        }

        abortController.current?.cancel('Deduplication');
      }

      // generate request config
      abortController.current = axios.CancelToken.source();

      const apiConfig = generateApiConfig(params);
      const axiosConfig = transformAxiosConfig(apiConfig);

      // set status pending
      set(apiCallAtom, {
        _state: 'pending',
        name: apiName,
        params,
        data: null,
        error: null,
      });

      // call http/https request
      try {
        const response = await axios(axiosConfig);
        const { data } = response;

        const newApiState: ApiState = {
          _state: 'success',
          name: apiName,
          params,
          data,
          error: null,
        };

        set(apiCallAtom, newApiState);
        return newApiState;
      } catch (error: any) {
        if (!error.response) {
          throw new Error(error.message);
        }

        const { response } = error;

        if (response
          && response.data
          && response.data.message
          && response.data.message.includes('Found another login')) {
          logOut();
          history.push('/');
          window.location.reload();
        }

        const newApiState: ApiState = {
          _state: 'failed',
          name: apiName,
          params,
          data: null,
          error: response.data.message,
        };
        set(apiCallAtom, newApiState);
        return newApiState;
      }
    },
    [],
  );

  // cache
  useEffect(() => () => {
    if (apiOptions.retainOnUnmount) {
      resetApiCallState();
    }
  }, []);

  return [callApi, apiCallState] as const;
};

export default useApi;
