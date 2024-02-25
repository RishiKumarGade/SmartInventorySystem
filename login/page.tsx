"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Input } from "@/components copy/ui/input";
import { Button } from "@/components/ui/button";
import log from '@/images/log.png';
import "@/cssFiles/homeanimations.css";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("api/users/login", user).then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message, { icon: "👏" });
        } else {
          toast.success("Login Successful");
          location.reload();
          router.push("/");
        }
      });
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
       <div className="felx flex-cols-2 content gap-1 mt-20 px-52 py-15 fade-in">
      <div className="flex flex-col-reverse md:flex-row w-full">
          <div className="w-2/3 p-4 m-auto bg-transparent rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-[#b5daff] ">
              {loading ? 'processing' : 'LogIn'}
            </h1>
            <h1 className="text-xl font-normal text-center text-[#b5daff] mt-5">
              {loading ? 'processing' : 'Sign in to continue'}
            </h1>
            <form className="mt-6 flex flex-col">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-left text-white">
                  Email
                </label>
                <Input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  className="w-full px-4 py-2 mt-2 bg-white rounded-md text-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-left">
                  Password
                </label>
                <Input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  type="password"
                  className="w-full px-4 py-2 mt-2 bg-white rounded-md text-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <p className="remember-forgot-link flex text-sm justify-between my-4">
                <Link href="/forgotpassword" className=" font-semibold hover:underline mr-4">
                  Forgot password?
                </Link>
                <label htmlFor="remember" className=" font-semibold">
                  <input type="checkbox" id="remember" className="mr-1" />
                  Remember me
                </label>
              </p>
              <div className="mt-6">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onLogin();
                  }}
                  className="btn w-full h-12 bg-[#00adf1] rounded-full outline-none cursor-pointer text-lg hover:bg-[#37bcf8] font-semibold text-white"
                >
                  Login
                </Button>
              </div>
            </form>
            <p className="register-link text-sm text-center my-4">
              {" "}
              Don't have an account?{" "}
              <Link href="/signup" className='" font-semibold hover:underline'>
                SignUp!
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row w-full">
          <div className="wrapper bg-transparent rounded-lg md:w-1/2 px-6 py-8 text-white">
          </div>
        </div>
        </div>
    </>
  );
}
