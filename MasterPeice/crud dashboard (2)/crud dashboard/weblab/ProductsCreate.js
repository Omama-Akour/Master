
    document.getElementById('updateProductForm').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Assuming you have an API endpoint for creating a new product
        const apiEndpoint = 'http://localhost/MasterPeice/MASTER/products_creat.php';

        // Get form values
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const category_id = document.getElementById('category_id').value;

        // Create a data object to send to the API
        const data = {
            name: name,
            image: image,
            description: description,
            price: price,
            category_id: category_id
        };

        // Make a POST request to the API
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the API
            console.log('Success:', data);
            window.location.href = '/crud dashboard (2)/crud dashboard/weblab/Products.html';


        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
