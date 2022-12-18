/* eslint-disable no-underscore-dangle */
import { atomFamily } from 'recoil';
import {
  ApiCallFailedState, ApiCallIdleState, ApiCallPendingState, ApiCallState, ApiCallSuccessState,
} from './types';

export const apiCallAtomFamily = atomFamily<ApiCallState<any, any, any>, string>({
  key: 'apiCall',
  default: (name) => ({
    _state: 'idle',
    name,
    params: null,
    data: null,
    error: null,
    isFetching: false,
  }),
});

export const isIdle = (
  state: ApiCallState<unknown, unknown, unknown>,
): state is ApiCallIdleState => state._state === 'idle';

export const isPending = <Params>(
  state: ApiCallState<Params, unknown, unknown>,
): state is ApiCallPendingState<Params> => state._state === 'pending';

export const isSuccess = <Params, Data>(
  state: ApiCallState<Params, Data, unknown>,
): state is ApiCallSuccessState<Params, Data> => state._state === 'success';

export const isFailed = <Params, Err>(
  state: ApiCallState<Params, unknown, Err>,
): state is ApiCallFailedState<Params, Err> => state._state === 'failed';
