import { BoardState } from "../redux/gameSlice";

export const checkRow = (board: BoardState, index: number) => {
  // get row list
  const row = Math.floor(index / 9);
  const rowList = board
    .slice(row * 9, row * 9 + 9)
    .filter((val) => val !== null);
  // check if there is duplicate
  const set = new Set(rowList);
  return set.size === rowList.length
};

export const checkColumn = (board: BoardState, index: number) => {
  // get column list
  const column = index % 9;
  const columnList = board.filter((val, i) => i % 9 === column && val !== null);
  // check if there is duplicate
  const set = new Set(columnList);
  return set.size === columnList.length
};

export const checkSquare = (board: BoardState, index: number) => {
  // get square list
  const square = Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3);
  const squareList = board.filter(
    (val, i) =>
      Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3) === square &&
      val !== null
  );
  // check if there is duplicate
  const set = new Set(squareList);
  return set.size === squareList.length
};
// array of 0..81
const universal = Array.from(Array(81).keys()); 

export const getRowIndices = (index: number) => {
  const row = Math.floor(index / 9);
  return universal.filter((val) => Math.floor(val / 9) === row);
}

export const getColumnIndices = (index: number) => {
  const column = index % 9;
  return universal.filter((val) => val % 9 === column);
}

export const getSquareIndices = (index: number) => {
  const square = Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3);
  return universal.filter(
    (val) =>
      Math.floor(val / 27) * 3 + Math.floor((val % 9) / 3) === square
  );
}
