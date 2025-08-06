import { BaseElement } from '../element';

export class Link extends BaseElement {
  constructor(){
    super();
    this.addEventListener('click', () => {
      if(this.getValue()){
        PluginSettings.renderer.openExternal(this.getValue()!);
      }
    });
  };

  getTemplate(){
    return /*html*/ `
      <slot></slot>
    `;
  };

  getStyles(){
    return /*css*/ `
      :host {
        color: var(--text_link);
        cursor: pointer;
      }
    `;
  };
};