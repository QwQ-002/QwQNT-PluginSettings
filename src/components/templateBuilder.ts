const sectionBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-section';

	const h1 = document.createElement('h1');
	const slot = document.createElement('slot');

	template.content.append(h1, slot);

	return template;
};

const panelBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-panel';

	const slot = document.createElement('slot');

	template.content.append(slot);

	return template;
};

const itemBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-item';

	const slot = document.createElement('slot');

	template.content.append(slot);

	return template;
};

const listBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-list';

	const item = document.createElement('setting-item');
	item.setAttribute('data-direction', 'row');
	item.classList.add('hidden');

	const h2 = document.createElement('h2');

	item.append(h2);
	item.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M21 8L12 17L3 8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
</svg>`);

	const slot = document.createElement('slot');

	template.content.append(item, slot);

	return template;
};

const optionBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-option';

	const li = document.createElement('li');

	const span = document.createElement('span');

	const slot = document.createElement('slot');

	span.append(slot);

	li.append(span);
	li.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M2 7L6.00001 11L14 3" stroke="currentColor" stroke-linejoin="round"></path>
</svg>`);

	template.content.append(li);

	return template;
};

const selectBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-select';

	const selectDiv = document.createElement('div');
	selectDiv.classList.add('select');

	const menuButtonDiv = document.createElement('div');
	menuButtonDiv.classList.add('menu-button');

	const input = document.createElement('input');
	input.type = 'text';
	input.readOnly = true;
	input.spellcheck = false;
	input.placeholder = '请选择';

	const ul = document.createElement('ul');
	ul.classList.add('hidden');

	const slot = document.createElement('slot');

	menuButtonDiv.append(input);
	menuButtonDiv.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round"></path>
</svg>`);
	ul.append(slot);

	selectDiv.append(menuButtonDiv, ul);

	template.content.append(selectDiv);

	return template;
};

const switchBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-switch';

	const span = document.createElement('span');

	const slot = document.createElement('slot');

	span.append(slot);

	template.content.append(span);

	return template;
};

const buttonBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-button';

	const button = document.createElement('button');

	const slot = document.createElement('slot');

	button.append(slot);

	template.content.append(button);

	return template;
};

const textBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-text';

	const slot = document.createElement('slot');

	template.content.append(slot);

	return template;
};

const linkBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-link';

	const slot = document.createElement('slot');

	template.content.append(slot);

	return template;
};

const dividerBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-divider';

	const slot = document.createElement('slot');

	template.content.append(slot);

	return template;
};

const modalBuilder = () => {
	const template = document.createElement('template');
	template.id = 'setting-modal';

	const modalDiv = document.createElement('div');
	modalDiv.classList.add('modal');
	const mainDiv = document.createElement('div');
	mainDiv.classList.add('main');

	const containerDiv = document.createElement('div');
	containerDiv.classList.add('container');

	const headerDiv = document.createElement('div');
	headerDiv.classList.add('header');
	const bodyDiv = document.createElement('div');
	bodyDiv.classList.add('body');

	const titleDiv = document.createElement('div');
	titleDiv.classList.add('title');

	headerDiv.append(titleDiv);
	headerDiv.insertAdjacentHTML('beforeend', `<svg class="close" viewBox="0 0 24 24">
	<use href="/_upper_/resource/icons/close_24.svg#close_24"></use>
</svg>`);

	const slot = document.createElement('slot');

	bodyDiv.append(slot);

	containerDiv.append(headerDiv, bodyDiv);

	mainDiv.append(containerDiv);

	template.content.append(modalDiv, mainDiv);

	return template;
};

const templateMap = new Map<string, HTMLTemplateElement>([
	['setting-section', sectionBuilder()],
	['setting-panel', panelBuilder()],
	['setting-item', itemBuilder()],
	['setting-list', listBuilder()],
	['setting-select', selectBuilder()],
	['setting-option', optionBuilder()],
	['setting-switch', switchBuilder()],
	['setting-button', buttonBuilder()],
	['setting-text', textBuilder()],
	['setting-link', linkBuilder()],
	['setting-divider', dividerBuilder()],
	['setting-modal', modalBuilder()],
]);

export default templateMap;