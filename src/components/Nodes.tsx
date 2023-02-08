import { Dispatch, SetStateAction } from "react";
import Node from "./Node";
import { connectedWith } from "../utils";
import { GraphData, NetworkSimulation } from "../types";
import { useState } from "react";
import { ScaleOrdinal } from "d3-scale";
import nodeStyle from "../utils/nodeStyle";

interface NodesProps {
  layoutData: GraphData;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  simulation: NetworkSimulation;
  colorScale: ScaleOrdinal<string, string>;
}

const Nodes = ({ layoutData, setLayoutData, simulation, colorScale, }: NodesProps) => {
  const [hoveredName, setHoveredName] = useState<string | undefined>();
  const { nodes: nodesData, links: linksData } = layoutData;
  const connectedWithHovered = connectedWith({ node: hoveredName, linksData })
  const nodeElements = nodesData.map(
    ({ index, x, y, size, color, name, path, dependencies }) => {
      const isHovered = name === hoveredName;
      const isConnected = connectedWithHovered.includes(name);
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
  ).sort(({ props: { name } }) => +(name === hoveredName));
  return <g>{nodeElements}</g>;
};

export default Nodes;
