export default class TopBarModel {
	constructor(links) {
		if (this.areLinksValid(links)) this.links = links;
		else throw Error("Wrong links param");
	}

	areLinksValid(links) {
		return links instanceof Array && links.every(el => typeof el == "string");
	}
}
