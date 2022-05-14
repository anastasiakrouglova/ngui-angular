import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
let Tab3PageModule = class Tab3PageModule {
};
Tab3PageModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            FormsModule,
            ExploreContainerComponentModule,
            RouterModule.forChild([{ path: '', component: Tab3Page }]),
            Tab3PageRoutingModule,
        ],
        declarations: [Tab3Page]
    })
], Tab3PageModule);
export { Tab3PageModule };
//# sourceMappingURL=tab3.module.js.map