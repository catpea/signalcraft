export default function(application){

  const textType = application.Types.create('text', 'string');
  textType.Incoming.create("string", {type: "string", description: "a string of letters"})
  textType.Outgoing.create("output", () => { return this.string; })

  const colorType = application.Types.create('text', 'color');
  colorType.Incoming.create("color", {type: "string", description: "color"})
  colorType.Incoming.create("model", {type: "string", description: "preferred model"})
  colorType.Incoming.create("description", {type: "string", description: "description"})
  colorType.Outgoing.create("output", () => { return this.color; })

  const uppercaseType = application.Types.create('text', 'case');
  uppercaseType.Incoming.create("input")
  uppercaseType.Incoming.create("template", {type: "string", description: "string template use $input to interpolate"})
  uppercaseType.Incoming.create("description", {type: "string", description: "description"})
  uppercaseType.Outgoing.create("upper", () => { return this.input.toUpperCase(); })
  uppercaseType.Outgoing.create("lower", () => { return this.input.toLowerCase(); })

}
