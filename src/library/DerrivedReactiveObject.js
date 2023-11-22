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
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((fn) => fn(newValue));
          }
        },
      });
    }
  }

  observe(key, fn) {
    this.observers[key] = this.observers[key] || [];
    this.observers[key].push(fn);
  }
}

class DerivedReactiveObject extends ReactiveObject {
  constructor(dependencies, mapper) {
    // Initialize with mapped properties
    super(mapper(...dependencies));

    // Observe changes in dependencies
    dependencies.forEach((dep) => {
      Object.entries(dep).forEach(([key, val]) => {
        // Make sure we don't add observer to internal properties
        if (key === "observers") return;

        dep.observe(key, () => {
          // On change, re-map the properties
          Object.assign(this, mapper(...dependencies));
        });
      });
    });
  }
}

// Usage
const obj1 = new ReactiveObject({ a: 1 });
const obj2 = new ReactiveObject({ b: 2 });

const combined = new DerivedReactiveObject([obj1, obj2], (o1, o2) => ({
  c: o1.a + o2.b,
}));

combined.observe('c', (newVal) => console.log(`c changed to ${newVal}`));

obj1.a = 3; // "c changed to 5"
obj2.b = 5; // "c changed to 8"
