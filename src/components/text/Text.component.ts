import { html, LitElement, css, customElement, property } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

/**
 * `atelier-text`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-text")
export default class AtelierElement extends LitElement {
  @property({ type: String })
  tag = "p";

  static get styles() {
    return css`
      h1 {
        font-size: var(--text-xxl);
      }
      h2 {
        font-size: var(--text-xl);
      }
      h3 {
        font-size: var(--text-l);
      }
      h4 {
        font-size: var(--text-m);
      }
      h1,
      h2,
      h3,
      h4 {
        margin-top: 0;
        margin-bottom: var(--xxs);
        font-family: var(--font-primary);
        line-height: var(--heading-line-height);
        color: var(--text-color-heading);
      }
      p,
      quote,
      span {
        margin-top: 0;
        font-family: var(--font-secondary);
      }
    `;
  }

  render() {
    const template = `
      <${this.tag}>
        <slot></slot>
      </${this.tag}>
    `;

    return html`
      ${unsafeHTML(template)}
    `;
  }
}
