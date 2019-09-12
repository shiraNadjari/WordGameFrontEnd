import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { imageObject } from '../classes/Object';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-usergalary',
  templateUrl: './usergalary.page.html',
  styleUrls: ['./usergalary.page.scss'],
})
export class UsergalaryPage implements OnInit {
image:any='';

img:any;
listObj: imageObject[];
arrngFor: number[]=[];

showBox=false;
elementimage:any;
imagewidth:any;
imageheight:any;
screenW;
screenH;
xbox;
ybox;
box:any;
sizeH;
sizeW;
locTop;
locLeft;
locBottom;
padding;
input:Boolean=false;
showradio:Boolean=false;
valuetext="";
  constructor(private camera:Camera, public platform:Platform) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    debugger;
    console.log(document.getElementById('boxId'));
  }

//sends image to vision api
  loadImage(){
    debugger;
   // this.img=ject(id: number, n: string, x1: number, x2: number, y1: number, y2: number, x3: number, x4: number, y3: number, y4: number, imageid: number, voice: string)
   //service call - detecte image in vision 
   // this.getListObj();/
   //now נכניס ידנית
   this.listObj=[
    new imageObject(3,"Tomato", 0.48880076, 0.69600457,0.23131196,0.23131196,
    0.69600457,  0.48880076, 0.48427552, 0.48427552,111,"dfda.voice"),
     new imageObject(1,"Broccoli", 0.32609084, 0.5054503,0.18103927,0.18103927,
   0.5054503, 0.32609084,0.42818114,0.42818114,111,"dfda.voice"),
   new imageObject(2,"Bell pepper", 0.5813187, 0.78991824, 0.5931827,0.5931827,
   0.78991824,  0.5813187,0.87524456,0.87524456,111,"dfda.voice")];
     //create array to ngFor - div id
    for (let i = 0; i < this.listObj.length; i++) {
      this.arrngFor[i] =i+1;
      
    }
  }

  changeInput(event){
    this.input=true;
    // if(event)
  }


  findClosestObj(){
    var smalldest=Number.MAX_VALUE;
    var myObjc=this.listIn[0];
    for (let i = 0; i < this.listIn.length; i++) {
     var result=this.dist(this.listIn[i]);
     smalldest=result < smalldest?result:smalldest;//this closser than ?
     myObjc= smalldest == result?this.listIn[i]:myObjc;//save the closest object!!!!
    }
    return myObjc;
  }

  dist(obj:imageObject){
    var d1=Math.pow(this.x-obj.X1,2)+Math.pow(this.y-obj.Y1,2);
    var d2=Math.pow(this.x-obj.X2,2)+Math.pow(this.y-obj.Y2,2);
    var d3=Math.pow(this.x-obj.X3,2)+Math.pow(this.y-obj.Y3,2);
    var d4=Math.pow(this.x-obj.X4,2)+Math.pow(this.y-obj.Y4,2);
    return d1+d2+d3+d4;//without ^\שורש 
    }
  findlistObject(){//and clossest object
    for (let index = 0; index < this.listObj.length; index++) {
      const OneObject = this.listObj[index]; 
      this.x/=this.imagewidth;
      this.y/=this.imageheight;
      //checks if the click is in the range of the current object is 
      if(this.x>=OneObject.X1&&this.y>=OneObject.Y1
        &&this.x<=OneObject.X2&&this.y>=OneObject.Y2
        &&this.x<=OneObject.X3&&this.y<=OneObject.Y3
        &&this.x>=OneObject.X1&&this.y<=OneObject.Y4)
        {
          debugger;
          //founded in this place
          this.listIn.push(OneObject);
          this.showradio=true;
        }
        this.x*=this.imagewidth;
        this.y*=this.imageheight;
      }
        debugger;
        this.clossestObj= this.findClosestObj();
        // console.log(clossestObj.Name);
        // this.NameObject=clossestObj.Name;
        // this.initVoice(clossestObj.VoiceURL);
        // this.playAudio() ;
    }
  clossestObj:imageObject;
  listIn:imageObject[]=[];
  elementinfo;
  x;
  y;
  findlocation(event){
    this.listIn=[]
    debugger;
    this.x=event.clientX;//the click position that the user  made-x
    this.y=event.clientY;//" y
    this.elementinfo=document.getElementById("image").getBoundingClientRect();
    this.y=this.y-this.elementinfo.top;
    this.x=this.x-this.elementinfo.left;
    this.imagewidth=this.elementinfo.width;
    this.imageheight=this.elementinfo.height;
    this.findlistObject();
  }
  //////
  listsave:imageObject[]=[];



  saveObj(event,ob){
    debugger;
    if(event.currentTarget.checked && ob!=null){
      //save the clossest obj with the new name
      this.clossestObj.Name=ob.Name;
      if(this.listsave.find(it=>it.ImageID==this.clossestObj.ImageID)){//then obj wad exist in the list-delete!!
        let i; //if this object exist - delete and save the new!
        for ( i = 0; i < this.listsave.length && this.listsave[i].ImageID!=this.clossestObj.ImageID ; i++) ;
          this.listsave.splice(i,1);
          debugger;
      }
      //insert to list
      this.listsave.push(this.clossestObj);
    }
  }
  saveObjOther(){
    debugger;
    this.clossestObj.Name=this.valuetext;
      if(this.listsave.find(it=>it.ImageID==this.clossestObj.ImageID)){//then obj wad exist in the list-delete!!
        let i; //if this object exist - delete and save the new!
        for ( i = 0; i < this.listsave.length && this.listsave[i].ImageID!=this.clossestObj.ImageID ; i++) ;
          this.listsave.splice(i,1);
      }
      //insert to list
      this.listsave.push(this.clossestObj);
  }



  saveInVision(){
    //service call - save in storage!!
    this.postListObj();
  }
  resolveAfter4SecondsGetlist() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          //img ,id ,cat id
          // this.servUser.getcategories().then(data => {
          //   this.listObj = data;
          //   debugger;
          //   console.log(this.listObj);
          // })
        );
      }, 4000);
    });
  }
  resolveAfter4SecondsPostlist(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          //list Save
          // this.servUser.getcategories().then(data => {
          //   this.listObj = data;
          //   debugger;
          //   console.log(this.listObj);
          // })
        );
      }, 4000);
    });
  }
  async postListObj() {
    var x = await this.resolveAfter4SecondsPostlist();
    //this.items = this.items;
  }
  async getListObj() {
    var x = await this.resolveAfter4SecondsGetlist();
    //this.items = this.items;
  }
  


  OpenMyCamera(){
    
   
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       debugger;
      //  
       this.image = 'data:image/jpeg;base64,'+ imageData;
      }, (err) => {
       // Handle error
      });
  
      this.loadImage();
    }
  


  sendIngToVision(){
    // service call - with img=string??
  }
}





// borderImage(obj:imageObject,Id){
//   debugger;
//   // this.showBox=true;
//   this.elementimage=document.getElementById("image").getBoundingClientRect();
//   this.box=document.getElementById("idbox").getBoundingClientRect();
//   //document.getElementById("boxid").setAttribute("style","height:144px;");//setAttribute("style", "color:red; border: 1px solid blue;");
//   this.imagewidth=this.elementimage.width;//sizeofimage
//   this.imageheight=this.elementimage.height;
  
//   //how to use  this.elementimage.padding??????????
//   console.log(window.scrollX);
//   //location of the  bounding box!!

//   this.locLeft=(obj.X1*this.imagewidth)+this.elementimage.left;//left:103px;
// /////////
//   this.locTop=this.elementimage.top+(obj.Y4*this.imageheight);//+this.elementimage.top;
//   debugger;

//   //change the bounding box of the object from code-ts!
//   document.getElementById(Id).setAttribute("style","position:absolute;height:"+this.sizeH+"px; width:"+this.sizeW+
//   "px;left:"+this.locLeft+"px;top:"+this.locTop+"px;border:2px solid #8c9c9a; background-color:transparent;opacity:0.5");

//   this.screenW=this.platform.width();
//   this.screenH=this.platform.height();
 
//   // this.xbox=(this.x4*this.imagewidth)+this.elementimage.left;//at px!!!!!
//   // this.ybox=(this.y4*this.imageheight)+this.elementimage.top;
// //
// }

// makeTransparency(event,obj:imageObject){
//   debugger;
//   var mid=event.currentTarget.id;
//   console.log(event.currentTarget);
//   this.elementimage=document.getElementById("image").getBoundingClientRect();
//   this.imageheight=this.elementimage.height;
//   this.imagewidth=this.elementimage.width;//sizeofimage
//   this.locLeft=(obj.X1*this.imagewidth)+this.elementimage.left;//left:103px;
//   //this.locTop=this.imageheight-(this.imageheight*this.y4);//+this.elementimage.top;+++++++74
//   this.locTop=this.imageheight*obj.Y1+this.elementimage.top;//+this.elementimage.top;+++++++74

//   var x=document.getElementById("image");
//   var style =  window.getComputedStyle(x);
//   console.log(style.marginTop);
//   //size of box!!!!
//   this.sizeW=(obj.X2-obj.X1)*this.imagewidth;
//   this.sizeH=(obj.Y4-obj.Y1)*this.imageheight;

//   document.getElementById(mid).setAttribute("style","top:"+this.locTop+"px;left:"+this.locLeft+"px;height:"
//     +this.sizeH+"px;"+"width:"+this.sizeW+"px;position:absolute;");
//   this.borderImage(obj,mid);
// }



// ionViewDidLoad() {
//   console.log('ionViewDidLoad UsergalaryPage');
// }
// OpenMyCamera(){
//   this.loadImage();
//   debugger;
//   this.img="../../assets/imgs/broccoli.jpg";
// }
// OpenMyGalary(){
//   debugger;
//   //this.makeTransparency();
//   //this.borderImage();
//   //this.img="../../assets/imgs/panda.jpg";
// }


