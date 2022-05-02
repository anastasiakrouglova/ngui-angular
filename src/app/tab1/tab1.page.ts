import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent, MbscPageLoadingEvent } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Notifications]
})


export class Tab1Page implements OnInit {

  constructor(private http: HttpClient, private notify: Notifications) {}


  myEvents: MbscCalendarEvent[];

  // extract date from data[i].day_of_week
  getDay(id: number): any {
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

  onPageLoading(event: MbscPageLoadingEvent) {

    // display all dynamic gadgets
    this.http.get('http://backpack.cvdeede.be/api/gadgets?show_needs=1').subscribe((data: any) => {
      const events = [];

      // static needs are indicated as red
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].static_needs.length; j++) {
          events.push({
            start: data[i].static_needs[j].needed_on,
            allDay: true,
            title: data[i].name,
            color: "#ff6d42",
            icon: 1
          })
        }
        // Dynamic needs are blue
        for (let k = 0; k < data[i].dynamic_needs.length; k++) {
          events.push({
            start: "2022-05-06T07:00:00.000Z",
            allDay: true,
            title: data[i].name,
            icon: 1,
            recurring: 'FREQ=WEEKLY;UNTIL=2022-07-01;BYDAY='+this.getDay(data[i].dynamic_needs[k].day_of_week)
          });
        }
      }
      this.myEvents = events;
    });
  }



  eventSettings: MbscEventcalendarOptions = {
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
        custom: { // Custom breakpoint
            breakpoint: 600,
            view: {
                calendar: {
                    labels: true
                }
            }
        }
    }
  };

  // Will be needed later on to customize the calendar
  getGadget(id: number): any {
    switch (id) {
        case 1:
            return {
                img: './assets/gym.svg',
                name: 'French book'
            };
        case 2:
            return {
                img: './assets/math.svg',
                name: 'Exercise book math'
            };
        case 3:
            return {
                img: './assets/water.svg',
                name: 'Bottle of water'
            };
    }
  }

  add(ev: any, data: any): void {
    this.notify.toast({
        message: data.title + ' clicked'
    });
}

  gadgets: any // list that will save and print the data

  stat_gadgets: any
  dyn_gadgets: any
  curr_day: any

  getDate() {
    var d = new Date();
    var n = d.getDay();
    this.curr_day = n
  }

  ngOnInit() {
    // get all gadgets
    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      data => {
        // put all the data we get, to the list gadgets
        this.gadgets = data;
      }
    )
    this.getDate();
    this.getStaticGadgets();
    this.getDynamicGadgets();
  }

  getStaticGadgets() {
    this.http.get('http://backpack.cvdeede.be/api/static_needs')
      .subscribe(
        source => {
          this.stat_gadgets = source
        }
    )
  }

  getDynamicGadgets() {
    this.http.get('http://backpack.cvdeede.be/api/dynamic_needs')
    .subscribe(
      source => {
        //const dyn_data = JSON.parse(JSON.stringify(source)).map(data => data.gadget_id).filter((value, index, self) => self.indexOf(value) === index)
        //this.dynamic_gadgets_listID = dyn_data
        this.dyn_gadgets = source
      }
    )
  }
}
