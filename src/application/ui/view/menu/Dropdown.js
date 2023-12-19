import Component from "./Component.js";

export default class Dropdown extends Component {

	constructor(...args) {
		super(...args);
	}
	setup() {


		this.el.navItemDropdown = document.createElement('li');
		this.el.navItemDropdown.setAttribute('class', 'nav-item dropdown');


		const navLinkDropdownToggle = document.createElement('a');
		navLinkDropdownToggle.setAttribute('class', 'nav-link dropdown-toggle');
		navLinkDropdownToggle.setAttribute('href', '#');
		navLinkDropdownToggle.setAttribute('role', 'button');
		navLinkDropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
		navLinkDropdownToggle.setAttribute('aria-expanded', 'false');
		this.el.navItemDropdown.appendChild(navLinkDropdownToggle);

		const text = document.createTextNode(this.name);
		navLinkDropdownToggle.appendChild(text);

		const dropdownMenu = document.createElement('ul');
		dropdownMenu.setAttribute('class', 'dropdown-menu');
		this.el.navItemDropdown.appendChild(dropdownMenu);



		this.view.application.Archetypes.forEach(typeObject=>{


      const listItem = document.createElement('li');
  		dropdownMenu.appendChild(listItem);

  		const dropdownItem = document.createElement('div');
  		dropdownItem.setAttribute('class', 'dropdown-item');
  		listItem.appendChild(dropdownItem);

  		const text2 = document.createTextNode(typeObject.type);
  		dropdownItem.appendChild(text2);

      dropdownItem.addEventListener('click', ()=>{
		    this.view.application.Dream.addNode(typeObject.type);
		  });


		})
	}
	render(container) {
		container.appendChild(this.el.navItemDropdown);

		// render dropdowns into navbarNavContainer
		// this.children.filter(instance => instance instanceof Dropdown).map(child => child.render(this.el.navbarNavContainer))
	}

}
