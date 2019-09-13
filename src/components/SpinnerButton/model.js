export default class SpinnerButtonModel {
	constructor(isLoading) {
		if (typeof isLoading != "boolean") throw Error("Wrong isLoading param");
		this.isLoading = isLoading;
	}
}
