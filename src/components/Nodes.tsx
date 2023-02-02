import { ScaleOrdinal } from "d3-scale";
import { NodesData } from "../types";

interface NodesProps {
  nodesData: NodesData;
  colorScale: ScaleOrdinal<string, string>;
}

const Nodes = ({ nodesData, colorScale }: NodesProps) => {
  return (
    <g>
      {nodesData.map(({ index, x, y, size, color }) => {
        const id = `id-${index}`;
        return (
          <circle
            key={index}
            id={id}
            className="node"
            cx={x}
            cy={y}
            fill={colorScale(color)}
            r={size / 2}
          />
        );
      })}
    </g>
  );
};

export default Nodes;
