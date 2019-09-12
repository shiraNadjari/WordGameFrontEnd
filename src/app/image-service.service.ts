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
  getTwelveImagesByCategory(categoryId:number,numpage:number): any {
    return this.http.get("http://e6f36a11.ngrok.io/api/Images/"+categoryId+"?time="+numpage)
    .toPromise().then(
      res => {  
        
        this.imagesArr=res;
        console.log(res);
        return res; })
      .catch(err => { return false;})
  
  }
}
