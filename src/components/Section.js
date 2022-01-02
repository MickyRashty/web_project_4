// Section class JS code

export default class Section {
    constructor({ items ,renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItems(items) {
        this._items = items;
    }

    renderer() {
        this._items.forEach(item => {
            this.addItem(item);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.prepend(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }
}