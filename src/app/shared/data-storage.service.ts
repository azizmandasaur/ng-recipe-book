import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://ng-recipe-book-7c060.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();

        this.http.get<Recipe[]>('https://ng-recipe-book-7c060.firebaseio.com/recipes.json')
            .pipe(
                map(
                    (recipes) => {
                        for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}