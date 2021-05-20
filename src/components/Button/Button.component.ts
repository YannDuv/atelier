import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map";

function variantFromAttribute(value: string): ButtonVariant {
  if (value === "secondary") {
    return "secondary";
  }
  return "primary";
}

/**
 * `atelier-button`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-button")
export class ButtonElement extends LitElement {
  private hasKeyboardNav = false;

  @property({ type: String })
  type = "button";

  @property({ type: Boolean })
  disabled = false;

  @property({
    type: String,
    converter: {
      fromAttribute: variantFromAttribute,
    },
  })
  variant: ButtonVariant = "primary";

  static styles = css`
    button {
      flex: 0 1 60px;
      border-radius: var(--btn-border-radius);
      font-size: var(--text-m);
      padding: var(--btn-padding-vertical) var(--btn-padding-horizontal);
      transition: background-color 200ms ease, transform 100ms ease-in-out;
      cursor: pointer;
      outline: none;
    }
    button ::slotted(*) {
      font-weight: var(--btn-text-weight);
    }
    button:active {
      transform: scale(0.95) translateZ(-2px);
    }
    button:active ::slotted(*) {
      color: var(--btn-text-color-active);
    }
    button:disabled {
      background-color: var(--btn-bg-color-disabled);
      border: var(--btn-border-disabled);
    }
    button:disabled ::slotted(*) {
      color: var(--btn-text-color-disabled);
    }
    .btn--primary {
      background: var(--btn-bg-color-primary);
      border: var(--btn-border-primary);
    }
    .btn--primary:hover {
      background-color: var(--btn-bg-color-primary-hover);
    }
    .btn--primary:focus {
      border: var(--btn-border-primary-focus);
    }
    .btn--primary:active {
      background-color: var(--btn-bg-color-primary-active);
    }
    .btn--primary ::slotted(*) {
      color: var(--btn-text-color-primary);
    }
    .btn--secondary {
      background: var(--btn-bg-color-secondary);
      border: var(--btn-border-secondary);
    }
    .btn--secondary:hover {
      background-color: var(--btn-bg-color-secondary-hover);
      border: var(--btn-border-secondary-hover);
    }
    .btn--secondary:focus {
      border: var(--btn-border-secondary-focus);
    }
    .btn--secondary:active {
      background-color: var(--btn-bg-color-secondary-active);
      border: var(--btn-border-secondary-active);
    }
    .btn--secondary ::slotted(*) {
      color: var(--btn-text-color-secondary);
    }
    .btn--secondary:hover ::slotted(*) {
      color: var(--btn-text-color-secondary-hover);
    }
    @media (max-width: 500px) {
      button {
        flex-grow: 1;
      }
    }
  `;

  get form() {
    return this.closest("form");
  }

  clickHandler(event: Event) {
    if (this.type === "submit" && this.form) {
      event.preventDefault();
      const fakeSubmit = document.createElement("button");
      fakeSubmit.type = "submit";
      fakeSubmit.style.display = "none";
      this.form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.ownerDocument?.addEventListener("keydown", (event) =>
      this.handleFirstTab(event)
    );
  }

  disconnectedCallback() {
    this.ownerDocument?.removeEventListener("keydown", this.handleFirstTab);
    super.disconnectedCallback();
  }

  handleFirstTab(e: KeyboardEvent) {
    if (e.code === "Tab") {
      this.hasKeyboardNav = true;
      this.requestUpdate();
      this.ownerDocument?.removeEventListener("keydown", this.handleFirstTab);
    }
  }

  render() {
    return html`
      <button
        part="root"
        class=${classMap({
          "has-keyboard-nav": this.hasKeyboardNav,
          "btn--secondary": this.variant === "secondary",
          "btn--primary":
            this.variant === "primary" || this.variant === undefined,
        })}
        type="button"
        @click="${this.clickHandler}"
        ?disabled=${this.disabled}
      >
        <atelier-text tag="span"><slot></slot></atelier-text>
      </button>
    `;
  }
}
