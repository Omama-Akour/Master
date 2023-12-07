<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');
//////////////////////////////////////////////////////
// {
    // "user_id":"3",
    // "name": "Mahmoud",
    // "email": "mahmoud@exa.com",
    // "password": "secret123",
    // "image": "doctor_image_url",
    // "specialization": "sergury",
    // "description": "Experienced cardiologist with a focus on heart health."
//   }
/////////////////////////////////////////////////////////////////////////


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read JSON data from the request body
    $json_data = json_decode(file_get_contents('php://input'), true);

    if ($json_data && isset($json_data['id'])) {
        $user_id = $json_data['id'];
        $name = $json_data['name'];
        $email = $json_data['email'];
        $password = password_hash($json_data['password'], PASSWORD_DEFAULT);
        $image = $json_data['image'];
        $specialization = $json_data['specialization'];
        $description = $json_data['description'];

        // Update user
        $sql_update_user = "UPDATE users SET name='$name', email='$email', password='$password' WHERE id=$user_id";
        $mysqli->query($sql_update_user);

        // Update doctor
        $sql_update_doctor = "UPDATE doctors SET image='$image', specialization='$specialization', description='$description' WHERE id=$user_id";
        $mysqli->query($sql_update_doctor);

        echo json_encode(array("message" => "User and Doctor information updated successfully"));
    } else {
        echo json_encode(array("error" => "Invalid JSON data or missing user_id"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Expected PUT."));
}

$mysqli->close();

?>