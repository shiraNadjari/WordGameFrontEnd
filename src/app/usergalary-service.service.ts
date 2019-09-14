import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {image} from '../app/classes/image'
@Injectable({
  providedIn: 'root'
})
export class UsergalaryServiceService {

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
//  postListObject(userId:number,listObj:imageObject[]): any {
//     return this.http.post("http://5d638c4c.ngrok.io/api/Users/"+userId+"/6"+image)
//     .toPromise().then(
//       res => { 
//         //this.imagesArr=res;
//         console.log(res);
//         return res; })
//       .catch(err => { return false;})
//   }
getListObject(userId:number,base64:string): Promise<any> {
  debugger;
let img=new image(0,base64,0,0,0);
  const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.http
    
    .post('http://34054239.ngrok.io/api/Users/'+userId+"?catid=51",img,{headers:headers}).toPromise().then(
      response => {
      return response;
    })
    .catch(v=>{return null;});
    }
}

