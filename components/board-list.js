"use client";
import { TbLayoutBoardSplit } from "react-icons/tb";

export default function BoardList({ boards, open }) {
  return (
    <div>
      {boards.map((board) => (
        <div
          key={board.id}
          className="bg-white w-full h-12 flex rounded-r-full"
        >
          <TbLayoutBoardSplit className="text-med-gray text-xl self-center ml-4" />
          <p className="self-center ml-4 text-med-gray font-bold">
            {board.name}
          </p>
        </div>
      ))}
    </div>
  );
}
