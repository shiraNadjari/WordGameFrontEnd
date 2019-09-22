import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {image} from '../app/classes/image'
import {imageObject} from '../app/classes/Object'

@Injectable({
  providedIn: 'root'
})
export class UsergalaryServiceService {
  imageBase64;
  constructor(private http:HttpClient) { }
  // getListObject(userId:number,image:string): any {
  //   return this.http.get("http://a9a4e49c.ngrok.io/api/Users/"+userId+"/6"+image)
  //   .toPromise().then(
  //     res => { 
  //       //this.imagesArr=res;
  //       console.log(res);
  //       return res; })
  //     .catch(err => { return false;})
  // }
 postListObject(userId:number,base64:string,listObj:imageObject[]): any {
    listObj[0].VoiceURL=base64;
    debugger;
    return this.http.post("http://34.77.45.90/api/UserObject/"+userId+"?catid=51",listObj)
    .toPromise().then(
      res => { 
        //this.imagesArr=res;
        console.log(res);
        return res; })
      .catch(err => { return false;})
  }
  img:image;
getListObject(userId:number,base64:any): Promise<any> {
  debugger;
  //  if(base64.length>1)
  //    base64+="hello";
    //var a=base64;
  this.img=new image(0,base64,0,0,0);
  // alert(this.img);
  const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.http
    
    .post('http://a4c01f7c.ngrok.io/api/Users/'+userId+"?catid=51",this.img,{headers:headers}).toPromise().then(
      response => {
      return response;
    })
    .catch(v=>{return null;});
    }
}

