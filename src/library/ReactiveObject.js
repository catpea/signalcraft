// Export a default class named ReactiveObject
export default class ReactiveObject {
    #observers = {};

    constructor(obj) {
        // Ensure that constructor receives an object type argument
        if(typeof obj !== 'object') throw new TypeError('Argument must be an object.');

        // Define getters and setters for each property
        Object.entries(obj).forEach(([key, val]) => this.#defineReactiveProperty(key, val));
    }

    #defineReactiveProperty(key, val) {
        Object.defineProperty(this, key, {
            get: () => val,
            set: (newValue) => {
                if (newValue === val) return;
                val = newValue;
                this.#notifyObservers(key, newValue);
            }
        });
    }

    #notifyObservers(key, value) {
        if (Array.isArray(this.#observers[key]))
            this.#observers[key].forEach(observer => observer(value));
    }

    subscribe(key, observer) {
        // Ensure that observer is a function
        if(typeof observer !== 'function') throw new TypeError('Observer must be a function.');

        // If there isn't an observers array for this key yet, create it
        if(!Array.isArray(this.#observers[key])) this.#observers[key] = [];

        this.#observers[key].push(observer);

        observer(this[key]);

        // Return a function to unsubscribe this observer.
        return () => {
            this.#unsubscribe(key, observer);
        };
    }

    #unsubscribe(key, observer) {
       this.#observers[key] = this.#observers[key].filter(obs => obs !== observer);
    }
}

//
// // Usage
// class MyState extends ReactiveObject {
//     constructor() {
//         super({ count: 0 })
//     }
//
//     increment() {
//         this.count += 1;
//     }
// }
//
// const state = new MyState();
// state.observe('count', newVal => console.log(`count changed to ${newVal}`));
// state.increment(); // "count changed to 1"
// state.increment(); // "count changed to 2"
