import React from 'react';

export function Footer() {
  return (
    <div className='h-20  max-w-[1536px] mx-auto w-full bg-[#FE4A51] text-white flex items-center justify-center shadow-lg'>
      <p className='text-center text-lg'>
        &copy; {new Date().getFullYear()} Delicious Recipes Blog. All Rights Reserved.
      </p>
    </div>
  );
}
