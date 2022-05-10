import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

// import { Resolver } from 'dns';

@Component({
  selector: 'app-tab2details',
  templateUrl: './tab2details.page.html',
  styleUrls: ['./tab2details.page.scss'],
})
export class Tab2detailsPage implements OnInit, OnDestroy {
  gadgetName;     //holds the name inputed
  nameOfGadget = '';    // holds name of gadget

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  //working on gadget editing
  getName() {
    console.log(this.gadgetName)
    console.log(this.id)
  }

  // Supposed to change gadget name on click of 'confirm' button
  updateGadgetName() {
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/{this.id}',
      { name: this.gadgetName }).subscribe((res: any) => {
        console.log(res);
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
      res => {
        // store the name of the gadget in nameOfGadget
        this.nameOfGadget = res[this.id - 1].name;
        console.log(this.nameOfGadget)
      })

    //this.fetchGadgets()
    // this.routeSub = this.route.params.subscribe(params => {
    //   console.log(params) //log the entire params object
    //   console.log(params['id']) //log the value of id
    // });

    // patch
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // fetchGadgets() {
  //   // this.loadCtrl.create({ message: 'Fetching...' }).then(l => l.present());
  //   this.http.get('http://backpack.cvdeede.be/api/gadgets').subscribe(
  //     data => {
  //     this.gadgets = data;
  //     // this.loadCtrl.dismiss();
  //   });
  // }



  // getGadgetById(id) {
  //   // this.http.get('http://backpack.cvdeede.be/api/gadgets/'+id).subscribe(
  //   //   data => {
  //   //     this.gadget = data;
  //   //   }


  //   // resolve(route: ActivatedRouteSnapshot) {
  //   //   let id = route.paramMap.get('id');
  //   //   return this.dataService.getData(id)
  //   // }

  //   // getName(theName: string) {

  //   //    //log name on button click
  //   //   console.log(theName);

  //   // }

  // }
}
