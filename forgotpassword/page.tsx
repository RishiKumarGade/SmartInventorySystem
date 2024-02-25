'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import "@/cssFiles/homeanimations.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');

  const forgotPassword = () => {
    if (!email) {
      toast.error('Please enter email');
      return;
    }
    try {
      axios.post('/api/users/forgotpassword', { email }).then(() => {
        console.log('sent email, click the link to change password');
        toast.success('Sent email, click the link to change password');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-5 px-52 py-15 rounded-full fade-in bg-[#b7c2f3]">
        <div className="mb-2">
          <label className="block text-sm font-semibold text-left text-black text-xl">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-2 mt-2 bg-[#DCD6F7] rounded-md text-black focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-7"> {/* Adjust the margin here */}
          <button onClick={(e) => { e.preventDefault(); forgotPassword(); }} className="btn w-40 h-12 bg-[#8294e7] rounded-full outline-none cursor-pointer text-lg hover:bg-[#dde2f7] font-semibold text-white">
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}