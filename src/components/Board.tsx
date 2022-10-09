import React, { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { BoardState, setIndex } from "../redux/gameSlice";
import Square from "./Square";

const emptyBoard = Array(81).fill(null) as BoardState;

function Board() {
  const pointer = useAppSelector((state) => state.game.pointer);
  const history = useAppSelector((state) => state.game.history);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const board =
    history.length && history.length >= pointer
      ? history[pointer]!
      : emptyBoard;
  useClickOutside(ref, () => dispatch(setIndex(null)));
  return (
    <div ref={ref} className="mx-auto grid w-full grid-cols-9">
      {board.map((value, index) => (
        <Square key={index} index={index} value={value} />
      ))}
    </div>
  );
}

export default Board;
