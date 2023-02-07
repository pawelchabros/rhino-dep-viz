import { Dispatch, SetStateAction } from "react";
import Node from "./Node";
import { connectedWith, scaleColor } from "../utils";
import { GraphData, NetworkSimulation } from "../types";
import { useState } from "react";
import nodeStyle from "../utils/nodeStyle";

interface NodesProps {
  layoutData: GraphData;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  simulation: NetworkSimulation;
  opacity?: number;
}

const Nodes = ({ layoutData, setLayoutData, simulation }: NodesProps) => {
  const colorScale = scaleColor({ data: layoutData.nodes });
  const [hoveredName, setHoveredName] = useState<string | undefined>();
  const { nodes: nodesData, links: linksData } = layoutData;
  const nodeElements = nodesData.map(
    ({ index, x, y, size, color, name, path, dependencies }) => {
      const isHovered = name === hoveredName;
      const isConnected = connectedWith({
        linksData,
        node: name,
        withNode: hoveredName,
      });
      const style = nodeStyle({
        hoveredName,
        isHovered,
        isConnected,
        size,
      });
      return (
        <Node
          key={index}
          setLayoutData={setLayoutData}
          setHoveredName={setHoveredName}
          simulation={simulation}
          index={index || 0}
          x={x || 0}
          y={y || 0}
          name={name}
          path={path}
          dependencies={dependencies}
          color={colorScale(color)}
          {...style}
        />
      );
    }
  );
  return <g>{nodeElements}</g>;
};

export default Nodes;
