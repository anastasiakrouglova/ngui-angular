import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent, MbscPageLoadingEvent } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Notifications]
})


export class Tab1Page implements OnInit {

  constructor(private http: HttpClient, private notify: Notifications) {

  }

  today: Date = new Date();

  myEvents: MbscCalendarEvent[];

  onPageLoading(event: MbscPageLoadingEvent) {
    const fromDay = event.firstDay.toISOString();
    console.log(fromDay);
    console.log("emlqksjdfqm");
    const toDay = event.lastDay.toISOString();

    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe((data: any) => {
      const events = [];
      for (let i = 0; i < data.length; i++) {
        events.push({
          start: "2022-05-06T07:00:00.000Z",
          end: "2022-05-08T16:00:00.000Z",
          title: data[i].name,
          color: data[i].color,
          participant: 1
        });
      }
      this.myEvents = events;
    });

  }

  // myEvents: MbscCalendarEvent[] = [{
  //   start: "2022-05-06T07:00:00.000Z",
  //   end: "2022-05-08T16:00:00.000Z",
  //   title: 'My First Event',
  //   color: "#ff6d42",
  //   participant: 1
  // }, {
  //   start: new Date(2020, 2, 18, 9, 0),
  //   end: new Date(2020, 2, 20, 13, 0),
  //   title: 'My Second Event'
  // }];


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

  customApi: any =
  [
    {
      start: "2022-05-06T07:00:00.000Z",
      end: "2022-05-08T16:00:00.000Z",
      title: "Business of Software Conference",
      color: "#ff6d42",
      image: 1
    }
  ]


  ngOnInit() {
    // this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/custom-events/', 'callback').subscribe((resp: any) => {
    //   this.myEvents = resp;
    // });

    // this.http.jsonp<MbscCalendarEvent[]>('customApi', 'callback').subscribe((resp: any) => {
    //   this.myEvents = resp;
    // });

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
          //const stat_data = JSON.parse(JSON.stringify(source)).map(data => data.gadget_id).filter((value, index, self) => self.indexOf(value) === index)
          //this.static_gadgets_listID = stat_data
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
