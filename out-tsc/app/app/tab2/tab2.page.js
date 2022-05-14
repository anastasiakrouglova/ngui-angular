import { __decorate } from "tslib";
import { Component } from '@angular/core';
// import { LoadingController } from '@ionic/angular';
let Tab2Page = class Tab2Page {
    constructor(http, router
    // private loadCtrl: LoadingController
    ) {
        this.http = http;
        this.router = router;
    }
    ionViewDidEnter() {
        this.fetchGadgets();
    }
    doRefresh(event) {
        window.location.reload();
        console.log('Begin async operation');
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }
    openDetailPage(id) {
        this.getGadgetById(id);
        this.router.navigateByUrl('tabs/details/' + id);
    }
    fetchGadgets() {
        // this.loadCtrl.create({ message: 'Fetching...' }).then(l => l.present());
        this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(data => {
            this.gadgets = data;
            // this.loadCtrl.dismiss();
        });
    }
    getGadgetById(id) {
        this.http.get('http://backpack.cvdeede.be/api/gadgets/' + id).subscribe(data => {
            this.gadgets[id] = data;
        });
    }
};
Tab2Page = __decorate([
    Component({
        selector: 'app-tab2',
        templateUrl: 'tab2.page.html',
        styleUrls: ['tab2.page.scss']
    })
], Tab2Page);
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map