import flattenDeep from 'lodash/flattenDeep';

export default function(application){

  const testTwoThree = application.Archetypes.create({type:'test/two-three'});
  testTwoThree.output.push( {name:"output1", generator:({value, string}) => { return string }} );
  testTwoThree.output.push( {name:"output2", generator:({value, string}) => { return string }} );
  testTwoThree.input.push( {name:"string1", type: "string", description: "a string of letters", value: "default value"} );
  testTwoThree.input.push( {name:"string2", type: "string", description: "a string of letters", value: "default value"} );
  testTwoThree.input.push( {name:"string3", type: "string", description: "a string of letters", value: "default value"} );

  const textType = application.Archetypes.create({type:'text/string'});
  textType.output.push( {name:"output", generator:({value, string}) => { return string }} );
  textType.input.push( {name:"string", type: "string", description: "a string of letters", value: "default value"} );

  const colorType = application.Archetypes.create({type:'text/color'});
  colorType.output.push( {name:"output", generator:() => { return 'TODO' }} );
  colorType.input.push( {name:"color", type: "string", description: "color"} );
  colorType.input.push( {name:"model", type: "string", description: "preferred model"} );
  colorType.input.push( {name:"description", type: "string", description: "description"} );

  const uppercaseType = application.Archetypes.create({type:'text/case'});
  uppercaseType.output.push( {name:"upper", generator:() => { return 'TODO' }} );
  uppercaseType.output.push( {name:"lower", generator:() => { return 'TODO' }} );
  uppercaseType.input.push( {name:"input"} );
  uppercaseType.input.push( {name:"template", type: "string", description: "string template use $input to interpolate"} );
  uppercaseType.input.push( {name:"description", type: "string", description: "description"} );

  const arrayJoinType = application.Archetypes.create({type:'array/join'});
  // arrayJoinType.output.push( {name:"output", generator:({array, separator}) => { return array.join(separator); }} );
  arrayJoinType.output.push( {
    name:"output",
    generator: ({input, separator}) => {
      return flattenDeep(input); //separator.length?input.join( separator.join()):input;
    }
  });
  arrayJoinType.input.push( {name:"input", type: "*", description: "data to join"} );
  arrayJoinType.input.push( {name:"separator", type: "string", description: "separator to use"} );
  arrayJoinType.input.push( {name:"duck", type: "string", description: "separator to use"} );


}
