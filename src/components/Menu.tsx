import styles from "./Menu.module.css";

interface MenuProps {
  dependencies: string[];
  isOpen: boolean;
}

const Menu = ({ dependencies, isOpen }: MenuProps) => {
  return (
    <div
      className={styles.menu}
      style={{
        display: isOpen ? "block" : "none",
      }}
    >
      <ul className={styles.list}>
        {dependencies.map((dependency, i) => (
          <li className={styles.listElement} key={i}>
            {dependency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
