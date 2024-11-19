"use client";
import React, { useState } from "react";
import logo from "../../../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { MdErrorOutline } from "react-icons/md";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SignupvalidationSchema } from "../../../utils/validation/signupvalidation";
import SwitchMode from "@/app/components/header/SwitchMode";

const initialValue = {
  name: "",
  email: "",
  password: "",
};
export default function SignUp() {
  const router  = useRouter()

  const [error, setError] =useState('')

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/auth/sign-up", values)
        if(res.status === 400){
          setError('user exists')
          return
        }
        router.push('/auth/sign-in')
        
      } catch (e: unknown) {
        if (e instanceof AxiosError && e.response) {
          console.log(e);
          setError(e.response.data.message);
        } else {
          console.log(e);
          setError("An unknown error occurred");
        }
      }
    },
    validationSchema: SignupvalidationSchema,
  });

  const { handleBlur, handleChange, handleSubmit, values, errors } = formik;
  return (
    <>
    <div className="absolute right-3 top-4">
      <SwitchMode/>
    </div>
    
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col items-center dark:bg-[#1E2139] bg-white rounded-[5px] p-[24px] gap-[22px] shadow-2xl"
      >
        <Image src={logo} alt={"logo"} className="w-[40px] h-[40px]" />
        <div className="relative w-[250px]">
          <input
            type="text"
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your name..."
            className={`border p-2 rounded w-[250px] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name ? (
            <MdErrorOutline className="text-red-500 absolute right-2 top-[12px] text-[17px]" />
          ) : (
            ""
          )}
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="relative w-[250px]">
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email..."
            className={`border p-2 rounded w-[250px]  ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email ? (
            <MdErrorOutline className="text-red-500 absolute right-2 top-[12px] text-[17px]" />
          ) : (
            ""
          )}
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="relative w-[250px]">
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password..."
            className={`border p-2 rounded w-[250px]  ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password ? (
            <MdErrorOutline className="text-red-500 absolute right-2 top-[12px] text-[17px]" />
          ) : (
            ""
          )}
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <p className="text-red-500">{error}</p>
        </div>
        <div className="flex w-full justify-between">
          <button  className="px-4 py-2 bg-[#7C5DFA] text-white rounded">
            Sign Up
          </button>
          <Link
            href={"/auth/sign-in"}
            className="px-4 py-2 bg-[#373B53] text-white rounded"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
    </>
  );
}
