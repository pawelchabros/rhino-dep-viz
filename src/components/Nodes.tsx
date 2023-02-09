import { Dispatch, RefObject, SetStateAction, useEffect, useState, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Node from "./Node";
import { GraphData, NetworkSimulation, NodeData } from "../types";
import { ScaleOrdinal } from "d3-scale";
import nodeStyle from "../utils/nodeStyle";

interface NodesProps {
  layoutData: GraphData;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
  legendItemHovered: string | undefined;
  hoveredNodeName: string | undefined;
  setHoveredNodeName: Dispatch<SetStateAction<string | undefined>>;
  connectedWithHovered: string[];
  simulation: NetworkSimulation;
  colorScale: ScaleOrdinal<string, string>;
}

interface NodeElementsData {
  data: NodeData;
  ref: RefObject<SVGGElement | null>;
  style: {
    opacity: number;
    r: number;
  }
}

const Nodes = ({
  layoutData,
  setLayoutData,
  legendItemHovered,
  hoveredNodeName,
  setHoveredNodeName,
  connectedWithHovered,
  simulation,
  colorScale,
}: NodesProps) => {
  const { nodes: nodesData } = layoutData;
  const [nodeElementsData, setNodeElementsData] = useState<NodeElementsData[]>();
  useEffect(() => {
    const nodeElementsData = nodesData.map(
      (node) => {
        const { size, name, color } = node;
        const isHovered = name === hoveredNodeName;
        const isConnected = connectedWithHovered.includes(name);
        const legendHovered = legendItemHovered === color;
        const style = nodeStyle({
          hoveredName: hoveredNodeName || legendItemHovered,
          isHovered: isHovered || legendHovered,
          isConnected,
          size,
        });
        const ref = createRef<SVGGElement | null>();
        return { data: node, style, ref };
      }
    );
    setNodeElementsData(nodeElementsData)
  }, [layoutData.nodes, hoveredNodeName, legendItemHovered])
  return (
    <TransitionGroup component="g">{
      nodeElementsData && nodeElementsData
        .sort(({ data: { name } }) => name === hoveredNodeName ? 1 : -1)
        .map(({ data, style, ref }) => {
          const { index, x, y, name, path, dependencies, color } = data
          return (
            <CSSTransition
              key={index}
              // @ts-ignore
              nodeRef={ref}
              timeout={300}
            >
              <Node
                ref={ref}
                setLayoutData={setLayoutData}
                setHoveredName={setHoveredNodeName}
                simulation={simulation}
                index={index || 0}
                x={x || 0}
                y={y || 0}
                name={name}
                path={path}
                dependencies={dependencies}
                color={colorScale(color)}
                {...style}
              />
            </CSSTransition>)
        })
    }</TransitionGroup>
  );
};

export default Nodes;
