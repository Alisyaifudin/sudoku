import { t } from "../trpc";
import { z } from "zod";
import sudoku from "sudoku";


export const sudokuRouter = t.router({
  makepuzzle: t.procedure.query(() => {
    const board = sudoku.makepuzzle();
    return board;
  }),
});
