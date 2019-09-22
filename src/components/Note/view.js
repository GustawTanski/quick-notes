import View from "../../utils/View";

export default class NoteView extends View {
	constructor(config) {
		super();

		this.element = document.createElement("div");
		this.element.classList.add("card", `text-${textColorForBg[config.color]}`);
		this.element.style.maxWidth = "18rem";
		this.element.style.background = `var(--${config.color})`;

		this.element.innerHTML = `
			<div class="card-header">
				<span class="title-#Fsd3asd">${config.title}</span>
				<button type="button" class="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="card-body">
                <p class="card-text">${config.content}</p>
            </div>
        `;
		//Note content
		this.title = this.element.querySelector(".title-#Fsd3asd");
		this.content = this.element.querySelector(".card-text");
		this.crossButton = this.element.querySelector(".close");
	}
}

const textColorForBg = {
	blue: "white",
	indigo: "white",
	purple: "white",
	pink: "white",
	red: "white",
	orange: "black",
	yellow: "black",
	green: "white",
	teal: "black",
	cyan: "white",
	white: "black",
	gray: "white",
	"gray-dark": "white",
	primary: "white",
	secondary: "white",
	success: "white",
	info: "white",
	warning: "black",
	danger: "white",
	light: "black",
	dark: "white"
};
