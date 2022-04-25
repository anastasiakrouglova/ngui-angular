import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  gadgets: any;

  constructor(
    private http: HttpClient,
    // private loadCtrl: LoadingController
    ) {}


  ionViewDidEnter() {
    this.fetchGadgets();
  }

  fetchGadgets() {

    // this.loadCtrl.create({ message: 'Fetching...' }).then(l => l.present());

    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      data => {
      this.gadgets = data;
      // this.loadCtrl.dismiss();
    });
  }

}
