import { SimulationNodeDatum, SimulationLinkDatum, Simulation } from "d3-force";

type Id = number;

type Link = SimulationLinkDatum;

type Node = {
  name: string;
  size: number;
  color: string;
  path: string;
  dependencies: string[];
} & SimulationNodeDatum;

type LinksData = Link[];
type NodesData = Node[];

type GraphData = {
  nodes: Node[];
  links: Link[];
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
