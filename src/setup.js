import flattenDeep from 'lodash/flattenDeep';
import head from 'lodash/head';

import nostromoTheme from './theme/nostromo/index.js';
import obsidianTheme from './theme/obsidian/index.js';

export default function(application) {

	application.Themes.create({ name: 'nostromo', theme: nostromoTheme });
	application.Themes.create({ name: 'obsidian', theme: obsidianTheme });

	{
		const testLayout = application.Archetypes.create({ type: 'test/layout' });
		testLayout.output.push({ id: "output1", program: ({ value, string }) => { return string } });
		testLayout.output.push({ id: "output2", program: ({ value, string }) => { return string } });
		testLayout.input.push({ id: "string1", type: "string", description: "a string of letters", value: "default value" });
		testLayout.input.push({ id: "string2", type: "string", description: "a string of letters", value: "default value" });
		testLayout.input.push({ id: "string3", type: "string", description: "a string of letters", value: "default value" });
	}

	const textType = application.Archetypes.create({ type: 'text/string' });
	textType.output.push({ id: "output", program: ({ value, string }) => { return string } });
	textType.input.push({ id: "string", type: "string", description: "a string of letters", value: "default value long thing" });

	const colorType = application.Archetypes.create({ type: 'text/color' });
	colorType.output.push({ id: "output", program: () => { return 'TODO' } });
	colorType.input.push({ id: "color", type: "string", description: "color" });
	colorType.input.push({ id: "model", type: "string", description: "preferred model" });
	colorType.input.push({ id: "description", type: "string", description: "description" });

	const uppercaseType = application.Archetypes.create({ type: 'text/case' });
	uppercaseType.output.push({ id: "upper", program: () => { return 'TODO' } });
	uppercaseType.output.push({ id: "lower", program: () => { return 'TODO' } });
	uppercaseType.input.push({ id: "input" });
	uppercaseType.input.push({ id: "template", type: "string", description: "string template use $input to interpolate" });
	uppercaseType.input.push({ id: "description", type: "string", description: "description" });

	const arrayJoinType = application.Archetypes.create({ type: 'array/join' });
	// arrayJoinType.output.push( {id:"output", program:({array, separator}) => { return array.join(separator); }} );
	arrayJoinType.output.push({
		id: "output",
		program: ({ input, separator }) => {
			return flattenDeep(input); //separator.length?input.join( separator.join()):input;
		}
	});
	arrayJoinType.input.push({ id: "input", type: "*", description: "data to join" });
	arrayJoinType.input.push({ id: "separator", type: "string", description: "separator to use" });
	arrayJoinType.input.push({ id: "duck", type: "string", description: "separator to use" });



	{
		const domWrite = application.Archetypes.create({ type: 'dom/write' });
		domWrite.output.push({
			id: "output",
			program: ({ input, target, }) => {
				const data = flattenDeep(input).join(', ');
				const targetId = head(flattenDeep(target));
				const elem = document.getElementById(targetId);
				elem.innerText = data;
				return flattenDeep(input); //separator.length?input.join( separator.join()):input;
			}
		});
		domWrite.input.push({ id: "input", type: "*", description: "data to join" });
		domWrite.input.push({ id: "target", type: "*", value: "output", description: "data to join" });
	}



	{
		const midjourneyPrompt = application.Archetypes.create({ type: 'midjourney/prompt' });

		midjourneyPrompt.output.push({
			id: "output",
			program: ({ input, secondary, separator }) => {
				return flattenDeep([input, secondary]); //separator.length?input.join( separator.join()):input;
			}
		});
		midjourneyPrompt.output.push({ id: "JSON", program: ({ value, string }) => { return string } });
		midjourneyPrompt.output.push({ id: "debug", program: ({ value, string }) => { return string } });
		midjourneyPrompt.output.push({ id: "log", program: ({ value, string }) => { return string } });

		midjourneyPrompt.input.push({ id: "input", type: "*", description: "data to join" });
		midjourneyPrompt.input.push({ id: "template", type: "*", description: "base template" });
		midjourneyPrompt.input.push({ id: "secondary", type: "*", description: "secondary characteristics" });
		midjourneyPrompt.input.push({ id: "styles", type: "string", description: "styles" });
		midjourneyPrompt.input.push({ id: "authors", type: "string", description: "authors", value: 'michael vrubel, valentin serov, kustodiev boris' });
		midjourneyPrompt.input.push({ id: "chaos", type: "string", description: "chaos" });
		midjourneyPrompt.input.push({ id: "aspectRatio", type: "string", description: "aspect-ratio" });
		midjourneyPrompt.input.push({ id: "style", type: "string", description: "style" });
		midjourneyPrompt.input.push({ id: "weird", type: "string", description: "weird" });
		midjourneyPrompt.input.push({ id: "version", type: "string", description: "version", value: '5.2' });
	}









}
