function loadCategories() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.themealdb.com/api/json/v1/1/categories.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const categories = data.categories;
                const categoriesContainer = document.getElementById('categoriesContainer');
                categoriesContainer.innerHTML = '';

                categories.forEach(category => {
                    const categoryName = category.strCategory;
                    const categoryContainer = document.createElement('div');
                    categoryContainer.innerHTML = `<h3>${categoryName}</h3>`;
                    categoryContainer.className = 'category-container';
                    categoriesContainer.appendChild(categoryContainer);

                    const mealsContainer = document.createElement('div');
                    mealsContainer.className = 'meals-container';
                    categoryContainer.appendChild(mealsContainer);

                    loadMeals(categoryName, mealsContainer);
                });
            } else {
                console.error('Error fetching categories:', xhr.status);
            }
        }
    };
    xhr.send();
}

function loadMeals(category, container) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const meals = data.meals;
                if (meals) {
                    meals.slice(0, 10).forEach(meal => {
                        const mealElement = document.createElement('div');
                        mealElement.innerHTML = `
                            <button class="mealBtn" data-meal="${meal.idMeal}">${meal.strMeal}</button>
                        `;
                        container.appendChild(mealElement);
                    });
                } else {
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = 'No meals found.';
                    container.appendChild(errorMessage);
                }
            } else {
                console.error(`Error fetching ${category} meals:`, xhr.status);
            }
        }
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function() {
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
});



document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links
    var navLinks = document.querySelectorAll('.nav-link');

    // Add click event listener to each navigation link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
          //  event.preventDefault(); // Prevent default link behavior
            var href = this.getAttribute('href'); // Get the value of href attribute
            if (href && href !== '#') {
                window.location.href = href; // Redirect to the specified URL
            }
        });
    });
});
