<?php

//sirve para manejar todas las funcionalidades y comportamiento de la api en si, incluidas aqui

include_once 'pelicula.php';

class ApiPeliculas{

    function getAll(){
        $pelicula = new Pelicula();
        $peliculas = array();
        $peliculas["items"] = array();

        $result = $pelicula-> obtenerPeliculas();

        if($result->rowCount()){
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                // arreglo con índices
                $item = array(
                    'id' => $row['id'],
                    'titulo' => $row['titulo'],
                    'image' => $row['image'],
                    'sinopsis' => $row['sinopsis']
                );
                // ahora necesito añadirlo a mi array de películas
                array_push($peliculas['items'], $item);
            }
            // es una función la cual permite parsear una respuesta a json el texto que le pongamos
            echo json_encode($peliculas);
        }else{
            echo json_encode(array("mensaje" => "No hay elementos registrados"));
        }
    }
}

?>