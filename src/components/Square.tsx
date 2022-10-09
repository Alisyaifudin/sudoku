import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setIndex, setValue } from "../redux/gameSlice";

interface SquareProps {
  value: number | null;
  index: number;
}

function Square({ value, index }: SquareProps) {
  const indexClick = useAppSelector((state) => state.game.index);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(setIndex(index));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (e.target.value === "") dispatch(setValue({ index, value: null }));
    if (!val || val < 1 || val % 10 === 0) return;
    dispatch(setValue({ index, value: val % 10 }));
  };
  return (
    <input
      onClick={handleClick}
      onChange={handleChange}
      value={value || ""}
      className={`aspect-square border border-solid border-black text-center text-2xl ${
        index % 3 === 2 && "border-r-4"
      } ${index % 9 === 0 && "border-l-4"} ${
        Math.floor((index / 9) % 3) === 2 && "border-b-4"
      } && ${Math.floor(index / 9) === 0 && "border-t-4"}
      ${indexClick === index && "bg-yellow-300"}`}
    ></input>
  );
}

export default Square;
