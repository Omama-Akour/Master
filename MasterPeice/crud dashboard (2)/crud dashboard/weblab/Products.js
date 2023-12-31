async function fetchProducts() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/products_read.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const productContainer = document.querySelector('tbody');
        productContainer.innerHTML = ''; // Clear existing content

        data.forEach(products => {
            const card = document.createElement('tr');
            card.innerHTML = `
                <td>${products.id}</td>
                <td>${products.name}</td>
                <td>${products.image}</td>
                <td>${products.description}</td>
                <td>${products.price}</td>
                <td>${products.category_id}</td>
                <td class="edit"><a href="/crud dashboard (2)/crud dashboard/weblab/ProductsUpdate.html?id=${products.id}"><i class="fa-solid fa-pen"></i></a></td>
                <td class="delete"><i class="fa-solid fa-trash" onclick="deleteProduct(${products.id})"></i></td>
            `;
            
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function deleteProduct(id) {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/products_delete.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Product deleted successfully:', data);

        // You may want to update the UI or fetch the products again to refresh the table
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Initial fetch
fetchProducts();
