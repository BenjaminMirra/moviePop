<?php

require_once "controllers/get.controller.php";

$select = $_GET["select"] ?? "*";
$orderBy = $_GET["orderBy"] ?? null;
$orderMode = $_GET["orderMode"] ?? null;
$startAt = $_GET["startAt"] ?? null;
$endAt = $_GET["endAt"] ?? null;

$response = new GetController();

//peticiones get con filtro
if(isset($_GET["linkTo"]) && isset($_GET["equalTo"]) && !isset($_GET["rel"]) && !isset($_GET["type"])){
    
    $response -> getDataFilter($table,$select,$_GET["linkTo"],$_GET["equalTo"],$orderBy,$orderMode, $startAt, $endAt);

    //peticiones GET sin filtro entre tablas relacionadas
    }else if(isset($_GET["rel"]) && isset($_GET["type"]) && $table == "relations" && !isset($_GET["linkTo"]) && !isset($_GET["equalTo"])){
        $response -> getRelData($_GET["rel"], $_GET["type"], $select, $orderBy,$orderMode, $startAt, $endAt);
    }
    //peticiones GET con filtro entre tablas relacionadas
    else if(isset($_GET["rel"]) && isset($_GET["type"]) && $table == "relations" && isset($_GET["linkTo"]) && isset($_GET["equalTo"])){
        $response -> getRelDataFilter($_GET["rel"], $_GET["type"], $select,$_GET["linkTo"],$_GET["equalTo"], $orderBy,$orderMode, $startAt, $endAt);
    }
    else{
    //peticiones get sin filtro
    $response -> getData($table,$select, $orderBy,$orderMode, $startAt, $endAt);
    }

?>