export class category {
    public CategoryId:number;
    public CategoryName:string;
    public ImageURL: string;
   
   
    constructor(cat_Name: string, cat_id: number, image: string) {
       
        this.CategoryId = cat_id;
        this.CategoryName = cat_Name;
        this.ImageURL = image;
       
    }
}

export const categories: category[] = [
    // new category( "food", 1, "https://www.rami-levy.co.il/files/products/big/97.jpg"),
    // new category( "animals", 2, "https://www.iritsadan.com/wp-content/uploads/veg-630x450.jpg"),
    // new category( "clothes",3, "https://www.iritsadan.com/wp-content/uploads/veg-630x450.jpg"),
    // new category( "weather",4, "https://www.iritsadan.com/wp-content/uploads/veg-630x450.jpg"),
    // new category( "weather",5, "https://www.iritsadan.com/wp-content/uploads/veg-630x450.jpg"),
    // new category( "weather",6, "shorturl.at/doEJ4")
];