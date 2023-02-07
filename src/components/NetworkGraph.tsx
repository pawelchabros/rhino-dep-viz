import { Dispatch, SetStateAction } from "react";
import Links from "./Links";
import Nodes from "./Nodes";
import { GraphData } from "../types";

interface NetworkGraphProps {
  layoutData: GraphData;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  size: {
    width: number;
    height: number;
  };
}

const NetworkGraph = ({
  layoutData,
  setLayoutData,
  size,
}: NetworkGraphProps) => {
  return (
    <svg {...size} style={{ position: "relative" }}>
      <Links linksData={layoutData.links} />
      <Nodes layoutData={layoutData} setLayoutData={setLayoutData} />
    </svg>
  );
};

export default NetworkGraph;
