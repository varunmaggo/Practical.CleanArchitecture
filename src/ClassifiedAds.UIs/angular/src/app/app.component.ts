import { Component } from '@angular/core';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'ClassifiedAds.Angular';

  constructor(public auth: AuthService) {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
