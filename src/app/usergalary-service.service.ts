import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {image} from '../app/classes/image'
import {imageObject} from '../app/classes/Object'
import { environment } from 'src/environments/environment';
// import {environment}from '../environments/environment'
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
    return this.http.post("http://34.77.45.90/api/UserObject/"+userId+"?catid=6",listObj)
    .toPromise().then(
      res => { 
        //this.imagesArr=res;
        console.log(res);
        return res; })
      .catch(err => { return false;})
  }
  img:image;
 getListObject(userId:number,base64:string): Promise<any> {
  debugger;
  //  if(base64.length>1)
  //    base64+="hello";
    //var a=base64;
  // alert(this.img);
  //let body = new HttpParams();
  //body = body.set('MyBase64',JSON.stringify( base64));
  var body = 'MyBase64='+base64;
  this.img=new image(0,base64,0,0,0);
  const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.http
    
    .post('http://34.77.45.90/api/'+'Users/'+userId+"?catid=6",JSON.stringify(base64),{headers:headers}).toPromise().then(
      response => {
      return response;
    })
    .catch(v=>{return null;});
    }
}

