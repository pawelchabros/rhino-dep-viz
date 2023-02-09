import { Dispatch, SetStateAction } from "react";
import { ScaleOrdinal } from "d3-scale";
import styles from "./Legend.module.css";

interface LegendProps {
  scale: ScaleOrdinal<string, string>;
  setLegendItemHovered: Dispatch<SetStateAction<string | undefined>>
}

interface LegendItemProps {
  label: string;
  color: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  markSize?: number;
}

const LegendItem = ({ label, color, onMouseEnter, onMouseLeave, markSize = 20 }: LegendItemProps) => {
  const legendMarkStyle = {
    backgroundColor: color,
    width: markSize,
    height: markSize
  };
  return (
    <div
      className={styles.legendItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.legendMark} style={legendMarkStyle} />
      <span>{label}</span>
    </div>
  );
}

const Legend = ({ scale, setLegendItemHovered }: LegendProps) => {
  const labels = scale.domain().sort();
  const legendItems = labels.map((label) => (
    <LegendItem
      key={label}
      label={label}
      color={scale(label)}
      onMouseEnter={() => setLegendItemHovered(label)}
      onMouseLeave={() => setLegendItemHovered(undefined)}
    />
  ));
  return <div className={styles.legend}>{legendItems}</div>;
}

export default Legend;

