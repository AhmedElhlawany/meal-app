let areas = [];

async function getArea(numberOfAreas) {
    try {
        const arearesponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const data = await arearesponse.json();
        const mealAreas = data.meals;
        areas = []; 
        for (let i = 0; i < Math.min(numberOfAreas, mealAreas.length); i++){
            areas.push(mealAreas[i]);
        }
        console.log(areas);
        displayAreas();
    } catch (error) {
        console.error('Error fetching areas', error);
    }
}

let getAreas = document.querySelector("#Area");
getAreas.addEventListener('click', function(){
    getArea(29);
});

function displayAreas() {
    let areaCartona = '';
    for (let i = 0; i < areas.length; i++) {
        
        areaCartona += `
        <div class="col-md-3 rounded-2 main-card my-3 text-white text-center" data-area="${areas[i].strArea}">
            <i class="fa-solid fa-house-laptop"></i>
            <h2 class="fs-4 text-center">${areas[i].strArea}</h2>
        </div>`;
        console.log(i);
    }
    document.getElementById("area-meal-card").innerHTML = areaCartona;

    const areaItems = document.querySelectorAll('.main-card');
    for (let i = 0; i < areaItems.length; i++) {
        areaItems[i].addEventListener('click', function() {
            const area = this.getAttribute('data-area');
            getMealsByArea(area);
            console.log(area);
        });
    }
}

async function getMealsByArea(area) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await response.json();
        const meals = data.meals;

        if (meals) {
            displayMeals(meals);
            console.log(meals);
            console.log(meals.length);
        } else {
            console.error('No meals found');
        }
    } catch (error) {
        console.error('Error fetching meals by area:', error);
    }
}

function displayomdaMeals(meals) {
    console.log("hi from displayMeals")
    let mealsContainer = '';
    console.log(meals)
    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i];
        mealsContainer += `
            <div class="col-md-3 meal-item" data-meal-id="${meal.idMeal}">
                <div class="m-2 bg-danger main-card position-relative rounded-2">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="">
                    <div class="layer position-absolute rounded-2">
                        <h2 class="fs-4 text-white text-center mt-5">${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
    }
    
    document.getElementById("area-meal-card").innerHTML = mealsContainer;

    const mealItems = document.querySelectorAll('.meal-item');
    for (let i = 0; i < mealItems.length; i++) {
        mealItems[i].addEventListener('click', function() {
            const mealId = this.getAttribute('data-meal-id');
            console.log(mealId)
            getMealOmdaInfo(mealId);
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


getArea(14);
