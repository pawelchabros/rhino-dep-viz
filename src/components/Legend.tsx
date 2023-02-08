import { ScaleOrdinal } from "d3-scale";
import styles from "./Legend.module.css";

interface LegendProps {
  scale: ScaleOrdinal<string, string>;
}

interface LegendItemProps {
  label: string;
  color: string;
  markSize?: number;
}

const LegendItem = ({ label, color, markSize = 20 }: LegendItemProps) => {
  const legendMarkStyle = {
    backgroundColor: color,
    width: markSize,
    height: markSize
  };
  return (
    <div className={styles.legendItem}>
      <div className={styles.legendMark} style={legendMarkStyle} />
      <span>{label}</span>
    </div>
  );
}

const Legend = ({ scale }: LegendProps) => {
  const labels = scale.domain().sort();
  const legendItems = labels.map((label) => (
    <LegendItem key={label} label={label} color={scale(label)} />
  ));
  return <div className={styles.legend}>{legendItems}</div>;
}

export default Legend;

