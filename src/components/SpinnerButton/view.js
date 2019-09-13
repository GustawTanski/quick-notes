import View from "../../utils/View";

export default class SpinnerButtonView extends View {
	constructor(isLoading) {
		super();
		this.element = document.createElement("button");
		this.element.classList.add("btn", "btn-info");
		this.spinner = document.createElement("span");
		this.spinner.classList.add("spinner-grow", "spinner-grow-sm");
		this.content = document.createElement("span");
		if (isLoading) this.setLoading();
		else this.unsetLoading();
		this.children.push(this.spinner, this.content);
	}

	setLoadingForTime(time) {
		if (typeof time != "number") throw Error("Wrong time param");
		this.setLoading();
		return new Promise(resolve => setTimeout(resolve, time * 1000)).then(() => {
			this.unsetLoading();
		});
	}

	setLoading() {
		this.spinner.hidden = false;
		this.content.innerText = "Loading ...";
	}

	unsetLoading() {
		this.spinner.hidden = true;
		this.content.innerText = "Click me!";
	}
}
