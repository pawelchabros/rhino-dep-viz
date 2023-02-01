import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import { useEffect, useState } from "react";
import { Data } from "../types";

interface NetworkGraphProps {
  data: Data;
}

const NetworkGraph = ({ data }: NetworkGraphProps) => {
  const width = 800;
  const height = 800;
  const [nodes, setNodes] = useState<JSX.Element[]>([]);
  const [links, setLinks] = useState<JSX.Element[]>([]);
  useEffect(() => {
    forceSimulation(data.nodes)
      .force("link", forceLink(data.links))
      .force("charge", forceManyBody().strength(-1e3))
      .force("center", forceCenter(width / 2, height / 2))
      .on("tick", () => {
        setNodes(
          data.nodes.map(({ index, x, y, size }) => (
            <circle key={index} cx={x} cy={y} r={size / 2} fill="black" />
          ))
        );
        setLinks(
          data.links.map(({ source, target, index }) => (
            <line
              key={index}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="grey"
            />
          ))
        );
      });
  }, []);
  return (
    <svg width={width} height={height}>
      <g>{links}</g>
      <g>{nodes}</g>
    </svg>
  );
};

export default NetworkGraph;
