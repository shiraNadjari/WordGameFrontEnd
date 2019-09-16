import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  openMyImages(){
    this.router.navigate(['categoryimages']);
  }
  AddImages(){
    this.router.navigate(['usergalary']);
  }

}
