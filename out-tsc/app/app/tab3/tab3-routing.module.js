import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tab3Page } from './tab3.page';
const routes = [
    {
        path: '',
        component: Tab3Page,
    }
];
let Tab3PageRoutingModule = class Tab3PageRoutingModule {
};
Tab3PageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], Tab3PageRoutingModule);
export { Tab3PageRoutingModule };
//# sourceMappingURL=tab3-routing.module.js.map