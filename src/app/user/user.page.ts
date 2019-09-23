import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import{CategoryServiceService} from '../category-service.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private router:Router,public servCategory:CategoryServiceService) { 
    if (servCategory.IsPlaying)
    {
      this.pause=true;
      this.play1=false
    }
  }

  GoBack(){
    this.router.navigate(['category']);
  }
  ngOnInit() {
  }
  openMyImages(){
    this.servCategory.fromUser=true;
    this.router.navigate(['categoryimages']);
  }
  AddImages(){
    debugger;
    this.router.navigate(['usergalary']);
  }
  play1=false;
playAudio() { 
  debugger;
 this.servCategory.audio.play();
   this.servCategory.audio.loop = true;
   this.servCategory.play=false;
   this.servCategory.pause=true;
   this.servCategory.IsPlaying=true;
}

pause=true;
  stop() {
    debugger;
    this.servCategory.audio.pause(); 
    this.servCategory.pause=false
    this.servCategory.play=true
    this.servCategory.IsPlaying=false;
  }
}
