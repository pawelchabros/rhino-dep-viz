import NetworkGraph from "./components/NetworkGraph";
import graphData from "./data/graph_dataset.json";
import useForceLayout from "./hooks/useForceLayout";

function App() {
  const size = { width: 800, height: 800 };
  const [layoutData, setLayoutData] = useForceLayout({ data: graphData, size });
  return (
    <div>
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
