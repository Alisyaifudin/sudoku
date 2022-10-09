import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { changePointer, reset } from "../redux/gameSlice";

function ControlPanel() {
  const pointer = useAppSelector((state) => state.game.pointer);
  const historyLength = useAppSelector((state) => state.game.history).length;
  const dispatch = useAppDispatch();
  const handleUndo = () => dispatch(changePointer(pointer - 1));
  const handleRedo = () => dispatch(changePointer(pointer + 1));
  const handleReset = () => dispatch(reset());
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex w-fit gap-3">
        <button
          disabled={pointer === 0}
          onClick={handleUndo}
          className="h-6 w-8 rounded-md bg-zinc-500 text-white shadow-md disabled:bg-gray-300"
        >
          ←
        </button>
        <button
          onClick={handleRedo}
          disabled={pointer === historyLength - 1}
          className="h-6 w-8 rounded-md bg-zinc-500 text-white shadow-md disabled:bg-gray-300"
        >
          →
        </button>
      </div>
      <div>
        <button
          onClick={handleReset}
          className="rounded-md bg-blue-500 px-2 py-1 text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
