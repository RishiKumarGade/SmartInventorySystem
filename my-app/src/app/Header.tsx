'use client';
import React, { useEffect, useState } from 'react';


export default function Header() {
 
  return(
    <>
    <header className="bg-[#ffffff30] rounded-[19px] m-8 h-20  flex flex-col justify-evenly">
        <nav className="text-white flex items-center justify-between px-12 h-15 ">
            <div className="logo flex items-center">
                <a href="#" className="text-2xl font-bold px-2 py-1 ml-3">CodeCraft</a>
            </div>
            <div id="nav-items">
                <ul className="flex flex-row gap-8 items-center">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li>
                        <form className="flex items-center">
                            <div className="relative w-full">
                                
                                <input type="text" id="simple-search"
                                    className="bg-black-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full ps-10 p-2.5 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                                    placeholder="Find something" required />
                            </div>
                            <button type="submit"
                                className="p-2.5 ms-2 text-sm font-medium text-white bg-[#ffffff40] rounded-lg border border-black-700 hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black-300 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    </>
  )
}
