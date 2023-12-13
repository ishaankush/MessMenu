'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <button
      onClick={() => {
        router.push('/admin');
      }}
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
    Owner Log in
    </button>
    <h1>Welcome to the app</h1>

    </main>
  )
}
