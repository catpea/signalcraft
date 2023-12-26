export default class Standard {

	node;
	application;


	constructor(node) {

		this.node = node;
		this.application = node.application;



	}

	async #upstream() {
		const response = {};

		for(const localPort of this.node.Input) {
			// NOTE: edges do not link nodes, they link ports
			// NOTE: there can be multiple reply ports pointing to the input port, therefore array is used
			response[localPort.name] = [];
			// find links that have target set to inputProperty.id
			const incomingConnectors = this.application.Connectors.filter(remoteConnector => remoteConnector.targetPort == localPort.id);
			const nothingConnected = incomingConnectors.length == 0;

			if(nothingConnected) {
				let currentValue = localPort.value; // DEFAULT VALUE
				if(this.node[localPort.name]) currentValue = this.node[localPort.name] // USER PRESET/OVVERIDE
				response[localPort.name].push(currentValue);
			} else {
				for(const incomingConnector of incomingConnectors) {
					// get their parent node,

					const parentNode = (incomingConnector.sourceType=='Junction'?this.application.Junctions:this.application.Nodes).find(node => node.id == incomingConnector.sourceNode);
					const connectedPort = parentNode.Output.find(item => item.id == incomingConnector.sourcePort);
					// and get them ran (parent node is requred as it pnows the properties the funcion needs)
					const result = await parentNode.Execute.run(connectedPort.name);
					response[localPort.name].push(result);
				}
			}


		}
		return response;
	}

	async run(port) {
		const outputPort = this.node.Output.find(item => item.id == port);
		if(!outputPort) throw new Error(`Port id ${port} was not found on node of type ${this.node.type}`);
		const response = {}// await outputPort.generator({ ...await this.#upstream(), value: outputPort.value })
		return response;
	}

}
