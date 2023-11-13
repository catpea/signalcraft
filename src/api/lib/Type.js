export default class Type {
  constructor(category, name, defaults, evaluate) {
    this.category = category;
    this.name = name;
    this.data = defaults;
    this.evaluate = evaluate;
  }
}
