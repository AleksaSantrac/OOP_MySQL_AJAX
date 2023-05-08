<?php
    require  "../model/user.php";
    
    session_start();
    $host = "localhost";
    $db = "library";
    $username = "root";
    $password = "";
    try{
    $conn = new mysqli($host, $username, $password, $db);
        
        if ($conn->connect_errno) {
            exit("Konekcija neuspesna:  " . $conn->connect_errno);
        }
        $username = $_POST["username"];
        $password = $_POST["password"];

        user::register($username, $password, $conn);
    } catch(Exception $e){
        echo $e->getMessage() . "<br/>";
            while($e = $e->getPrevious()) {
                echo 'Previous exception: '.$e->getMessage() . "<br/>";
            }
    }
?>