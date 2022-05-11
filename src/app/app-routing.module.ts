import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab2details',
    loadChildren: () => import('./tab2details/tab2details.module').then( m => m.Tab2detailsPageModule)
  },
  {
    path: 'tabs/details/:id',
    // resolve: {
    //   special: DataResolverService
    // },
    loadChildren: () => import('./tab2details/tab2details.module').then( m => m.Tab2detailsPageModule)
  },
  {
    path: 'tab2edit',
    loadChildren: () => import('./tab2edit/tab2edit.module').then( m => m.Tab2editPageModule)
  },
  {
    path: 'tabs/edit/:id',
    loadChildren: () => import('./tab2edit/tab2edit.module').then( m => m.Tab2editPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
