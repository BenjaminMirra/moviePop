<?php
    require_once "models/delete.model.php";

class DeleteController{

    //método delete para eliminar datos

    static public function deleteData($table,$id,$nameId){
        $response = DeleteModel::deleteData($table,$id,$nameId);
        $return = new DeleteController();
        $return -> fncResponse($response);
    }

     /*La respuesta del controldor */
    public function fncResponse($response){

        if(!empty($response)){
            $json = array(
                'status' => 200,
                'total' => count($response),
                'result' => $response
            );    
        }else{
            $json = array(
                'status' => 404,
                'result' => "Not found",
                'method' => 'delete'
            ); 
        }
        echo json_encode($json, http_response_code($json["status"]));
    }


}

?>