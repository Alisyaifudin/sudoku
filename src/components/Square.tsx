/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setValue } from "../redux/gameSlice";

interface SquareProps {
  value: number | null;
  index: number;
}

function Square({ value, index }: SquareProps) {
  const dispatch = useAppDispatch();
  const pointer = useAppSelector((state) => state.game.pointer);
  const history = useAppSelector((state) => state.game.history);
  const original = history[0]!.state;

  const invalid = pointer < history.length ? history[pointer]!.invalid : [];
  const end = useAppSelector((state) => state.game.end);
  const invalidIndices = [
    ...invalid.map((i) => i.columnIndex),
    ...invalid.map((i) => i.rowIndex),
    ...invalid.map((i) => i.squareIndex),
  ].flat();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.type)
    const val = Number(e.target.value);
    if (e.target.value === "") dispatch(setValue({ index, value: null }));
    if (!val || val < 1 || val % 10 === 0 || !!original[index]) return;
    dispatch(setValue({ index, value: val % 10 }));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      dispatch(setValue({ index, value: null }));
    }
  };
  return (
    <input
      disabled={!!original[index] || end}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      type="number"
      value={value || ""}
      className={`aspect-square cursor-default border border-solid border-black text-center text-2xl caret-transparent focus:bg-yellow-300
      ${invalidIndices.includes(index) ? "bg-red-300 text-gray-500" : ""}
      ${index % 3 === 2 && "border-r-4"} ${index % 9 === 0 && "border-l-4"} ${
        Math.floor((index / 9) % 3) === 2 && "border-b-4"
      } && ${Math.floor(index / 9) === 0 && "border-t-4"} && ${
        !!original[index] && "font-bold"
      }
      `}
    ></input>
  );
}

export default Square;
