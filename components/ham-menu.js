"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa6";
import { BsEyeSlash } from "react-icons/bs";
import AddBoardForm from "./create-board-form";
import BoardList from "./board-list";
import ThemeToggle from "./theme-toggle";

export default function HamMenu() {
  const [open, setOpen] = useState(true);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  const fetchBoards = useCallback(async () => {
    try {
      const res = await axios.get("/api/boards");
      setBoards(res.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleAddBoard = async (boardName) => {
    try {
      await axios.post("/api/boards", { name: boardName });
      fetchBoards();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div
        className={`absolute bg-white top-21 left-0 h-full ${
          open ? "w-75 p-4" : "w-0 p-0"
        }`}
      >
        {open ? (
          <>
            <div className="absolute left-6 top-[74%]">
              <ThemeToggle />
            </div>
            <div
              className="flex rounded-2xl w-50 h-12 absolute left-6 top-[80%] cursor-pointer z-50 justify-center"
              onClick={() => setOpen(!open)}
            >
              <BsEyeSlash className="text-med-gray self-center mr-4 text-2xl" />
              <p className="font-sans text-med-gray self-center">
                Hide Sidebar
              </p>
            </div>
          </>
        ) : (
          <div
            className="bg-purple flex rounded-r-2xl w-14 h-12 absolute -right-14 top-[80%] cursor-pointer z-50"
            onClick={() => setOpen(!open)}
          >
            <FaRegEye className="text-white self-center m-auto text-2xl" />
          </div>
        )}
        <div className={`${!open && "hidden"}`}>
          <p className="text-med-gray text-sm tracking-widest font-bold mt-4">
            All Boards ({boards.length})
          </p>
          <div>
            <BoardList boards={boards} />
            <AddBoardForm onAdd={handleAddBoard} />
          </div>
        </div>
      </div>
    </>
  );
}
