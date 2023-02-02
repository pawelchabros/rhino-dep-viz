import { DataContextProvider } from "./store/data-context";
import NetworkGraph from "./components/NetworkGraph";

import graphData from "./data/graph_dataset.json";
import directoryTreeData from "./data/dir_tree.json";

function App() {
  return (
    <div>
      <h1>Rhino App Dependency Visualisation</h1>
      <div style={{ display: "flex", alignItems: "center", marginLeft: 90 }}>
        <DataContextProvider {...{ graphData, directoryTreeData }}>
          <NetworkGraph />
        </DataContextProvider>
      </div>
    </div>
  );
}

export default App;
