// Generic Data Item
import { v4 as uuid } from "uuid";
export default class Theme {
  id;
  name;
  reference; // NOTE: live reference to an object as serializing selected items is a strange thing to do.
  data = {};
  deleted = false;
  constructor({id,name,reference}){
    this.id = id||uuid(); // type id, for internal purposes
    this.name = name;
    this.reference = reference;
  }
}
