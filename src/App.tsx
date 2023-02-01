import NetworkGraph from "./components/NetworkGraph";
import data from "./data/graph_dataset.json";

function App() {
  return (
    <div>
      <h1>Rhino App Dependency Visualisation</h1>
      <NetworkGraph data={data} />
    </div>
  );
}

export default App;
