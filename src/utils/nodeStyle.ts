interface NodeStyleParams {
  hoveredName: string | undefined;
  isHovered: boolean;
  isConnected: boolean;
  size: number;
  opacity?: number;
}

const nodeStyle = ({
  hoveredName,
  isHovered,
  isConnected,
  size,
  opacity = 0.7,
}: NodeStyleParams) => {
  const r = size / 2;
  let style = { opacity, r };
  if (hoveredName) {
    if (isHovered) {
      style = { opacity: 1, r: r * 1.2 };
    } else if (isConnected) {
      style = { opacity: 0.7, r: r * 1.1 };
    } else {
      style = { opacity: 0.1, r };
    }
  }
  return style;
};

export default nodeStyle;
