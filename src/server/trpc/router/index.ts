// src/server/router/index.ts
import { t } from "../trpc";

import { exampleRouter } from "./example";
import { sudokuRouter } from "./sudoku";

export const appRouter = t.router({
  example: exampleRouter,
  sudoku: sudokuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
