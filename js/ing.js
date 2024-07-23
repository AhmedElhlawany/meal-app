let Ingredient = [];

async function getIngredients(numberOfIngredients) {
    try {
        const ingresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const data = await ingresponse.json();
        const mealing = data.meals;  
        
       

        for (let i = 0; i < Math.min(numberOfIngredients, mealing.length); i++) {
            Ingredient.push(mealing[i]);
        }
        console.log(Ingredient);
        displayIng();
    } catch (error) {
        console.error('Error fetching Ingredients:', error);
    }
}

let getIng = document.querySelector("#Ingredients");
getIng.addEventListener('click', () => getIngredients(20));

function displayIng() {
    let IngCartona = '';
  
    for (let i = 0; i < Ingredient.length; i++) {
        let Ing = Ingredient[i];
        IngCartona += `
            <div class="col-md-3 rounded-2 position-relative main-card my-3 text-white text-center">
            <h2>${Ing.strIngredient}</h2>
            <p>${Ing.strDescription.split(" ",23).join(" ")}</p>
            </div>`;
    }
  
    document.getElementById("ing-meal-card").innerHTML = IngCartona;
}
