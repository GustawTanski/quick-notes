import Controller from "../../utils/Controller";
import Model from "./model";
import View from "./view";

export default class Note extends Controller {
    constructor(node, configurations) {
        super(node);
        this.model = new Model(configurations)
        this.view = new View(this.model.configurations)
    }