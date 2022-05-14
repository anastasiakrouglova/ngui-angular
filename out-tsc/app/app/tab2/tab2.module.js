import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            ExploreContainerComponentModule,
            Tab2PageRoutingModule
        ],
        declarations: [Tab2Page]
    })
], Tab2PageModule);
export { Tab2PageModule };
//# sourceMappingURL=tab2.module.js.map