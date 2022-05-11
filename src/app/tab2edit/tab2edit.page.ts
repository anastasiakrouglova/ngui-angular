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
  private sub: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
  })

}
}