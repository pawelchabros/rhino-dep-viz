import { ScaleOrdinal } from "d3-scale";
import Links from "./Links";
import Nodes from "./Nodes";
import useForceLayout from "../hooks/useForceLayout";
import { GraphData } from "../types";

interface NetworkGraphProps {
  data: GraphData;
  colorScale: ScaleOrdinal<string, string>;
  size?: {
    width: number;
    height: number;
  };
}

const NetworkGraph = ({
  data,
  colorScale,
  size = {
    width: 800,
    height: 800,
  },
}: NetworkGraphProps) => {
  const layoutData = useForceLayout({ data, size });
  return (
    <svg {...size}>
      <Links linksData={layoutData.links} />
      <Nodes nodesData={layoutData.nodes} colorScale={colorScale} />
    </svg>
  );
};

export default NetworkGraph;
