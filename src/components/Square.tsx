import React from "react";

interface SquareProps {
  value: number | null;
  index: number;
}

function Square({ value, index }: SquareProps) {
  return (
    <div
      className={`aspect-square border border-solid border-black ${
        index % 3 === 2 && "border-r-4"
      } ${index % 9 === 0 && "border-l-4"} ${
        Math.floor((index / 9) % 3) === 2 && "border-b-4"
      } && ${Math.floor(index / 9) === 0 && "border-t-4"}`}
    >
      {value ?? " "}
    </div>
  );
}

export default Square;
