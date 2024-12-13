<?php

$name = $_POST["name"];
$gwid = $_POST["gwid"];
$email = $_POST["email"];
$message = $_POST["message"];
$priority = filter_input(INPUT_POST, "priority", FILTER_VALIDATE_INT);
$type = filter_input(INPUT_POST, "type", FILTER_VALIDATE_INT);
$terms = filter_input(INPUT_POST, "terms", FILTER_VALIDATE_BOOL);

if ( ! $terms) {
    die("Terms must be accepted");
}   

$host = "localhost";
$dbname = "capstone_db";
$username = "root";
$password = "";
        
$conn = mysqli_connect(hostname: $host,
                       username: $username,
                       password: $password,
                       database: $dbname);
        
if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}           
        
$sql = "INSERT INTO capstone (name, gwid, email, message, priority, type)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "ssssii",
                       $name,
                       $gwid,
                       $email,
                       $message,
                       $priority,
                       $type);

mysqli_stmt_execute($stmt);

echo "Congrats! Your Record has been saved. You will soon receive a personalized link on your GW email to download the App and start connecting. Happy running champion!!!";
?>