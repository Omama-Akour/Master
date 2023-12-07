document.getElementById('add').addEventListener('click', function() {
    // Get form data
    const formData = {
        image: document.getElementById('doctorImage').value,
        specialization: document.getElementById('doctorSpecialization').value,
        description: document.getElementById('doctorDescription').value,
        name: document.getElementById('doctorName').value,
        email: document.getElementById('doctorEmail').value,
        password: document.getElementById('doctorPassword').value
    };

    // Fetch API
    fetch('http://localhost/MasterPeice/MASTER/doctors_create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response as needed
        // You can also update the UI or show a success message here
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors or show an error message to the user
    });
});