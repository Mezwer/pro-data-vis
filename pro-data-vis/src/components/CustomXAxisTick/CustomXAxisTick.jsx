const CustomXAxisTick = ({ x, y, stroke, payload }) => {
  const val = payload.value.replace('Summer', 'Su.').replace('Spring', 'Spr.').replace('Playoffs', '(P)');

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={-3} dy={12} textAnchor="end" fill="#666" transform="rotate(-30)" className="text-xs">
        {val}
      </text>
    </g>
  );
};

export default CustomXAxisTick;
