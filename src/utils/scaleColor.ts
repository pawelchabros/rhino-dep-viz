import { scaleOrdinal } from "d3-scale";

interface ColorScaleParams {
  data: { color: string }[];
}

const colorScale = ({ data }: ColorScaleParams) => {
  return scaleOrdinal(
    [...new Set(data.map(({ color }) => color))],
    ["#B05A7A", "#E4C988", "#84D2C5"]
  );
};

export default colorScale;
