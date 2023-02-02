import { useContext } from "react";
import DataContext from "../store/data-context";
import { DirectoryTreeElement } from "../types";

interface PointLabelProps {
  datum: DirectoryTreeElement;
  lineheight: number;
  indentation: number;
}

const PointLabel = ({ datum, lineheight, indentation }: PointLabelProps) => {
  const { colorScale, hoveredName, setHoveredName } = useContext(DataContext);
  const { x, y, name, color } = datum;
  const translate = {
    x: (x + 1) * indentation,
    y: (y + 0.5) * lineheight,
  };
  const scale = `scale(${hoveredName ? (name === hoveredName ? 1.1 : 1) : 1})`;
  return (
    <g
      transform={`translate(${translate.x}, ${translate.y}) ${scale}`}
      onMouseEnter={() => setHoveredName(name)}
      onMouseLeave={() => setHoveredName(undefined)}
      opacity={hoveredName ? (name === hoveredName ? 1 : 0.5) : 0.9}
      cursor="pointer"
    >
      <circle fill={colorScale(color)} r="5" cx="-15" />
      <text style={{ dominantBaseline: "central" }}>{name}</text>
    </g>
  );
};

export default PointLabel;
