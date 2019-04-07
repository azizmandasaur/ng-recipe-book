import { Component } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service'
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      )
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logOut();
  }

  isAuthentcated() {
    return this.authService.isAuthenticated();
  }
}
