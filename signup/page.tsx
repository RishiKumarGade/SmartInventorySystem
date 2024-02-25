"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import "@/cssFiles/homeanimations.css";
import { Button } from "@/components/ui/button";

import { Input } from "@/components copy/ui/input";


export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSignup = async () => {
    if (user.email == "" || user.password == "" || user.username == "") {
      toast.error("please fill all the fields");
      return;
    }
    try {
      const t = toast.loading("please wait...");
      setLoading(true);
      axios.post("api/users/signup", user).then(() => {
        toast.dismiss(t);
        toast.success("user successfully created");
        onLogin();
      });
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="felx flex-cols-2 content gap-1 mt-20 px-52 py-15 fade-in">
      <div className="flex flex-col-reverse md:flex-row w-full">
            <div className="w-2/3 p-4 m-auto bg-transparent rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl mt-5 font-semibold text-center text-[#b5daff] ">
              {loading ? "processing" : "Create new Account"}
            </h1>
            <form className="mt-6 text-left">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-white">
                  UserName
                </label>
                <Input
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  type="text"
                  className="w-full px-4 py-2 mt-2 bg-white rounded-md text-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-white">
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
                <label className="block text-sm font-semibold text-white">
                  Password
                </label>
                <Input
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type="password"
                  className="w-full px-4 py-2 mt-2 bg-white rounded-md text-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <p className="remember-forgot-link flex text-sm justify-between my-4">
                <Link
                  href="/forgotpassword"
                  className="text-white font-semibold hover:underline mr-4"
                >
                  Forgot password?
                </Link>
                <label htmlFor="remember" className="text-white font-semibold">
                  <input type="checkbox" id="remember" className="mr-1" />
                  Remember me
                </label>
              </p>
              <div className="mt-6">
                <Button
                  className="btn w-full mt-4 h-12 bg-[#00adf1] rounded-full outline-none cursor-pointer text-lg hover:bg-[#37bcf8] font-semibold text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    onSignup();
                  }}
                >
                  {buttonDisabled ? "Signup!" : "signup"}
                </Button>
              </div>
            </form>
            <p className="register-link text-sm text-[#b5daff] text-center my-4">
              {" "}
              Already have an account?{" "}
              <Link
                href="/login"
                className='"text-white font-semibold hover:underline'
              >
                Login!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
