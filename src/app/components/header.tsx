import React from 'react';
import { Playfair_Display } from "next/font/google";
import { MdFoodBank } from "react-icons/md";

const styleScript = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});


export function Header() {
  return (
  
    <div className={`h-16 max-w-[1536px] mx-auto w-full bg-[#FE4A51] flex items-center justify-between text-[#f5f0ed] font-sans    px-2 md:text-3xl sm:text-2xl text-[18px]  font-bold shadow-lg ${styleScript.className}`}>
      <p>Delicious Recipes Blog</p>

      <MdFoodBank className='text-[50px] mr-4'/>
    </div>
    
  );
}

