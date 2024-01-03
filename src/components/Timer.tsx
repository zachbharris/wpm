import { useState, useEffect } from "react";

type TimerProps = {
  duration: number;
  status: "idle" | "running" | "finished";
};

export default function Timer({ duration, status = "idle" }: TimerProps) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (status === "idle") {
      setTime(duration)
    }
  }, [status])

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
    }

    return () => {
      clearInterval(interval);
    };
  }, [status, time]);

  return <div className="font-mono bg-neutral-900 rounded-xl p-4">{time}</div>;
}
