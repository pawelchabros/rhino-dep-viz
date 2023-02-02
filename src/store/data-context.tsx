import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from "react";
import { scaleOrdinal, ScaleOrdinal } from "d3-scale";
import useForceLayout from "../hooks/useForceLayout";
import { DirectoryTreeData, GraphData } from "../types";

interface DataContextType {
  layoutData: GraphData;
  directoryTreeData: DirectoryTreeData;
  size: {
    width: number;
    height: number;
  };
  colorScale: ScaleOrdinal<string, string>;
  hoveredName?: string;
  setHoveredName: Dispatch<SetStateAction<string | undefined>>;
}

const DataContext = createContext<DataContextType>({
  layoutData: { nodes: [], links: [] },
  directoryTreeData: [],
  size: {
    width: 500,
    height: 500,
  },
  colorScale: scaleOrdinal([] as string[], []),
  setHoveredName: (prev) => prev,
});

interface DataContextProviderProps {
  graphData: GraphData;
  directoryTreeData: DirectoryTreeData;
  children: ReactNode;
  size?: {
    width: number;
    height: number;
  };
}

export const DataContextProvider = ({
  graphData,
  directoryTreeData,
  size = {
    width: 800,
    height: 800,
  },
  children,
}: DataContextProviderProps) => {
  const colorScale = scaleOrdinal(
    [...new Set(directoryTreeData.map(({ color }) => color))],
    ["#B05A7A", "#E4C988", "#84D2C5"]
  );
  const [hoveredName, setHoveredName] = useState<string | undefined>();
  const layoutData = useForceLayout({ data: graphData, size });
  return (
    <DataContext.Provider
      value={{
        layoutData,
        directoryTreeData,
        size,
        colorScale,
        hoveredName,
        setHoveredName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
