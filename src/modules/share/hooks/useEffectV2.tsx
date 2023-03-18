import { useEffect, useRef } from 'react';

const useEffectV2 = (callback: any, deps: Array<unknown>) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, [...deps]);
};

export default useEffectV2;
