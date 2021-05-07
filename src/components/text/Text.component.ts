import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type TextSize = "xs" | "small" | "s" | "normal" | "l" | "xl" | "xxl";
type TextVariant =
  | "contrast"
  | "low"
  | "default"
  | "normal"
  | "primary"
  | "secondary";
type TextWeight = "thin" | "default" | "normal" | "bold";

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

  @property({ type: String })
  for?: string;

  @property({ type: String })
  size: TextSize = "normal";

  @property({ type: String })
  variant: TextVariant = "default";

  @property({ type: String })
  weight: TextWeight = "default";

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
      .size-xs {
        font-size: var(--text-xs);
      }
      .size-small,
      .size-s {
        font-size: var(--text-sm);
      }
      .size-l {
        font-size: var(--text-l);
      }
      .size-xl {
        font-size: var(--text-xl);
      }
      .size-xxl {
        font-size: var(--text-xxl);
      }
      .variant-low {
        color: var(--light-grey);
      }
      .variant-normal {
        color: var(--text-color);
      }
      .variant-primary {
        color: var(--primary);
      }
      .variant-secondary {
        color: var(--secondary);
      }
      .variant-constrast {
        color: var(--text-color-contrast);
      }
      .weight-thin {
        font-weight: 300;
      }
      .weight-normal {
        font-weight: 400;
      }
      .weight-bold {
        font-weight: bold;
      }
    `;
  }

  render() {
    const template = `
      <${this.tag} for="${this.for ? this.for : ""}" class="size-${
      this.size
    } variant-${this.variant} weight-${this.weight}" >
        <slot></slot>
      </${this.tag}>
    `;

    return html` ${unsafeHTML(template)} `;
  }
}
