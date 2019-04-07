import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is a Test item',
            'https://www.swatifood.com/wp-content/uploads/2018/01/Authentic-Hyderabadi-mutton-biryani-recipe.jpg',
            [
                new Ingredient('Meat', 2),
                new Ingredient('Rice', 3)
            ]),
        new Recipe('Another Test Recipe',
            'This is another Test item',
            'https://www.swatifood.com/wp-content/uploads/2018/01/Authentic-Hyderabadi-mutton-biryani-recipe.jpg',
            [
                new Ingredient('Chicken', 2),
                new Ingredient('Milk Cream', 1)
            ])
    ];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    onDelete(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}