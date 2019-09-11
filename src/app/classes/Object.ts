export class imageObject{
    ObjectId:number;
    Name:string;
    X1: number;
    X2: number;
    Y1: number;
    Y2: number;
    X3: number;
    X4: number;
    Y3: number;
    Y4: number;
    VoiceURL:string;
    ImageID: number;

    constructor(id:number,n:string,x1:number,x2:number,y1:number,y2:number,x3:number,x4:number,y3:number,y4:number,imageid:number,voice:string){
        this.ObjectId=id;
        this.Name=n;
        this.X1=x1;
        this.X2=x2;
        this.Y1=y1;
        this.Y2=y2;
        this.X3=x3;
        this.X4=x4;
        this.Y3=y3;
        this.Y4=y4;
        this.ImageID=imageid;
        this.VoiceURL=voice;
    }
}