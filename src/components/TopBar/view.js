import View from "../../bases/View";

export default class TopBarView extends View {
	constructor(links) {
		super();
		this.element = document.createElement("ul");
        this.element.classList.add("nav", "nav-pills");
        this.links = [];
		if (links) {
			links.forEach(link => {
				const linkElement = document.createElement("li");
				linkElement.innerHTML = `
                <a class="nav-link" href="#">${link}</a>
                `;
				linkElement.classList.add("nav-item");
                this.element.appendChild(linkElement);
                this.links.push(linkElement.querySelector(".nav-link"))
			});
        }
	}
}
