export default class ConfirmModel {
	constructor(message) {
		this.message = message;
	}

	set message(message) {
		if (typeof message == "string") {
			this._message = message;
		} else throw TypeError("Wrong message type!");
	}

	get message() {
		return this._message;
	}
}
