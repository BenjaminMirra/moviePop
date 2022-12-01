<?php

    /*
    Mostrar errores
    1- permite visualizar errores
    2- permite crear archivo a nivel local
    3- la ruta donde quiero que aparezca
    */

    ini_set('display_errors',1);
    ini_set("log_errors",1);
    ini_set("error_log","C:/xampp/htdocs/new/php_error_log");

    /* CORD */

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("content-type: application/json; charset=utf-8");


    /*
    Requerimientos
    */
    require_once "controllers/routes.controller.php";

    $index = new RoutesController();
    $index -> index();


?>