import Component from "./Component.js";
import Dropdown from "./Dropdown.js";

export default class Navbar extends Component {

	constructor(...args) {
		super(...args);
	}

  setup(){
    this.el.Nav = document.createElement('nav');
		this.el.Nav.setAttribute('class', 'navbar navbar-expand-lg bg-body-tertiary');

		const div = document.createElement('div');
		div.setAttribute('class', 'container-fluid');
		this.el.Nav.appendChild(div);

		const a = document.createElement('a');
		a.setAttribute('class', 'navbar-brand');
		a.setAttribute('href', '#');
		div.appendChild(a);

		const text = document.createTextNode(this.name);
		a.appendChild(text);

		const button = document.createElement('button');
		button.setAttribute('class', 'navbar-toggler');
		button.setAttribute('type', 'button');
		button.setAttribute('data-bs-toggle', 'collapse');
		button.setAttribute('data-bs-target', '#navbarSupportedContent');
		button.setAttribute('aria-controls', 'navbarSupportedContent');
		button.setAttribute('aria-expanded', 'false');
		button.setAttribute('aria-label', 'Toggle navigation');
		div.appendChild(button);

		const span = document.createElement('span');
		span.setAttribute('class', 'navbar-toggler-icon');
		button.appendChild(span);

		const div2 = document.createElement('div');
		div2.setAttribute('class', 'collapse navbar-collapse');
		div2.setAttribute('id', 'navbarSupportedContent');
		div.appendChild(div2);

		this.el.navbarNavContainer = document.createElement('ul');
		this.el.navbarNavContainer.setAttribute('class', 'navbar-nav me-auto mb-2 mb-lg-0');
		div2.appendChild(this.el.navbarNavContainer);

		// const homeButton = document.createElement('li');
		// homeButton.setAttribute('class', 'nav-item');
		// this.el.navbarNavContainer.appendChild(homeButton);

		// const homeLink = document.createElement('a');
		// homeLink.setAttribute('class', 'nav-link active');
		// homeLink.setAttribute('aria-current', 'page');
		// homeLink.setAttribute('href', '#');
		// homeButton.appendChild(homeLink);
		// const text2 = document.createTextNode('Home');
		// homeLink.appendChild(text2);





		// const disabledExample = document.createElement('li');
		// disabledExample.setAttribute('class', 'nav-item');
		// this.el.navbarNavContainer.appendChild(disabledExample);

		// const a3 = document.createElement('a');
		// a3.setAttribute('class', 'nav-link disabled');
		// a3.setAttribute('aria-disabled', 'true');
		// disabledExample.appendChild(a3);

		// const text3 = document.createTextNode('Disabled');
		// a3.appendChild(text3);

		const form = document.createElement('form');
		form.setAttribute('class', 'd-flex');
		form.setAttribute('role', 'search');
		div2.appendChild(form);

		const input = document.createElement('input');
		input.setAttribute('class', 'form-control me-2');
		input.setAttribute('type', 'search');
		input.setAttribute('placeholder', 'Search');
		input.setAttribute('aria-label', 'Search');
		form.appendChild(input);

    this.children.map(child=>child.setup())
  }

  render(container){
    container.appendChild( this.el.Nav );

		// render dropdowns into navbarNavContainer
    this.children.filter(instance => instance instanceof Dropdown).map(child=>child.render(this.el.navbarNavContainer))
  }

}
