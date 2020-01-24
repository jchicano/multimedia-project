import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public miSaludo: string;

  constructor(
    public auth: AuthService
  ) {}

  public logout() {
    this.auth.logout();
  }

}
