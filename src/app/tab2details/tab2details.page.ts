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
  nameOfGadget = '';    // holds name of gadget, solved this dirty way because error otherwise
  currGadget: any;  // holds the whole information of the clicked gadget
  edit = false;   // guard between edit page and not
  id: number;
  staticDays: any;
  dynamicDays: any;
  inStatic: any;
  daysList = [];
  status;
  statusD;

  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  public days = [
    { val: 'Sunday', isChecked: false },
    { val: 'Monday', isChecked: false },
    { val: 'Tuesday', isChecked: false },
    { val: 'Wednesday', isChecked: false },
    { val: 'Thursday', isChecked: false },
    { val: 'Friday', isChecked: false },
    { val: 'Saturday', isChecked: false }
  ];

  editPage() {
    this.edit = true;
  }

  // change gadget name
  updateGadgetName() {
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
      { name: this.currGadget.name }).subscribe((res: any) => {
        console.log(res);
      });
  }

  updateGadget() {
    // Change the name of the gadget
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
      { name: this.gadgetName }).subscribe(
        //(res: any) => {
        //console.log(res);
        //}
      );

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
    this.router.navigate(['/tabs/tab2']);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.http.get('http://backpack.cvdeede.be/api/gadgets/' + this.id).subscribe(
      res => {
        // store the name of the gadget in nameOfGadget
        this.currGadget = res
        this.nameOfGadget = res['name'];
        //console.log(this.currGadget);
      });


    // gets static need(day_of_week)
    // change 0, 1... to sunday, monday...
    this.http.get('http://backpack.cvdeede.be/api/static_needs?gadget_id=' + this.id).subscribe(
      (data: any) => {
        data.sort(function (a, b) {
          return a.day_of_week - b.day_of_week;
        }
        );

        for (const x of data) {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          x.day_of_week = daysOfWeek[x.day_of_week];
          this.staticDays = data;
        }

        console.log(this.staticDays);
      });



    // gets dynamic need
    // change 0, 1... to sunday, monday...
    this.http.get('http://backpack.cvdeede.be/api/dynamic_needs?gadget_id=' + this.id).subscribe(
      (data: any) => {
        // convert needed_on
        for (const y of data) {
          const date = new Date(y.needed_on);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          let dt = date.getDate();
          const theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          const monthM = theMonths[month - 1];
          y.needed_on = dt + ' ' + monthM + ' ' + year;
          this.dynamicDays = data;
        }
        console.log(this.dynamicDays);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteItem(id, event) {
    console.log("item deleted")
    this.http.delete('http://backpack.cvdeede.be/api/gadgets/' + id).subscribe(() => this.status = 'Delete successful');
    this.router.navigate(['/tabs/tab2'])
  }
}

