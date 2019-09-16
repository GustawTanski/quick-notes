import View from "../../utils/View";


export default class NoteView extends View {
    constructor() {
        super();

        this.element = document.createElement("form");

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.color = "blue";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        //Note content
        this.title = document.createElement("h5");
        this.title.classList.add("card-title");
        this.title.innerText = "My Note"

        this.text = document.createElement("p");
        this.text.classList.add("card-text");
        this.text.innerText = "Creating notes with friends is great!"




        this.element.append(
            card,
            cardBody,
            this.title,
            this.text
        )
    }