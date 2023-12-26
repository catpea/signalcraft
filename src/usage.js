// Hello user, you are provided a simple api object
// see src/dream/Api.js for functions - this is all you need to know.

  //                  use the api object, just the api object
  //                           |
  //                           v
export default async function(api){
  const app = api.getApplication();

  api.selectTheme('obsidian');

  //                           |
  //                           |        .loadFile() .saveFile()
  //                           |        .addNode() ............................. type and value
  //                           |        .linkPorts() ........................... source taget input/output ports presumed
  //                           |        .run()
  //                           v

  const DEBUG = 0;
  if(!DEBUG){
  // define your components
  const primaryPromptText1 = api.addNode("text/string", {id:'primaryPromptText1', string: "Nostromo", x:100, y:100});
  const primaryPromptText2 = api.addNode("text/string", {id:'primaryPromptText2', string: "Project 23", x:100, y:300});
  const secondaryPromptText = api.addNode("text/string", {id:'secondaryPromptText', string: "USS Enterprise NCC-1701", x:100, y:600});

  const stringC = api.addNode("text/string", {id:'stringC', string: "Meow!", x:100, y:800});

  const midjourneyPrompt = api.addNode("midjourney/prompt", {id:'midjourneyPrompt', weird: 10, x:500, y:300});

  const domWrite = api.addNode("dom/write", {id:'domWrite', x:800, y:300});

  // create a flow between compoents
  api.linkPorts(primaryPromptText1, midjourneyPrompt);
  api.linkPorts(primaryPromptText2, midjourneyPrompt);
  api.linkPorts(secondaryPromptText, midjourneyPrompt, {input:'secondary'});
  api.linkPorts(midjourneyPrompt, domWrite);


  // execute your program;
  const result = await api.execute(domWrite);
  console.log('usage.js api.execute said: ', domWrite);

  // tst
  const actual = JSON.stringify(result);
  const expect = JSON.stringify(['Hello', 'World']);
  // console.assert(actual==expect, `./src/usage.js: Yay! the program failed to execute correctly, expected ${expect} but got "${actual}" instead.`);


  const rerun = async function(){

    if(app.Selection.size() == 0){
      alert('Select a node to execute')
    }

    app.Selection.filter(item=>item.kind=='Node').forEach(async ({id})=>{
      const node = app.Nodes.get(id);
      const result = await api.execute(node);
      console.log('usage.js RERUN api.execute said: ', result);
      console.log( api.save() );
    });




  }
  const button = document.getElementById('rerun');
  button.addEventListener('click', ()=>rerun())

  // app.Nodes.forEach(o=>o.monitor(()=>rerun()));

  // app.Connectors.observe('created', rerun, false)
  // app.Connectors.observe('removed', rerun, false)

  }else{
    // const testJunction = api.addJunction({x:50, y:50});
    const stringA = api.addNode("text/string", { string: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } );
  }


}
