import { useContext } from "react";
import DataContext from "../store/data-context";
import { GraphData } from "../types";

interface NodesProps {
  layoutData: GraphData;
  opacity?: number;
}

const Nodes = ({ layoutData, opacity = 0.7 }: NodesProps) => {
  const { colorScale, hoveredName, setHoveredName } = useContext(DataContext);
  const { nodes: nodesData, links: linksData } = layoutData;
  return (
    <g>
      {nodesData.map(
        ({ index, x, y, size, color, name, path, dependencies }) => {
          const r = size / 2;
          const isHovered = name === hoveredName;
          const isConnected = linksData
            .filter(
              ({ source, target }) =>
                hoveredName === source.name || hoveredName === target.name
            )
            .flatMap(({ source, target }) => [source.name, target.name])
            .includes(name);
          let style = { opacity, r };
          if (hoveredName) {
            if (isHovered) {
              style = { opacity: 1, r: r * 1.2 };
            } else if (isConnected) {
              style = { opacity: 0.7, r: r * 1.1 };
            } else {
              style = { opacity: 0.1, r };
            }
          }
          return (
            <g
              key={index}
              transform={`translate(${x}, ${y})`}
              onMouseEnter={() => {
                console.log(dependencies);
                setHoveredName(name);
              }}
              onMouseLeave={() => setHoveredName(undefined)}
            >
              <circle
                className="node"
                fill={colorScale(color)}
                {...style}
                cursor="pointer"
              />
              <text y={-r} fontSize={12} cursor="pointer" textAnchor="middle">
                {path}
              </text>
              <foreignObject width={300} height={300}>
                <div
                  style={{
                    fontSize: 11,
                    lineHeight: 1.4,
                    backgroundColor: "white",
                    border: "1px solid #eee",
                    borderRadius: "0 5px 5px 5px",
                    boxShadow: "2px 2px 5px #ddd",
                    width: "fit-content",
                    padding: "0 15px",
                    zIndex: 9,
                    display: isHovered ? "block" : "none",
                  }}
                >
                  <ul style={{ padding: 0 }}>
                    {dependencies.map((dependency, i) => (
                      <li style={{ listStyle: "none" }} key={i}>
                        {dependency}
                      </li>
                    ))}
                  </ul>
                </div>
              </foreignObject>
            </g>
          );
        }
      )}
    </g>
  );
};

export default Nodes;
