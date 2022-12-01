<?php

require_once "models/connection.php";
require_once "controllers/put.controller.php";

if(isset($_GET["id"]) && isset($_GET["nameId"])){

    // capturamos datos del forms

    $data = array();
    parse_str(file_get_contents('php://input'),$data);

    //separar props de un arreglo
    $columns = array();

    foreach (array_keys($data) as $key => $value) {
        array_push($columns,$value);
    }

    //corroborando que la oclumna ingresada no esté en la base
    array_push($columns,$_GET["nameId"]);
    $columns = array_unique($columns);

     // validar tablas y columnas

     if(empty(Connection::getColumnsData($table,$columns))){
        $json = array(
            'status' => 400,
            'results' => "Error: Fields in the form do not match the database",
        );
        echo json_encode($json, http_response_code($json["status"]));
        return;
    }

    //solicitamos respuesta del controlador

    $response = new PutController();
    $response -> putData($table,$data,$_GET["id"],$_GET["nameId"]);
    
}

?>