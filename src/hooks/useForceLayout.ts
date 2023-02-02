import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import { useEffect, useState } from "react";
import { GraphData } from "../types";

interface useForceLayoutParams {
  data: GraphData;
  size: {
    width: number;
    height: number;
  };
  ticks?: number;
}

const useForceLayout = ({ data, size, ticks = 1e3 }: useForceLayoutParams) => {
  const { width, height } = size;
  const [layoutData, setLayoutData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  useEffect(() => {
    forceSimulation(data.nodes)
      .force("link", forceLink(data.links))
      .force("charge", forceManyBody().strength(-1500))
      .force("center", forceCenter(width / 2, height / 2))
      .tick(ticks)
      .on("end", () => setLayoutData(data));
  }, [data]);
  return layoutData;
};

export default useForceLayout;
