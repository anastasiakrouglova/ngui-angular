import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2detailsPageRoutingModule } from './tab2details-routing.module';
import { Tab2detailsPage } from './tab2details.page';
let Tab2detailsPageModule = class Tab2detailsPageModule {
};
Tab2detailsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            Tab2detailsPageRoutingModule
        ],
        declarations: [Tab2detailsPage]
    })
], Tab2detailsPageModule);
export { Tab2detailsPageModule };
//# sourceMappingURL=tab2details.module.js.map