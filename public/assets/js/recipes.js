document.getElementById('browseRecipesBtn').addEventListener('click', function() {
    loadCategories();
    document.getElementById('categoriesContainer').style.display = 'block';
});

function loadCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

function loadMeals(category, container) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error(`Error fetching ${category} meals:`, error);
        });
}

document.getElementById('categoriesContainer').addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.classList.contains('mealBtn')) {
        const mealId = target.dataset.meal;
        displayMealDetails(mealId, target);
    }
});

function displayMealDetails(mealId, target) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealDetailsContainer = document.createElement('div');
            mealDetailsContainer.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
                <p><strong>Ingredients:</strong> ${getIngredients(meal)}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions || 'Instructions not available'}</p>
            `;

            const categoryContainer = target.closest('.category-container');
            categoryContainer.appendChild(mealDetailsContainer);
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
}

function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<img src="https://www.themealdb.com/images/ingredients/${ingredient}.png" alt="${ingredient}" width="20"> ${measure ? `(${measure})` : ''}, `;
        }
    }
    return ingredients.trim().slice(0, -1);
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