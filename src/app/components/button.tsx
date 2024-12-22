"use client";
import React from "react";

function Button() {
  return (
    <button
      onClick={() => {
        const targetSection = document.getElementById("blogs");
        targetSection?.scrollIntoView({ behavior: "smooth" });
      }}
      className="h-[38px] w-[124px] p-1 bg-[#FE4A51] mt-3 text-white"
    >
      View Recipes
    </button>
  );
}

export default Button;
