export default class RouterModel {
	constructor() {}
	setURL(newURL) {
		history.pushState("", newURL, `/#/${newURL}`);
	}
	manageURL() {
		let href = window.location.href.split("#/")[1];
		if (href == undefined) href = "home";
		this.setURL(href);
		return href;
	}
}
