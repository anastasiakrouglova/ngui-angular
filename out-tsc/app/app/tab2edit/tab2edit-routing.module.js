import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tab2editPage } from './tab2edit.page';
const routes = [
    {
        path: '',
        component: Tab2editPage
    }
];
let Tab2editPageRoutingModule = class Tab2editPageRoutingModule {
};
Tab2editPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], Tab2editPageRoutingModule);
export { Tab2editPageRoutingModule };
//# sourceMappingURL=tab2edit-routing.module.js.map