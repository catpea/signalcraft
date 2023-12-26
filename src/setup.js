import flattenDeep from 'lodash/flattenDeep';
import head from 'lodash/head';

import nostromoTheme from './theme/nostromo/index.js';
import obsidianTheme from './theme/obsidian/index.js';

export default function(application){

  application.Themes.create({name:'nostromo', theme:nostromoTheme});
  application.Themes.create({name:'obsidian', theme:obsidianTheme});

  {
  const type = application.Archetypes.create({type:'test/layout'});
  type.output.push( {id:"output1", generator:({value, string}) => { return string }} );
  type.output.push( {id:"output2", generator:({value, string}) => { return string }} );
  type.input.push( {id:"string1", type: "string", description: "a string of letters", value: "default value"} );
  type.input.push( {id:"string2", type: "string", description: "a string of letters", value: "default value"} );
  type.input.push( {id:"string3", type: "string", description: "a string of letters", value: "default value"} );
  }

  const textType = application.Archetypes.create({type:'text/string'});
  textType.output.push( {id:"output", generator:({value, string}) => { return string }} );
  textType.input.push( {id:"string", type: "string", description: "a string of letters", value: "default value long thing"} );

  const colorType = application.Archetypes.create({type:'text/color'});
  colorType.output.push( {id:"output", generator:() => { return 'TODO' }} );
  colorType.input.push( {id:"color", type: "string", description: "color"} );
  colorType.input.push( {id:"model", type: "string", description: "preferred model"} );
  colorType.input.push( {id:"description", type: "string", description: "description"} );

  const uppercaseType = application.Archetypes.create({type:'text/case'});
  uppercaseType.output.push( {id:"upper", generator:() => { return 'TODO' }} );
  uppercaseType.output.push( {id:"lower", generator:() => { return 'TODO' }} );
  uppercaseType.input.push( {id:"input"} );
  uppercaseType.input.push( {id:"template", type: "string", description: "string template use $input to interpolate"} );
  uppercaseType.input.push( {id:"description", type: "string", description: "description"} );

  const arrayJoinType = application.Archetypes.create({type:'array/join'});
  // arrayJoinType.output.push( {id:"output", generator:({array, separator}) => { return array.join(separator); }} );
  arrayJoinType.output.push( {
    id:"output",
    generator: ({input, separator}) => {
      return flattenDeep(input); //separator.length?input.join( separator.join()):input;
    }
  });
  arrayJoinType.input.push( {id:"input", type: "*", description: "data to join"} );
  arrayJoinType.input.push( {id:"separator", type: "string", description: "separator to use"} );
  arrayJoinType.input.push( {id:"duck", type: "string", description: "separator to use"} );



  {
    const type = application.Archetypes.create({type:'dom/write'});
    // arrayJoinType.output.push( {id:"output", generator:({array, separator}) => { return array.join(separator); }} );
    type.output.push( {
      id:"output",
      generator: ({input, target,}) => {
        const data =  flattenDeep(input).join(', ');
        const targetId = head(flattenDeep(target));
        const elem = document.getElementById(targetId);
        elem.innerText = data;

        return flattenDeep(input); //separator.length?input.join( separator.join()):input;
      }
    });
    type.input.push( {id:"input", type: "*", description: "data to join"} );

    type.input.push( {id:"target", type: "*", value:"output", description: "data to join"} );
  }



  {
  const type = application.Archetypes.create({type:'midjourney/prompt'});

  type.output.push({
    id:"output",
    generator: ({input, secondary, separator}) => {
      return flattenDeep([input, secondary]); //separator.length?input.join( separator.join()):input;
    }
  });
  type.output.push( {id:"JSON", generator:({value, string}) => { return string }} );
  type.output.push( {id:"debug", generator:({value, string}) => { return string }} );
  type.output.push( {id:"log", generator:({value, string}) => { return string }} );

  type.input.push( {id:"input", type: "*", description: "data to join"} );
  type.input.push( {id:"template", type: "*", description: "base template"} );
  type.input.push( {id:"secondary", type: "*", description: "secondary characteristics"} );
  type.input.push( {id:"styles", type: "string", description: "styles"} );
  type.input.push( {id:"authors", type: "string", description: "authors", value:'michael vrubel, valentin serov, kustodiev boris'} );
  type.input.push( {id:"chaos", type: "string", description: "chaos"} );
  type.input.push( {id:"aspectRatio", type: "string", description: "aspect-ratio"} );
  type.input.push( {id:"style", type: "string", description: "style"} );
  type.input.push( {id:"weird", type: "string", description: "weird"} );
  type.input.push( {id:"version", type: "string", description: "version", value: '5.2'} );
  }









}
