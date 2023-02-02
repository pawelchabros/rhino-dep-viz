import Links from "./Links";
import Nodes from "./Nodes";
import { useContext } from "react";
import DataContext from "../store/data-context";

const NetworkGraph = () => {
  const { layoutData, size } = useContext(DataContext);
  return (
    <svg {...size}>
      <Links linksData={layoutData.links} />
      <Nodes layoutData={layoutData} />
    </svg>
  );
};

export default NetworkGraph;
