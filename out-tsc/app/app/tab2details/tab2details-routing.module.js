import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tab2detailsPage } from './tab2details.page';
const routes = [
    {
        path: '',
        component: Tab2detailsPage
    }
];
let Tab2detailsPageRoutingModule = class Tab2detailsPageRoutingModule {
};
Tab2detailsPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], Tab2detailsPageRoutingModule);
export { Tab2detailsPageRoutingModule };
//# sourceMappingURL=tab2details-routing.module.js.map