import View from "../../utils/View";
import Model from "./model";


export default class NoteView extends View {
    constructor(note) {
        super(note);

        this.element = document.createElement("form");

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.color = note.color;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        //Note content
        this.title = document.createElement("h5");
        this.title.classList.add("card-title");
        this.title.innerText = note.title;

        this.content = document.createElement("p");
        this.content.classList.add("card-text");
        this.content.innerText = note.content;




        this.element.append(
            card,
            cardBody,
            this.title,
            this.content
        )
    }