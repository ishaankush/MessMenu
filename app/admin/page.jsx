'use client'
import Image from 'next/image'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user');

  console.log({user})
 
  if (!user && !userSession){
    router.push('/sign-in')
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    <button
      onClick={() => {
        signOut(auth);
        sessionStorage.removeItem('user');
      }}
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
    Log out
    </button>
    <button
      onClick={() => {
        router.push('/');
      }}
    className="p-3 bg-red-700 rounded text-white hover:bg-indigo-500 mt-2">
    Home
    </button>
    <h1>Welcome to the OWNER PAGE </h1>
    
    </main>
  )
}
