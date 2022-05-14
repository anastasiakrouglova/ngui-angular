import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tab2Page } from './tab2.page';
const routes = [
    {
        path: '',
        component: Tab2Page,
    }
];
let Tab2PageRoutingModule = class Tab2PageRoutingModule {
};
Tab2PageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], Tab2PageRoutingModule);
export { Tab2PageRoutingModule };
//# sourceMappingURL=tab2-routing.module.js.map