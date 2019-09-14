import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {category} from '../app/classes/category'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(public http: HttpClient) { }
  color="";
  cateroriesArr:any;
  onecategory:category;
  audio:any;
  IsPlaying=true;
  play=false;
  pause=true;
  //get num pages of this category-by category id 
  getNumPageByCategoryId(categoryId:number): any {
    return this.http.get("http://1a96fa94.ngrok.io/api/Categories/"+categoryId).toPromise().then(
      res => { return res;})
      .catch(err => { return false;})
  }

  // get all the categories 
  getcategories(): any {

    return this.http.get("http://1a96fa94.ngrok.io/api/Categories/")
    .toPromise().then(
      res => { 
        this.cateroriesArr=res;
        console.log(res);
        return res;
       })
      .catch(err => { return false;})
  }

}
