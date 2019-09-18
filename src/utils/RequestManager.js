import axios from "axios";

class RequestManager {
	constructor() {
		this.requester = axios.create({
			baseURL: "http://localhost:5000"
			// typeof API_SERVER_URL === "undefined"
			// 	? "http://localhost:5000"
			// 	: API_SERVER_URL
		});
	}

	async postRegisterCredentials(email, password) {
		try {
			const response = await this.requester.post(
				"/register",
				{},
				{
					auth: {
						username: email,
						password
					}
				}
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async postLoginCredentials(email, password) {
		try {
			const response = await this.requester.post(
				"/login",
				{},
				{
					auth: {
						username: email,
						password
					}
				}
			);
			if (response.status == "200") {
				sessionStorage.setItem("jwt", response.headers["x-auth-token"]);
				this.requester.defaults.headers.common[
					"x-auth-token"
				] = sessionStorage.getItem("jwt");
			}
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async getNote(user, noteID) {
		try {
			const response = await this.requester.get(`/${user}/notes/${noteID}`);
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async getNotes(user) {
		try {
			const response = await this.requester.get(`/${user}/notes`);
			if (response.status == "200") return response.data.notes;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async postNote(user, noteText) {
		try {
			const response = await this.requester.post(`/${user}/notes`, {
				noteText
			});
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async putNote(user, noteID, noteText) {
		try {
			const response = await this.requester.put(`/${user}/notes/${noteID}`, {
				noteText
			});
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}

	async deleteNote(user, noteID) {
		try {
			const response = await this.requester.delete(`/${user}/notes/${noteID}`);
			return response.data;
		} catch (error) {
			console.log(error.response.data);
			return error.response.data;
		}
	}
}
const requestManager = new RequestManager();
export default requestManager;
