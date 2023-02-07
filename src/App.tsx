import NetworkGraph from "./components/NetworkGraph";
import graphData from "./data/graph_dataset.json";
import useForceLayout from "./hooks/useForceLayout";
import "./App.css"

function App() {
  const size = { width: 800, height: 850 };
  const [layoutData, setLayoutData] = useForceLayout({ data: graphData, size });
  return (
    <div className="container">
      <h1>Rhino App Dependency Visualisation</h1>
      <div style={{ display: "flex", alignItems: "center", marginLeft: 90 }}>
        <NetworkGraph
          layoutData={layoutData}
          setLayoutData={setLayoutData}
          size={size}
        />
      </div>
    </div>
  );
}

export default App;
