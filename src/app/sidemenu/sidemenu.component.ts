import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  public logout() {
    this.auth.logout();
  }

  async presentAlertCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que deseas cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Cerrar sesión',
          handler: () => {
            console.log('Aceptado');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
