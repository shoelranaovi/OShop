import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ChartWrapper = ({ type, data, options }) => {
  const canvasRef = useRef();
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type,
      data,
      options,
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [type, data, options]);

  return <canvas ref={canvasRef} />;
};

export default ChartWrapper;