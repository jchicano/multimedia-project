import { SidemenuComponent } from './../sidemenu/sidemenu.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  providers: [
    SidemenuComponent
  ],
  declarations: [TabsPage, SidemenuComponent]
})
export class TabsPageModule {}
