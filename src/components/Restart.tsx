import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import useTypeTestContext from "@/hooks/useTypeTestContext";

export default function Restart() {
  const [isRestarting, setIsRestarting] = useState(false);
  const [{ inputRef, status }, dispatch] = useTypeTestContext();

  function restart() {
    dispatch({ type: "restart" });
    setIsRestarting(true);
  }

  useEffect(() => {
    if (status === "idle" && isRestarting) {
      inputRef.current?.focus();
      setIsRestarting(false);
    }
  }, [status, isRestarting]);

  return (
    <button
      type="button"
      name="restart"
      aria-label="restart test"
      className={cn(
        "flex items-center justify-center",
        "bg-neutral-900 hover:bg-neutral-800 rounded-md min-h-[60px] min-w-[60px]",
        "outline-none border border-transparent focus:border-blue-700 transition-colors",
      )}
      onClick={restart}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 512 512"
      >
        <path
          className="fill-neutral-100"
          d="M368.9 142.9c-62.2-62.2-162.7-62.5-225.3-1L184.7 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.3c0 0 0 0 0 0H39.8c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.3 96.6c87.6-86.5 228.7-86.2 315.8 1c24.4 24.4 42.1 53.1 52.9 83.7c5.9 16.7-2.9 34.9-19.5 40.8s-34.9-2.9-40.8-19.5c-7.7-21.8-20.2-42.3-37.8-59.8zM495.8 312v7.6 .7V440c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-41.6-41.6c-87.6 86.5-228.7 86.2-315.8-1C73 390 55.3 361.3 44.5 330.6c-5.9-16.7 2.9-34.9 19.5-40.8s34.9 2.9 40.8 19.5c7.7 21.8 20.2 42.3 37.8 59.8c62.2 62.2 162.7 62.5 225.3 1L326.8 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8H463.4h.7 7.6c13.3 0 24 10.7 24 24z"
        />
      </svg>
    </button>
  );
}
