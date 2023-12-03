export default function(application){

  const textType = application.Types.create('text', 'string');
  textType.Input.create("string", {type: "string", description: "a string of letters"})
  textType.Reply.create("output", () => { return this.string; })

  const colorType = application.Types.create('text', 'color');
  colorType.Input.create("color", {type: "string", description: "color"})
  colorType.Input.create("model", {type: "string", description: "preferred model"})
  colorType.Input.create("description", {type: "string", description: "description"})
  colorType.Reply.create("output", () => { return this.color; })

  const uppercaseType = application.Types.create('text', 'case');
  uppercaseType.Input.create("input")
  uppercaseType.Input.create("template", {type: "string", description: "string template use $input to interpolate"})
  uppercaseType.Input.create("description", {type: "string", description: "description"})
  uppercaseType.Reply.create("upper", () => { return this.input.toUpperCase(); })
  uppercaseType.Reply.create("lower", () => { return this.input.toLowerCase(); })

}
