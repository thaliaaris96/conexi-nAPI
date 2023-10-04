// Espera a que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Aquí utulizo la key que me da la API de theMealDB para poder usarla
    const apiKey = "1";
    
    // Estas constantes obtienen los elementos del DOM
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
                            
                            // Agregar evento de clic a cada elemento de receta
                            recipeElement.addEventListener("click", function () {
                            // Redirigir al usuario a la página de la receta completa
                            window.location.href = `https://www.themealdb.com/meal/${recipe.idMeal}`;
                        });

                            resultsContainer.appendChild(recipeElement);
                        });
                    } else {
                        resultsContainer.innerHTML = "No se encontraron recetas.";
                        // clase "error" al elemento resultContainer
                        resultsContainer.classList.add("error");
                    }
                })
                .catch(function (error) {
                    console.error("Error al obtener recetas:", error);
                });
        }
    });
});




