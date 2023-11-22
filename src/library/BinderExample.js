class Binder {
    constructor(element, reactiveObject, property) {
        this.element = element;
        this.reactiveObject = reactiveObject;
        this.property = property;

        // Initialize UI with current object state
        this.element.value = this.reactiveObject[this.property];

        // UI -> Object binding
        this.element.addEventListener('input', () => {
            this.reactiveObject[this.property] = this.element.value;
        });

        // Object -> UI binding
        this.reactiveObject.observe(this.property, (newVal) => {
            this.element.value = newVal;
        });
    }
}

// Usage
const inputElement = document.getElementById('myInput');
const reactiveObj = new ReactiveObject({ text: '' });

const binder = new Binder(inputElement, reactiveObj, 'text');

// Now, changes in the input field will be reflected in the reactive object,
// and changes in the reactive object will be reflected in the input field.
