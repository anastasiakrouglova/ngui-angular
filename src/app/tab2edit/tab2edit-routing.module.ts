import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2editPage } from './tab2edit.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2editPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2editPageRoutingModule {}
