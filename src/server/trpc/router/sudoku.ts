import { t } from "../trpc";
import { z } from "zod";
import sudoku from "sudoku";


export const sudokuRouter = t.router({
  makepuzzle: t.procedure.query(() => {
    let board = sudoku.makepuzzle();
    board = board.map(val=> val !== null ? val+1 : null);
    return board;
  }),
});
