import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { imageObject } from '../classes/Object';
import { Platform } from '@ionic/angular';
import{UsergalaryServiceService} from '../usergalary-service.service'
import{CategoryServiceService}from'../category-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-usergalary',
  templateUrl: './usergalary.page.html',
  styleUrls: ['./usergalary.page.scss'],
})
export class UsergalaryPage implements OnInit {
image:any='';

img:any;
listObj: imageObject[]=[];
arrngFor: number[]=[];
picturetaken=false;
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
spinner2=false;
input:Boolean=false;
showradio:Boolean=false;
sendvisionbtn=false;
sendtodb=false;
objectborder=true;
valuetext="Enter Object Name";
  items: any;
  data: FormData;
  constructor(private camera:Camera, public platform:Platform,private userserv: UsergalaryServiceService,public servCategory:CategoryServiceService,public router :Router) {
    if (servCategory.IsPlaying)
    {
      this.pause=true;
      this.play1=false
    }
   }

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
  //  this.listObj=[
  //   new imageObject(3,"Tomato", 0.48880076, 0.69600457,0.23131196,0.23131196,
  //   0.69600457,  0.48880076, 0.48427552, 0.48427552,111,"dfda.voice"),
  //    new imageObject(1,"Broccoli", 0.32609084, 0.5054503,0.18103927,0.18103927,
  //  0.5054503, 0.32609084,0.42818114,0.42818114,111,"dfda.voice"),
  //  new imageObject(2,"Bell pepper", 0.5813187, 0.78991824, 0.5931827,0.5931827,
  //  0.78991824,  0.5813187,0.87524456,0.87524456,111,"dfda.voice")];
  //    //create array to ngFor - div id
  //   for (let i = 0; i < this.listObj.length; i++) {
  //     this.arrngFor[i] =i+1;
      
  //   }
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
  //show list of names of specific object
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

checkedRadio=false;
ichecked='radio';
radioChecked(num:number){
  if(num==1)
  {
    this.ichecked='other';}
    else{
      this.ichecked='radio';
    }
}

//saves the object name
  saveObj(){
    debugger;
    this.showradio=false;
    this.sendtodb=true;
    this.ichecked;
    var rad= document.getElementById("radio");
    var oth= document.getElementById("other");
    //console.log(oth.checked);
    //console.log(rad.checked);
    //if user added diffrent name to the object
    if( this.ichecked=='other')
    {
      this.currentobject.Name=this.valuetext;
    }
    if(this.currentobject!=null){
      //save the clossest obj with the new name
      //this.clossestObj.Name=this.currentobject.Name;
      //saving in list to post to DB
      if(this.listsave.find(it=>it.ObjectId==this.currentobject.ObjectId)){//then obj wad exist in the list-delete!!
        let i; //if this object exist - delete and save the new!
        for (i = 0; i < this.listsave.length && this.listsave[i].ObjectId!=this.currentobject.ObjectId ; i++) ;
          this.listsave.splice(i,1);
          debugger;
      }
      //insert to list
      this.listsave.push(this.currentobject);
    }
  }
  // saveObjOther(){
  //   debugger;
  //   this.currentobject.Name=this.valuetext;
  //     if(this.listsave.find(it=>it.ObjectId==this.clossestObj.ObjectId)){//then obj wad exist in the list-delete!!
  //       let i; //if this object exist - delete and save the new!
  //       for ( i = 0; i < this.listsave.length && this.listsave[i].ObjectId!=this.clossestObj.ObjectId ; i++) ;
  //         this.listsave.splice(i,1);
  //     }
  //     //insert to list
  //     this.listsave.push(this.clossestObj);
  // }


  listFull=true;
  viewlist=false;
  saveInVision(){
    //service call - save in storage!!
    this.postListObj();
  }

 dataURLtoFile(dataurl, filename) {
    // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f?noredirect=1&lq=1
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  //send image to vision
file:File;
  resolveAfter4SecondsGetlist() {
    debugger;
    // const file = this.dataURLtoFile(this.myimage1, 'img.jpg');
    // const formD = new FormData();
    // formD.append('file', file);
    //var blob=new Blob([this.myimage1],{type:"text/xml"});
    //this.file=new File(,"bla");
    //"C:\Users\shira_000\Downloads\56b67b3519f2f8fc5236c5407ccd78fb.jpg";
    // var data1 = new FormData();
    //  data1.append("image_data",blob);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          //img ,id ,cat id
           this.userserv.getListObject(2,this.imageBase64).then(data => {
             this.listObj = data;
             this.spinner=false;
            debugger;
             document.getElementById("image").setAttribute("style","margin-left:13%;max-width: 75%;border: 2px;border-radius: 20% ;border:solid;border-width: 5px;margin-top:-5%");
             this.viewlist=true;
             console.log(this.listObj);
          })
        );
      }, 250);
    });
  }
  resolveAfter4SecondsPostlist(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          //list Save imageBase64
           this.userserv.postListObject(2,this.imageBase64,this.listsave).then(data => {
            this.listObj = [];
            this.spinner2=false;
            document.getElementById("image").setAttribute("style","margin-left:13%;max-width: 75%;border: 2px;border-radius: 20%;border:solid;border-width: 5px;margin-top:-5%");
            debugger;
            this.picturetaken=false;
            console.log(this.listObj);
           })
        );
      }, 250);
    });
  }
  async postListObj() {
    var x = await this.resolveAfter4SecondsPostlist();
    //this.items = this.items;
  }
  spinner=false;
  //send image to vision and recieve list of objects
  async sendToVision() {
    debugger;
   this.listFull=false;
    document.getElementById("image").setAttribute("style","margin-left:13%;max-width: 75%;border: 2px;border-radius: 20%;opacity:0.4 ;border:solid;border-width: 5px;margin-top:-5%");
    this.listObj=[];
    this.spinner=true;
    var x = await this.resolveAfter4SecondsGetlist();
    this.items = this.items;
  }
  
 baseimage;
 imageBase64;
  OpenMyCamera(){

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       debugger;
      //  
      this.objectborder=true;
      this.picturetaken=true;
      this.listFull=true;
      this.sendvisionbtn=true;
      this.baseimage=imageData;
       this.imageBase64=imageData;
       this.image ='data:image/jpeg;base64,'+  imageData;
       this.sendvisionbtn=true;
      }, (err) => {
       // Handle error
      });
  
      this.loadImage();
    }
  //send objectlist to server and update in db
    saveInDB(){
      this.sendtodb=false;
      this.objectborder=false;
   
      document.getElementById("image").setAttribute("style","margin-left:13%;max-width: 75%;border: 2px;border-radius: 20%;opacity:0.4 ;border:solid;border-width: 5px;margin-top:-5%");
      this.spinner2=true;
      this.postListObj();

    }
//border functions
forObject(){
  this.objectborder=true;
  debugger;
  this.viewlist=false;
  for (let i = 0; i < this.listObj.length; i++) {
    this.listObj[i].ObjectId=i;
    this.borderImage(this.listObj[i],i);
  }
}
borderImage(obj:imageObject,Id){
  this.elementimage=document.getElementById("image").getBoundingClientRect();
  this.imagewidth=this.elementimage.width;//sizeofimage
  this.imageheight=this.elementimage.height;
  var offTop= document.getElementById("image").offsetTop;//!!!!
  this.locLeft=(obj.X1*this.imagewidth)+this.elementimage.left;
/////////
  this.locTop=(obj.Y1*this.imageheight)+offTop;
  debugger;
  this.sizeW=(obj.X2-obj.X1)*this.imagewidth;
  this.sizeH=(obj.Y4-obj.Y1)*this.imageheight;
  //change the bounding box of the object from code-ts!
  document.getElementById(Id).setAttribute("style","position:absolute;height:"+this.sizeH+"px; width:"+this.sizeW+
  "px;left:"+this.locLeft+"px;top:"+this.locTop+"px;border:3px solid black; background-color:transparent; ");
}
currentobject;
makeTransparency(event,obj:imageObject){
  this.sendtodb=false;
  document.getElementById("image").setAttribute("style","margin-left:20%;max-width: 75%;border: 2px;border-radius: 20% ;border:solid;border-width: 5px;margin-top:-5%;");
  debugger;
  //imagediv
  this.showradio=true;
  var mid=event.currentTarget.id;
  console.log(event.currentTarget);
  if(mid!=null){
   //console.log(document.getElementById(mid).getAttributeNames());
     var offTop= document.getElementById(mid).offsetTop;
    this.forObject();//all the element dont change, l'm here:
    var size= document.getElementById(mid).getBoundingClientRect();
    document.getElementById(mid).setAttribute("style","position:absolute;height:"+size.height+"px; width:"+size.width+"px;left:"
    +size.left+"px;top:"+offTop+"px;border:3px dashed black;background-color: #fff; opacity:0.3");
    }
    
    this.currentobject=obj;
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
  GoBackHome(){
    this.router.navigate(['category']);
  }
  GoBackPage(){
    this.router.navigate(['user']);
  }
  myimage1="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dx5WQaot5kI2D2X1j0hamPa9kUzSBj/rO/yvr/pe3ctcycg//ld/lK47Kzkq5S+1D6i33CGnlZHM+N+x270g47qOvCTUf7t1gKS7sigqqlpY6SnkDo5MEAEgdCpok0VZJHuc6ml54I852D/dUpNC6do5BJT22NsjTuDsknP1W8V0zmXR44457jC+isY0tAB+gV6soIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgteNzXNcMDGFCfiF4U1FxZNNBcohTufu2SR5cM/OVNuOVa9jXt2uaCPkZCDy1V2V1poYbRaqVhha/L3huC5w6kldBom3Nca4VsDm0tPkHIyDx2U1P0paH1Pnmk/ibt2d5xn6LOpLRRUjJGQU7AJDl+RkFE7edo7NG+ZzrNDBAJOfSAM+61F5ts1NII5XNke7+or0nNpa0S1LZzSBkjeAWEtH5BZAsFr3BzqGFxHQvaD+qG3lRul5qmpbJEyNhI6gZ5XdWPSVxdQspIoy4ycSODMNx/lT0230bRhlJTt5/wDiashkTWcRsDBn+UYUaNo3qfCuiuEUf2urqIyGBu2F+1Uj8HrHlnm1Ve7b287/AMKSuTg47q7CkcXb/DTTlE7LKeWQ9f4r93+y3cGlrJA/dHbKYO99gW5B56FVRD5wU8VOzZBGyNvs0YV4aM56n3VUQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q=="
   myimage="data:image/jpeg;base64,"+this.myimage1;
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


