const SVG_NS = "http://www.w3.org/2000/svg";

export class IconFall extends HTMLElement {
	#observer;
	#rendered = false;

	static tagName = "icon-fall";

	static attrs = {
		count: "count", // default: 100
	};

	static props = {
		colors: "--icon-fall-colors", // comma-separated list of colors
		size: "--icon-fall-size", // default: 2em
	};

	static observedAttributes = Object.values(this.attrs);

	static define(registry = globalThis.customElements) {
		if(registry.get(this.tagName)) { // no-op on duplicate
			return;
		}
		registry.define(this.tagName, this);
	}

	static random(min, max) {
		return min + Math.floor(Math.random() * (max - min) + 1);
	}

	static ctm() {
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		return "replaceSync" in CSSStyleSheet.prototype;
	}

	// Comma-separated list, ignoring commas inside functions e.g. rgb(0, 0, 0)
	static splitList(value) {
		let values = [];
		let current = "";
		let depth = 0;
		for(let chr of value || "") {
			if(chr === "(") {
				depth++;
			} else if(chr === ")") {
				depth--;
			} else if(chr === "," && depth === 0) {
				values.push(current);
				current = "";
				continue;
			}
			current += chr;
		}
		values.push(current);
		return values.map(value => value.trim()).filter(Boolean);
	}

	static generateCss(count, colors) {
		let css = [];
		css.push(`
:host {
	--_icon-fall-size: var(${IconFall.props.size}, 2em);
	position: fixed;
	inset: 0;
	pointer-events: none;
}
.icons > * {
	position: absolute;
	display: block;
	font-size: var(--_icon-fall-size);
	width: 1em;
	height: 1em;
	line-height: 1;
	text-align: center;
	overflow: visible;
	top: -1em;
	animation: icon-fall linear infinite;
}
.icons svg {
	fill: currentColor;
}
/* Animating translate gets culled by Chrome’s compositor, leaving parts of the viewport empty. */
@keyframes icon-fall {
	to {
		top: 100%;
	}
}`);

		let colorsArray = IconFall.splitList(colors);

		// Thank you @alphardex: https://codepen.io/alphardex/pen/dyPorwJ
		for(let j = 1; j <= count; j++) {
			let x = IconFall.random(0, 100) / 100;
			let scale = (IconFall.random(60, 100) * .01).toFixed(2);
			let duration = IconFall.random(20, 50);
			// Spread start points across the full cycle so icons don’t fall in waves.
			let delay = -(Math.random() * duration).toFixed(2);
			let opacity = IconFall.random(50, 100) * .01;

			css.push(`
.icons > :nth-child(${j}) {
	color: ${colorsArray[(j - 1) % colorsArray.length] || "inherit"};
	opacity: ${opacity};
	left: calc((100% - 1em) * ${x});
	scale: ${scale};
	animation-duration: ${duration}s;
	animation-delay: ${delay}s;
}`);
		}
		return css.join("\n");
	}

	// Font Awesome web font CSS must also be in the shadow root.
	static getStylesheetNodes() {
		return Array.from(document.querySelectorAll(`link[rel="stylesheet"], style`)).filter(node => {
			if(node.localName === "link") {
				return /font-?awesome/i.test(node.href);
			}
			return node.textContent.includes("Font Awesome");
		}).map(node => node.cloneNode(true));
	}

	constructor() {
		super();

		if(!IconFall.ctm()) {
			return;
		}

		this.attachShadow({ mode: "open" });
	}

	get icons() {
		return Array.from(this.children).filter(el => !el.matches("script, style, template"));
	}

	// Copy same-document sprite symbols (e.g. from @11ty/font-awesome) into the shadow root.
	getSpriteSymbols(icons) {
		let root = this.getRootNode();
		let ids = new Set();
		for(let icon of icons) {
			for(let use of icon.querySelectorAll("use")) {
				let href = use.getAttribute("href") || use.getAttribute("xlink:href");
				if(href?.startsWith("#")) {
					ids.add(href.slice(1));
				}
			}
		}

		let symbols = [];
		for(let id of ids) {
			let symbol = root.getElementById?.(id) || document.getElementById(id);
			if(symbol) {
				symbols.push(symbol.cloneNode(true));
			}
		}
		return symbols;
	}

	render() {
		if(!this.shadowRoot) {
			return;
		}

		let count = parseInt(this.getAttribute(IconFall.attrs.count), 10) || 100;
		let icons = this.icons;

		let sheet = new CSSStyleSheet();
		let colors = getComputedStyle(this).getPropertyValue(IconFall.props.colors);
		sheet.replaceSync(IconFall.generateCss(count, colors));
		this.shadowRoot.adoptedStyleSheets = [sheet];

		let nodes = [];

		// Anything other than an <svg> is assumed to be a web font icon.
		if(icons.some(icon => icon.namespaceURI !== SVG_NS)) {
			nodes.push(...IconFall.getStylesheetNodes());
		}

		let sprites = document.createElementNS(SVG_NS, "svg");
		sprites.style.display = "none";
		sprites.append(...this.getSpriteSymbols(icons));
		nodes.push(sprites);

		let wrapper = document.createElement("div");
		wrapper.className = "icons";
		wrapper.setAttribute("aria-hidden", "true");
		if(icons.length) {
			for(let j = 0; j < count; j++) {
				wrapper.appendChild(icons[j % icons.length].cloneNode(true));
			}
		}
		nodes.push(wrapper);

		this.shadowRoot.replaceChildren(...nodes);
		this.#rendered = true;
		this.setAttribute("ready", "");
	}

	connectedCallback() {
		if(!this.shadowRoot) {
			return;
		}

		if(!this.#rendered) {
			this.render();
		}

		// Font Awesome SVG+JS replaces <i> elements with <svg> asynchronously.
		this.#observer ??= new MutationObserver(() => this.render());
		this.#observer.observe(this, { childList: true, subtree: true });
	}

	disconnectedCallback() {
		this.#observer?.disconnect();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(this.#rendered && oldValue !== newValue) {
			this.render();
		}
	}
}

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
	IconFall.define();
}
