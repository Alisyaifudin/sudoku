import React from "react";
import { useAppSelector } from "../redux/app/hooks";

function Title() {
  const end = useAppSelector(state=> state.game.end)
  return (
    <div>
      <h1 className="text-center text-5xl font-bold">Sudoku</h1>
      <p className="text-center text-2xl">&nbsp;{end ? "You won 🥳 ":" "}</p>
    </div>
  );
}

export default Title;
