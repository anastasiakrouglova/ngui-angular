import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
//import { format, utcToZonedTime } from 'date-fns-tz';
//import { parseISO } from 'date-fns';


// import { Resolver } from 'dns';

@Component({
  selector: 'app-tab2details',
  templateUrl: './tab2details.page.html',
  styleUrls: ['./tab2details.page.scss'],
})

export class Tab2detailsPage implements OnInit, OnDestroy {
  gadgetName;     //holds the name inputed
  nameOfGadget = '';    // holds name of gadget, solved this dirty way because error otherwise
  iconOfGadget = '0';
  currGadget: any;  // holds the whole information of the clicked gadget
  editname = false;   // guard between edit page and not
  editday = true;
  edit = false;
  id: number;
  staticDays: any;
  dynamicDays: any[] = [];
  inStatic: any;
  daysList = [];
  status;
  statusD;
  addedDynNeeds: any[] = [];
  formattedDynNeeds: any[] = [];
  dynDays: any[] = [];

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

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.getGadgets()
    this.getStaticNeeds()
    this.getDynamicNeeds()

  }

  editPage() {
    this.editname = true;
    this.addedDynNeeds = this.dynamicDays
  }

  // change gadget name
  // updateGadgetName() {
  //   this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id,
  //     { name: this.currGadget.name }).subscribe((res: any) => {
  //       console.log(res);
  //     });
  // }

  // anytime a gadget is edited,  desired static days must be checked
  updateGadget() {
    // Change the name of the gadget
    this.http.patch('http://backpack.cvdeede.be/api/gadgets/' + this.id, { name: this.gadgetName }).subscribe();

    // Change the static needs
      for (const x of this.days) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (x.isChecked===true) {
          this.daysList.push(daysOfWeek.indexOf(x.val))
        }
      }

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

    //method to make changes to dynamic needs
    this.dynamicPatch()

    this.router.navigate(['/tabs/tab2']);
  }

  getGadgets() {
    this.http.get('http://backpack.cvdeede.be/api/gadgets/' + this.id).subscribe(
      res => {
        this.currGadget = res         // Store the name of the gadget in nameOfGadget
        this.nameOfGadget = res['name']; // Needed to be able to change it in patch
        this.iconOfGadget = res['icon'];
      })
  };

  getStaticNeeds() {
    this.http.get('http://backpack.cvdeede.be/api/static_needs?gadget_id=' + this.id).subscribe(
      (data: any) => {
        // Show data in sorted way (Sunday before Monday for example)
        data.sort(function (a, b) {return a.day_of_week - b.day_of_week;});
        // change numerical value (eg. 7) to nominal (eg. Sunday)
        for (const x of data) {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          x.day_of_week = daysOfWeek[x.day_of_week];
          this.staticDays = data;
          // Set checkbox on checked if a static need on that specific day
          for (const day of this.days) {
            if (x.day_of_week == day.val) {
              day.isChecked = true
            }
          }
        }
      });
  }

  getDynamicNeeds() {
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
        this.formattedDynNeeds = data;
      });
  }

  // method to get difference between dynamic need in backend and addDynNeeds
  // called in dynamicPatch
  getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteItem(id, event) {
    console.log('item deleted')
    this.http.delete('http://backpack.cvdeede.be/api/gadgets/' + id).subscribe(() => this.status = 'Delete successful');
    this.router.navigate(['/tabs/tab2'])
  }

  deleteDyn(i) {
    this.dynamicDays.splice(i, 1)
    //this.addedDynNeeds.splice(i, 1)
  }

  addDynamicNeed(neededOn) {
    this.editday == true
    console.log(neededOn)
    this.addedDynNeeds = this.dynamicDays
    // // remove timezone and change to .000Z format
    const formatted = neededOn.slice(0, -6).concat('.000Z')
    this.addedDynNeeds.push({ 'id': 1, 'gadget_id': this.id, 'needed_on': formatted })
    // // Format and put it in the formatted dynamic needs
    this.formattedDate(this.addedDynNeeds)
  }

  formattedDate(data) {
        // convert needed_on
        for (const y of data) {
          const date = new Date(y.needed_on);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          let dt = date.getDate();
          const theMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          const monthM = theMonths[month - 1];
          y.needed_on = dt + ' ' + monthM + ' ' + year;
          this.formattedDynNeeds = data;
        }
  }

  dynamicPatch() {
    console.log(this.addedDynNeeds)
    console.log(this.formattedDynNeeds)

    for (const x of this.addedDynNeeds) {
      if (x.id === 1) {
        this.dynDays.push(x)
      }
    }
    console.log(this.dynDays)

    for (const z of this.dynDays) {
      const fromDate = new Date(z.needed_on +' 11:00:00');
      const toIso = fromDate.toISOString();
      this.http.post('http://backpack.cvdeede.be/api/dynamic_needs/', {gadget_id: this.id, needed_on: toIso}).subscribe(
        res3 => {
          console.log(res3)
        }
      )
    }

    this.http.get('http://backpack.cvdeede.be/api/dynamic_needs/?gadget_id=' + this.id).subscribe(
      (data: any) => {
        console.log(data)
        const dataDel = this.getDifference(data, this.addedDynNeeds)
        console.log(dataDel);

        for (const v of dataDel) {
          console.log(v)
          this.http.delete('http://backpack.cvdeede.be/api/dynamic_needs/' + v.id).subscribe(() => this.statusD = 'Delete successful');
        }
      })

  }

}


