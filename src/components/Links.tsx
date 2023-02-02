import { LinksData } from "../types";

interface LinksProps {
  linksData: LinksData;
}

const Links = ({ linksData }: LinksProps) => {
  return (
    <g>
      {linksData.map(({ source, target, index }) => (
        <line
          key={index}
          className="link"
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          stroke="lightgrey"
          strokeWidth="1"
        />
      ))}
    </g>
  );
};

export default Links;
