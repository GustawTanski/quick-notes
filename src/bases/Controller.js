import View from "./View"

export default class Controller {
    constructor(node) {
        this.node = node;
    }

    setListeners() {}
    init(){
        this.setListeners();
        if (this.view instanceof View) this.node.appendChild(this.view.render());
        for (const i in this) {
            if ( this[i] instanceof Controller) {
                this[i].init();
            }
        }
    }
}