import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkColumn,
  checkRow,
  checkSquare,
  checkWin,
  getColumnIndices,
  getRowIndices,
  getSquareIndices,
} from "../utils/sudoku";
export type BoardState = (number | null)[];

export interface GameState {
  history: BoardState[];
  end: boolean;
  pointer: number;
  index: number | null;
  invalid: {
    index: number;
    rowIndex: number[];
    columnIndex: number[];
    squareIndex: number[];
  }[];
}

const initialState: GameState = {
  index: null,
  history: [],
  end: false,
  pointer: 0,
  invalid: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setValue: (
      state,
      action: PayloadAction<{ index: number; value: number | null }>
    ) => {
      const { index, value } = action.payload;
      const board = [...state.history[state.pointer]!];
      board[index] = value;
      if (state.pointer < state.history.length - 1) {
        state.history = state.history.slice(0, state.pointer + 1);
      }
      state.history.push(board);
      state.pointer++;
      const consideredIndices = [
        ...state.invalid.map((val) => val.index),
        index,
      ];
      for (const index of consideredIndices) {
        const validRow = checkRow(board, index);
        const validColumn = checkColumn(board, index);
        const validSquare = checkSquare(board, index);
        const invalidIndex = state.invalid.findIndex(
          (item) => item.index === index
        );
        if (invalidIndex !== -1) {
          if (validRow && validColumn && validSquare)
            state.invalid.splice(invalidIndex, 1);
          else {
            state.invalid[invalidIndex] = {
              index,
              rowIndex: !validRow ? getRowIndices(index) : [],
              columnIndex: !validColumn ? getColumnIndices(index) : [],
              squareIndex: !validSquare ? getSquareIndices(index) : [],
            };
          }
        } else if (!validRow || !validColumn || !validSquare) {
          state.invalid.push({
            index,
            rowIndex: !validRow ? getRowIndices(index) : [],
            columnIndex: !validColumn ? getColumnIndices(index) : [],
            squareIndex: !validSquare ? getSquareIndices(index) : [],
          });
        }
      }
      if (state.invalid.length === 0) state.end = checkWin(board);
    },
    setBoard: (
      state,
      action: PayloadAction<{ board: BoardState; pointer: number }>
    ) => {
      state.history.push(action.payload.board);
      state.pointer = action.payload.pointer;
    },
  },
});

export const { setValue, setBoard } = gameSlice.actions;

export default gameSlice.reducer;
