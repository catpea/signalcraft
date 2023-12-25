// Hello user, you are provided a simple api object
// see src/dream/Api.js for functions - this is all you need to know.

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
  const primaryPromptText1 = api.addNode("text/string", {string: "Hello", x:100, y:100});
  const primaryPromptText2 = api.addNode("text/string", {string: "World", x:100, y:300});
  const secondaryPromptText = api.addNode("text/string", {string: "World", x:100, y:600});

  const stringC = api.addNode("text/string", {string: "Meow!", x:100, y:800});

  const midjourneyPrompt = api.addNode("midjourney/prompt", {weird: 10, x:500, y:300});
  const domWrite = api.addNode("dom/write", {weird: 10, x:800, y:300});
  const linkOutput = api.linkPorts(midjourneyPrompt, domWrite);

  // create a flow between compoents
  const linkA1 = api.linkPorts(primaryPromptText1, midjourneyPrompt);
  const linkA2 = api.linkPorts(primaryPromptText2, midjourneyPrompt);
  const linkB  = api.linkPorts(secondaryPromptText, midjourneyPrompt, {input:'secondary'});



  // execute your program;
  const result = await api.execute(midjourneyPrompt);
  console.log('usage.js api.execute said: ', domWrite);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['Hello', 'World']);
  console.assert(actual==expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);


  const rerun = async function(){
    const result = await api.execute(domWrite);
    console.log('usage.js RERUN api.execute said: ', result);
  }
  app.Nodes.forEach(o=>o.monitor(()=>rerun()));

  app.Connectors.observe('created', rerun)
  app.Connectors.observe('removed', rerun)

  }else{
    // const testJunction = api.addJunction({x:50, y:50});
    const stringA = api.addNode("text/string", { string: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } );
  }


  console.log( api.save() );
}
