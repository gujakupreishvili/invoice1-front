"use client"
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FirstSection from './firstSection';
import SecondSection from './secondSection';
import Create from '../create/create';
import Header from "../header/Header"



type SelectedFilter = "Draft" | "Pending" | "Paid";

export default function Dashbord() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<null | string>();
  const [, setUser] = useState({});
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  async function getUserInfo(accessToken: string | undefined) {
    try {
      const res = await axios.get("http://localhost:3001/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleCreateChange = (creating: boolean) => {
    setIsCreating(creating);
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) router.push('auth/sign-up');
    setAccessToken(token);
    getUserInfo(token);
  }, [router]);

  if (!accessToken) return null;

  return (
    <div  className=" flex flex-col lg:flex-row lg:justify-bettwen w-full  lg:gap-[25%] ">
      <Header />
      {isCreating && 
        <Create onBack={() => handleCreateChange(false)} />
      }
        <>
        <div>
          <FirstSection onFilterChange={setSelectedFilters} onCreateChange={() => handleCreateChange(true)}  />
          <SecondSection selectedFilters={selectedFilters}  />
        </div>
        </>
    </div>
  );
}

