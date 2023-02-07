import { useReducer } from "react";
import Menu from "./Menu";
import useSize from "../hooks/useSize";
import styles from "./NodeLabel.module.css";

interface NodeLabelProps {
  text: string;
  dependencies: string[];
  y: number;
}

const NodeLabel = ({ text, y, dependencies }: NodeLabelProps) => {
  const [isOpen, toggleIsOpen] = useReducer((bool) => !bool, false);
  const [ref, size] = useSize<HTMLDivElement>({ observe: [isOpen] });
  return (
    <foreignObject className={styles.object} x={-size.width / 2} y={y} {...size}>
      <div ref={ref} className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{text}</span>
          <button onClick={toggleIsOpen} className={styles.button}>
            +
          </button>
        </div>
        <Menu dependencies={dependencies} isOpen={isOpen} />
      </div>
    </foreignObject>
  );
};

export default NodeLabel;
