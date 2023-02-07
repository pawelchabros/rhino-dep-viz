import Links from "./Links";
import Nodes from "./Nodes";
import { GraphData } from "../types";
import useForceLayout from "../hooks/useForceLayout";

interface NetworkGraphProps {
  data: GraphData;
  size?: {
    width: number;
    height: number;
  };
}

const NetworkGraph = ({
  data,
  size = { width: 800, height: 850 },
}: NetworkGraphProps) => {
  const [layoutData, setLayoutData, simulation] = useForceLayout({ data, size });
  return (
    <svg {...size} style={{ position: "relative" }}>
      <Links linksData={layoutData.links} />
      <Nodes layoutData={layoutData} setLayoutData={setLayoutData} simulation={simulation} />
    </svg>
  );
};

export default NetworkGraph;
