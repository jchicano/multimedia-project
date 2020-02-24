import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { EditNoteModalPage } from '../modal/edit-note-modal/edit-note-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    PipesModule
  ],
  declarations: [
    Tab2Page,
    EditNoteModalPage
  ],
  entryComponents: [
    EditNoteModalPage
  ]
})
export class Tab2PageModule {}
