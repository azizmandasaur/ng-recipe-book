import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();

        return this.http.put('https://ng-recipe-book-7c060.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://ng-recipe-book-7c060.firebaseio.com/recipes.json?auth=' + token)
            // .pipe(
            //     map(
            //         const recipes = response;
            //         for (let recipe of recipes) {
            //             if (!recipe['ingredients']) {
            //             recipe['ingredients'] = [];
            //             }
            //         }
            //         return recipes;
            //     )
            // );
            .subscribe(
                (response) => {
                    const recipes = response;
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}