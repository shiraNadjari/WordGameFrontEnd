export class image{
    public ImageID:number;
    public URL:string;
    public CategoryID: number;
    public EndIndex: number;
    public BeginIndex: number;
   
    
    constructor(Imgid: number, URL: string, categoryid: number , EndIndex:number, BeginIndex: number) {
       
        this.ImageID = Imgid;
        this.URL = URL;
        this.CategoryID = categoryid;
        this.EndIndex=EndIndex;
        this.BeginIndex=BeginIndex;
    }
}
export const images: image[] = [
    new image(1, "https://www.rami-levy.co.il/files/products/big/97.jpg",2,1,3),
    new image(2, "https://www.rami-levy.co.il/files/products/big/97.jpg",2,1,3),
    new image(3, "https://www.rami-levy.co.il/files/products/big/97.jpg",2,1,3),
  
];