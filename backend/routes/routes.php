<?php

    $routesArray = explode('/new/',$_SERVER['REQUEST_URI']);
    $routesArray = array_filter($routesArray);

    /*cuando no se hace ninguna petición a la API*/

    if(count($routesArray)===0){
        $json = array(
            'status' => 404,
            'result' => "Not found"
        );
    
        echo json_encode($json, http_response_code($json["status"]));
    
        return;
    }

    /*cuando se hace ninguna petición a la API*/
    /*Para poder averigüar si el requerimiento viene con un método*/

    if(count($routesArray)>0 && isset($_SERVER["REQUEST_METHOD"])){
        
        $table = explode("?",$routesArray[1])[0];

        /*PETICIÓN GET*/
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            include 'services/get.php';
        }
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            include 'services/post.php';
        }
        if($_SERVER["REQUEST_METHOD"] == "PUT"){
            include 'services/put.php';
        }
        if($_SERVER["REQUEST_METHOD"] == "DELETE"){
            include 'services/delete.php';
        }
    }
    


?>