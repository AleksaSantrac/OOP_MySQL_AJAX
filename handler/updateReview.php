<?php
    require  "../model/review.php";

    session_start();
    $host = "localhost";
    $db = "library";
    $username = "root";
    $password = "";
    try {
        $conn = new mysqli($host, $username, $password, $db);
        
        if ($conn->connect_errno) {
            exit("Konekcija neuspesna: " . $conn->connect_errno);
        }
        
        if ($_SERVER["REQUEST_METHOD"] === "PUT") {
            parse_str(file_get_contents("php://input"), $put_vars);
            $id = $put_vars["id"];
            $res = review::getGrade($id, $conn);
            $row = $res->fetch_assoc();
            $grade = $row['grade']+1;
            review::like($id, $grade, $conn);
        }
    } catch(Exception $e) {
        echo $e->getMessage() . "<br/>";
        while ($e = $e->getPrevious()) {
            echo 'Previous exception: '.$e->getMessage() . "<br/>";
        }
    }
?>