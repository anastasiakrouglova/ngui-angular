import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // changed(evt) {
  //   this.isChecked = evt.target.checked;
  //   alert(evt.target.checked)
  // }

  constructor(private http: HttpClient) {

  }

  gadgets: any // list that will save and print the data
  //static_gadgets_listID: any  // array of id's, not complete static gadgets
  //dynamic_gadgets_listID: any

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
        const dyn_data = JSON.parse(JSON.stringify(source)).map(data => data.gadget_id).filter((value, index, self) => self.indexOf(value) === index)
        //this.dynamic_gadgets_listID = dyn_data
        this.dyn_gadgets = source
      }
    )
  }

  getDayOfWeek(date) {
    const today = new Date();

    //const todayFormated = this.datepipe.transform(today, 'w')

    return today
  }








  // checkboxClick(e) {
  //   //var statement = true;
  //   //console.log(e.detail.checked)

  //   if(e.detail.checked == true){
  //     //1 of 0, afh van if statement = als al gechecked of niet
  //     //console.log("patch it")
  //     //this.http.patch('http://backpack.cvdeede.be/api/gadgets/2', updated_gadget)

  //     this.http.patch("http://backpack.cvdeede.be/api/gadgets/2",
  //     {
  //       "in_backpack": 0,
  //     })
  //     .subscribe(
  //         (val) => {
  //             console.log("PATCH call successful value returned in body",
  //                         val);
  //         },
  //         response => {
  //             console.log("PATCH call in error", response);
  //         },
  //         () => {
  //             console.log("The PATCH observable is now completed.");
  //         });
  // }
  //   //  console.log(updated_gadget)
  //  // }
  // }



}
