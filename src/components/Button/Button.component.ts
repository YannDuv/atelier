import { html, LitElement, css, customElement, property } from 'lit-element';

/**
 * `atelier-button`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement('atelier-button')
export default class AtelierElement extends LitElement {

  @property({type: String})
  type = 'test';

  static get styles() {
    return css`
    button {
        background: var(--primary);
        color: var(--white);
    }
    `;
  }

  render() {
    return html`
      <button type="${this.type}">
        <slot></slot>
      </button>
    `;
  }
}
