import { image } from "./image";
import { imageObject } from "./Object";


export class imageWithObject {
    public image:image;
    public imageObjects:imageObject[];//= List<imageObject>
   
   
    constructor(myImage: image, imageObjArr: imageObject[]) {
       
        this.image = myImage;
        this.imageObjects = imageObjArr;       
    }
}
// export const oneImageObj:imageWithObject= new imageWithObject(new image(1,
//      "https://www.rami-levy.co.il/files/products/big/97.jpg",2,1,3),[
//     new imageObject(1,"cat",1,2,3,4,1,2,3,4,1),new imageObject(2,"cat",1,2,3,4,1,2,3,4,1)
// ])

// export const arrobj: imageWithObject[] = [
//     new imageWithObject(new image(1, "https://www.iritsadan.com/wp-content/uploads/veg-630x450.jpg",2,1,3),[
//         new imageObject(1,"cat",1,2,3,4,1,2,3,4,1),new imageObject(2,"cat",1,2,3,4,1,2,3,4,1)
//     ]),
//     new imageWithObject(new image(2, "https://www.rami-levy.co.il/files/products/big/97.jpg ",2,1,3),[
//         new imageObject(1,"cat",1,2,3,4,1,2,3,4,2),new imageObject(2,"cat",1,2,3,4,1,2,3,4,2)
//     ]),
//     new imageWithObject(new image(3, "https://www.rami-levy.co.il/files/products/big/97.jpg ",2,1,3),[
//         new imageObject(1,"cat",1,2,3,4,1,2,3,4,3),new imageObject(2,"cat",1,2,3,4,1,2,3,4,3)
//     ])
// ];
