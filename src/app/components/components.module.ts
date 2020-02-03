import { SpinnerComponent } from './spinner/spinner.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NOTE https://youtu.be/za5NaFavux4

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    IonicModule // NOTE https://stackoverflow.com/a/54387068/10387022
  ],
  exports : [SpinnerComponent]
})
export class ComponentsModule { }
