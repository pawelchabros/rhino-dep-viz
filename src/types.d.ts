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

type DirectoryTreeElement = {
  name: string;
  x: number;
  y: number;
  color: string;
};

type DirectoryTreeData = DirectoryTreeElement[];
type NetworkSimulation = Simulation<NodeData, LinkData>;

export {
  DirectoryTreeData,
  DirectoryTreeElement,
  GraphData,
  LinksData,
  NodeData,
  NodesData,
  NetworkSimulation,
};
