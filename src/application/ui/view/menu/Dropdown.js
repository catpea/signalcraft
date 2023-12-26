import startCase from 'lodash/startCase';

import Component from "./Component.js";

import { html } from "domek";


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

		this.el.dropdownMenu = document.createElement('ul');
		this.el.dropdownMenu.setAttribute('class', 'dropdown-menu');
		this.el.navItemDropdown.appendChild(this.el.dropdownMenu);

		this.update();

	}

	render(container) {
		container.appendChild(this.el.navItemDropdown);
	}

	update(){
		this.el.dropdownMenu.replaceChildren();

		this.data.forEach(menuItem=>{

			if(typeof menuItem === 'string') {

				const listItem = html.li();
				this.el.dropdownMenu.appendChild(listItem);

				const dropdownDivider = html.hr({class:'dropdown-divider'});
				listItem.appendChild(dropdownDivider);

				return;
			}

			const listItem = document.createElement('li');
			this.el.dropdownMenu.appendChild(listItem);

			const dropdownItem = document.createElement('div');

			dropdownItem.classList.add('dropdown-item');
			if(menuItem.selected) dropdownItem.classList.add('active');

			listItem.appendChild(dropdownItem);

			const text2 = document.createTextNode(menuItem.caption);
			dropdownItem.appendChild(text2);

			dropdownItem.addEventListener('click', ()=>menuItem.program());

		})
	}

}
