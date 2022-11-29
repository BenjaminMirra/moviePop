import './App.css';
import { Login } from './components/Organisms/Login/Login';
import { Movies } from './components/Organisms/Peliculas/Movies';

function App() {
  return (
    <div className="App">
      <Login/>
      <Movies/>
    </div>
  );
}

export default App;
