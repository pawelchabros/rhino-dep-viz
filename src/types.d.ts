import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

type Id = number;

type Link = SimulationLinkDatum;

type Node = {
  name: string;
  size: number;
  color: string;
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

export { DirectoryTreeData, GraphData, LinksData, NodesData };
