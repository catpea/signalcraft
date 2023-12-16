import { html, svg, text, list, update, id } from "domek";

import Component from "./Component.js";

export default class Offcanvas extends Component {

	defaults = {
		location: 'start',
	};

	constructor(...args) {
		super(...args);
	}

	setup() {

		this.el.NavItem = html.li({class: 'nav-item'});

		const navLink = html.a({
			class: 'nav-link',
			href: '#',
			dataBsToggle:'offcanvas',
			dataBsTarget:'#'+id(this.id),
			ariaControls: id(this.id),
		});
		this.el.NavItem.appendChild(navLink);

		const text0 = text(this.name);
		navLink.appendChild(text0);

		this.el.Offcanvas = html.div({
			id: id(this.id),
			class: `offcanvas offcanvas-${this.options.location}`,
			dataBsScroll: 'true',
			dataBsBackdrop: 'false',
			tabindex: '-1',
			ariaLabelledby: 'offcanvasScrollingLabel'
		});

		const offcanvasHeader = html.div({ class: 'offcanvas-header' });
		this.el.Offcanvas.appendChild(offcanvasHeader);

		const offcanvasTitle = html.h5({ class: 'offcanvas-title', id: 'offcanvasScrollingLabel' });
		offcanvasHeader.appendChild(offcanvasTitle);

		const text1 = text(this.name);
		offcanvasTitle.appendChild(text1);

		const btnClose = html.button({ type: 'button', class: 'btn-close', dataBsDismiss: 'offcanvas', ariaLabel: 'Close' });
		offcanvasHeader.appendChild(btnClose);

		const offcanvasBody = html.div({ class: 'offcanvas-body' });
		this.el.Offcanvas.appendChild(offcanvasBody);


		this.view.application.Types.forEach(typeObject => {

			const p = html.p();
			offcanvasBody.appendChild(p);

			const text2 = text(typeObject.type);
			p.appendChild(text2);

			p.addEventListener('click', () => {
				this.view.application.Dream.addNode(typeObject.type);
			});


		})
	}
	render(container) {
		container.appendChild(this.el.NavItem);
		this.view.element.appendChild(this.el.Offcanvas);

		// render dropdowns into navbarNavContainer
		// this.children.filter(instance => instance instanceof Dropdown).map(child => child.render(this.el.navbarNavContainer))
	}

}
