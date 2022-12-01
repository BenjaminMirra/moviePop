<?php
    require_once "models/post.model.php";
    require_once "models/get.model.php";
    require_once "models/put.model.php";
    require_once "models/connection.php";
    //todos los paquetes de la carpeta vendor
    require_once "vendor/autoload.php";
    use Firebase\JWT\JWT;

class PostController{

    //método post para crear datos

    static public function postData($table,$data){
        $response = PostModel::postData($table,$data);
        
        $return = new PostController();
        $return -> fncResponse($response,null,null);
    }

    //Post para registrar usuarios

    static public function postRegister($table,$data,$suffix){
        if(isset($data["password_".$suffix]) && $data["password_".$suffix] != null){

            //hasheo de password
            $crypt = crypt($data["password_".$suffix], "$2a$07$1234sdf3424fsdjffaj4kadf$");
            $data["password_".$suffix] = $crypt;
            
            $response = PostModel::postData($table, $data);

            $return = new PostController();
            $return -> fncResponse($response,null,$suffix);

        }
    }

    //Post para login usuarios

    static public function postLogin($table,$data,$suffix){

           //validar si el usuario existe en BD

        $response = GetModel::getDataFilter($table,"*","email_".$suffix,$data["email_".$suffix],null,null,null,null);
        if(!empty($response)){
            // encreiptar la contraseña

            $crypt = crypt($data["password_".$suffix], "$2a$07$1234sdf3424fsdjffaj4kadf$");

            if($response[0]->{"password_".$suffix} == $crypt){

                //crear el token
                $token = Connection::jwt($response[0]->{"id_".$suffix},$response[0]->{"email_".$suffix});

                //Encripto el token
                $jwt = JWT::encode($token, "n12o3402dadjjqwre23441234jf", "HS256");

                //Actualizo la base de datos con el token
                $data = array(
                    "token_".$suffix => $jwt,
                    "token_exp_".$suffix => $token["exp"],
                );

                $update = PutModel::putData($table, $data, $response[0]->{"id_".$suffix}, "id_".$suffix);

                if(isset($update["comment"]) && $update["comment"] == "The process was successful"){
                    $response[0]-> {"token_".$suffix}= $jwt;
                    $response[0]-> {"token_exp_".$suffix}= $token["exp"];

                    $return = new PostController();
                    $return -> fncResponse($response, null, $suffix);
                }

            }else{

                $response = null;
                $return = new PostController();
                $return -> fncResponse($response, "Wrong password", $suffix);
            }
        }else{
            $response = null;
            $return = new PostController();
            $return -> fncResponse($response, "Wrong email", $suffix);
        }
    }

     /* La respuesta del controlador */
    public function fncResponse($response, $error, $suffix){

        if(!empty($response)){

            //quitamos la clave
            if(isset($response[0]->{"password_".$suffix})){
                unset($response[0]->{"password_".$suffix});
            }

            $json = array(
                'status' => 200,
                'total' => count($response),
                'result' => $response
            );    

        }else{
            if($error != null){
                $json = array(
                    'status' => 400,
                    'result' => $error
                );
            }else{
                $json = array(
                    'status' => 404,
                    'result' => "Not found",
                    'method' => 'post'
                ); 
            }
        }
        echo json_encode($json, http_response_code($json["status"]));
    }


}

?>