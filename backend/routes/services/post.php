<?php

require_once "controllers/post.controller.php";
require_once "models/connection.php";

if(isset($_POST)){
    
    //separar props de un arreglo
    $columns = array();

    foreach (array_keys($_POST) as $key => $value) {
        array_push($columns,$value);
    }

    // validar tablas y columnas

    if(empty(Connection::getColumnsData($table,$columns))){
        $json = array(
            'status' => 400,
            'results' => "Error: Fields in the form do not match the database",
        );
        echo json_encode($json, http_response_code($json["status"]));

        return;
    }

    $response = new PostController();

    // Petición POST para registro de usuarios

    if(isset($_GET["register"]) && $_GET["register"] == true){

        $suffix = $_GET["suffix"] ?? "user";

        $response -> postRegister($table,$_POST,$suffix);

        // Petición POST para login de usuarios

    }else if(isset($_GET["login"]) && $_GET["login"] == true){

        $suffix = $_GET["suffix"] ?? "user";

        $response -> postLogin($table,$_POST,$suffix);

    }else{

    //solicitamos respuesta del controlador para crear datos en cualquier tabla

    
    $response -> postData($table,$_POST);
    }
}

?>