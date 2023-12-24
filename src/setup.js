import flattenDeep from 'lodash/flattenDeep';

export default function(application){

  {
  const type = application.Archetypes.create({type:'test/layout'});
  type.output.push( {name:"output1", generator:({value, string}) => { return string }} );
  type.output.push( {name:"output2", generator:({value, string}) => { return string }} );
  type.input.push( {name:"string1", type: "string", description: "a string of letters", value: "default value"} );
  type.input.push( {name:"string2", type: "string", description: "a string of letters", value: "default value"} );
  type.input.push( {name:"string3", type: "string", description: "a string of letters", value: "default value"} );
  }

  const textType = application.Archetypes.create({type:'text/string'});
  textType.output.push( {name:"output", generator:({value, string}) => { return string }} );
  textType.input.push( {name:"string", type: "string", description: "a string of letters", value: "default value long thing"} );

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







  {
  const type = application.Archetypes.create({type:'midjourney/prompt'});

  type.output.push({
    name:"output",
    generator: ({input, separator}) => {
      return flattenDeep(input); //separator.length?input.join( separator.join()):input;
    }
  });
  type.output.push( {name:"JSON", generator:({value, string}) => { return string }} );
  type.output.push( {name:"debug", generator:({value, string}) => { return string }} );
  type.output.push( {name:"log", generator:({value, string}) => { return string }} );

  type.input.push( {name:"input", type: "*", description: "data to join"} );
  type.input.push( {name:"template", type: "*", description: "base template"} );
  type.input.push( {name:"secondary", type: "*", description: "secondary characteristics"} );
  type.input.push( {name:"styles", type: "string", description: "styles"} );
  type.input.push( {name:"authors", type: "string", description: "authors", value:'michael vrubel, valentin serov, kustodiev boris'} );
  type.input.push( {name:"chaos", type: "string", description: "chaos"} );
  type.input.push( {name:"aspectRatio", type: "string", description: "aspect-ratio"} );
  type.input.push( {name:"style", type: "string", description: "style"} );
  type.input.push( {name:"weird", type: "string", description: "weird"} );
  type.input.push( {name:"version", type: "string", description: "version", value: '5.2'} );
  }









}
