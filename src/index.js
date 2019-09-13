import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from "./components/App";

const app = new App(document.querySelector("#root"));
app.init();
