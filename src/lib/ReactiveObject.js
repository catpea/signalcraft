class ReactiveObject {
    constructor(obj) {
        this.observers = {};

        // Define getters/setters for each property
        for (let key in obj) {
            let val = obj[key];

            Object.defineProperty(this, key, {
                get() {
                    return val;
                },
                set(newValue) {
                    val = newValue;
                    // Notify observers
                    (this.observers[key] || []).forEach((fn) => fn(newValue));
                },
            });
        }
    }

    observe(key, fn) {
        this.observers[key] = this.observers[key] || [];
        this.observers[key].push(fn);
    }
}

// Usage
class MyState extends ReactiveObject {
    constructor() {
        super({ count: 0 })
    }

    increment() {
        this.count += 1;
    }
}

const state = new MyState();
state.observe('count', newVal => console.log(`count changed to ${newVal}`));
state.increment(); // "count changed to 1"
state.increment(); // "count changed to 2"
