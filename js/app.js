// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Reemplaza con tu API key de theMealDB
    const apiKey = "1";
    
    // Obtiene los elementos del DOM
    const searchInput = document.getElementById("search");
    const submitButton = document.getElementById("btnEviar");
    const resultsContainer = document.getElementById("results-container");
    
    // Agrega un evento al botón de búsqueda
    submitButton.addEventListener("click", function () {
        const searchTerm = searchInput.value;
        
        if (searchTerm) {
            // Hacer la solicitud a la API de theMealDB
            fetch(`https://www.themealdb.com/api/json/v2/${apiKey}/search.php?s=${searchTerm}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Procesar y mostrar los resultados en la página
                    const recipes = data.meals;
                    resultsContainer.innerHTML = "";

                    if (recipes) {
                        recipes.forEach(function (recipe) {
                            const recipeName = recipe.strMeal;
                            const recipeImage = recipe.strMealThumb;

                            const recipeElement = document.createElement("div");
                            recipeElement.classList.add("recipe");
                            recipeElement.innerHTML = `
                                <h3>${recipeName}</h3>
                                <img src="${recipeImage}" alt="${recipeName}">
                            `;

                            resultsContainer.appendChild(recipeElement);
                        });
                    } else {
                        resultsContainer.innerHTML = "No se encontraron recetas.";
                    }
                })
                .catch(function (error) {
                    console.error("Error al obtener recetas:", error);
                });
        }
    });
});




