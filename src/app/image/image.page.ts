import { Component, OnInit ,ViewChildren, ElementRef,ViewChild} from '@angular/core';
import{CategoryServiceService}from '../category-service.service';
import{ImageServiceService}from '../image-service.service';
import { Platform ,IonSlides,IonSlide} from '@ionic/angular';
import {imageObject} from'../classes/Object'
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})

export class ImagePage implements OnInit {
  
 
@ViewChild(IonSlides, { static: false }) slides:IonSlides;
 
@ViewChild(IonSlide, { static: false }) oneslide:IonSlide;


  images:any[];//the image array for each category
  img;//="https://bit.ly/2MDc4b4";//shorturl.at/doEJ4//service call insert image obj...
  ind=0;//image index in the array
  arrowb=false;// display arrow back 
  arrowf=true;//display arrow forth
  counter:number=0;//curent number image
  heigtscreen:any;
  widthscreen:any;
  categoryId: any;
  yScreen: number;
  xScreen:number;
  imagewidth: any;
  imageheight: any;
  color="";
  index:number;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  slide:IonSlides;
  listObj: any;
  elementimage: ClientRect | DOMRect;
  locLeft: number;
  locTop: number;
  sizeW: number;
  sizeH: number;

  constructor(private imageserv:ImageServiceService,
    private categoryserv:CategoryServiceService,
    private platform:Platform,
    private router:Router
    ) { 
     
    debugger;
    this.index=categoryserv.index;
    var a=document.getElementsByTagName("ion-slides");
      this.categoryId=imageserv.oneimage.image.CategoryID;
    this.ind=imageserv.oneimage.image.ImageID;
    this.color=this.categoryserv.color;
    //the ten images that are currently in the system
    this.images=imageserv.imagesArr;
    for (let index = 0; index < this.images.length; index++) {
      if(this.images[index].image.ImageID==this.ind)
      {
        setTimeout(() => {
                this.slides.slideTo(index);
                this.bla=index;
            }, 50);
       this.img=this.images[index];
        break;
      }
      this.counter++;  
    }
    this.heigtscreen=platform.height();
    this.widthscreen=platform.width();
  }
  slideHappened(event){
  this.slides.getActiveIndex().then(
    (index)=>{
      this.bla = index+1;
   });
   debugger;
  this.forObject();

}


next(slide, index){
  slide.SlideTo(index);
}



  x:number;
  y:number;
  elementinfo:any;
  b:any; 
  audio:any;
  NameObject=" ";
  listIn:imageObject[]=[];
  findClosestObj(){
    debugger;
    var smalldest=Number.MAX_VALUE;
    var myObjc=this.listIn[0];
    for (let i = 0; i < this.listIn.length; i++) {
     var result=this.dest(this.listIn[i]);
     smalldest=result < smalldest?result:smalldest;//this closser than ?
     myObjc= smalldest == result?this.listIn[i]:myObjc;//save the closest object!!!!
    }
    return myObjc;
  }
  dest(obj:imageObject){
  var d1=Math.pow(this.x-obj.X1,2)+Math.pow(this.y-obj.Y1,2);
  var d2=Math.pow(this.x-obj.X2,2)+Math.pow(this.y-obj.Y2,2);
  var d3=Math.pow(this.x-obj.X3,2)+Math.pow(this.y-obj.Y3,2);
  var d4=Math.pow(this.x-obj.X4,2)+Math.pow(this.y-obj.Y4,2);
  return d1+d2+d3+d4;//without ^\שורש 
  }
  flag:boolean;
  bla;
imagelocked=false;
  findobject(){this.flag=true;
    debugger;
  if(this.imagelocked==false){
    this.imagelocked=true;
    // his.images[bla].imageObjects.length
  for (let index = 0; index < this.images[this.bla].imageObjects.length; index++) {
    debugger;
    const OneObject = this.images[this.bla].imageObjects[index]; 
    this.x/=this.imagewidth;
    this.y/=this.imageheight;
    //checks if the click is in the range of the current object is 
    if(this.x>=OneObject.X1&&this.y>=OneObject.Y1
      &&this.x<=OneObject.X2&&this.y>=OneObject.Y2
      &&this.x<=OneObject.X3&&this.y<=OneObject.Y3
      &&this.x>=OneObject.X1&&this.y<=OneObject.Y4)
      {
        debugger
        //founded in this place
        this.listIn.push(OneObject);
      //   console.log(OneObject.Name);
      //  this.NameObject=OneObject.Name;
      // //  this.initVoice(OneObject.)
      //   this.playAudio() ;
       //break;
       this.flag=false;
      }
      this.x*=this.imagewidth;
      this.y*=this.imageheight;
      debugger;
    }
    if(this.flag==false)
    {
      var clossestObj= this.findClosestObj();
      console.log(clossestObj.Name);
      // this.NameObject=clossestObj.Name;
      this.initVoice(clossestObj.VoiceURL);
      
      
      if(this.categoryserv.pause)
      {
        this.stopBack();
        this.categoryserv.pause=true;
      }

      this.playAudio();
      // this.playAudioBack();
    }
    else{
      this.flag=true;
    }
  }

  } 
  
  findclickcoordinants(event){
    this.listIn=[];
    debugger;
    console.log;
    this.x=event.clientX;//the click position that the user  made-x
    this.y=event.clientY;//" y
    this.bla=event.currentTarget.id;
    this.elementinfo=document.getElementById(this.bla).getBoundingClientRect();
    // this.yScreen =this.heigtscreen-  this.elementinfo.bottom;
    // this.xScreen =this.widthscreen-  this.elementinfo.left;
    // this.x-=this.xScreen;
    // this.y-=this.yScreen;
    ///find vision coordinates
   // this.findobject();
  this.y=this.y-this.elementinfo.top;
  this.x=this.x-this.elementinfo.left;
  
  this.imagewidth=this.elementinfo.width;
  this.imageheight=this.elementinfo.height;
   document.getElementById("ooo").setAttribute("style",";margin-top:0.5%;color:blue;font-size:250%");
  
  this.findobject();
  
  }
  
  goback(){//lets user go back to image before the current image
    debugger;
    this.NameObject="";
    if(this.counter==0){
      this.img=this.images[this.counter];
      //iocon prev page service call
    }
    else{
      this.counter--;
      this.img=this.images[this.counter];
    }
    
  }
  goforward(){// lets user go forward to next image from image array
    debugger;
    this.NameObject="";
    if(this.counter==this.images.length-1){
      this.img=this.images[this.counter];  
      //iocon next page service call 
    }
    else{ 
       this.counter++
       this.img=this.images[this.counter];
    }
   
  }
  
  goHome(event){//go to home page where u can choose again a category and start to play again...............
  debugger;
  this.x=event.clientX;
  this.y=event.clientY;
  this.router.navigate(['category']);
    }
  ionViewDidLoad() {
      console.log('ionViewDidLoad ImagePage');
  }
   initVoice(voiceURL:string) {
      this.audio = new Audio();
      this.audio.src = voiceURL;
      this.audio.load();
    }
  playAudio() { 
  
   debugger;
   this.audio.onended = () => {
    this.audio.onended = null;
  this.playAudioBackAfterObject()
    this.imagelocked=false;
} 
   this.audio.play();
   
   this.audio.loop = false;
  }
  // playAudio() { 
  //  this.audio.play();
  //    this.audio.loop = false;
  // }
    stopAudio() {
      this.audio.pause(); 
    }
    ngOnDestroy() {
      if(this.audio) {
        this.audio.pause();
        this.audio = null;
      }
    }
    GoBackHome(){
      this.router.navigate(['category']);
    }
    GoBackPage(){
      this.router.navigate(['categoryimages']);
    }
    GoRight(){

    }
    GoLeft(){

    }

  ngOnInit() {
  }


  initVoiceBack() {
    debugger;
    this.categoryserv.audio = new Audio();
    this.categoryserv.audio.src ="../../assets/backgroundsong.mp3";
    this.categoryserv.audio.load();
    this.playAudio();
  }
  play1=false;
playAudioBack() { 
  debugger;
 this.categoryserv.audio.play();
   this.categoryserv.audio.loop = true;
   this.categoryserv.play=false;
   this.categoryserv.pause=true;
   this.categoryserv.IsPlaying=true;
}
playAudioBackAfterObject() { 
  debugger;
   if(this.categoryserv.pause)
   {
 this.categoryserv.audio.play();
   this.categoryserv.audio.loop = true;
   this.categoryserv.play=false;
   this.categoryserv.pause=true;
   this.categoryserv.IsPlaying=true;
   }
}
pause=true;
  stopBack() {
    debugger;
    this.categoryserv.audio.pause(); 
    this.categoryserv.pause=false
    this.categoryserv.play=true
    this.categoryserv.IsPlaying=false;
  }
  //border functions
forObject(){
 this.listObj= this.images[this.bla].imageObjects
  debugger;
  for (let i = 0; i < this.listObj.length; i++) {
    this.borderImage(this.listObj[i],i);
  }
}
borderImage(obj:imageObject,Id){
 
  this.elementimage=document.getElementById(this.bla).getBoundingClientRect();
  this.imagewidth=this.elementimage.width;//sizeofimage
  this.imageheight=this.elementimage.height;
  var offTop= document.getElementById(this.bla).offsetTop;//!!!!
  this.locLeft=(obj.X1*this.imagewidth)+this.elementimage.left;
/////////
  this.locTop=(obj.Y1*this.imageheight)+offTop;
  debugger;
  this.sizeW=(obj.X2-obj.X1)*this.imagewidth;
  this.sizeH=(obj.Y4-obj.Y1)*this.imageheight;
  //change the bounding box of the object from code-ts!
  document.getElementById('div'+Id).setAttribute("style","position:absolute;height:"+this.sizeH+"px; width:"+this.sizeW+
  "px;left:"+this.locLeft+"px;top:"+this.locTop+"px;border:3px solid rgb(4, 92, 70); background-color:transparent; ");
}
makeTransparency(event,obj:imageObject){
  debugger;
  var mid=event.currentTarget.id;
  console.log(event.currentTarget);
  if(mid!=null){
   //console.log(document.getElementById(mid).getAttributeNames());
     var offTop= document.getElementById(mid).offsetTop;
    this.forObject();//all the element dont change, l'm here:
    var size= document.getElementById(mid).getBoundingClientRect();
    document.getElementById(mid).setAttribute("style","position:absolute;height:"+size.height+"px; width:"+size.width+"px;left:"
    +size.left+"px;top:"+offTop+"px;border:3px dashed rgb(4, 92, 70);background-color: #fff; opacity:0.3");
    }
}

}
