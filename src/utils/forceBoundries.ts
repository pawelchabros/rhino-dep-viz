import { NodesData } from "../types"

const forceBoundries = (width: number, height: number, margin: number) => {
  let nodes: NodesData;
  function force() {
    for (let i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i];
      if (!node.x || !node.y) return;
      node.vx = node.vx || 0;
      node.vy = node.vy || 0;
      const boundries = {
        top: height * margin,
        right: width * (1 - margin),
        bottom: height * (1 - margin),
        left: width * margin,
      };
      node.x = Math.min(boundries.right, node.x)
      node.x = Math.max(boundries.left, node.x)
      node.y = Math.min(boundries.bottom, node.y)
      node.y = Math.max(boundries.top, node.y)
    }
  }
  force.initialize = function(_: NodesData) {
    nodes = _;
  }
  return force;
}

export default forceBoundries;
