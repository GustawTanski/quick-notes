import axios from "axios";

class RequestManager {
	constructor() {
		this.requester = axios.create({
			baseURL: "http://quick-notes-253112.appspot.com"
		});
	}

	async postRegisterCredentials(email, password) {
		try {
			const { data, status } = await this.requester.post("/register",{},{
					auth: {
						username: email,
						password
					}
				});
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	async postLoginCredentials(email, password) {
		try {
			const { data, status } = await this.requester.post("/login",{},{
					auth: {
						username: email,
						password
					}
				});
			this.requester.defaults.headers.common["x-auth-token"] =
				response.headers["x-auth-token"];
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	logout() {
		delete this.requester.defaults.headers.common["x-auth-token"];
	}

	async getNote(noteID) {
		try {
			const { data, status } = await this.requester.get(`/notes/${noteID}`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	async getNotes() {
		try {
			const { data, status } = await this.requester.get(`/notes`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	async postNote(color, message, title) {
		try {
			const { data, status } = await this.requester.post(`/notes`, {
				color,
				message,
				title
			});
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	async putNote(noteID, color, message, title) {
		try {
			const { data, status } = await this.requester.put(`/notes/${noteID}`, {
				color,
				message,
				title
			});
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}

	async deleteNote(noteID) {
		try {
			const { data, status } = await this.requester.delete(`/notes/${noteID}`);
			return { data, status };
		} catch (error) {
			if (error.response) {
				return error.response;
			}
			return error.message;
		}
	}
}
const requestManager = new RequestManager();
export default requestManager;
