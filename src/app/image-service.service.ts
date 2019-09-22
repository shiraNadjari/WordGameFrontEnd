import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{imageWithObject} from '../../src/app/classes/imageWithObject'

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(public http: HttpClient) { }
  imagesArr:any;
  oneimage:imageWithObject;
  getImagesByCategory(userid:number,categoryid:number): any {
    debugger;
    
    return this.http.get("http://34.77.45.90/api/Images/GetImages/"+userid+"?catid="+categoryid)
    .toPromise().then(
      res => {  
        
        this.imagesArr=res;
        console.log(res);
        return res; })
      .catch(err => { return false;})
  
  }
}

// return this.http.get("http://localhost:52093/api/Images/"+45+"?time="+numpage)
