import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from "./components/App";

try {
	const app = new App(document.querySelector("#root"));
	try {
		app.init();
	} catch (error) {
		console.error(error);
		alert("Runtime error!");
	}
} catch (error) {
	console.error(error);
	alert("Building error!");
}
