import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

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

  ngOnInit() {
    // Hier de code later invullen ipv runGet
    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      data => {
        // put all the data we get, to the list gadgets
        this.gadgets = data;
      }
    )
  }



  // runGet() {
  //   this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
  //     data => {
  //       // put all the data we get, to the list gadgets
  //       this.gadgets = data;
  //     }
  //   )
  // }

}
