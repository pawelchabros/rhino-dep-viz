import { LinksData } from "../types";

interface ConnectedWithParams {
  node: string | undefined;
  linksData: LinksData;
}

type SourceType = "in" | "by";

interface SourcedParams extends ConnectedWithParams {
  type: SourceType;
}

const sourced = ({ node, linksData, type }: SourcedParams): string[] => {
  const filterOn = type === "in" ? "target" : "source";
  const searchFor = type === "in" ? "source" : "target";
  const sourcedByNodes = linksData
    .filter(({ [filterOn]: { name } }) => name === node)
    .map(({ [searchFor]: { name } }) => name)
  if (sourcedByNodes.length === 0) return sourcedByNodes;
  else return [
    ...sourcedByNodes,
    ...sourcedByNodes.flatMap((node) => sourced({ node, linksData, type }))
  ]
}

const connectedWith = ({ node, linksData }: ConnectedWithParams) => {
  const sourceTypes: SourceType[] = ["in", "by"]
  return sourceTypes.flatMap((type) => sourced({ node, linksData, type }))
};

export default connectedWith;
