document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product data based on the ID for updating
    fetch(`http://localhost/MasterPeice/MASTER/doctors_read.php?id=${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate the form with the existing product data
            document.getElementById("doctorImage").value = data.image;
            document.getElementById("doctorSpecialization").value = data.specialization;
            document.getElementById("doctorDescription").value = data.description;
            document.getElementById("doctorName").value = data.name;
            document.getElementById("doctorEmail").value = data.email;
            document.getElementById("doctorPassword").value = data.password; // Fixed typo here
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Add event listener to Update button
    const updateButton = document.getElementById('updateButton');
    updateButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        const formData = {
            id: productId,
            image: document.getElementById("doctorImage").value,
            specialization: document.getElementById("doctorSpecialization").value,
            description: document.getElementById("doctorDescription").value,
            name: document.getElementById("doctorName").value,
            email: document.getElementById("doctorEmail").value,
            password: document.getElementById("doctorPassword").value,
        };

        // Send the updated data to the server using the PUT method
        fetch('http://localhost/MasterPeice/MASTER/doctores_Update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            window.location.href="/crud dashboard (2)/crud dashboard/weblab/Doctor.html";
            // Optionally, you can redirect to another page or perform other actions
        })
        .catch(error => console.error('Error updating product data:', error));
    });
});
