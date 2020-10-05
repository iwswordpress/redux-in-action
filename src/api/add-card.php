<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v2', 'add-card', array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'add_card',
                  'args'     => array (
                        'field1'  => array( 
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
                        'field2'  => array(
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
  function add_card(WP_REST_Request $request) { // works without WP_REST_Request
        // REQUEST FILTER OPTIONAL - JUST ADDED TO SHOW WHAT CAN BE DONE
        // WE MIGHT HAVE ONE ENDPOINT THAT HANDLES GET< POST, DELETE ETC.
        $request_type = $_SERVER['REQUEST_METHOD'];
        if ($request_type == "POST") { 
            $parameters = array(
                "field1"  => $request->get_param("field1"),
                "field2" => $request->get_param("field2")
               
                );  
            // Do standard validations
            $field1 = sanitize_text_field($request->get_param("field1"));
            $field2 = sanitize_text_field($request->get_param("field2"));
            global $wpdb;
            $table = 'tblCards';
            $data = array('field1' => $field1, 'field2' =>  $field2);
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
                "message"    => "ENDPOINT: social/v2/post-card", 
                "parameters" => $parameters
            );
        }
  }

