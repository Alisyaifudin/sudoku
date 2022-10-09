import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = (number | null)[];

export interface GameState {
  history: BoardState[];
  end: boolean;
  pointer: number;
  index: number | null;
  invalid: {
    row: number[];
    column: number[];
    square: number[];
    index: number[];
  };
}

const initialState: GameState = {
  index: null,
  history: [],
  end: false,
  pointer: 0,
  invalid: {
    row: [],
    column: [],
    square: [],
    index: [],
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number | null>) => {
      state.index = action.payload;
    },
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

export const { setIndex, setValue, setBoard } = gameSlice.actions;

export default gameSlice.reducer;
