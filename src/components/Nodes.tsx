import { Dispatch, RefObject, SetStateAction, useEffect, useState, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Node from "./Node";
import { connectedWith } from "../utils";
import { GraphData, NetworkSimulation, NodeData } from "../types";
import { ScaleOrdinal } from "d3-scale";
import nodeStyle from "../utils/nodeStyle";

interface NodesProps {
  layoutData: GraphData;
  setLayoutData: Dispatch<SetStateAction<GraphData>>;
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

const Nodes = ({ layoutData, setLayoutData, simulation, colorScale, }: NodesProps) => {
  const { nodes: nodesData, links: linksData } = layoutData;
  const [hoveredName, setHoveredName] = useState<string | undefined>();
  const [nodeElementsData, setNodeElementsData] = useState<NodeElementsData[]>();
  const connectedWithHovered = connectedWith({ node: hoveredName, linksData })
  useEffect(() => {
    const nodeElementsData = nodesData.map(
      (node) => {
        const { size, name } = node;
        const isHovered = name === hoveredName;
        const isConnected = connectedWithHovered.includes(name);
        const style = nodeStyle({
          hoveredName,
          isHovered,
          isConnected,
          size,
        });
        const ref = createRef<SVGGElement | null>();
        return { data: node, style, ref };
      }
    );
    setNodeElementsData(nodeElementsData)
  }, [layoutData.nodes, hoveredName])
  return (
    <TransitionGroup component="g">{
      nodeElementsData && nodeElementsData
        .sort(({ data: { name } }) => +(name === hoveredName))
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
                setHoveredName={setHoveredName}
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
