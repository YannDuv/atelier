import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map";

/**
 * `atelier-button`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-button")
export default class ButtonElement extends LitElement {
  classes = {
    "has-keyboard-nav": false,
  };

  @property({ type: String })
  type = "button";

  static get styles() {
    return css`
      button {
        flex: 0 1 200px;
        background: var(--primary);
        color: var(--text-color-contrast);
        font-size: var(--text-m);
        padding: var(--sm) var(--md);
        border: none;
        border-radius: 5px;
        transition: filter 100ms ease-in-out, transform 100ms ease-in-out;
        cursor: pointer;
        outline-offset: 2px;
      }
      @media (max-width: 500px) {
        button {
          flex-grow: 1;
        }
      }
      button:focus {
        outline: none;
      }
      button.has-keyboard-nav:focus {
        outline: var(--primary) solid 2px;
      }
      button:active {
        transform: scale(0.95) translateZ(-2px);
        filter: drop-shadow(1px 0px 1px #00000057);
      }
      button:hover:not(:active) {
        filter: drop-shadow(1px 1px 3px #00000057);
        transition: filter 400ms ease-in;
      }
      @media (prefers-color-scheme: dark) {
        button:active {
          filter: drop-shadow(1px 0px 1px #ffffff70);
        }
        button:hover:not(:active) {
          filter: drop-shadow(1px 1px 3px #ffffff70);
        }
      }
    `;
  }

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
    if (e.keyCode === 9) {
      this.classes = {
        "has-keyboard-nav": true,
      };
      this.requestUpdate();
      this.ownerDocument?.removeEventListener("keydown", this.handleFirstTab);
    }
  }

  render() {
    return html`
      <button
        part="root"
        class=${classMap(this.classes)}
        type="${this.type}"
        @click="${this.clickHandler}"
      >
        <atelier-text tag="span"><slot></slot></atelier-text>
      </button>
    `;
  }
}
