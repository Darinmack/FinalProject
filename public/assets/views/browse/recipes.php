
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="../../assets/js/recipes.js"></script>
        <link rel="stylesheet" href="../../assets/styles/recipes.css">
    <title>Bootstrap Navbar</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Recipe Reservoir</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/contacts">Contacts</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/recipes" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Browse Recipes</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/recipes">Recipes</a></li>
                            <li><a class="dropdown-item" href="/favorites">Favorites</a></li>
                         
                            <li><a class="dropdown-item" href="/newRecipes">Add New Recipes</a></li>
                        </ul>
                    </li>
                   
                 <li class="nav-item"><a class="nav-link" href="/ingredients">Ingredients</a></li>
                           
                    
                    <li class="nav-item"><a class="nav-link" href="/sharing">Share with Others</a></li>
                </ul>
            </div>
        </div>
    </nav>
<br>
<div class="top-back">
<center>
    <h1 id="fin">Find the Right recipe for you. Search the vast collection below</h1>
</center>
    <br>
    <br>
<form class="centered-form">
    <div class="search-container">
    <input  id="sea" type="text"  placeholder="Search recipes">
</div>
<button id="btn" type="button">SEARCH</button>
</form>
</div>

<br>
<br>
<div id="back"> 
<h2>Click here to view all recipes<h2> 
<button id="browseRecipesBtn" >Browse All recipes</button>
<br>
<br>
<div id="categoriesContainer" style="display: none;"></div>
<br>
<br>

<br>
<br>

</div>

<!--
<center>
<h2>CLick here to save to youur favorites!!!<h2>
    <button>SAVE TO FAVORITES</button>
</center>

-->
<br>
<br>



    <script>
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
</script>
    





<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>