import { LoadingService } from './../services/ui/loading.service';
import { note } from './../model/Note';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private loadingS: LoadingService
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  public logout() {
    this.auth.logout();
  }

  addNote(): void {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    };

    this.loadingS.show('Guardando...');

    this.todoS.addTODO(data)
      .then((ok) => {
        this.toastS.showOnceToast('Nota guardada');
        this.todoForm.reset();
      })
      .catch((err) => {
        this.toastS.showOnceToast('Error al guardar nota');
      })
      .finally(() => {
        this.loadingS.close();
      });
  }

}
