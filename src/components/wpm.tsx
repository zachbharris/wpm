import { useState, useEffect } from "react";
import useTypeTestContext from "@/hooks/useTypeTestContext";
import { calculateWordsPerMinute } from "@/lib/words";

export default function WPM() {
  const [state] = useTypeTestContext();
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.status === "running") {
      interval = setInterval(() => {
        if (state.status !== "running") {
          clearInterval(interval);
        } else {
          const wpm = calculateWordsPerMinute(
            state.inputData,
            state.currentDurationInSeconds + 1,
          );
          setWpm(wpm);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status, state.currentDurationInSeconds]);

  return <div>
    <span>{wpm}</span>
    <span>WPM</span>
  </div>;
}
