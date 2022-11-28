<?php

// tiene un alcance específico que es tratar solamente con la base de datos, con la tabla peliculas

include_once 'db.php';

//heredar
class Pelicula extends DB{
    function obtenerPeliculas(){
        $query = $this->connect()->query('SELECT * FROM peliculas');
        
        return $query;
    }
}

?>