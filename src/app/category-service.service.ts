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
  index=0;
  cateroriesArr:any;
  onecategory:category;
  audio:any;
  IsPlaying=true;
  play=false;
  pause=true;
  //get num pages of this category-by category id 
  getNumPageByCategoryId(categoryId:number): any {
    return this.http.get("http://34.77.45.90/api/Categories/"+categoryId).toPromise().then(
      res => { return res;})
      .catch(err => { return false;})
  }

  // get all the categories 
  getcategories(): any {

    return this.http.get("http://34.77.45.90/api/Categories/")
    .toPromise().then(
      res => { 
        this.cateroriesArr=res;
        console.log(res);
        return res;
       })
      .catch(err => { return false;})
  }

}
