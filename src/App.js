import Tasks from "./element/Tasks";

import "../src/assets/styles/App.css";
import { AlertProvider } from "./context/AlertContext";
import MensajeAlert from "./component/Alert/MensajeAlert";

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <Tasks />
        <MensajeAlert />
      </AlertProvider>
    </div>
  );
}

export default App;
