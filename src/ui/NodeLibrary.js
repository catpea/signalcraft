export default class NodeLibrary extends HTMLElement {
  #dataLibrary = [
    { name: "JavaScript", data: [{ name: "Hola" }] },
    { name: "Browser Data", data: [
      { name: "Hola" },
      { name: "Hola 2" }
    ] },
  ];

  set dataLibrary(value) {
    this.#dataLibrary = value;
    this.render();
  }

  get dataLibrary() {
    return this.#dataLibrary;
  }

  static get observedAttributes() {
    return ["name"];
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    console.log("attributeChangedCallback", { property, oldValue, newValue });
    if (oldValue === newValue) return;
    this[property] = newValue;
    this.render();
  }

  // constructor() {
  //   super();
  // }
  // connectedCallback() {
  // }
  // disconnectedCallback(){
  // }

  render() {
    this.replaceChildren();



    // Iterate through the main array
    this.#dataLibrary.forEach((category) => {

      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.classList.add("shadow");
      cardElement.classList.add("mb-3");
      this.appendChild(cardElement);

      const categoryItem = document.createElement("div");
      categoryItem.classList.add("card-header");
      categoryItem.textContent = category.name;
      cardElement.appendChild(categoryItem);

      // Check if there is sub-data
      if (category.data && category.data.length > 0) {
        const subList = document.createElement("ul");
        subList.classList.add("list-group");
        subList.classList.add("list-group-flush");

        // Iterate through the sub-data array
        category.data.forEach((subItem) => {
          const subItemElement = document.createElement("li");
          subItemElement.classList.add("list-group-item");
          subItemElement.classList.add("cursor-grab");
          subItemElement.textContent = subItem.name;
          subList.appendChild(subItemElement);
        });

        // Append the sub-list to the category item
        cardElement.appendChild(subList);
      }

      // Append the category item to the main list
    });
  }
}

customElements.define("node-library", NodeLibrary);
