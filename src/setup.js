export default function(application){

  const textType = application.Types.create({name:'text/string'});
  textType.Output.push( {name:"output", generator:() => { return this.string; }} );
  textType.Input.push( {name:"string", type: "string", description: "a string of letters"} );

  const colorType = application.Types.create({name:'text/color'});
  colorType.Output.push( {name:"output", generator:() => { return this.color; }} );
  colorType.Input.push( {name:"color", type: "string", description: "color"} );
  colorType.Input.push( {name:"model", type: "string", description: "preferred model"} );
  colorType.Input.push( {name:"description", type: "string", description: "description"} );

  const uppercaseType = application.Types.create({name:'text/case'});
  uppercaseType.Output.push( {name:"upper", generator:() => { return this.input.toUpperCase(); }} );
  uppercaseType.Output.push( {name:"lower", generator:() => { return this.input.toLowerCase(); }} );
  uppercaseType.Input.push( {name:"input"} );
  uppercaseType.Input.push( {name:"template", type: "string", description: "string template use $input to interpolate"} );
  uppercaseType.Input.push( {name:"description", type: "string", description: "description"} );

  const arrayJoinType = application.Types.create({name:'array/join'});
  arrayJoinType.Output.push( {name:"output", generator:({array, separator}) => { return array.join(separator); }} );
  arrayJoinType.Input.push( {name:"input", type: "*", description: "data to join"} );
  arrayJoinType.Input.push( {name:"separator", type: "string", description: "separator to use"} );
  arrayJoinType.Input.push( {name:"duck", type: "string", description: "separator to use"} );


}
