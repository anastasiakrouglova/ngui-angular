import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2detailsPageRoutingModule } from './tab2details-routing.module';

import { Tab2detailsPage } from './tab2details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2detailsPageRoutingModule
  ],
  declarations: [Tab2detailsPage]
})
export class Tab2detailsPageModule {}
