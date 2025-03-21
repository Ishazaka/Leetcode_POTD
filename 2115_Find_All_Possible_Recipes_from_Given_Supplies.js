/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function(recipes, ingredients, supplies) {
    const ingredientToRecipes = new Map();
    const inDegree = new Map();
    const available = new Set(supplies);
    const q = [];
    const result = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        inDegree.set(recipe, ingredients[i].length);

        for (const ingr of ingredients[i]) {
            if (!ingredientToRecipes.has(ingr)) {
                ingredientToRecipes.set(ingr, []);
            }
            ingredientToRecipes.get(ingr).push(recipe);
        }
    }

    for (const supply of supplies) {
        if (ingredientToRecipes.has(supply)) {
            for (const recipe of ingredientToRecipes.get(supply)) {
                inDegree.set(recipe, inDegree.get(recipe) - 1);
                if (inDegree.get(recipe) === 0) {
                    q.push(recipe);
                    available.add(recipe);
                }
            }
        }
    }

    while (q.length > 0) {
        const currRecipe = q.shift();
        result.push(currRecipe);

        if (ingredientToRecipes.has(currRecipe)) {
            for (const nextRecipe of ingredientToRecipes.get(currRecipe)) {
                inDegree.set(nextRecipe, inDegree.get(nextRecipe) - 1);
                if (inDegree.get(nextRecipe) === 0) {
                    q.push(nextRecipe);
                    available.add(nextRecipe);
                }
            }
        }
    }

    return result;
};
