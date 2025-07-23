
const CustomXAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-30)" className="text-xs">
          {payload.value}
        </text>
    </g>
  );
}

export default CustomXAxisTick;