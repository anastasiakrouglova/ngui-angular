import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  status;
  gadgets: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}


  ionViewDidEnter() {
    this.fetchGadgets();
  }

  doRefresh(event) {
    window.location.reload();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  openDetailPage(id) {
    this.getGadgetById(id);
    this.router.navigateByUrl('tabs/details/'+id)
  }


  fetchGadgets() {
    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      data => {
      this.gadgets = data;
    });
  }

  getGadgetById(id) {
    this.http.get('http://backpack.cvdeede.be/api/gadgets/'+id).subscribe(
      data => {
        this.gadgets[id] = data;
      }
    )
  }
}
