import { LinksData } from "../types";

interface connectedWithParams {
  linksData: LinksData;
  node: string;
  withNode: string | undefined;
}

const connectedWith = ({ linksData, node, withNode }: connectedWithParams) => {
  return linksData
    .filter(
      ({ source, target }) =>
        withNode === source.name || withNode === target.name
    )
    .flatMap(({ source, target }) => [source.name, target.name])
    .includes(node);
};

export default connectedWith;
