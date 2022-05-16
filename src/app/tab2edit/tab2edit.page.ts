import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-tab2edit',
  templateUrl: './tab2edit.page.html',
  styleUrls: ['./tab2edit.page.scss'],
})
export class Tab2editPage implements OnInit {

  status;
  statusD;
  currGadget: any;
  id: number;
  nameOfGadget = '';    //holds the name inputed
  gadgetName;           // holds name of gadget
  inStatic;

  public days = [
    { val: 'Sunday', isChecked: false },
    { val: 'Monday', isChecked: false },
    { val: 'Tuesday', isChecked: false },
    { val: 'Wednesday', isChecked: false },
    { val: 'Thursday', isChecked: false },
    { val: 'Friday', isChecked: false },
    { val: 'Saturday', isChecked: false }
  ];

  daysList = [];

  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  // Supposed to change gadget name on click of 'SAVE' button
  // Now it also changes content of static_needs on the backend according to days selected in checkbox
  updateGadget() {
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
      { name: this.gadgetName }).subscribe((res: any) => {
        console.log(res);
      });

      console.log(this.days);  // logs days of the week

      for (const x of this.days) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (x.isChecked===true) {
          this.daysList.push(daysOfWeek.indexOf(x.val))
        }
      }
      console.log(this.daysList);

      this.http.get('http://backpack.cvdeede.be/api/static_needs?gadget_id=' + this.id).subscribe(
        res => {
          console.log(res);
          this.inStatic = res;
          console.log(this.inStatic)
          for (const x of this.inStatic) {
            this.http.delete('http://backpack.cvdeede.be/api/static_needs/' + x.id).subscribe(() => this.statusD = 'Delete successful');
          }

          for (const x of this.daysList) {
            this.http.post('http://backpack.cvdeede.be/api/static_needs/', {gadget_id: this.id, day_of_week: x}).subscribe(
              res2 => {
                console.log(res2)
              }
            )
          }
        }
      )
    this.router.navigate(['/tabs/tab1']);
  }


  updateWeekly() {
    console.log("update")
    // this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
    //   { name: this.gadgetName }).subscribe((res: any) => {
    //     console.log(res);
    //   });

    //this.router.navigate(['/tabs/tab2']);
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
        this.currGadget = res
      })

  }


  deleteItem(id, event) {
    console.log("item deleted")

    this.http.delete('http://backpack.cvdeede.be/api/gadgets/' + id).subscribe(() => this.status = 'Delete successful');

    this.router.navigate(['/tabs/tab2'])
  }
}
