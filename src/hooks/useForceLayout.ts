import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { GraphData } from "../types";

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
  Dispatch<SetStateAction<GraphData>>
]

const useForceLayout = ({ data, size, ticks = 1e3 }: UseForceLayoutParams): UseForceLayoutReturn => {
  const { width, height } = size;
  const [layoutData, setLayoutData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  useEffect(() => {
    forceSimulation(data.nodes)
      .force("link", forceLink(data.links))
      .force("charge", forceManyBody().strength(-2e3))
      .force("center", forceCenter(width * 0.55, height * 0.4))
      .tick(ticks)
      .on("end", () => setLayoutData(data));
  }, [data]);
  return [layoutData, setLayoutData];
};

export default useForceLayout;
