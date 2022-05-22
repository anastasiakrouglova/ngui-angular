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
            start: data[i].static_needs[j].day_of_week,
            allDay: true,
            title: data[i].name,
            id:  data[i].icon,
            color: "#ff6d42",
            img: './assets/1.svg',
            recurring: 'FREQ=WEEKLY;UNTIL=2022-07-01;BYDAY='+this.getDay(data[i].static_needs[j].day_of_week)
          })
        }
        // Dynamic needs are blue
        for (let k = 0; k < data[i].dynamic_needs.length; k++) {
          events.push({
            //start: "2022-05-06T07:00:00.000Z",
            start: "data[i].dynamic_needs[j].needed_on",
            allDay: true,
            title: data[i].name,
            id:  data[i].icon,
            img: './assets/1.svg',
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

  add(ev: any, data: any): void {
    this.notify.toast({
        message: data.title + ' clicked'
    });
}

  gadgets: any // list that will save and print the data

  stat_gadgets: any
  dyn_gadgets: any
  curr_day: any
  missing: any
  needed: any

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
    this.getMissing();
    this.getDate();
    this.getStaticGadgets();
    this.getDynamicGadgets();
    this.getNeeded();
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

  getMissingAmount() {
    if (this.missing != null) {
      if (this.getTotalAmount() != undefined) {
        return this.getTotalAmount() - this.missing.length
      }
    }
  }

  progress() {
    if (this.getMissingAmount() != undefined || this.getTotalAmount() != undefined ) {
      return this.getMissingAmount() / this.getTotalAmount()
    }

  }

  getNeeded() {
    this.http.get('http://backpack.cvdeede.be/api/needed')
    .subscribe(
      source => {
        //const dyn_data = JSON.parse(JSON.stringify(source)).map(data => data.gadget_id).filter((value, index, self) => self.indexOf(value) === index)
        //this.dynamic_gadgets_listID = dyn_data
        this.needed = source
      }
    )
  }

  getTotalAmount() {
    if (this.needed != undefined) {
      return this.needed.length
    }

    //if (this.needed != undefined) {
    //  const list = []

      // push all static needs of today
      // for (let i = 0; i < this.stat_gadgets.length; i++) {
      //   if (this.stat_gadgets[i].day_of_week == this.curr_day) {
      //     list.push(i)
      //   }
      // }

      // var today = new Date();
      // var formattedToday = this.WithoutTime(today).toDateString()

      // // push all dynamic needs of today
      // if (this.dyn_gadgets != undefined) {
      // for (let i = 0; i < this.dyn_gadgets.length; i++) {
      //   var missingD = new Date(this.dyn_gadgets[i].needed_on)
      //   var formattedMissingD = this.WithoutTime(missingD).toDateString()

      //   if (formattedMissingD == formattedToday) {
      //      list.push(i)
      //   }
      // }

    //}

     // return list.length
    //}

  }

    WithoutTime(dateTime) {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
    }

  getMissing() {
    this.http.get('http://backpack.cvdeede.be/api/missing')
    .subscribe(
      source => {
        this.missing = source
      }
    )
  }


  missingData(data) {
    console.log(data.title)
    return true
  }

}
