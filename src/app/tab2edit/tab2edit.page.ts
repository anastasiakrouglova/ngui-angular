import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-tab2edit',
  templateUrl: './tab2edit.page.html',
  styleUrls: ['./tab2edit.page.scss'],
})
export class Tab2editPage implements OnInit {

  id: number;
  nameOfGadget = '';    //holds the name inputed
  gadgetName;           // holds name of gadget

  public days = [
    { val: 'Monday', isChecked: false },
    { val: 'Tuesday', isChecked: false },
    { val: 'Wednesday', isChecked: false },
    { val: 'Thursday', isChecked: false },
    { val: 'Friday', isChecked: false },
    { val: 'Saturday', isChecked: false },
    { val: 'Sunday', isChecked: false }
  ];

  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  // Supposed to change gadget name on click of 'SAVE' button
  updateGadgetName() {
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
      { name: this.gadgetName }).subscribe((res: any) => {
        console.log(res);
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    this.http.get('http://backpack.cvdeede.be/api/gadgets/' + this.id).subscribe(
      res => {
        // store the name of the gadget in nameOfGadget
        this.nameOfGadget = res['name'];
        console.log(this.nameOfGadget)
      })

  }
}