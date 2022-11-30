import './App.css';
import FavoritosContextProvider from './context/useContext';
import { Login } from './components/Organisms/Login/Login';
import { Register } from './components/Organisms/Register/Register';
import { Movies } from './components/Organisms/Peliculas/Movies';
import { Favoritos } from './components/Organisms/Favoritos/Favoritos';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from './components/Organisms/Header/Header';
import { Footer } from './components/Organisms/Footer/Footer';
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
            <Route path="/peliculas" element={<Movies />}></Route>
            <Route path="/peliculas/:title" element={<OneMovie/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/favorite" element={<Favoritos />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </FavoritosContextProvider>
  );
}

export default App;
