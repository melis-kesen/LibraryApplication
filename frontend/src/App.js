import './App.css';
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { Library } from './components/Library';
function App() {
  return (
    <div className="App">
      <h1 className="App-header"> Library Application </h1>
       <Library></Library>
    </div>
  );
}

export default App;
