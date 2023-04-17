import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useSetSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setSearchParams = (
    params: Array<{
      key: string;
      value: string;
    }>,
  ) => {
    const query = params.map(({ key, value }) => `${key}=${value}`).join('&');
    console.log(query);
    router.push(pathname + '?' + query);
  };

  return {
    setSearchParams,
    createQueryString,
  };
};

export default useSetSearchParams;
