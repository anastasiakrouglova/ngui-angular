import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //inputName = document.getElementById('gadgetName');
  dis = '';
  constructor() {}

  getName(theName: string) {
    //log name on button click
    console.log(theName);

  }
}
