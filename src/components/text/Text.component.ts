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
        margin-bottom: var(--md);
      }
      h2 {
        font-size: var(--text-xl);
        margin-bottom: var(--sm);
      }
      h3 {
        font-size: var(--text-l);
        margin-bottom: var(--xs);
      }
      h4 {
        font-size: var(--text-m);
        margin-bottom: var(--xxs);
      }
      h1,
      h2,
      h3,
      h4 {
        margin-top: 0;
        font-family: var(--font-primary);
        line-height: var(--heading-line-height);
        color: var(--text-color-heading);
      }
      p,
      quote,
      label,
      span {
        font-size: var(--text-m);
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
