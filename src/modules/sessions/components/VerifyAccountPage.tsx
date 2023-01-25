'use client';
import { signOut } from "next-auth/react"

import VerifyAccountStepper from '@share/components/VerifyAccountStepper';

const VerifyAccountPage = () => {
  return <VerifyAccountStepper />;
};

export default VerifyAccountPage;
