import { useState, useEffect, useMemo } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";

export default function Timer() {
  const [
    {
      status,
      options: { duration },
    },
    dispatch,
  ] = useTypeTestContext();
  const [time, setTime] = useState(duration);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [time]);

  useEffect(() => {
    if (status === "idle") {
      setTime(duration);
    } else if (status === "running" && duration !== time) {
      setTime(duration);
      dispatch({ type: "restart" });
    }
  }, [status, duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "running") {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
          dispatch({ type: "tick" });
        } else if (time === 0) {
          clearInterval(interval);
          dispatch({ type: "finish" });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status, time]);

  return (
    <div className="bg-neutral-900 rounded-md p-4 flex flex-row gap-2 items-center justify-center w-full max-w-24">
      <span className="font-bold font-mono text-xl">{formattedTime}</span>
    </div>
  );
}
