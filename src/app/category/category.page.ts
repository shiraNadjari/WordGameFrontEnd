
 import {AlertController, NavController, NavParams } from '@ionic/angular'
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
 import { CategoryimagesPage} from  '../categoryimages/categoryimages.page' ;
 import { UsergalaryPage } from '../usergalary/usergalary.page';
 
 
import { category,categories } from '../classes/category';
import{CategoryServiceService}from '../category-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { Router,NavigationExtras } from '@angular/router';
// 
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  arrPages:any=[];
  currentPage = 1;
  numOfPages = 10 ;
  empty;
  numrow;
  items:any[]=null;//arr of caterories!
  items2:any[];
  aa:category[];

colors:string[];
  iconadd:category;
  constructor(private screenorientation:ScreenOrientation, 
    // private NavigationExtras:NavigationExtras,
    // private alertCtrl: AlertController,
    public navCtrl: NavController, 
    // public navParams: NavParams,

     public servCategory:CategoryServiceService,
    private camera:Camera,public router:Router) {
      this.screenorientation.lock(this.screenorientation.ORIENTATIONS.LANDSCAPE);
      debugger;
     this.initVoice()
      this.getCategories();
   
    this.colors=[
    "rgb(127, 106, 38)","rgb(58,122,43)","rgb(122,43,43)","rgb(202,206,27)","rgb(198,102,38)","rgb(42,93,124)"
    ]
     }
    //  gotopageusergalary(event){
    //   this.userId=12;
    //   // this.userId=
    //   this.navCtrl.push(UsergalaryPage,{userId:this.userId}); 
    // }
    resolveAfter4Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(
            this.servCategory.getcategories().then(data => {
              this.items = data;
              
              console.log(this.items);
            })
          );
        }, 250);
      });
    }
    // presentAlert() {
    //   let alert = this.alertCtrl.create({
    //     title: 'Low battery',
    //     subTitle: '10% of battery remaining',
    //     buttons: ['Dismiss']
    //   });
    //   //alert.present();
    // }
    async getCategories() {
     
      var x = await this.resolveAfter4Seconds();
      this.items = this.items;
      this.items2=this.items;
      debugger;
      this.aa= this.items2;
      this.iconadd=new category("My Images",-1,"../../assets/pluslove.jpg");
      this.aa.push(this.iconadd);
      // this.aa=categories;
      //this.aa=this.items2.concat(this.items);
     }
    ionViewDidLoad() {
      console.log('ionViewDidLoad CategoryPage');
    }
   itemTapped(event,item:category){
     debugger;
    for (let i = 0; i < this.aa.length; i++) {
      if(this.aa[i].CategoryId==item.CategoryId)
      {
        this.servCategory.color=this.colors[i];
      }
      
    }
     debugger;
     this.servCategory.onecategory=item;
     let navigationExtras: NavigationExtras = {
      queryParams: {
        categoryName: item.CategoryName,
        categoryId: item.CategoryId,
      }

  };

  if(item.CategoryId==-1)
  {
    this.router.navigate(['user']);
  }
  else{
  this.router.navigate(['categoryimages'], navigationExtras);
    
  }
    //this.router.navigate(['categoryimages',{categoryName:item.CategoryName,categoryId:item.CategoryId}])
     //item=//we need category name
    }
  getcurrentscreenorientation(){
    this.takePhoto();
    console.log(this.screenorientation.type)
  }
  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
  ngOnInit() {
  }

  initVoice() {
    debugger;
    this.servCategory.audio = new Audio();
    this.servCategory.audio.src ="../../assets/backgroundsong.mp3";
    this.servCategory.audio.load();
    this.playAudio();
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
