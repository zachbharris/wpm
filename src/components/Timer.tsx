import { useState, useEffect, useMemo } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";

export default function Timer() {
  const [{ status, duration }, dispatch] = useTypeTestContext();
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
        } else if (time === 0) {
          clearInterval(interval);
        }
      }, 1000);

      if (time === 0) {
        dispatch({ type: "finish" });
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [status, time]);

  return (
    <div className="font-mono bg-neutral-900 rounded-xl p-4">
      {formattedTime}
    </div>
  );
}
