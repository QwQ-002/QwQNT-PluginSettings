import { BaseElement } from '../element';

export class Section extends BaseElement {
  _title: HTMLHeadingElement;

  constructor(){
    super();
    this._title = this.shadowRoot!.querySelector('h1')!;
  };

  getTemplate(){
    return /*html*/ `
      <h1></h1>
      <slot></slot>
    `;
  };

  getStyles(){
    return /*css*/ `
      h1 {
        color: var(--text_primary);
        font-weight: var(--font-bold);
        font-size: min(var(--font_size_3), 18px);
        line-height: min(var(--line_height_3), 24px);
        padding: 0px 16px;
        margin-top: 0;
        margin-bottom: 8px;
      }
    `;
  };

  update(){
    this._title.textContent = this.getTitle();
  };
};