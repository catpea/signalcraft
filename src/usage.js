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

  if(1){
  // define your components
  const stringA = api.addNode("text/string", { string: "Hello" } );
  const stringB = api.addNode("text/string", { string: "World" } );
  const stringC = api.addNode("text/string", { string: "Meow!" } );
  const arrayJn = api.addNode("array/join");

  // create a flow between compoents
  const linkA = api.linkPorts(stringA, arrayJn);
  const linkB = api.linkPorts(stringB, arrayJn);

  // api.select(stringA);
  // api.select(linkA);
  //
  // setTimeout(()=>{
  //   api.deselect(stringA);
  //   api.select(arrayJn);
  //
  // },5000);

  // execute your program;
  const result = await api.execute(arrayJn);
  console.log('usage.js api.execute said: ', result);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['Hello', 'World']);
  console.assert(actual==expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);


  const rerun = async function(){
    const result = await api.execute(arrayJn);
    console.log('usage.js RERUN api.execute said: ', result);
  }
  const app = api.getApplication();
  app.Links.observe('created', rerun)
  app.Links.observe('removed', rerun)

  }





  if(0){

    const stringA = api.addNode("test/two-three", { string1: "Hello" } );

  }
}
