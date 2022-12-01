
import { createContext, useState } from "react";

export const FavoritosContext = createContext();


const FavoritosContextProvider = ({ children }) => {

    const [favoritos, setFavoritos] = useState([]);
    const [logged, isLogged] = useState(false);

    const cambiarFavoritos = (item) => {
        setFavoritos(item)
    }

    return (
        <FavoritosContext.Provider 
            value={{
                favoritos,
                cambiarFavoritos,
            }}
        >
            {children}
        </FavoritosContext.Provider>
    )
}

export default FavoritosContextProvider;
