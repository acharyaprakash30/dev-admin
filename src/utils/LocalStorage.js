class CustomLocalStorage {

    constructor() {
        this.storage = window.localStorage;
    }
    get(name) {
        return this.storage.getItem(name)
    }

    set(name, value) {
        this.storage.setItem(name, value)
    }
    all() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(this.storage.getItem(keys[i]));
        }

        return values;

    }
}

export const LocalStorage = new CustomLocalStorage();