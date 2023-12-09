// Hello user, you are provided a simple app object
// see src/dream/DreamInterface.js for functions - this is all you need to know.

  //                  use the app object, just the app object
  //                           |
  //                           v
export default async function(app){
  //                           |
  //                           |        .loadFile() .saveFile()
  //                           |        .addNode() ............................. type and value
  //                           |        .linkPorts() ........................... source taget input/output ports presumed
  //                           |        .run()
  //                           v

  console.info(Object.keys(app));

  // define your components
  const stringA = app.addNode("text/string", {value: "a"} );
  const stringB = app.addNode("text/string", {value: "b"} );
  const arrayJn = app.addNode("array/join");

  // create a flow between compoents
  app.linkPorts(stringA, arrayJn);
  app.linkPorts(stringB, arrayJn);

  // run your program;
  const result = await app.run(arrayJn);
  console.log('usage.js app.run said: ', result);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['a', 'b']);
  console.assert(actual==expect, `./src/usage.js: Yay! the program failed to run correctly, expected ${expect} but got "${actual}" instead.`);

}
