<?php
function deliver_response($query){
    $json_file = file_get_contents('static/job_listings.json');

    if ($query) {
        echo(return_filtered_results($query, $json_file));
    }else{
        echo($json_file);
    }

    exit;
}

function return_filtered_results($query, $json){
    $array = json_decode($json);
    $filtered_array = [];

    foreach($array[0] as $key => $val){
        array_push($filtered_array, filter($query, $array, $key));
    }

    $merged = call_user_func_array('array_merge', $filtered_array);

    usort($merged, 'cmp');

    return (json_encode($merged));
}

function filter($filter, $list, $prop){
    $filtered_array = [];
    for ($i = 0; $i < count($list); $i++){
        if (strpos($list[$i]->$prop, $filter) !== FALSE){
            array_push($filtered_array, $list[$i]);
        }
    }
   return $filtered_array;
}

function cmp($a, $b){
    return $a->id == $b->id ? 0 : ( $a->id > $b->id ) ? 1 : -1;
}

deliver_response($_GET['query']);
?>
