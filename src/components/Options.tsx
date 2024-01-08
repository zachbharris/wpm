import useTypeTestContext from "@/hooks/useTypeTestContext";
import { ReducerState } from "@/context/TypeTest";

export default function Options() {
  return (
    <ul className="flex flex-col gap-4 sm:gap-2">
      <TestDuration />
      <CursorType />
    </ul>
  );
}

function CursorType() {
  const [
    {
      options: { cursor, ...opts },
    },
    dispatch,
  ] = useTypeTestContext();

  function handleCursorChange(value: ReducerState["options"]["cursor"]) {
    dispatch({
      type: "update_state",
      payload: {
        options: { ...opts, cursor: value },
      },
    });
    dispatch({ type: "restart" })
  }

  const cursorOptions: ReducerState["options"]["cursor"][] = ["block", "line"];

  return (
    <li className="flex flex-col sm:flex-row justify-between gap-2">
      <span>Cursor Type</span>
      <span className="flex flex-row gap-4">
        {cursorOptions.map((option) => {
          const optionId = `cursor_${option}`;
          const isSelected = option === cursor;

          return (
            <button
              key={optionId}
              onClick={() => handleCursorChange(option)}
              name={`${option} cursor`}
              className={`${
                isSelected ? "bg-neutral-800" : "bg-transparent"
              } px-4 py-1 rounded-full`}
            >
              {option}
            </button>
          );
        })}
      </span>
    </li>
  );
}

function TestDuration() {
  const [
    {
      options: { duration, ...opts },
    },
    dispatch,
  ] = useTypeTestContext();

  const options = [10, 30, 60, 120];

  function handleDurationChange(value: number) {
    dispatch({
      type: "update_state",
      payload: {
        options: { ...opts, duration: value },
      },
    });
    dispatch({ type: "restart" });
  }

  return (
    <li className="flex flex-col sm:flex-row justify-between gap-2">
      <span>Test Duration</span>
      <span className="flex flex-row gap-2">
        {options.map((option, index) => {
          const isSelected = option === duration;

          return (
            <button
              type="button"
              name={`${option} seconds`}
              key={`dur_opt_${index}`}
              onClick={() => handleDurationChange(option)}
              className={`${
                isSelected ? "bg-neutral-800" : "bg-transparent"
              } px-4 py-1 rounded-full`}
            >
              {option}
            </button>
          );
        })}
      </span>
    </li>
  );
}
