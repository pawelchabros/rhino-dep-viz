import { ScaleOrdinal } from "d3-scale";
import { DirectoryTreeData } from "../types";

interface DirectoryTreeProps {
  data: DirectoryTreeData;
  colorScale: ScaleOrdinal<string, string>;
  lineheight?: number;
  indentation?: number;
}

const DirectoryTree = ({
  data,
  colorScale,
  lineheight = 40,
  indentation = 30,
}: DirectoryTreeProps) => {
  const height = lineheight * data.length;
  const labels = data.map(({ name, x, y, color }) => (
    <g
      key={name}
      transform={`translate(${(x + 1) * indentation}, ${
        (y + 0.5) * lineheight
      })`}
    >
      <circle fill={colorScale(color)} r="5" cx="-15" />
      <text style={{ dominantBaseline: "central" }}>{name}</text>
    </g>
  ));
  return <svg height={height}>{labels}</svg>;
};

export default DirectoryTree;
