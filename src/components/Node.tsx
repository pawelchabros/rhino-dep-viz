import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useDrag from "../hooks/useDrag";
import { GraphData, NetworkSimulation } from "../types";
import NodeLabel from "./NodeLabel";
import styles from "./Node.module.css"

interface NodeProps {
  x: number;
  y: number;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  setHoveredName: Dispatch<SetStateAction<string | undefined>>;
  simulation: NetworkSimulation;
  index: number;
  name: string;
  path: string;
  dependencies: string[];
  color: string;
  opacity: number;
  r: number;
}

const Node = ({
  x,
  y,
  index,
  setLayoutData,
  setHoveredName,
  simulation,
  name,
  path,
  dependencies,
  color,
  opacity,
  r,
}: NodeProps) => {
  const [draggedPosition, isDragged, dragHandlers] = useDrag({ x, y });
  useEffect(() => {
    setLayoutData((prevLayoutData) => {
      const { nodes, links } = prevLayoutData;
      nodes.forEach((node) => {
        if (isDragged && node.index === index) {
          node.x = draggedPosition.x
          node.y = draggedPosition.y
        }
      })
      return {
        links,
        nodes
      }
    })
    simulation.tick()
  }, [draggedPosition])
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setHoveredName(name)}
      onMouseLeave={() => setHoveredName(undefined)}
    >
      <circle
        className={styles.node}
        fill={color}
        opacity={opacity}
        r={r}
        {...dragHandlers}
      />
      <NodeLabel text={path} y={r * 0.8} dependencies={dependencies} />
    </g>
  );
};

export default Node;
