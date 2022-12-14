import { useAppSelector } from "../redux/app/hooks";
import { BoardState } from "../redux/gameSlice";
import Square from "./Square";

const emptyBoard = Array(81).fill(null) as BoardState;

function Board() {
  const pointer = useAppSelector((state) => state.game.pointer);
  const history = useAppSelector((state) => state.game.history);
  const board =
    history.length && history.length >= pointer
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? history[pointer]!.state
      : emptyBoard;
  return (
    <div className="mx-auto grid w-full grid-cols-9">
      {board.map((value, index) => (
        <Square key={index} index={index} value={value} />
      ))}
    </div>
  );
}

export default Board;
