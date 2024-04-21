let allIngredients = [];
        let currentPage = 1;
        const ingredientsPerPage = 20;

        document.getElementById('getIngredientsBtn').addEventListener('click', function() {
            fetchIngredients();
        });

        document.getElementById('loadMoreBtn').addEventListener('click', function() {
            currentPage++;
            displayIngredients();
        });

        function fetchIngredients() {
            fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
                .then(response => response.json())
                .then(data => {
                    allIngredients = data.meals;
                    displayIngredients();
                })
                .catch(error => {
                    console.error('Error fetching ingredients:', error);
                });
        }

        function displayIngredients() {
            const startIndex = (currentPage - 1) * ingredientsPerPage;
            const endIndex = startIndex + ingredientsPerPage;
            const currentIngredients = allIngredients.slice(startIndex, endIndex);

            const ingredientsContainer = document.getElementById('ingredientsContainer');
            ingredientsContainer.innerHTML = '';

            const row = document.createElement('div');
            row.classList.add('row');
            ingredientsContainer.appendChild(row);

            currentIngredients.forEach(ingredient => {
                const col = document.createElement('div');
                col.classList.add('col-md-3', 'mb-3');

                const card = document.createElement('div');
                card.classList.add('card');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`;
                img.alt = ingredient.strIngredient;

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = ingredient.strIngredient;

                cardBody.appendChild(img);
                cardBody.appendChild(title);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
            });

            if (endIndex < allIngredients.length) {
                document.getElementById('loadMoreBtn').style.display = 'block';
            } else {
                document.getElementById('loadMoreBtn').style.display = 'none';
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Get all navigation links
            var navLinks = document.querySelectorAll('.nav-link');
    
            // Add click event listener to each navigation link
            navLinks.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    var href = this.getAttribute('href'); // Get the value of href attribute
                    if (href && href !== '#') {
                        window.location.href = href; // Redirect to the specified URL
                    }
                });
            });
        });

        const browseLink = document.getElementById("recipes");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        browseLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            dropdownMenu.classList.toggle("show"); // Toggle the visibility of the dropdown menu
        });
        document.addEventListener("click", function(event) {
            const target = event.target;
            if (!target.matches("#recipes") && !dropdownMenu.contains(target)) {
                dropdownMenu.classList.remove("show"); // Hide dropdown menu
            }
        });