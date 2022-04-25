import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2details',
  templateUrl: './tab2details.page.html',
  styleUrls: ['./tab2details.page.scss'],
})
export class Tab2detailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getName(theName: string) {

     //log name on button click
    console.log(theName);

  }

}
