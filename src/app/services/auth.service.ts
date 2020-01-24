import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from './../model/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(
    private local: NativeStorage,
    private google: GooglePlus,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  /**
   * Almacena el usuario en local con el nombre 'user'
   * @param user
   */
  public async saveSession(user?: User) {
    if (user) {
      await this.local.setItem('user', user); // Await porque devuelve un promise, y bloqueamos la linea hasta que se complete
    }
    else {
      await this.local.remove('user');
    }
  }

  public async checkSession(): Promise<void> {
    if (!this.user) { // Todavia no se ha iniciado sesion
      try {
        this.user = await this.local.getItem('user'); // Recuperamos el usuario de local storage
      } catch (error) {
        this.user = null;
      }
    }
  }

  public loginGoogle(): Promise<boolean> {
    console.log("En el servicio");
    return new Promise((resolve, reject) => {
      // Logica
      this.google.login({}) // Config basica
        .then((d) => {
          console.log(d);
          if (d && d.email) {
            let user: User = {
              email: d.email,
              displayName: d.displayName,
              imageUrl: d.imageUrl,
              userId: d.userId
            }
            this.user = user;
            this.saveSession(user);
            resolve(true);
            // Ya esta guardado
          }
          else resolve(false);
        })
        .catch((err) => {
          console.log(err);
          resolve(false);
        });
    });
  }

  public async logout() {
    await this.google.logout();
    this.user = null;
    await this.saveSession();
    this.router.navigate(['login']);
  }
}
