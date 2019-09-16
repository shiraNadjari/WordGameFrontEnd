import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import{CategoryServiceService}from '../category-service.service';
import{ImageServiceService}from '../image-service.service';
import{imageWithObject} from '../classes/imageWithObject'


@Component({
  selector: 'app-categoryimages',
  templateUrl: './categoryimages.page.html',
  styleUrls: ['./categoryimages.page.scss'],
})
export class CategoryimagesPage implements OnInit {

categoryId: any;
categoryname:any="";
last:boolean=true;
imagesArr:any=0;//paginig 10 at a time
imagesArrLoad;
numOfPages:any;
NumofPagesLoaded:any;
currentPage:any;
arrPages=[];
displayCurr:boolean=true;
display: boolean=true;
sub;
color="";
IsPlaying=true;
constructor(public router:ActivatedRoute,
  private servcategory:CategoryServiceService,
  private servImage:ImageServiceService,
  public PassRouter:Router
   ) {

    
  debugger;
this.categoryname=servcategory.onecategory.CategoryName;
this.categoryId=servcategory.onecategory.CategoryId;
this.color=this.servcategory.color;

  //get number of pages
  this.getnumpages();
  //delete...
  this.numOfPages=10;
  this.currentPage=1;//always begin with 1 page!
  // enter the current images in this page
  this.getimages();
  if (servcategory.IsPlaying)
  {
    this.pause=true;
    this.play1=false
  }
// this.ArrayPage();
 }

 resolveAfter4SecondsNumPages() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
       
        this.servcategory.getNumPageByCategoryId(this.categoryId).then(data => {
          this.NumofPagesLoaded=data;
          console.log(this.numOfPages);
        })
      );
    },250);
  });
}

async getnumpages() {
  var x = await this.resolveAfter4SecondsNumPages();
  this.numOfPages = this.NumofPagesLoaded+1;
  //cancel after
  this.numOfPages=10;
//  this.ArrayPage();//the numbers pages
}
userid=-1;
resolveAfter4Secondsimages() {
  this.imagesArr=0;
  debugger;
  if(this.servcategory.onecategory.CategoryId==-1)
      this.userid=13;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        this.servImage.getImagesByCategory(this.userid,this.categoryId).then(data => {
          this.imagesArrLoad = data;
          console.log(this.imagesArrLoad);

          console.log(this.numOfPages);
        })
      );
    }, 250);
  });
}

async getimages() {
  debugger;
  var x = await this.resolveAfter4Secondsimages();

  // this.imagesArr = JSON.stringify(this.imagesArrLoad);
  this.imagesArr = this.imagesArrLoad;

  
 
  }

GetImagesPage(NumPage:number){
  //we put in the numpage index of page!!
  //this service call return 10 images in this page,we put it in the array
  this.imagesArr= this.servImage.getImagesByCategory(this.categoryId,NumPage-1,);
  this.imagesArr=this.servImage.imagesArr;
}
toolbarPages()
{
//  debugger;
for (let i = 0; i < 4; i++) {// initilize the page array to zero
  this.arrPages[i]=0;
}
for (let i = 1; i < 5 && this.currentPage+i<=this.numOfPages ; i++) {//fill in the array with the current page and the 4 pages after it.
  this.arrPages[i-1]=this.currentPage+i;
}
for (let j = 0; j < 4; j++) {
  if(this.arrPages[j]==0)
    this.arrPages[j]="";
}
}
goToNextPrevPage(current : number){// change current page when next page clicked
  this.currentPage=current;
  this.toolbarPages();
  //get new page- ten image - call service
  this.nextPage(current);
}

nextPage(cur:number){

this.currentPage=cur;
this.GetImagesPage(this.currentPage);
//this.ArrayPage();
}
navtoimage(event,item:imageWithObject,i:number){//send image id to image page and opens the page
  debugger;
  this.servcategory.index=i;
  //item=//we need category name
  this.servImage.oneimage=item;
  this.PassRouter.navigate(['image']);
  //  this.navCtrl.push(ImagePage,{idimage:item.image.ImageID,categoryId:this.categoryId}); 
}

GoBack(){
  this.PassRouter.navigate(['category']);
}

ionViewDidLoad() {
  console.log('ionViewDidLoad CategoryimagesPage');
}

initVoice() {
  debugger;
  this.servcategory.audio = new Audio();
  this.servcategory.audio.src ="../../assets/backgroundsong.mp3";
  this.servcategory.audio.load();
  this.playAudio();
}
play1=false;
playAudio() { 
debugger;
this.servcategory.audio.play();
 this.servcategory.audio.loop = true;
 this.servcategory.play=false;
 this.servcategory.pause=true;
 this.servcategory.IsPlaying=true
}

pause=true;
stop() {
  this.servcategory.audio.pause(); 
  this.servcategory.pause=false
  this.servcategory.play=true
  this.servcategory.IsPlaying=false;
}

ngOnInit() {
}

}
