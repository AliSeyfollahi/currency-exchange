import { useMediaQuery } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ExchangeHistoryChartReport(props) {
  const largeViewport = useMediaQuery("(min-width:1280px)");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const FRACTION_DIGITS = 4;

  useEffect(() => {
    if (props.rows) {
      setMin(
        Math.min(...props.rows.map((item) => item.rate)).toFixed(
          FRACTION_DIGITS
        )
      );
      setMax(
        Math.max(...props.rows.map((item) => item.rate)).toFixed(
          FRACTION_DIGITS
        )
      );
    }
  }, [props.rows]);

  return (
    <>
      {props.rows && min && max && (
        <LineChart
          width={largeViewport ? 1100 : window.outerWidth - 50}
          height={largeViewport ? 400 : window.outerWidth * 0.5}
          margin={{ left: largeViewport ? 150 : 0, top: 50 }}
          data={props.rows.map((item) => ({
            rate: parseFloat(item.rate).toFixed(FRACTION_DIGITS),
            timestamp: new Date(item.timestamp).toLocaleDateString("en"),
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" fill="rgba(255,255,255,.8)" />
          <XAxis dataKey="timestamp" />
          <YAxis
            padding={{ bottom: 20 }}
            domain={[
              (dataMin) =>
                (parseFloat(dataMin) - 0.001).toFixed(FRACTION_DIGITS),
              (dataMax) =>
                (parseFloat(dataMax) + 0.001).toFixed(FRACTION_DIGITS),
            ]}
          />
          <Line
            dataKey="rate"
            stroke={blue[500]}
            strokeWidth={2}
            dot={<CustomizedDot min={min} max={max} />}
          />
          <Tooltip />
        </LineChart>
      )}
    </>
  );
}

const CustomizedDot = (props) => {
  const { cx, cy, value, min, max } = props;

  if (value === min)
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="green"
        viewBox="0 0 1024 1024"
      >
        <path d="M 517.12 53.248 q 95.232 0 179.2 36.352 t 145.92 98.304 t 98.304 145.92 t 36.352 179.2 t -36.352 179.2 t -98.304 145.92 t -145.92 98.304 t -179.2 36.352 t -179.2 -36.352 t -145.92 -98.304 t -98.304 -145.92 t -36.352 -179.2 t 36.352 -179.2 t 98.304 -145.92 t 145.92 -98.304 t 179.2 -36.352 z z z z" />
      </svg>
    );

  if (value === max)
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="red"
        viewBox="0 0 1024 1024"
      >
        <path d="M 517.12 53.248 q 95.232 0 179.2 36.352 t 145.92 98.304 t 98.304 145.92 t 36.352 179.2 t -36.352 179.2 t -98.304 145.92 t -145.92 98.304 t -179.2 36.352 t -179.2 -36.352 t -145.92 -98.304 t -98.304 -145.92 t -36.352 -179.2 t 36.352 -179.2 t 98.304 -145.92 t 145.92 -98.304 t 179.2 -36.352 z z z z" />
      </svg>
    );

  return (
    <svg
      x={cx - 4}
      y={cy - 4}
      width={8}
      height={8}
      fill="#2196f3"
      viewBox="0 0 1024 1024"
    >
      <path d="M 517.12 53.248 q 95.232 0 179.2 36.352 t 145.92 98.304 t 98.304 145.92 t 36.352 179.2 t -36.352 179.2 t -98.304 145.92 t -145.92 98.304 t -179.2 36.352 t -179.2 -36.352 t -145.92 -98.304 t -98.304 -145.92 t -36.352 -179.2 t 36.352 -179.2 t 98.304 -145.92 t 145.92 -98.304 t 179.2 -36.352 z z z z" />
    </svg>
  );
};
