import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2editPageRoutingModule } from './tab2edit-routing.module';

import { Tab2editPage } from './tab2edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2editPageRoutingModule
  ],
  declarations: [Tab2editPage]
})
export class Tab2editPageModule {}
