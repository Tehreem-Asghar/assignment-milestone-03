import React from 'react';

export function Footer() {
  return (
    <div className='h-20 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center mt-10 shadow-lg'>
      <p className='text-center text-lg'>
        &copy; {new Date().getFullYear()} Delicious Recipes Blog. All Rights Reserved.
      </p>
    </div>
  );
}
