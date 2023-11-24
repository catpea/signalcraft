export default class NodeRegistry {
  constructor() {
    this.nodeClasses = new Map();
  }

  register(type, nodeClass) {
    if (this.nodeClasses.has(type)) {
      throw new Error(`Type ${type} is already registered.`);
    }


    this.nodeClasses.set(type, nodeClass);
  }

  create(type, id) {
    if (!this.nodeClasses.has(type)) {
      throw new Error(`Type "${type}" is not registered.`);
    }
    const NodeClass = this.nodeClasses.get(type);
    return new NodeClass(id);
  }
}
