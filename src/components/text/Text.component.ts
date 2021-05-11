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
    p,
    quote,
    label,
    span {
      font-size: var(--text-m);
      margin-top: 0;
      font-family: var(--font-secondary);
    }
    /* SIZE */
    .xs {
      font-size: var(--text-xs);
    }
    .small,
    .s {
      font-size: var(--text-sm);
    }
    .m {
      font-size: var(--text-m);
    }
    .l {
      font-size: var(--text-l);
    }
    .xl {
      font-size: var(--text-xl);
    }
    .xxl {
      font-size: var(--text-xxl);
    }
    /* COLOR */
    .low {
      color: var(--light-grey);
    }
    .default {
      color: var(--text-color);
    }
    .primary {
      color: var(--primary);
    }
    .secondary {
      color: var(--secondary);
    }
    .contrast {
      color: var(--text-color-contrast);
    }
    /* WEIGHT */
    .thin {
      font-weight: 300;
    }
    .normal {
      font-weight: 400;
    }
    .bold {
      font-weight: 700;
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
      `,
    ];
  }
}
@customElement("atelier-h2")
export class AtelierH2 extends AtelierH1 {
  tag = literal`h2`;
}
@customElement("atelier-h3")
export class AtelierH3 extends AtelierH1 {
  tag = literal`h3`;
}
@customElement("atelier-h4")
export class AtelierH4 extends AtelierH1 {
  tag = literal`h4`;
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
