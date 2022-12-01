<?php

    class Connection{

        /*Información BD*/

        static public function infoDataBase(){

            $infoDB = array(
                'database' => "sitenso_database",
                'user' => "root",
                'pass' => ""
            );

            return $infoDB;
        }

        /*Conección BD */

        static public function connect(){
            try {
                $link = new PDO(
                    "mysql:host=localhost;dbname=".Connection::infoDatabase()["database"],
                    Connection::infoDatabase()["user"],
                    Connection::infoDatabase()["pass"],
                );
                $link->exec("set names utf8");
            } catch (PDOException $e) {
                die("Error: " .$e-getMessage());
            }
            return $link;
        }

        //Validar existencia de una tabla en la BD

        static public function getColumnsData($table, $columns){

            $database = Connection::infoDataBase()['database'];

            $validate = Connection::connect() -> query("SELECT COLUMN_NAME AS item FROM information_schema.columns WHERE table_schema = '$database' AND table_name = '$table' ")
            -> fetchAll(PDO::FETCH_OBJ);

            //validamos existencia de la tabla

            if(empty($validate)){
                return null;
            }else{

                //ajuste de selección de columnas con *
                if($columns[0] == "*"){
                    array_shift($columns);
                }

                //validamos existencia de columnas
                $sum = 0;
                foreach ($validate as $key => $value) {
                    $sum += in_array($value->item, $columns);
                }

                return $sum == count($columns)? $validate : null;
            }

        }


        //Generar token de autenticación

        static public function jwt($id,$email){
            //devuelve fecha Unix
            $time = time();
            $token = array(

                //Tiempo en que inicia el token
                "iat" => $time,
                //Fecha de expiración del token
                "exp" => $time + (10),
                "data" => [
                    "id" => $id,
                    "email" => $email
                ]
            );

            return $token;
        }


    }

?>