// Hello user, you are provided a simple api object
// see src/dream/DreamInterface.js for functions - this is all you need to know.

  //                  use the api object, just the api object
  //                           |
  //                           v
export default async function(api){
  //                           |
  //                           |        .loadFile() .saveFile()
  //                           |        .addNode() ............................. type and value
  //                           |        .linkPorts() ........................... source taget input/output ports presumed
  //                           |        .run()
  //                           v

  // define your components
  const stringA = api.addNode("text/string", { string: "Hello" } );
  const stringB = api.addNode("text/string", { string: "World" } );
  const stringC = api.addNode("text/string", { string: "Meow!" } );
  const arrayJn = api.addNode("array/join");

  // create a flow between compoents
  api.linkPorts(stringA, arrayJn);
  api.linkPorts(stringB, arrayJn);

  // execute your program;
  const result = await api.execute(arrayJn);
  console.log('usage.js api.execute said: ', result);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['Hello', 'World']);
  console.assert(actual==expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);

}
