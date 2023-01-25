'use client';
import { signOut } from "next-auth/react"

import VerifyAccountStepper from '@share/components/VerifyAccountStepper';

const VerifyAccountPage = () => {
  return (
    <>
    <button onClick={() => signOut()}>Sign out</button>
    <VerifyAccountStepper/>

    </>
  );
};

export default VerifyAccountPage;
