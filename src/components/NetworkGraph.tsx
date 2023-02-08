import Links from "./Links";
import Nodes from "./Nodes";
import Legend from "./Legend"
import { GraphData } from "../types";
import useForceLayout from "../hooks/useForceLayout";
import { scaleColor } from "../utils";

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
  const colorScale = scaleColor({ data: layoutData.nodes });
  return (
    <div style={{ border: "1px solid lightgrey" }}>
      <Legend scale={colorScale} />
      <svg {...size} >
        <Links linksData={layoutData.links} />
        <Nodes
          layoutData={layoutData}
          setLayoutData={setLayoutData}
          simulation={simulation}
          colorScale={colorScale}
        />
      </svg>

    </div>
  );
};

export default NetworkGraph;
