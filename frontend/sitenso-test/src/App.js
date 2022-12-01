import './App.css';
import FavoritosContextProvider from './context/useContext';
import { Login } from './components/Organisms/Login/Login';
import { Register } from './components/Organisms/Register/Register';
import { Favoritos } from './components/Organisms/Favoritos/Favoritos';
import { Movies } from './components/Organisms/Peliculas/Movies';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from './components/Organisms/Header/Header';
import { Inicio } from './components/Organisms/Inicio/Inicio';
import { OneMovie } from './components/Organisms/OneMovie/OneMovie';

function App() {

  return (
    <FavoritosContextProvider>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/movies/:title" element={<OneMovie/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/favorites" element={<Favoritos />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </FavoritosContextProvider>
  );
}

export default App;
