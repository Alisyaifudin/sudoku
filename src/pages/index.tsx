import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/Board";
import Title from "../components/Title";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { setBoard } from "../redux/gameSlice";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.game.history);
  
  trpc.sudoku.makepuzzle.useQuery(undefined, {
    onSuccess: (data) => {
      if (board.length !== 0) return;
      dispatch(setBoard({ board: data, pointer: 0 }));
    },
  });
  
  if (board.length === 0)
    return (
      <div className="mx-auto flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <Head>
        <title>Sudoku</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex max-w-lg flex-col justify-center gap-2 px-1">
        <Title />
        <Board />
      </main>
    </>
  );
};

export default Home;
