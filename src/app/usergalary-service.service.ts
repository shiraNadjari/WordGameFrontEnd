import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsergalaryServiceService {

  constructor(private http:HttpClient) { }
  getListObject(userId:number,image:string): any {
    return this.http.get("http://localhost:52093/api/Users/"+userId+"/6"+image)
    .toPromise().then(
      res => { 
        //this.imagesArr=res;
        console.log(res);
        return res; })
      .catch(err => { return false;})
  }
//  postListObject(userId:number,listObj:imageObject[]): any {
//     return this.http.post("http://5d638c4c.ngrok.io/api/Users/"+userId+"/6"+image)
//     .toPromise().then(
//       res => { 
//         //this.imagesArr=res;
//         console.log(res);
//         return res; })
//       .catch(err => { return false;})
//   }
}

