import { useState, useEffect } from "react";

export function useFrameCounter() {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [framesProcessed, setFramesProcessed] = useState(0);

  const startMeasurement = () => {
    setStartTime(Date.now());
    setFramesProcessed(0);

    // Simulate some work that processes frames
    processFrames();
  };

  const processFrames = () => {
    // Simulate frame processing
    setFramesProcessed((prevFrames) => prevFrames + 1);

    // Continue processing frames (replace this with your actual frame processing logic)
    if (framesProcessed < 100) {
      requestAnimationFrame(processFrames);
    } else {
      // Stop measurement after processing a certain number of frames
      setEndTime(Date.now());
    }
  };

  const getElapsedTime = () => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
      return elapsedTime.toFixed(2);
    }
    return null;
  };

  const getFPS = () => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
      const fps = framesProcessed / elapsedTime;
      return fps.toFixed(2);
    }
    return null;
  };

  useEffect(() => {
    if (framesProcessed < 100) {
      requestAnimationFrame(processFrames);
    }
  }, [framesProcessed]);

  return {
    startMeasurement,
    getElapsedTime,
    getFPS,
  };
}
