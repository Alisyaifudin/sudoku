/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

export type InvalidState = {
  index: number;
  rowIndex: number[];
  columnIndex: number[];
  squareIndex: number[];
};
export interface GameState {
  history: {
    state: BoardState;
    invalid: InvalidState[];
  }[];
  end: boolean;
  pointer: number;
}

const initialState: GameState = {
  history: [],
  end: false,
  pointer: 0,
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
      const board = [...state.history[state.pointer]!.state];
      if (!board) return;
      board[index] = value;
      if (state.pointer < state.history.length - 1) {
        state.history = state.history.slice(0, state.pointer + 1);
      }
      const consideredIndices = [
        ...state.history[state.pointer]!.invalid.map((i) => i.index),
        index,
      ];
      const newInvalid = [...state.history[state.pointer]!.invalid];
      for (const index of consideredIndices) {
        const validRow = checkRow(board, index);
        const validColumn = checkColumn(board, index);
        const validSquare = checkSquare(board, index);
        const invalidIndex = newInvalid.findIndex(
          (item) => item.index === index
        );
        if (invalidIndex !== -1) {
          if (validRow && validColumn && validSquare)
            newInvalid.splice(invalidIndex, 1);
          else {
            newInvalid[invalidIndex] = {
              index,
              rowIndex: !validRow ? getRowIndices(index) : [],
              columnIndex: !validColumn ? getColumnIndices(index) : [],
              squareIndex: !validSquare ? getSquareIndices(index) : [],
            };
          }
        } else if (!validRow || !validColumn || !validSquare) {
          newInvalid.push({
            index,
            rowIndex: !validRow ? getRowIndices(index) : [],
            columnIndex: !validColumn ? getColumnIndices(index) : [],
            squareIndex: !validSquare ? getSquareIndices(index) : [],
          });
        }
      }
      state.history = state.history.splice(0, state.pointer + 1);
      state.history.push({ state: board, invalid: newInvalid });
      state.pointer++;
      if (state.history[state.history.length - 1]!.invalid.length === 0)
        state.end = checkWin(board);
    },
    setBoard: (
      state,
      action: PayloadAction<{ board: BoardState; pointer: number }>
    ) => {
      state.history.push({
        state: action.payload.board,
        invalid: state.history[state.pointer]?.invalid || [],
      });
      state.pointer = action.payload.pointer;
    },
    changePointer: (state, action: PayloadAction<number>) => {
      state.pointer = action.payload;
    },
    reset: (state) => {
      state.history = [];
      state.end = false;
      state.pointer = 0;
    }
  },
});

export const { setValue, setBoard, changePointer, reset } = gameSlice.actions;

export default gameSlice.reducer;
