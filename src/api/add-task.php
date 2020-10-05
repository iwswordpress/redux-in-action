<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v2', 'add-task', array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'add_task',
                  'args'     => array (
                        'title'  => array( 
                            'type'             => 'string',
                        //     REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                            'required'         => true,
                            'validate_callback' => function($param){
                                if (strlen($param) > 2) {
                                    return true;
                                } else {
                                    return false;
                                }
                           }
                        ),
                        'description'  => array(
                            'type'     => 'string',
                            // REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                            'required' => true,
                            'validate_callback' => function($param){
                                if (strlen($param) > 2 ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        )
                  )
        ));
  });
  // CALLBACK FUNTION
  function add_task(WP_REST_Request $request) { // works without WP_REST_Request
        // REQUEST FILTER OPTIONAL - JUST ADDED TO SHOW WHAT CAN BE DONE
        // WE MIGHT HAVE ONE ENDPOINT THAT HANDLES GET< POST, DELETE ETC.
        $request_type = $_SERVER['REQUEST_METHOD'];
        if ($request_type == "POST") { 
            $parameters = array(
                "title"  => $request->get_param("title"),
                "body" => $request->get_param("description")
               
                );  
            // Do standard validations
            $title = sanitize_text_field($request->get_param("title"));
            $body = sanitize_text_field($request->get_param("description"));
            global $wpdb;
            $table = 'tblPosts';
            $data = array('title' => $title, 'body' =>  $body);
            $format = array('%s','%s');
            $wpdb->insert($table,$data,$format);
            $new_id = $wpdb->insert_id;
            $success_message =  "SUCCESS - POST: ".$new_id;
            //  ADD CARD

            // send custom response message as needed...
            // WP will convert as needed to be sent to client
            return array(
                "id"         =>  $new_id,
                "status"     =>  $success_message, 
                "method"     => "POST", 
                "message"    => "ENDPOINT: social/v2/add-task", 
                "parameters" => $parameters
            );
        }
  }

