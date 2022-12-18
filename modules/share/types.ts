export type ApiCallIdleState = {
  readonly _state: 'idle';
  readonly name: string;
  readonly params: null;
  readonly data: null;
  readonly error: null;
}

export type ApiCallPendingState<Params> = {
  readonly _state: 'pending';
  readonly name: string;
  readonly params: Params;
  readonly data: null;
  readonly error: null;
}

export type ApiCallSuccessState<Params, Data> = {
  readonly _state: 'success';
  readonly name: string;
  readonly params: Params;
  readonly data: Data;
  readonly error: null;
}

export type ApiCallFailedState<Params, Err> = {
  readonly _state: 'failed';
  readonly name: string;
  readonly params: Params;
  readonly data: null;
  readonly error: Err;
}

export type ApiCallState<Params, Data, Err> =
  | ApiCallIdleState
  | ApiCallPendingState<Params>
  | ApiCallSuccessState<Params, Data>
  | ApiCallFailedState<Params, Err>
