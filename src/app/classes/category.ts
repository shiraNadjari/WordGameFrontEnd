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
    // new category( "food", 39, "../../assets/food.jpg"),
    // new category( "animals", 40, "../../assets/animals.jpg"),
    // new category("clothes",41,  "../../assets/clothing.jpg"),
    // new category( "school",42,  "../../assets/scool.jpg"),
    // new category( "birthday",43,  "../../assets/birthdayparty.jpg"),
    // new category( "weather",6, "shorturl.at/doEJ4") 
];