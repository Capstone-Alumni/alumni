'use client';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { useGetUsersProfileQuery } from 'src/redux/slices/searchProfiles';

// ----------------------------------------------------------------------

const SeachPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const usersProfileResponse = useGetUsersProfileQuery(name);

  const handleRenderUsersProfile = () => {
    if (!usersProfileResponse.isLoading && usersProfileResponse?.data?.data) {
      console.log(usersProfileResponse?.data?.data?.items);
      return usersProfileResponse?.data?.data?.items?.map((user: any) => {
        return (
          <Link href={`/profile/${user.id}`} style={{ color: 'inherit' }}>
            {user.fullName}
          </Link>
        );
      });
    }
  };

  return (
    <>
      <h5>Your are searching: {name}</h5>
      {usersProfileResponse.isLoading && <p>Loading</p>}
      {handleRenderUsersProfile()}
    </>
  );
};

export default SeachPage;
