// src/server/router/index.ts
import { t } from "../trpc";

import { sudokuRouter } from "./sudoku";

export const appRouter = t.router({
  sudoku: sudokuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
