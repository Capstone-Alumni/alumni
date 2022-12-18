"use client"
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        Init login by Gmail
      </div>
      {
        !session && (
          <button onClick={() => signIn("google")} style={{ backgroundColor: 'black' }}>Login by Gmail</button>
        )
      }
      {session && (
        <>
          <p className="text-zinc-500">Hello {session?.user?.name}</p>
          <button onClick={() => signOut()} style={{ backgroundColor: 'black' }}>Logout</button>
        </>
      )
      }
    </div>
  )
}

export default Home;
