import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";

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
export class AtelierElement extends LitElement {
  tag = literal`span`;

  @property({ type: String })
  for?: string;

  @property({ type: String })
  size: TextSize = "normal";

  @property({ type: String })
  variant: TextVariant = "default";

  @property({ type: String })
  weight: TextWeight = "default";

  static styles = css`
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
      display: block;
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

  render() {
    return html`<${this.tag}
      for="${this.for ?? ""}"
      class="size-${this.size} variant-${this.variant} weight-${this.weight}"
    >
      <slot></slot>
    </${this.tag}>`;
  }
}

@customElement("atelier-h1")
export class AtelierH1 extends AtelierElement {
  tag = literal`h1`;
}
@customElement("atelier-h2")
export class AtelierH2 extends AtelierElement {
  tag = literal`h2`;
}
@customElement("atelier-h3")
export class AtelierH3 extends AtelierElement {
  tag = literal`h3`;
}
@customElement("atelier-h4")
export class AtelierH4 extends AtelierElement {
  tag = literal`h4`;
}
@customElement("atelier-p")
export class AtelierP extends AtelierElement {
  tag = literal`p`;
}
@customElement("atelier-quote")
export class AtelierQuote extends AtelierElement {
  tag = literal`quote`;

  static styles = [
    super.styles,
    css`
      quote {
        font-style: italic;
      }
    `,
  ];
}
