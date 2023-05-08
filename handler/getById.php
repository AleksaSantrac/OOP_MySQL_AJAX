<?php
    require  "../model/review.php";

    session_start();
    $host = "localhost";
    $db = "library";
    $username = "root";
    $password = "";
    try{
    $conn = new mysqli($host, $username, $password, $db);
        
        if ($conn->connect_errno) {
            exit("Konekcija neuspesna: " . $conn->connect_errno);
        }

        $userID = $_COOKIE['user_id'];
        // $userID = 1;

        $res = review::getByUserId($userID, $conn);

        $results = array();

        while($data = $res->fetch_assoc()){
            $id = $data['id'];
            $title = $data['title'];
            $content = $data['content'];
            $grade = $data['grade'];
            $results[] = array('id' => $id, 'title' => $title, 'content' => $content, 'grade' => $grade);
            // $results[] = array('id' => $userID);
        }

        echo json_encode($results);
        // echo $userID;

        
    } catch(Exception $e){
        echo $e->getMessage() . "<br/>";
            while($e = $e->getPrevious()) {
                echo 'Previous exception: '.$e->getMessage() . "<br/>";
            }
    }
?>