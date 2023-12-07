<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (!empty($data)) {
        $query = 'INSERT INTO products (name, image, description, price, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';
        
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("ssdis", $data['name'], $data['image'], $data['description'], $data['price'], $data['category_id']);
        
        $result = $stmt->execute();

        if ($result) {
            echo json_encode(['message' => 'Product inserted successfully']);
        } else {
            echo json_encode(['message' => 'Failed to insert the product']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'No data provided for insertion']);
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
