import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
// import { DataResolverService } from './resolver/data-resolver.service';
const routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'tab2details',
        loadChildren: () => import('./tab2details/tab2details.module').then(m => m.Tab2detailsPageModule)
    },
    {
        path: 'tabs/details/:id',
        // resolve: {
        //   special: DataResolverService
        // },
        loadChildren: () => import('./tab2details/tab2details.module').then(m => m.Tab2detailsPageModule)
    },
    {
        path: 'tab2edit',
        loadChildren: () => import('./tab2edit/tab2edit.module').then(m => m.Tab2editPageModule)
    },
    {
        path: 'tabs/edit/:id',
        loadChildren: () => import('./tab2edit/tab2edit.module').then(m => m.Tab2editPageModule)
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map