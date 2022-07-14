import { Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Dots Estimation Experiment
        </p>
      </header>
      <div className="App-body">
        <Outlet />
      </div>
      <footer className="App-footer">
        <p>
          Thank you for your participation! Experiment provided by the University of St. Gallen and Mike Mueller © 2022.
        </p>
      </footer>
    </div>
  );
}

export default App;
