window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

})
function fetchProducts() {
    fetch('http://localhost/MasterPeice/MASTER/skincare.php') // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const productContainer = document.getElementById('pro-container');

            data.forEach(products => {
                const card = document.createElement('div');
                card.className = 'pro';
                card.innerHTML =`          
                    <img src="/img/${products.image}" alt=""/>
                    <div class="des">                     
                        <h3>${products.product_name}</h3>
                        <h5>${products.description}</h5>
                        <h4>${products.price}</h4>
                        <a id="tocartHome" href="/SinglePage/SingleProduct.html#${products.product_id}"><button class="viewBtn">View</button></a>
                    </div>
                `;
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchProducts();




    
let signupButtonNav = document.getElementById('signupButtonNav');

let loginButtonNav = document.getElementById('loginButtonNav');

// Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedIn');
console.log("isLoggedIn:", isLoggedIn);
let carticon = document.getElementById("carticon");

if (isLoggedIn === 'true') {
// Change text and behavior for logged-in users
loginButtonNav.textContent = 'Profile';
signupButtonNav.textContent = 'Log out';

signupButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/Home/index.html';
    sessionStorage.setItem("isLoggedIn", "false");
});

loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/UserProfile/User1.html';
});
} else {
carticon.style.display = "none";
signupButtonNav.addEventListener('click', (e) => {
    window.location.href = "/signup/signup.html";
});

loginButtonNav.addEventListener('click', (e) => {
    window.location.href = "/login/login.html";
});  // Logic for non-logged-in users
}
