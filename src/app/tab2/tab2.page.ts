import { EditNoteModalPage } from './../modal/edit-note-modal/edit-note-modal.page';
import { note } from './../model/Note';
import { LoadingService } from './../services/ui/loading.service';
import { NoteService } from './../services/note.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel: any[];
  public textoBuscar: string;

  constructor(
    private noteS: NoteService,
    private router: Router,
    private alertController: AlertController,
    private toastS: ToastService,
    private loadingS: LoadingService,
    private modalController: ModalController
  ) { }

  ionViewDidEnter() {
    this.refrescar();
  }

  // Refresco de la lista
  private async refrescar() {
    await this.loadingS.show('Cargando...');
    this.listadoPanel = [];
    console.log("Cargando notas");
    try {
      /*subscription = this.todoS.readTODO2().subscribe((lista) => {
        // Cortar tempo porque ha llegado antes de los 10s
        clearTimeout(tempo);*/
      this.noteS.readNote2().subscribe((lista) => {
        this.listadoPanel = lista;
        this.loadingS.close();
        console.log('Notas cargadas');
      });
    } catch (error) {
      this.loadingS.close();
    }
    console.log('Petición solicitada');
  }

  // Edicion de nota
  public editaNota(id: string) {
    let id_modal;
    let data_title;
    let data_description;
    let data_image;
    this.noteS.readNoteByID(id).subscribe((nota) => {
      id_modal = nota.id;
      data_title = nota.data().title;
      data_description = nota.data().description;
      data_image = nota.data().image;
      //console.log("Tab2 ID: " + nota.id);
      //console.log("Tab2 title: " + data_title + " description: " + data_description);
      //this.modalEditar(id_modal, data_title, data_description, data_image);
      this.openModalWithData(id_modal, data_title, data_description, data_image);
    })
  }

  async modalEditar(id_modal: string, data_title: string, data_description: string, data_image: string) {
    const modal = await this.modalController.create({
      component: EditNoteModalPage,
      componentProps: {
        id: id_modal,
        title: data_title,
        description: data_description
      }
    });
    await modal.present();

    await modal.onDidDismiss().then((salida) => {
      //console.log("modalEditar Promise then id:" + salida.data.id);
      //console.log("modalEditar Promise then title:" + salida.data.title);
      //console.log("modalEditar Promise then title:" + salida.data.description);

      let dataEdit: note;
      dataEdit = {
        title: salida.data.title,
        description: salida.data.description,
        image: salida.data.image
      }
      this.loadingS.show("Cargando");
      this.noteS.updateNote(salida.data.id, dataEdit).then((ok) => {
        this.toastS.showOnceToast("Nota actualizada");
      }).catch((error) => {
        console.log(error);
        this.toastS.showOnceToast("Error al actualizar la nota");
      }).finally(() => {
        this.loadingS.close();
        this.refrescar();
      });
    }).catch((error) => {
      console.log("Salida del modal sin cambios");
    });
  }




  async openModal() {
    const modal = await this.modalController.create({
      component: EditNoteModalPage
    });
    return await modal.present();
  }

  async openModalWithData(id_modal: string, data_title: string, data_description: string, data_image: string) {
    const modal = await this.modalController.create({
      component: EditNoteModalPage,
      componentProps: {
        id: id_modal,
        title: data_title,
        description: data_description,
        image: data_image
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      if (dataReturned) {
      console.log('Received from modal:');
      console.log(dataReturned);
        let dataEdit: note;
        dataEdit = {
          title: dataReturned.data.title,
          description: dataReturned.data.description,
          image: dataReturned.data.image
        }
        this.loadingS.show("Cargando");
        this.noteS.updateNote(dataReturned.data.id, dataEdit).then((ok) => {
          this.toastS.showOnceToast("Nota actualizada");
        }).catch((error) => {
          console.log(error);
          this.toastS.showOnceToast("Error al actualizar la nota");
        }).finally(() => {
          this.loadingS.close();
          this.refrescar();
        });
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending parameters to modal');
    });
  }



  // Eliminacion de nota
  borraNota(id: string): void {
    this.presentAlertConfirm(id);
  }

  // Redireccion a la vista de crear nota
  irInicio(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  // Refresco de la lista
  doRefresh(event): void {
    this.listadoPanel = [];
    console.log('Cargando notas');
    let myObservable = this.noteS.readNote();
    myObservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() }); // Uso del spread operator - junta 2 objetos
      });
      event.target.complete();
      console.log('Notas cargadas');
    });
    console.log('Petición solicitada');
  }

  async presentAlertConfirm(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar nota',
      message: '¿Estás seguro que deseas eliminar <strong>permanentemente</strong> la nota? Esta acción no se puede revertir.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Borrado cancelado');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Borrando item');
            this.noteS.deleteNote(id)
              .then((salida) => {
                this.refrescar();
                this.toastS.showOnceToast('Nota eliminada');
              })
              .catch((err) => {
                console.log(err);
                this.toastS.showOnceToast('Error al eliminar la nota');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt(id: string, nota: note): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Editar nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: nota.title,
          placeholder: 'Título'
        },
        {
          name: 'descripcion',
          type: 'text',
          value: nota.description,
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edicion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            console.log('Edicion confirmada');
            let editedNote: note;
            editedNote = {
              title: alertData.titulo,
              description: alertData.descripcion,
              image: alertData.image
            };
            this.noteS.updateNote(id, editedNote)
              .then(() => {
                this.refrescar();
                this.toastS.showOnceToast('Nota modificada correctamente');
              })
              .catch(() => {
                this.toastS.showOnceToast('Error al actualizar la nota');
              });
          }
        }
      ]
    });

    await alert.present();
  }

  buscar($event): void {
    this.textoBuscar = $event.detail.value;
  }
}
