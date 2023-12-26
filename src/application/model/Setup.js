import { v4 as uuid } from "uuid";

import ReactiveObject from "../system/ReactiveObject.js";

export default class Setup extends ReactiveObject {

  constructor(properties){
    super();

    const props = {
      id: uuid(),
      ...properties,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

  }

}
