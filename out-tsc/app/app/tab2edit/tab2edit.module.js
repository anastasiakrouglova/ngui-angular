import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2editPageRoutingModule } from './tab2edit-routing.module';
import { Tab2editPage } from './tab2edit.page';
let Tab2editPageModule = class Tab2editPageModule {
};
Tab2editPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            Tab2editPageRoutingModule
        ],
        declarations: [Tab2editPage]
    })
], Tab2editPageModule);
export { Tab2editPageModule };
//# sourceMappingURL=tab2edit.module.js.map