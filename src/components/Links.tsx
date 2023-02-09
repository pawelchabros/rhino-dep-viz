import { LinksData } from "../types";

interface LinksProps {
  linksData: LinksData;
  highlighted: string[];
}

const Links = ({ linksData, highlighted }: LinksProps) => {
  return (
    <g>
      {linksData.map(({ source, target, index }) => {
        const opacity = !highlighted.length
          || highlighted.includes(source.name)
          && highlighted.includes(target.name)
          ? 1 : 0.1;
        return <line
          key={index}
          className="link"
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          opacity={opacity}
          stroke="lightgrey"
          strokeWidth="1"
        />
      })}
    </g>
  );
};

export default Links;
