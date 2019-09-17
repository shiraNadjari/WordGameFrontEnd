import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import{CategoryServiceService} from '../category-service.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private router:Router,public servCategory:CategoryServiceService) { }

  ngOnInit() {
  }
  openMyImages(){
    this.router.navigate(['categoryimages']);
  }
  AddImages(){
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
    this.servCategory.audio.pause(); 
    this.servCategory.pause=false
    this.servCategory.play=true
    this.servCategory.IsPlaying=false;
  }
}
