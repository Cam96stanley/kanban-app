"use client";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { TbLayoutBoardSplit } from "react-icons/tb";

export default function HamMenu() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`fixed bg-white top-21 left-0 h-full ${
          open ? "w-75" : "w-0"
        }`}
      >
        <div
          className="bg-purple flex rounded-r-2xl w-14 h-12 absolute -right-14 top-[75%] cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <FaRegEye className="text-white self-center m-auto text-2xl" />
        </div>
        {open && (
          <div>
            <p className="text-med-gray ml-6 text-[12px] tracking-widest font-bold">
              All Boards (3)
            </p>
            <div className="mt-6">
              <div className="bg-purple w-50 h-8 flex rounded-r-2xl">
                <TbLayoutBoardSplit className="text-white text-2xl self-center ml-4" />
                <p className="self-center ml-4 text-[14px] text-white font-bold">
                  Hello
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
