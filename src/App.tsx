import NetworkGraph from "./components/NetworkGraph";
import DirectoryTree from "./components/DirectoryTree";
import graph_data from "./data/graph_dataset.json";
import directory_tree_data from "./data/dir_tree.json";
import { scaleOrdinal } from "d3-scale";

function App() {
  const colorScale = scaleOrdinal(
    [...new Set(directory_tree_data.map(({ color }) => color))],
    ["#B05A7A", "#E4C988", "#84D2C5"]
  );
  return (
    <div>
      <h1>Rhino App Dependency Visualisation</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NetworkGraph data={graph_data} colorScale={colorScale} />
        <DirectoryTree data={directory_tree_data} colorScale={colorScale} />
      </div>
    </div>
  );
}

export default App;
