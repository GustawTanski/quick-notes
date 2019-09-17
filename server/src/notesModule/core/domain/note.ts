export default class Note{
    id: string;
    author: string;
    content: string;

    constructor(id:string,author:string,content:string){
        this.id=id;
        this.author=author;
        this.content=content;
    }
}