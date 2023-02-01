import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

type Id = number;

type Node = {
  id: Id;
  name: string;
  size: number;
} & SimulationNodeDatum;

type Link = SimulationLinkDatum;

type Data = {
  nodes: Node[];
  links: Link[];
};

export { Data };
