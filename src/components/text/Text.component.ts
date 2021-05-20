import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map";
import { literal, html } from "lit/static-html.js";

/**
 * `atelier-text`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-text")
export class AtelierElement extends LitElement {
  tag = literal`span`;

  @property({ type: String })
  for?: string;

  @property({ type: String })
  size: TextSize = "m";

  @property({ type: String })
  variant: TextVariant = "default";

  @property({ type: String })
  weight: TextWeight = "normal";

  static styles = css`
    p ::slotted(*),
    quote ::slotted(*),
    label ::slotted(*),
    span ::slotted(*) {
      font-size: var(--text-m);
      margin-top: 0;
      font-family: var(--font-secondary);
    }
    /* SIZE */
    .xs ::slotted(*) {
      font-size: var(--text-xs);
    }
    .small ::slotted(*),
    .s ::slotted(*) {
      font-size: var(--text-sm);
    }
    .m ::slotted(*) {
      font-size: var(--text-m);
    }
    .l ::slotted(*) {
      font-size: var(--text-l);
    }
    .xl ::slotted(*) {
      font-size: var(--text-xl);
    }
    .xxl ::slotted(*) {
      font-size: var(--text-xxl);
    }
    /* COLOR */
    .low ::slotted(*) {
      color: var(--light-grey);
    }
    .default ::slotted(*) {
      color: var(--text-color);
    }
    .primary ::slotted(*) {
      color: var(--primary);
    }
    .secondary ::slotted(*) {
      color: var(--secondary);
    }
    .contrast ::slotted(*) {
      color: var(--text-color-contrast);
    }
    /* WEIGHT */
    .thin ::slotted(*) {
      font-weight: 300;
    }
    .normal ::slotted(*) {
      font-weight: 400;
    }
    .bold ::slotted(*) {
      font-weight: 600;
    }
  `;

  get classes() {
    return { [this.variant]: true, [this.weight]: true, [this.size]: true };
  }

  render() {
    return html`<${this.tag}
      for="${this.for ?? ""}"
      class=${classMap(this.classes)}
    >
      <slot></slot>
    </${this.tag}>`;
  }
}

@customElement("atelier-h1")
export class AtelierH1 extends AtelierElement {
  tag = literal`h1`;

  @property({ type: String })
  size: TextSize = "xxl";

  static get styles() {
    return [
      super.styles,
      css`
        h1,
        h2,
        h3,
        h4 {
          display: block;
          margin-top: 0;
          font-family: var(--font-primary);
          line-height: var(--heading-line-height);
          color: var(--text-color-heading) !important;
        }
      `,
    ];
  }
}
@customElement("atelier-h2")
export class AtelierH2 extends AtelierH1 {
  tag = literal`h2`;

  @property({ type: String })
  size: TextSize = "xl";
}
@customElement("atelier-h3")
export class AtelierH3 extends AtelierH1 {
  tag = literal`h3`;

  @property({ type: String })
  size: TextSize = "l";
}
@customElement("atelier-h4")
export class AtelierH4 extends AtelierH1 {
  tag = literal`h4`;

  @property({ type: String })
  size: TextSize = "m";
}
@customElement("atelier-p")
export class AtelierP extends AtelierElement {
  tag = literal`p`;
}
@customElement("atelier-quote")
export class AtelierQuote extends AtelierElement {
  tag = literal`quote`;

  static get styles() {
    return [
      super.styles,
      css`
        quote {
          font-style: italic;
        }
      `,
    ];
  }
}
