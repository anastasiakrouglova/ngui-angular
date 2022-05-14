import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Notifications } from '@mobiscroll/angular';
let Tab1Page = class Tab1Page {
    constructor(http, notify) {
        this.http = http;
        this.notify = notify;
        this.eventSettings = {
            theme: 'ios',
            themeVariant: 'light',
            clickToCreate: false,
            dragToCreate: false,
            dragToMove: false,
            dragToResize: false,
            responsive: {
                xsmall: {
                    view: {
                        calendar: {
                            type: 'week',
                        },
                        agenda: {
                            type: 'day'
                        }
                    }
                },
                custom: {
                    breakpoint: 600,
                    view: {
                        calendar: {
                            labels: true
                        }
                    }
                }
            }
        };
    }
    // extract date from data[i].day_of_week
    getDay(id) {
        switch (id) {
            case 1:
                return 'MO';
            case 2:
                return 'TU';
            case 3:
                return 'WE';
            case 4:
                return 'TH';
            case 5:
                return 'FR';
            case 6:
                return 'SA';
            case 7:
                return 'SU';
        }
    }
    onPageLoading(event) {
        // display all dynamic gadgets
        this.http.get('http://backpack.cvdeede.be/api/gadgets?show_needs=1').subscribe((data) => {
            const events = [];
            // static needs are indicated as red
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].static_needs.length; j++) {
                    events.push({
                        start: data[i].static_needs[j].needed_on,
                        allDay: true,
                        title: data[i].name,
                        id: data[i].icon,
                        color: "#ff6d42",
                        img: './assets/1.svg'
                    });
                }
                // Dynamic needs are blue
                for (let k = 0; k < data[i].dynamic_needs.length; k++) {
                    events.push({
                        start: "2022-05-06T07:00:00.000Z",
                        allDay: true,
                        title: data[i].name,
                        id: data[i].icon,
                        img: './assets/1.svg',
                        recurring: 'FREQ=WEEKLY;UNTIL=2022-07-01;BYDAY=' + this.getDay(data[i].dynamic_needs[k].day_of_week)
                    });
                }
            }
            this.myEvents = events;
        });
    }
    // Will be needed later on to customize the calendar
    getGadget(id) {
        id = Number(id);
        let output = {};
        switch (id) {
            case 1:
                output = {
                    img: './assets/1.svg',
                    name: 'French book'
                };
                break;
            case 2:
                output = {
                    img: './assets/2.svg',
                    // name:
                };
                break;
            case 3:
                output = {
                    img: './assets/3.svg',
                };
                break;
            case 4:
                output = {
                    img: './assets/4.svg',
                };
                break;
            case 5:
                output = {
                    img: './assets/5.svg',
                };
                break;
            case 6:
                output = {
                    img: './assets/6.svg',
                };
                break;
            case 7:
                output = {
                    img: './assets/7.svg',
                };
                break;
            case 8:
                output = {
                    img: './assets/8.svg',
                };
                break;
            case 9:
                output = {
                    img: './assets/9.svg',
                };
                break;
            case 10:
                output = {
                    img: './assets/10.svg',
                };
                break;
            default:
                output = {
                    img: './assets/10.svg',
                };
                break;
        }
        //console.log(output);
        return output;
    }
    add(ev, data) {
        this.notify.toast({
            message: data.title + ' clicked'
        });
    }
    getDate() {
        var d = new Date();
        var n = d.getDay();
        this.curr_day = n;
    }
    ngOnInit() {
        // get all gadgets
        this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(data => {
            // put all the data we get, to the list gadgets
            this.gadgets = data;
        });
        this.getMissing();
        this.getDate();
        this.getStaticGadgets();
        this.getDynamicGadgets();
    }
    getStaticGadgets() {
        this.http.get('http://backpack.cvdeede.be/api/static_needs')
            .subscribe(source => {
            this.stat_gadgets = source;
        });
    }
    getDynamicGadgets() {
        this.http.get('http://backpack.cvdeede.be/api/dynamic_needs')
            .subscribe(source => {
            //const dyn_data = JSON.parse(JSON.stringify(source)).map(data => data.gadget_id).filter((value, index, self) => self.indexOf(value) === index)
            //this.dynamic_gadgets_listID = dyn_data
            this.dyn_gadgets = source;
        });
    }
    getMissing() {
        this.http.get('http://backpack.cvdeede.be/api/missing')
            .subscribe(source => {
            this.missing = source;
        });
    }
};
Tab1Page = __decorate([
    Component({
        selector: 'app-tab1',
        templateUrl: 'tab1.page.html',
        styleUrls: ['tab1.page.scss'],
        providers: [Notifications]
    })
], Tab1Page);
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map