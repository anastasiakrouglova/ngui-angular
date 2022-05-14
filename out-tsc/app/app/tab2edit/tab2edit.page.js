import { __decorate } from "tslib";
import { Component } from '@angular/core';
let Tab2editPage = class Tab2editPage {
    constructor(route, http, router) {
        this.route = route;
        this.http = http;
        this.router = router;
        this.nameOfGadget = ''; //holds the name inputed
        this.days = [
            { val: 'Monday', isChecked: false },
            { val: 'Tuesday', isChecked: false },
            { val: 'Wednesday', isChecked: false },
            { val: 'Thursday', isChecked: false },
            { val: 'Friday', isChecked: false },
            { val: 'Saturday', isChecked: false },
            { val: 'Sunday', isChecked: false }
        ];
    }
    // Supposed to change gadget name on click of 'SAVE' button
    updateGadget() {
        this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id, { name: this.gadgetName }).subscribe((res) => {
            console.log(res);
        });
        this.router.navigate(['/tabs/tab2']);
    }
    updateWeekly() {
        console.log("update");
        // this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
        //   { name: this.gadgetName }).subscribe((res: any) => {
        //     console.log(res);
        //   });
        //this.router.navigate(['/tabs/tab2']);
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.http.get('http://backpack.cvdeede.be/api/gadgets/' + this.id).subscribe(res => {
            // store the name of the gadget in nameOfGadget
            this.nameOfGadget = res['name'];
            console.log(this.nameOfGadget);
            this.currGadget = res;
        });
    }
    deleteItem(id, event) {
        console.log("item deleted");
        this.http.delete('http://backpack.cvdeede.be/api/gadgets/' + id).subscribe(() => this.status = 'Delete successful');
        this.router.navigate(['/tabs/tab2']);
    }
};
Tab2editPage = __decorate([
    Component({
        selector: 'app-tab2edit',
        templateUrl: './tab2edit.page.html',
        styleUrls: ['./tab2edit.page.scss'],
    })
], Tab2editPage);
export { Tab2editPage };
//# sourceMappingURL=tab2edit.page.js.map