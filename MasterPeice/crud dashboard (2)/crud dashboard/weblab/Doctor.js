async function fetchProducts() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/doctors_read.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const productContainer = document.querySelector('tbody');
        productContainer.innerHTML = ''; // Clear existing content

        data.forEach(doctors => {
            const card = document.createElement('tr');
            card.innerHTML = `
                <td>${doctors.id}</td>
                <td>${doctors.image}</td>
                <td>${doctors.specialization}</td>
                <td>${doctors.description}</td>
                <td>${doctors.name }</td>
                <td>${doctors.email }</td>
                <td>${doctors.password }</td>
                <td class="edit"><a href="/crud dashboard (2)/crud dashboard/weblab/DoctorUpdate.html?id=${doctors.id}"><i class="fa-solid fa-pen"></i></a></td>
                <td class="delete"><i class="fa-solid fa-trash" onclick="deleteProduct(${doctors.id})"></i></td>
            `;
            
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function deleteProduct(user_id) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/doctores_delete.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_id }), // Use 'user_id' as the key
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${data.error}`);
        }

        console.log('Product deleted successfully:', data.message);

        // Remove the deleted row from the table
        const deletedRow = document.querySelector(`tr[data-id="${user_id}"]`);
        if (deletedRow) {
            deletedRow.remove();
        }
    } catch (error) {
        console.error('Error deleting product:', error.message);
        // Display a user-friendly error message, if needed
        alert('Error deleting product. Please try again later.');
    }
}

// Initial fetch
fetchProducts();
