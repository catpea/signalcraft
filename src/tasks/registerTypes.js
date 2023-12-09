export default function(core){

  const textType = core.Types.create('text', 'string');
  textType.Reply.create({name:"output", generator:() => { return this.string; }})
  textType.Input.create({name:"string", type: "string", description: "a string of letters"})

  const colorType = core.Types.create('text', 'color');
  colorType.Reply.create({name:"output", generator:() => { return this.color; }})
  colorType.Input.create({name:"color", type: "string", description: "color"})
  colorType.Input.create({name:"model", type: "string", description: "preferred model"})
  colorType.Input.create({name:"description", type: "string", description: "description"})

  const uppercaseType = core.Types.create('text', 'case');
  uppercaseType.Reply.create({name:"upper", generator:() => { return this.input.toUpperCase(); }})
  uppercaseType.Reply.create({name:"lower", generator:() => { return this.input.toLowerCase(); }})
  uppercaseType.Input.create({name:"input"})
  uppercaseType.Input.create({name:"template", type: "string", description: "string template use $input to interpolate"})
  uppercaseType.Input.create({name:"description", type: "string", description: "description"})

  const arrayJoinType = core.Types.create('array', 'join');
  arrayJoinType.Reply.create({name:"output", generator:({array, separator}) => { return array.join(separator); }})
  arrayJoinType.Input.create({name:"input", type: "*", description: "data to join"})
  arrayJoinType.Input.create({name:"separator", type: "string", description: "separator to use"})
  arrayJoinType.Input.create({name:"duck", type: "string", description: "separator to use"})


}
