<?php

add_action('rest_api_init', function () {
  // namespace, route, callback
  register_rest_route( 'social/v2', 'get-tasks', array(
                'methods'  => 'GET',
                'callback' => 'get_social_tasks'
      ));
});
function get_social_tasks() {

  $sql = "SELECT * FROM tblPosts ORDER BY posted_on DESC";
  global $wpdb;
  $results = $wpdb->get_results($wpdb->prepare($sql, ""));
  // This is PHP code to create a JSON like data structure
  $json_data = array();//create the array 
  $json_array = array(); 
  foreach ($results as $objRS)//foreach loop  
  {  
      $json_array['id'] = $objRS->id;  
      $json_array['title'] = $objRS->title;  
      $json_array['description'] = $objRS->body;  
      $json_array['status'] = $objRS->status;  

      // here pushing the record array in to another array  
      array_push($json_data, $json_array);  
  }
  wp_reset_query();
  // Create headers
  $response = new WP_REST_Response( $json_data);
  // Set response status - this can be customised 
  $response->set_status(200);
  return $response;
}
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
  register_rest_route( 'social/v1', 'add-task',array(
               //'methods'  => WP_REST_Server::READABLE, // For GET
                'methods'  => WP_REST_Server::CREATABLE, // could just use 'task'
                'callback' => 'add_task',
                'args'     => array (
                      'title'  => array( 
                          'type'             => 'string',
                          // REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                          'required'         => true,
                          'validate_callback' => function($param){
                              if (strlen($param) > 4) {
                                  return true;
                              } else {
                                  return false;
                              }
                         }
                      ),
                      'body'  => array(
                          'type'     => 'string',
                          // REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                          'required' => true,
                          'validate_callback' => function($param){
                              if (strlen($param) > 4 ) {
                                  return true;
                              } else {
                                  return false;
                              }
                          }
                      )
                )
      ));
});