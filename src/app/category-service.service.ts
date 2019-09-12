import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(public http: HttpClient) { }
  color="";
  cateroriesArr:any;
  onecategory:any
  //get num pages of this category-by category id 
  getNumPageByCategoryId(categoryId:number): any {
    return this.http.get("http://c2f1760c.ngrok.io/api/Categories/"+categoryId).toPromise().then(
      res => { return res;})
      .catch(err => { return false;})
  }

  // get all the categories 
  getcategories(): any {

    return this.http.get("http://e6f36a11.ngrok.io/api/Categories/")
    .toPromise().then(
      res => { 
        this.cateroriesArr=res;
        console.log(res);
        return res;
       })
      .catch(err => { return false;})
  }

}
