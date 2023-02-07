import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { GraphData, NetworkSimulation, NodeData } from "../types";

interface UseForceLayoutParams {
  data: GraphData;
  size: {
    width: number;
    height: number;
  };
  ticks?: number;
}

type UseForceLayoutReturn = [
  GraphData,
  Dispatch<SetStateAction<GraphData>>,
  NetworkSimulation,
]

const useForceLayout = ({ data, size, ticks = 1e3 }: UseForceLayoutParams): UseForceLayoutReturn => {
  const { width, height } = size;
  const [layoutData, setLayoutData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [simulation, setSimulation] = useState({} as NetworkSimulation)
  useEffect(() => {
    const simulation = forceSimulation(data.nodes)
      .force("link", forceLink(data.links))
      .force("collide", forceCollide().radius(({ size }: NodeData) => size / 2))
      .force("charge", forceManyBody().strength(-2e3))
      .force("center", forceCenter(width * 0.55, height * 0.4))
      .tick(ticks)
      .on("end", () => setLayoutData(data));
    setSimulation(simulation);
  }, [data]);
  return [layoutData, setLayoutData, simulation];
};

export default useForceLayout;
