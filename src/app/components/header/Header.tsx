import React, { useEffect, useState } from 'react'
import logo from "../../../../public/assets/logo.png"
import Image from 'next/image'
import {  FaUserAlt } from 'react-icons/fa'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import SwitchMode from './SwitchMode'

const Header = () =>  {
  const [user, setUser] = useState<{ name?: string }>({})
  const [logut,setLogout] =useState(false)
  const router  = useRouter()
  async function getUserInfo(accessToken: string | undefined){
    try {
      const res = await axios.get("http://localhost:3001/auth/current-user",{
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      setUser(res.data)
    } catch (e) {
      console.log(e)
    }
   }

  function handleLogout() {
    deleteCookie('accessToken');
    setUser({});
    router.push('/auth/sign-up')
  }
   useEffect(()=>{
    const token = getCookie("accessToken")
    getUserInfo(token)
   },[])
  const logOutpopup = (type: boolean) =>{
    setLogout(type)
  }
  return (
    <>
    <div className='bg-[#373B53] flex items-center justify-between lg:flex-col '>
      <Image src={logo} alt='logo' className='w-[72px] h-[72px]' />
      <div className='flex items-center gap-[24px] lg:flex-col lg:justify-center'>
        <SwitchMode />
        {/* <div className='w-full h-[2px] border-l-[1px] border-red-900 '></div> */}
        <div>
        <FaUserAlt onClick={()=>logOutpopup(true)} className='text-[24px] mr-[24px] text-white lg:mr-[0px] lg:mb-[15px]' />
        </div>
      </div>
    </div>
    {logut &&
        <div className="fixed top-0 right-0 left-0 min-h-screen backdrop-blur-md bg-gray-500 bg-opacity-80 z-10  flex flex-col justify-center items-center">
        <div className='flex flex-col w-[70%] md:w-[40%] lg:w-[20%] bg-white p-[15px] rounded-md'>
        <p className='text-center'>{user?.name} are you sure you want to log out?</p>
        <div className='flex justify-between items-center mt-[12px]'>
          <button onClick={()=>logOutpopup(false)} className='bg-blue-400  rounded-[5px] w-[60px] h-[40px] text-white cursor-pointer hover:bg-blue-300'>Cancle</button>
          <button onClick={handleLogout} className='bg-red-400  rounded-[5px] w-[80px] h-[40px] text-white cursor-pointer hover:bg-red-300'>Log Out</button>
        </div>
      </div>
        </div> 
    }
    </>
  );
}

export default Header