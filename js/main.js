


$(document).ready(function() {
    $('#bar').on('click', function() {
        $(".side-bar-menus").animate({ width: "17%" }, 1000);
        $(".side-bar").animate({ left: "17%" }, 1000);
        $("ul").slideDown(1000);
        $("li").animate({ width: "17%" }, 1000);
        
        openSide();
    });

    $('#close').on('click', function() {
        $(".side-bar-menus").animate({ width: "0%" }, 1000);
        $(".side-bar").animate({ left: "0%" }, 1000);
        $("ul").slideUp(1000);
        $("li").animate({ width: "0%" }, 1000);
        closeSide();

    });

    function openSide() {
        let opn = document.querySelector("#bar");
        let close = document.querySelector("#close");
        close.classList.remove('d-none');
        opn.classList.add('d-none');
    }

    function closeSide() {
        let opn = document.querySelector("#bar");
        let close = document.querySelector("#close");
        close.classList.add('d-none');
        opn.classList.remove('d-none');
    }

    $('#Search').on('click', function() {
        $(".main").fadeOut(100);
        $('.category').fadeOut(100);
        $('.area').fadeOut(100);
        $('.Contact-Us').fadeOut(100);
        $('.Ingredients').fadeOut(100);
        $('.search').fadeIn(100);
        
    });

    $('#Categories').on('click', function() {
        $(".main").fadeOut(100);
        $('.search').fadeOut(100);
        $('.Contact-Us').fadeOut(100);
        $('.Ingredients').fadeOut(100);
        $('.area').fadeOut(100);
        $('.category').fadeIn(100);
        
    });

    $('#Area').on('click', function() {
        $(".main").fadeOut(100);
        $('.search').fadeOut(100);
        $('.category').fadeOut(100);
        $('.Contact-Us').fadeOut(100);
        $('.Ingredients').fadeOut(100);
        $('.area').fadeIn(100);
        
    });

    $('#Ingredients').on('click', function() {
        $(".main").fadeOut(100);
        $('.search').fadeOut(100);
        $('.category').fadeOut(100);
        $('.area').fadeOut(100);
        $('.Contact-Us').fadeOut(100);
        $('.Ingredients').fadeIn(100);
        
    });

    $('#Contact').on('click', function() {
        $(".main").fadeOut(100);
        $('.search').fadeOut(100);
        $('.category').fadeOut(100);
        $('.area').fadeOut(100);
        $('.Ingredients').fadeOut(100);
        $('.Contact-Us').fadeIn(100);
        
    });



})

  


let defmeals = [];

async function getMeals(numberOfMeals) {
    try {
      for (let i = 0; i < numberOfMeals; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        defmeals.push(data.defmeals[0]);
      }
      displayMeals();
      
    } catch (error) {
      console.error('Error fetching meals:',error);
    }
  }

getMeals(18)
function displayMeals(meals) {
  let cartona = '';

  for (let i = 0; i < defmeals.length; i++) {
    let meal = defmeals[i];
    cartona += `
      <div class="col-md-3 rounded-2 position-relative main-card my-3">
        <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="${meal.strMeal}">
        <div class="layer position-absolute rounded-2">
          <h2 class="fs-4 text-white text-center mt-5">${meal.strMeal}</h2>
          <p class="text-white text-center">${meal.strCategory}</p>
        </div>
      </div>`;
  }

  document.getElementById("meal-card").innerHTML = cartona;
}

// search
// search name

let searchMeals = [];

async function getMealsByName(query) {
    try {
        const searchresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await searchresponse.json();
        const search = data.meals;
        
        searchMeals = []; 

        if (search) {
            for (let i = 0; i < search.length; i++) {
                searchMeals.push(search[i]);
            }
        }
        
        displaySearchMeals();
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

let getSearchByName = document.querySelector("#search-name");
getSearchByName.addEventListener('input', (event) => getMealsByName(event.target.value));

function displaySearchMeals() {
    let searchCartona = '';
  
    for (let i = 0; i < searchMeals.length; i++) {
        let search = searchMeals[i];
        searchCartona += `
            <div class="col-md-3 rounded-2 main-card position-relative my-3 text-white">
                <img src="${search.strMealThumb}" class="w-100 rounded-2" alt="${search.strMeal}">
                <div class="layer position-absolute rounded-2">
                    <h2 class="fs-4 text-white text-center mt-5">${search.strMeal}</h2>
                </div>
            </div>`;
    }
  
    document.getElementById("search-meal").innerHTML = searchCartona;
}




document.addEventListener('DOMContentLoaded', function() {
    function validate() {
        let searchin = document.querySelector("#search-name");
        searchin.addEventListener('input', function() {
            document.querySelector(".loader").classList.replace('d-none', 'd-block');
            console.log("hi");
        });
    }
    
    validate();
});
// search flet
let searchFletMeals = [];

async function getMealsByFlet(query) {
    try {
        const searchresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
        const data = await searchresponse.json();
        const search = data.meals;
        
        searchFletMeals = []; 

        if (search) {
            for (let i = 0; i < search.length; i++) {
                searchFletMeals.push(search[i]);
            }
        }
        
        displaySearchfMeals();
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

let getSearchByFlet = document.querySelector("#search-Flet");
getSearchByFlet.addEventListener('input', (event) => getMealsByFlet(event.target.value));

function displaySearchfMeals() {
    let searchfCartona = '';
  
    for (let i = 0; i < searchFletMeals.length; i++) {
        let search = searchFletMeals[i];
        searchfCartona += `
            <div class="col-md-3 rounded-2 main-card position-relative my-3 text-white">
                <img src="${search.strMealThumb}" class="w-100 rounded-2" alt="${search.strMeal}">
                <div class="layer position-absolute rounded-2">
                    <h2 class="fs-4 text-white text-center mt-5">${search.strMeal}</h2>
                </div>
            </div>`;
    }
  
    document.getElementById("search-meal").innerHTML = searchfCartona;
}








// meal info



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

async function getAllMeals() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        const meals = data.meals;
        
        if (meals) {
            displayMeals(meals); 
        } else {
            console.error('No meals found');
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
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

    document.getElementById("meal-card").innerHTML = mealsContainer;

    const mealItems = document.querySelectorAll('.meal-item');
    for (let i = 0; i < mealItems.length; i++) {
        mealItems[i].addEventListener('click', function() {
            const mealId = this.getAttribute('data-meal-id');
            getMealInfo(mealId);
        });
    }
}

function displayInfo(mealInfo) {
    let InfoCartona = '';

    for (let i = 0; i < mealInfo.length; i++) {
        let Inf = mealInfo[i];
        InfoCartona += `
            <div class="col-md-4">
                <div class="m-2 text-white rounded-2">
                    <img src="${Inf.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2>${Inf.strMeal}</h2>
                </div>
            </div>
            <div class="col-md-8 text-white">
                <div class="m-2 rounded-2">
                    <h2 class="m-2">Instructions</h2>
                    <p>${Inf.strInstructions}</p>
                    <p class="m-2">Area: ${Inf.strArea}</p>
                    <p class="m-2">Category: ${Inf.strCategory}</p>
                    <p class="m-2">Recipes: ${Inf.strIngredient1}</p>
                    <p class="m-2">Tags: ${Inf.strTags}</p>
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

getAllMeals();







// contact
let name = document.getElementById("#name")
let phone = document.getElementById("#phone")
let password = document.getElementById("#password")
let email = document.getElementById("#email")
let Age = document.getElementById("#Age")
let repassword = document.getElementById("#repassword")
let searchFlet = document.getElementById("#search-Flet")

function ValidateInputes(element){
    var regex = {
        name:/^[a-z0-9_-]{3,15}$/,
        phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        email:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        Age:/^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/,
        repassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

    }
    if(regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')
        console.log('match');
        document.querySelector("#Submit").classList.remove('disabled')
        return true;
    }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none','d-block')
        console.log('not');
        document.querySelector("#Submit").classList.add('disabled')
        return false;
    }
}