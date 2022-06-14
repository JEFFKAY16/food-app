const form = document.getElementById('form-field');
const userSearch = document.getElementById('search-text');
const mealList = document.getElementById('list');
const recipePopUp = document.getElementById('popup');

// Fetch Foods from API

let items = [];

form.addEventListener("submit", getFoods);
mealList.addEventListener("click", openPopUp);



function getFoods(e) {  
  e.preventDefault();
  const text = userSearch.value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
  .then(res => res.json())
  .then(data => {
    let html = "";

    let meals = data.meals;
    items = meals.slice(0,12);

    if (items) { 
      items.forEach(meal => {
        // console.log(meal.strMeal);
        html += `
        <div class="food-item" id="${meal.idMeal}">
          <div class="food-img">
            <img src="${meal.strMealThumb}" alt="food-image">
          </div>
          <div class="food-info">
            <p>${meal.strMeal}</p>
            <button class="recipe-info">GET RECIPE</button>
          </div>
        </div>
        `;
      });
    } else {
      html += 'Food not found' 
    }

    mealList.innerHTML = html;
    userSearch.value = '';

  })
}

function openPopUp(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-info')) {
    let mealItem = e.target.parentElement.parentElement;
    const mealId = mealItem.id;
    // console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
      const recipes = data.meals;
      recipes.forEach(recipe => {
        console.log(recipe);
        let popup = '';

        popup += `
          <button id="close-popup"><i class="fa fa-times" aria-hidden="true"></i></button>
          <div class="food-details">
            <h4>${recipe.strMeal}</h4>
            <p>${recipe.strCategory}</p>
          </div>
          <div class="food-instructions">
            <h5>Instructions: </h5>
            <p>${recipe.strInstructions}</p>
          </div>
          <div class="food-image-circle">
            <img src="${recipe.strMealThumb}" alt="image of food">
          </div>
          <div class="youtube-video">
            <a href="${recipe.strYoutube}">Watch Video</a>
          </div>
        `;

        recipePopUp.innerHTML = popup;

        recipePopUp.classList.add('show-popup');
        
        document.getElementById('close-popup').addEventListener('click', e => {
          recipePopUp.classList.remove('show-popup');
        })

      })
    });

  }

}


