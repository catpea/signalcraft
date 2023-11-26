export default function(application){

  const textType = application.Types.create('text', 'string');
  textType.Incoming.create("string", {type: "string", description: "a string of letters"})
  textType.Outgoing.create("output", () => { return this.string; })

  const colorType = application.Types.create('basic', 'color');
  colorType.Incoming.create("color", {type: "string", description: "color"})
  colorType.Outgoing.create("output", () => { return this.color; })

  const uppercaseType = application.Types.create('text', 'uppercase');
  uppercaseType.Incoming.create("input")
  uppercaseType.Outgoing.create("output", () => { return this.input.toUpperCase(); })

}
