// Hello user, you are provided a simple api object
// see src/dream/DreamInterface.js for functions - this is all you need to know.

  //                  use the api object, just the api object
  //                           |
  //                           v
export default async function(api){
  const app = api.getApplication();
  //                           |
  //                           |        .loadFile() .saveFile()
  //                           |        .addNode() ............................. type and value
  //                           |        .linkPorts() ........................... source taget input/output ports presumed
  //                           |        .run()
  //                           v

  const DEBUG = 0;
  if(!DEBUG){
  // define your components
  const primaryPromptText1 = api.addNode("text/string", { string: "Hello" }, {x:100, y:100});
  const primaryPromptText2 = api.addNode("text/string", { string: "World" }, {x:100, y:300});
  const secondaryPromptText = api.addNode("text/string", { string: "World" }, {x:100, y:600});

  const stringC = api.addNode("text/string", { string: "Meow!" }, {x:100, y:800});

  const midjourneyPrompt = api.addNode("midjourney/prompt", {}, {x:500, y:300});

  // create a flow between compoents
  const linkA1 = api.linkPorts(primaryPromptText1, midjourneyPrompt);
  const linkA2 = api.linkPorts(primaryPromptText2, midjourneyPrompt);
  const linkB  = api.linkPorts(secondaryPromptText, midjourneyPrompt, {input:'secondary'});



  // execute your program;
  const result = await api.execute(midjourneyPrompt);
  console.log('usage.js api.execute said: ', result);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['Hello', 'World']);
  console.assert(actual==expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);


  const rerun = async function(){
    const result = await api.execute(midjourneyPrompt);
    console.log('usage.js RERUN api.execute said: ', result);
  }
  app.Connectors.observe('created', rerun)
  app.Connectors.observe('removed', rerun)

  }else{
    const testJunction = api.addJunction({x:50, y:50});
    const stringA = api.addNode("test/layout", { string1: "Hello" } );
  }


  console.log( app.Junctions.dump() );
}
