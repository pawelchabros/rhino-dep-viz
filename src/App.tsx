import NetworkGraph from "./components/NetworkGraph";
import graphData from "./data/graph_dataset.json";
import "./App.css"

function App() {
  return (
    <div className="container">
      <h1>Rhino App Dependency Visualisation</h1>
      <NetworkGraph data={graphData} />
    </div>
  );
}

export default App;
