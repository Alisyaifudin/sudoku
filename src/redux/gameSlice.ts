import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum MOVE {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type BoardState = (number | null)[];

export interface GameState {
  history: BoardState[];
  end: boolean;
  pointer: number;
  invalid: {
    row: number[];
    column: number[];
    square: number[];
    index: number[];
  };
}

const initialState: GameState = {
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
  reducers: {},
});

// export const { move, changeDirection, addFood, pause, reset } = gameSlice.actions;

export default gameSlice.reducer;
