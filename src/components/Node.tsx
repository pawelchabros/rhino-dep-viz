import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useDrag from "../hooks/useDrag";
import { GraphData } from "../types";
import NodeLabel from "./NodeLabel";
import styles from "./Node.module.css"

interface NodeProps {
  x: number;
  y: number;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  setHoveredName: Dispatch<SetStateAction<string | undefined>>;
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
  name,
  path,
  dependencies,
  color,
  opacity,
  r,
}: NodeProps) => {
  const [draggedNode, dragHandlers] = useDrag({ x, y });
  useEffect(() => {
    setLayoutData((prevLayoutData) => {
      const { nodes, links } = prevLayoutData;
      nodes.forEach((node) => {
        if (draggedNode.isDragged && node.index === index) {
          node.x = draggedNode.position.x
          node.y = draggedNode.position.y
        }
      })
      return {
        links,
        nodes
      }
    })
  }, [draggedNode])
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setHoveredName(name)}
      onMouseLeave={() => setHoveredName(undefined)}
      {...dragHandlers}
    >
      <circle
        className={styles.node}
        fill={color}
        opacity={opacity}
        r={r}
      />
      <NodeLabel text={path} y={r * 0.8} dependencies={dependencies} />
    </g>
  );
};

export default Node;
