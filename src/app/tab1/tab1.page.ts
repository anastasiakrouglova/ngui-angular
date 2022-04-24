import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions, MbscCalendarEvent } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})





export class Tab1Page implements OnInit {

  constructor(private http: HttpClient) {

  }

  myEvents: MbscCalendarEvent[] = [];


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
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });

    // get all gadgets
    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      data => {
        // put all the data we get, to the list gadgets
        this.gadgets = data;
        const id_list = JSON.parse(JSON.stringify(data)).map(s => s.id)
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
