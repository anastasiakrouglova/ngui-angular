import { __decorate } from "tslib";
import { Component } from '@angular/core';
// import { Resolver } from 'dns';
let Tab2detailsPage = class Tab2detailsPage {
    constructor(route, http, router) {
        this.route = route;
        this.http = http;
        this.router = router;
        this.nameOfGadget = ''; // holds name of gadget
    }
    openEditPage() {
        this.router.navigateByUrl('tabs/edit/' + this.id);
    }
    //working on gadget editing
    getName() {
        console.log(this.gadgetName);
        console.log(this.id);
    }
    // change gadget name
    updateGadgetName() {
        this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id, { name: this.gadgetName }).subscribe((res) => {
            console.log(res);
        });
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            //console.log(params)
        });
        this.http.get('http://backpack.cvdeede.be/api/gadgets/' + this.id).subscribe(res => {
            // store the name of the gadget in nameOfGadget
            this.nameOfGadget = res['name'];
            console.log(this.nameOfGadget);
        });
        // gets static need(day_of_week)
        // change 0, 1... to sunday, monday...
        this.http.get('http://backpack.cvdeede.be/api/static_needs?gadget_id=' + this.id).subscribe((data) => {
            data.sort(function (a, b) { return a.day_of_week - b.day_of_week; });
            for (const x of data) {
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                x.day_of_week = daysOfWeek[x.day_of_week];
                this.staticDays = data;
            }
            console.log(this.staticDays);
        });
        // gets dynamic need
        // change 0, 1... to sunday, monday...
        this.http.get('http://backpack.cvdeede.be/api/dynamic_needs?gadget_id=' + this.id).subscribe((data) => {
            // convert needed_on
            for (const y of data) {
                const date = new Date(y.needed_on);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                let dt = date.getDate();
                const theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                const monthM = theMonths[month - 1];
                y.needed_on = dt + ' ' + monthM + ' ' + year;
                this.dynamicDays = data;
            }
            console.log(this.dynamicDays);
        });
        // this.changeToDays()
        // changeToDays() {
        //   for (const x of this.staticDays) {
        //     x.day_of_week = this.daysOfWeek[x.day_of_week]
        //     console.log(x.day_of_week);
        //   }
        //   console.log(this.staticDays);
        // }
        //this.fetchGadgets()
        // this.routeSub = this.route.params.subscribe(params => {
        //   console.log(params) //log the entire params object
        //   console.log(params['id']) //log the value of id
        // });
        // patch
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
Tab2detailsPage = __decorate([
    Component({
        selector: 'app-tab2details',
        templateUrl: './tab2details.page.html',
        styleUrls: ['./tab2details.page.scss'],
    })
], Tab2detailsPage);
export { Tab2detailsPage };
//# sourceMappingURL=tab2details.page.js.map