import useTypeTestContext from "@/hooks/useTypeTestContext";

export default function Options() {
  const [{ status }] = useTypeTestContext();

  return (
    <div>
      <p>{status}</p>
      <TestDuration />
    </div>
  );
}

function TestDuration() {
  const [{ duration }, dispatch] = useTypeTestContext();

  const options = [10, 30, 60, 120];

  function handleDurationChange(value: number) {
    dispatch({
      type: "update_state",
      payload: { duration: value, status: "idle", input: "" },
    });
    dispatch({ type: "generate_words" })
  }

  return (
    <li className="flex flex-row justify-between">
      <span>Test Duration</span>
      <span className="flex flex-row gap-2">
        {options.map((option, index) => {
          const isSelected = option === duration;

          return (
            <button
              type="button"
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
