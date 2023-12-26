export default class Standard {

	node;
	application;

	constructor(node) {
		this.node = node;
		this.application = node.application;
	}

	async resolve() {
		const response = {};

		for(const localPort of this.node.Input) {
			// NOTE: edges do not link nodes, they link ports
			// NOTE: there can be multiple reply ports pointing to the input port, therefore array is used
			response[ localPort.id ] = [];
			// find links that have target set to inputProperty.id
			const incomingConnectors = this.application.Connectors.filter(remoteConnector => remoteConnector.targetNode==this.node.id && remoteConnector.targetPort==localPort.id );
			const nothingConnected = incomingConnectors.length == 0;
			if(nothingConnected) {
				let currentValue = localPort.value; // DEFAULT VALUE
				if(this.node[localPort.id]) currentValue = this.node[localPort.id] // USER PRESET/OVVERIDE
				response[localPort.id].push(currentValue);
			} else {

				for(const incomingConnector of incomingConnectors) {
					// get their parent node,
					const parentNode = (incomingConnector.sourceType=='Junction'?this.application.Junctions:this.application.Nodes).find(node => node.id == incomingConnector.sourceNode);
					if(!parentNode) continue;
					const connectedPort = parentNode.Output.find(item => item.id == incomingConnector.sourcePort);
					// and get them ran (parent node is requred as it pnows the properties the funcion needs)
					let result;
					result = await parentNode.Execute.run(connectedPort.id);
					response[localPort.id].push(result);
				}
			}
		}
		return response;
	}

	async run(outputPortId){
		console.log(`${this.infiniteLoop}: Execute Upstream starting with ${this.node.id}/${outputPortId}`);
		const outputPort = this.node.Output.find(item => item.id == outputPortId)
		if(!outputPort) throw new Error(`Port id ${outputPortId} was not found on node of type ${this.node.type}`);
		const response = await outputPort.program({ ...await this.resolve(), value: outputPort.value })
		return response;
	}

}
