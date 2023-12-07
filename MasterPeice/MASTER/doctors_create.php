<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

// Read JSON data from the request body
$json_data = json_decode(file_get_contents('php://input'), true);

if ($json_data) {
    // Sample data, you should replace these with actual data from the request
    $name = $json_data['name'];
    $email = $json_data['email'];
    $password = password_hash($json_data['password'], PASSWORD_DEFAULT);
    $image = $json_data['image'];
    $specialization = $json_data['specialization'];
    $description = $json_data['description'];

    // Role ID for doctors
    $role_id = 3;

    // Insert the user role into the roles table if it doesn't exist
    $sql_role = "INSERT IGNORE INTO roles (id) VALUES ($role_id)";
    $mysqli->query($sql_role);

    // Insert user
    $sql_user = "INSERT INTO users (name, email, password, role_id) VALUES ('$name', '$email', '$password', $role_id)";
    $mysqli->query($sql_user);
    $user_id = $mysqli->insert_id;

    // Insert doctor
    $sql_doctor = "INSERT INTO doctors (user_id, image, specialization, description) VALUES ('$user_id', '$image', '$specialization', '$description')";
    $mysqli->query($sql_doctor);

    echo json_encode(array("message" => "Doctor added successfully"));
} else {
    echo json_encode(array("error" => "Invalid JSON data received"));
}

$mysqli->close();
?>
