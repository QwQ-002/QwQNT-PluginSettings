import templateMap from './templateBuilder';
import style from './static/style.css?raw';

class SettingElementStyleSheetsClass {
	#styleSheets: CSSStyleSheet[] = [];
	#callbacks: Function[] = [];

	set styleSheets(value: CSSStyleSheet[]){
		this.#styleSheets = value;

		for(const callback of this.#callbacks){
			callback(this.#styleSheets);
		}
	};

	get styleSheets(){
		return this.#styleSheets;
	};

	on(callback: Function){
		this.#callbacks.push(callback);

		callback(this.#styleSheets);
	};
};

Object.defineProperty(globalThis, 'SettingElementStyleSheets', {
	value: SettingElementStyleSheetsClass,
});

const SettingElementStyleSheets = new SettingElementStyleSheetsClass();

class SettingElementBase extends HTMLElement {
	_template: HTMLTemplateElement;
	_content: Node;
	_slot: HTMLSlotElement;

	constructor(element_id){
		super();

		this.attachShadow({ mode: 'open' });
		this._template = templateMap.get(element_id)!;
		this._content = this._template.content.cloneNode(true);
		this.shadowRoot!.append(this._content);
		this._slot = this.shadowRoot!.querySelector('slot')!;
		SettingElementStyleSheets.on((styleSheets) => {
			this.shadowRoot!.adoptedStyleSheets = styleSheets;
		});
	};
	attributeChangedCallback(){
		this.update();
	};
	update(){
		return;
	};
};

SettingElementStyleSheets.styleSheets = [await new CSSStyleSheet().replace(style)];


customElements.define('setting-section', class extends SettingElementBase {
	static observedAttributes = ['data-title'];
	_title: HTMLHeadingElement;

	constructor(){
		super('setting-section');

		this._title = this.shadowRoot!.querySelector('h1')!;
		this.update();
	};
	update(){
		this._title.textContent = this.dataset['title']!;
	};
});


customElements.define('setting-panel', class extends SettingElementBase {
	constructor(){
		super('setting-panel');
	};
});


customElements.define('setting-list', class extends SettingElementBase {
	static observedAttributes = ['data-title', 'data-direction', 'is-collapsible', 'is-active', 'is-disabled'];
	_head: HTMLElement;
	_title: HTMLHeadingElement;

	constructor(){
		super('setting-list');

		this._head = this.shadowRoot!.querySelector('setting-item') as HTMLElement;
		this._title = this.shadowRoot!.querySelector('h2')!;
		this._slot = this.shadowRoot!.querySelector('slot')!;
		this._head.addEventListener('click', () => {
			this.toggleAttribute('is-active');
		});

		this.update();

		new MutationObserver((_, observer) => {
			observer.disconnect();
			this.update();
			observer.observe(this, { childList: true });
		}).observe(this, { childList: true });
	};
	update(){
		this._title.textContent = this.dataset['title']!;
		const slot_children = this._slot.assignedElements();
		this.querySelectorAll('setting-divider').forEach(node => node.remove());
		// 折叠列表
		if(this.hasAttribute('is-collapsible')){
			this._head.classList.toggle('hidden', false);
			slot_children.forEach((node, index) => {
				const setting_divider = document.createElement('setting-divider');
				if(this.dataset['direction'] == 'column'){
					setting_divider.dataset['direction'] = 'row';
					(node as HTMLElement).dataset['direction'] = 'row';
				}
				if(index < slot_children.length) node.before(setting_divider);
			});
		}
		// 普通列表
		else{
			this._head.classList.toggle('hidden', true);
			slot_children.forEach((node, index) => {
				const setting_divider = document.createElement('setting-divider');
				if(this.dataset['direction'] == 'column'){
					setting_divider.dataset['direction'] = 'row';
					(node as HTMLElement).dataset['direction'] = 'row';
				}
				if(this.dataset['direction'] == 'row'){
					setting_divider.dataset['direction'] = 'column';
					(node as HTMLElement).dataset['direction'] = 'column';
				}
				if(index + 1 < slot_children.length) node.after(setting_divider);
			});
		}
	};
});


customElements.define('setting-item', class extends SettingElementBase {
	static observedAttributes = ['data-direction'];

	constructor(){
		super('setting-item');
	};
});


customElements.define('setting-select', class extends SettingElementBase {
	static observedAttributes = ['is-disabled'];
	_title: HTMLInputElement;
	_button: HTMLDivElement;
	_context: HTMLUListElement;

	constructor(){
		super('setting-select');
		this._title = this.shadowRoot!.querySelector('input')!;
		this._button = this.shadowRoot!.querySelector('.menu-button')!;
		this._context = this.shadowRoot!.querySelector('ul')!;

		const pointerup = (event: PointerEvent) => {
			if((event.target as HTMLElement).tagName != 'SETTING-SELECT') click();
		};

		const click = () => {
			this._context.classList.toggle('hidden');
			if(!this._context.classList.contains('hidden')){
				window.addEventListener('pointerup', pointerup);
				this._context.style.width = getComputedStyle(this).getPropertyValue('width');
			}
			else{
				window.removeEventListener('pointerup', pointerup);
				this._context.style.removeProperty('width');
			}
		};

		this._button.addEventListener('click', click);
		this._context.addEventListener('click', event => {
			if((event.target as HTMLElement).tagName == 'SETTING-OPTION' && !(event.target as HTMLElement).hasAttribute('is-selected')){
				for (const node of this.querySelectorAll('setting-option[is-selected]')) {
					node.toggleAttribute('is-selected');
				}
				(event.target as HTMLElement).toggleAttribute('is-selected');
				this._title.value = (event.target as HTMLElement).textContent!;
				this.dispatchEvent(new CustomEvent('selected', {
					bubbles: true,
					composed: true,
					detail: {
						name: (event.target as HTMLElement).textContent,
						value: (event.target as HTMLElement).dataset['value'],
					},
				}));
			}
		});
		(this._title.value as string | null | undefined) = this.querySelector('setting-option[is-selected]')?.textContent;
	};
});


customElements.define('setting-option', class extends SettingElementBase {
	static observedAttributes = ['data-value', 'is-selected', 'is-disabled'];

	constructor(){
		super('setting-option');
	};
});


customElements.define('setting-switch', class extends SettingElementBase {
	static observedAttributes = ['is-active', 'is-disabled'];

	constructor(){
		super('setting-switch');
	};
});


customElements.define('setting-button', class extends SettingElementBase {
	static observedAttributes = ['data-type', 'is-disabled'];

	constructor(){
		super('setting-button');
	};
});


customElements.define('setting-text', class extends SettingElementBase {
	static observedAttributes = ['data-type'];

	constructor(){
		super('setting-text');
	};
});


customElements.define('setting-link', class extends SettingElementBase {
	static observedAttributes = ['data-value'];

	constructor(){
		super('setting-link');

		this.addEventListener('click', () => {
			if(this.dataset['value']) window.open(this.dataset['value']);
		});
	};
});


customElements.define('setting-divider', class extends SettingElementBase {
	static observedAttributes = ['data-direction'];

	constructor(){
		super('setting-divider');
	};
});


customElements.define('setting-modal', class extends SettingElementBase {
	static observedAttributes = ['data-title', 'is-active'];
	_title: HTMLDivElement;
	_close: SVGElement;
	_modal: HTMLDivElement;

	constructor(){
		super('setting-modal');
		this._title = this.shadowRoot!.querySelector('.title')!;
		this._close = this.shadowRoot!.querySelector('.close')!;
		this._modal = this.shadowRoot!.querySelector('.modal')!;
		this._close.addEventListener('click', () => this.toggleAttribute('is-active'));
		this._modal.addEventListener('click', () => this.toggleAttribute('is-active'));
		this.update();
	};
	update() {
		this._title.textContent = this.dataset['title']!;
	};
});