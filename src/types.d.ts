import { SimulationNodeDatum, SimulationLinkDatum, Simulation } from "d3-force";

type Id = number;

type LinkData = SimulationLinkDatum;

type NodeData = {
  name: string;
  size: number;
  color: string;
  path: string;
  size: number;
  dependencies: string[];
  opacity?: number;
} & SimulationNodeDatum;

type LinksData = LinkData[];
type NodesData = NodeData[];

type GraphData = {
  nodes: NodeData[];
  links: LinkData[];
};

type NetworkSimulation = Simulation<NodeData, LinkData>;

export {
  Node,
  GraphData,
  LinksData,
  NodeData,
  NodesData,
  NetworkSimulation,
};
