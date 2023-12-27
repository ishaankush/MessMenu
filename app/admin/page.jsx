'use client'
import Image from 'next/image'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { push,ref,set,get, DataSnapshot } from 'firebase/database';
import { useState,useEffect } from 'react';
import { database } from '../firebase/config';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  const [title,setTitle] =useState("");
  const [desc,setDesc] = useState("");
  const [users, setUsers] = useState([]);

  console.log({user})
 
  if (!user && !userSession){
    router.push('/sign-in')
  }
  
  useEffect(() => {
        const usersRef = ref(database, "users");
        get(usersRef).then((snapshot) => {
          if(snapshot.exists()){
            const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
              id,
              ...data,
            }));
            setUsers(usersArray);
          } else{
            console.log('no data received');
          }
          
        }).catch((error) => {
          console.error(error);
        });
      },[]);


  const handleAddData =()=>{
    try {
      const usersRef = ref(database, "users");
      const newDataRef = push(usersRef);

      set(newDataRef,{
        title: title,
        desc: desc,
      });
      alert('Menu added successfully');
    } catch (error) {
      console.error('Firebase Error: ',error);
    }
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

    
      <h1>Add Data </h1>
      <div className='mb-4'>
        <input type="text" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} className='w-full border p-2 text-black' />
        <input type="text" placeholder='Desc' value={desc} onChange={(e)=> setDesc(e.target.value)} className='w-full border p-2 text-black' />
        <button onClick={handleAddData} className='bg-blue-500 text-white p-2 rounded' > Add menu Item</button>
      </div>

      <div>
        <h2>Menu Items:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.title}</strong>: {user.desc}
            </li>
          ))}
        </ul>
      </div>

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
