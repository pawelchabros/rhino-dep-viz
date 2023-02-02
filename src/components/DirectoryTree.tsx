import { useContext } from "react";
import PointLabel from "./PointLabel";
import DataContext from "../store/data-context";

interface DirectoryTreeProps {
  lineheight?: number;
  indentation?: number;
}

const DirectoryTree = ({
  lineheight = 35,
  indentation = 20,
}: DirectoryTreeProps) => {
  const { directoryTreeData: data } = useContext(DataContext);
  const height = lineheight * data.length;
  return (
    <svg height={height}>
      <g>
        {data.map((datum) => (
          <PointLabel
            key={datum.name}
            datum={datum}
            lineheight={lineheight}
            indentation={indentation}
          />
        ))}
      </g>
    </svg>
  );
};

export default DirectoryTree;
