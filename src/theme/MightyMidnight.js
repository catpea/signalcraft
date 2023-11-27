import Box from './Box.js';

export default class MidnightTheme {

    captionHeight = 48;
    lineHeight = 32;
    gapHeight = 5;

    padding = 5;
    margin = 5;

    getNodeHeightFor(node){

      const main = new Box({w:300});

        const caption = new Box({h: this.captionHeight});
        const inputs = new Box();
        const outputs = new Box();

        main.append(caption)
        main.append(outputs); // append outputs first
        main.append(inputs);

         inputs.fill(node.Incoming.size(), {h: this.lineHeight} )
        outputs.fill(node.Outgoing.size(), {h: this.lineHeight} )

        main.finalCalculate();

        return {
          height:  main.totalHeight,
          inputs: inputs.children.map(o=>o.y),
          outputs: outputs.children.map(o=>o.y),
        }

    }

}
