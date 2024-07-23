let catMeals = [];

async function getCat(numberOfCategories) {
    try {
        const catresponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await catresponse.json();
        const categories = data.categories;
        
        for (let i = 0; i < Math.min(numberOfCategories, categories.length); i++) {
            catMeals.push(categories[i]);
        }
        
        displayCatMeals();
        
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

let getCategory = document.querySelector("#Categories");
getCategory.addEventListener('click', () => getCat(14));

function displayCatMeals() {
    let catCartona = '';
  
    for (let i = 0; i < catMeals.length; i++) {
        let cat = catMeals[i];
        catCartona += `
            <div class="col-md-3 rounded-2 position-relative main-card my-3" data-category="${cat.strCategory}">
                <img src="${cat.strCategoryThumb}" class="w-100 rounded-2" alt="${cat.strCategory}">
                <div class="layer position-absolute rounded-2">
                    <h2 class="fs-4 text-white text-center mt-5">${cat.strCategory}</h2>
                    <p class="text-white text-center">${cat.strCategoryDescription.substring(0, 100)}...</p>
                </div>
            </div>`;
    }
  
    document.getElementById("cat-meal-card").innerHTML = catCartona;
    
    const catItems = document.querySelectorAll('.main-card');
    for (let i = 0; i < catItems.length; i++) {
        catItems[i].addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            getMealsByCategory(category);
        });
    }
}

async function getMealsByCategory(category) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        const meals = data.meals;
        
        if (meals) {
            displayMeals(meals); 
        } else {
            console.error('No meals found');
        }
    } catch (error) {
        console.error('Error fetching meals by category:', error);
    }
}

function displayMeals(meals) {
    let mealsContainer = '';
    
    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i];
        mealsContainer += `
            <div class="col-md-3 meal-item" data-meal-id="${meal.idMeal}">
                <div class="m-2 bg-danger main-card position-relative rounded-2">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="layer position-absolute rounded-2">
                        <h2 class="fs-4 text-white text-center mt-5">${meal.strMeal}</h2>
                        <p class="text-white text-center">${meal.strCategory}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    document.getElementById("cat-meals-card").innerHTML = mealsContainer;
    
    const mealItems = document.querySelectorAll('.meal-item');
    for (let i = 0; i < mealItems.length; i++) {
        mealItems[i].addEventListener('click', function() {
            const mealId = this.getAttribute('data-meal-id');
            getMealInfo(mealId);
            console.log(mealId);
        });
    }
}

async function getMealInfo(mealId) {
    try {
        const inforesponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await inforesponse.json();
        const mealinfo = data.meals;

        if (mealinfo) {
            displayInfo(mealinfo); 
        } else {
            console.error('No meal info found');
        }
    } catch (error) {
        console.error('Error fetching info:', error);
    }
}

function displayInfo(mealInfo) {
    let InfoCartona = '';

    for (let i = 0; i < mealInfo.length; i++) {
        let Inf = mealInfo[i];
        InfoCartona += `
            <div class="col-md-4">
                <div class="m-2 bg-danger rounded-2">
                    <img src="${Inf.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2>${Inf.strMeal}</h2>
                </div>
            </div>
            <div class="col-md-8">
                <div class="m-2 bg-info rounded-2">
                    <h2>Instructions</h2>
                    <p>${Inf.strInstructions}</p>
                    <span>Area:</span><p>${Inf.strArea}</p>
                    <span>Category:</span><p>${Inf.strCategory}</p>
                    <span>Recipes:</span><p>${Inf.strIngredient1}</p>
                    <span>Tags:</span><p>${Inf.strTags}</p>
                    <div class="d-flex">
                        <a class="m-3" href="${Inf.strSource}" target="_blank">
                            <button type="button" class="btn btn-success">Source</button>
                        </a>
                        <a class="m-3" href="https://www.youtube.com/watch?v=${Inf.strYoutube.split('=')[1]}" target="_blank">
                            <button type="button" class="btn btn-danger">YouTube</button>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("INFO").innerHTML = InfoCartona;
}

// Initial fetch to display categories
getCat(14);


async function getMealsByCat() {
    try {
        const catmealresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c`);
        const data = await catmealresponse.json();
        const cat = data.meals;
        
        catMealsinfo = []; 

        if (cat) {
            for (let i = 0; i < cat.length; i++) {
                catMealsinfo.push(cat[i]);
            }
        }
        
        displayCatMeals();
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

const CatItems = document.querySelectorAll('.meal-item');
    for (let i = 0; i < CatItems.length; i++) {
        CatItems[i].addEventListener('click', function() {
            const mealId = this.getAttribute('data-meal-category');
            getMealInfo(mealId);
        });
    }

function displayCatMealsInfo() {
    let catmealCartona = '';
  
    for (let i = 0; i < catMeals.length; i++) {
        let cat = catMeals[i];
        catmealCartona += `
            <div class="col-md-3 rounded-2 main-card position-relative my-3 text-white">
                <img src="${cat.strMealThumb}" class="w-100 rounded-2" alt="${cat.strMeal}">
                <div class="layer position-absolute rounded-2">
                    <h2 class="fs-4 text-white text-center mt-5">${cat.strMeal}</h2>
                </div>
            </div>`;
    }
  
    document.getElementById("cat-meal-card").innerHTML = catmealCartona;
}




document.addEventListener('DOMContentLoaded', function() {
    function validate() {
        let searchin = document.querySelector("#cat-meal-card");
        searchin.addEventListener('click', function() {
            document.querySelector(".loader").classList.replace('d-none', 'd-block');
            console.log("hi");
        });
    }
    
    validate();
});