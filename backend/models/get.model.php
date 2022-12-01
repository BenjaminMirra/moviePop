<?php

    require_once "connection.php";

    class GetModel{

        //peticiones sin filtro
        static public function getData($table,$select, $orderBy,$orderMode, $startAt, $endAt){

            $selectArray = explode(",",$select);

            //validar existencia de la tabla
            if(empty(Connection::getColumnsData($table,$selectArray))){
                return null;
            }

            //Sin ordenar ni limitar datos
            $sql = "SELECT $select FROM $table";
            
            //Ordenar datos sin limitar 
            if($orderBy != null && $orderMode !=null && $startAt == null && $endAt == null){
                $sql = "SELECT $select FROM $table ORDER BY $orderBy $orderMode";
            }

            //Ordenar y limitar datos
            if($orderBy != null && $orderMode !=null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $table ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            //Limitar datos sin ordenar
            if($orderBy == null && $orderMode ==null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $table LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt-> fetchAll(PDO::FETCH_CLASS);
        }

        //peticiones con filtro
        static public function getDataFilter($table,$select,$linkTo, $equalTo, $orderBy,$orderMode, $startAt, $endAt){
            
            $linkToArray = explode(",",$linkTo);
            $selectArray = explode(",",$select);

            foreach ($linkToArray as $key => $value){
                array_push($selectArray,$value);
            }

            $selectArray = array_unique($selectArray);

            //validar existencia de la tabla
            if(empty(Connection::getColumnsData($table,$selectArray))){
                return null;
            }

            $linkToArray = explode(",", $linkTo);
            $equalToArray = explode("_",$equalTo);
            $linkToText = "";

            //sentencia sql dinámica
            if(count($linkToArray)>1){
                foreach ($linkToArray as $key => $value) {
                    if($key > 0){
                        $linkToText .= "AND ".$value." = :".$value." ";
                    }
                }
            }
            
            //Sin ordenar ni limitar datos
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText";
            
            //Ordenar datos sin limitar 
            if($orderBy != null && $orderMode !=null && $startAt == null && $endAt == null)
            {
                $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode";
            }

            //Ordenar y limitar datos
            if($orderBy != null && $orderMode !=null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            //Limitar datos sin ordenar
            if($orderBy == null && $orderMode ==null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText LIMIT $startAt, $endAt";
            }

            //enlace parámetro de PDO
            $stmt = Connection::connect()->prepare($sql);

            //enlazar parámetros
            foreach ($linkToArray as $key => $value) {
                $stmt -> bindParam(":".$value, $equalToArray[$key], PDO::PARAM_STR);
            }    

            // echo '<pre>'; print_r($stmt); echo '</pre>';
            //return;
            
            // $smtm -> binParam(":".$linkTo, $equalTo, PDO::PARAM_STR);

            $stmt->execute();

            return $stmt-> fetchAll(PDO::FETCH_CLASS);
        }

         //peticiones sin filtro entre tablas relacionadas
        static public function getRelData($rel, $type, $select, $orderBy,$orderMode, $startAt, $endAt){

            $selectArray = explode(',',$select);
            $relArray = explode(',', $rel);
            $typeArray = explode(',',$type);

            $innerJoinText = "";
            
            if(count($relArray)>1){
                foreach ($relArray as $key => $value) {

                    if(empty(Connection::getColumnsData($value,["*"]))){
                        return null;
                    }
                    
                    if($key > 0){
                        //$innerJoinText .= "INNER JOIN ".$value." ON ".$relArray[0].".id = ".$value.".".$typeArray[0]."_id ";
                        $innerJoinText .= "INNER JOIN ".$value." ON ".$relArray[0].".id_".$typeArray[$key]."_".$typeArray[0]." = ".$value.".id_".$typeArray[$key]." ";
                        // $innerJoinText .= "INNER JOIN ".$value." ON ".$value.".id_".$typeArray[0]."_".$typeArray[$key]." = ".$relArray[0].".id_".$typeArray[0]." ";
                    }
                }

                // echo '<pre>'; print_r($innerJoinText); echo '</pre>';
                // return;
            

            //Sin ordenar ni limitar datos
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText";
            
            //Ordenar datos sin limitar 
            if($orderBy != null && $orderMode !=null && $startAt == null && $endAt == null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText ORDER BY $orderBy $orderMode";
            }

            //Ordenar y limitar datos
            if($orderBy != null && $orderMode !=null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            //Limitar datos sin ordenar
            if($orderBy == null && $orderMode ==null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }
            

            return $stmt-> fetchAll(PDO::FETCH_CLASS);
        }else{
            return null;
        }
        }

        //peticiones con filtro entre tablas relacionadas
        static public function getRelDataFilter($rel, $type, $select,$linkTo, $equalTo, $orderBy,$orderMode, $startAt, $endAt){

            //organizamos los filtros

            $linkToArray = explode(",", $linkTo);
            $equalToArray = explode("_",$equalTo);
            $linkToText = "";

            //sentencia sql dinámica
            if(count($linkToArray)>1){
                foreach ($linkToArray as $key => $value) {

                    if($key > 0){
                        $linkToText .= "AND ".$value." = :".$value." ";
                    }
                }
            }

            //organizamos las relaciones

            $relArray = explode(',', $rel);
            $typeArray = explode(',',$type);

            $innerJoinText = "";
            
            if(count($relArray)>1){
                foreach ($relArray as $key => $value) {
                    if(empty(Connection::getColumnsData($value,["*"]))){
                        return null;
                    }
                    if($key > 0){
                        //$innerJoinText .= "INNER JOIN ".$value." ON ".$relArray[0].".id = ".$value.".".$typeArray[0]."_id ";
                        $innerJoinText .= "INNER JOIN ".$value." ON ".$relArray[0].".id_".$typeArray[$key]."_".$typeArray[0]." = ".$value.".id_".$typeArray[$key]." ";
                        // $innerJoinText .= "INNER JOIN ".$value." ON ".$value.".id_".$typeArray[0]."_".$typeArray[$key]." = ".$relArray[0].".id_".$typeArray[0]." ";
                    }
                }

                // echo '<pre>'; print_r($innerJoinText); echo '</pre>';
                // return;
            

            //Sin ordenar ni limitar datos
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText";
            
            //Ordenar datos sin limitar 
            if($orderBy != null && $orderMode !=null && $startAt == null && $endAt == null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode";
            }

            //Ordenar y limitar datos
            if($orderBy != null && $orderMode !=null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            //Limitar datos sin ordenar
            if($orderBy == null && $orderMode ==null && $startAt != null && $endAt != null){
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText  LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            //enlazar parámetros
            foreach ($linkToArray as $key => $value) {
                $stmt -> bindParam(":".$value, $equalToArray[$key], PDO::PARAM_STR);
            }    

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt-> fetchAll(PDO::FETCH_CLASS);
        }else{
            return null;
        }
        }
    }

?>