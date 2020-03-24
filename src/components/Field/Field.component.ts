import { html, LitElement, css, customElement, property } from "lit-element";
import { Validator } from "../FormTypes";

@customElement("atelier-field")
export default class AtelierElement extends LitElement {
  static formAssociated = true;
  internals: any;

  @property({ type: String })
  type: "text" | "email" | "tel" = "text";

  @property({ type: String })
  name?: string;

  @property({ type: String })
  label?: string;

  @property({ type: String })
  placeholder?: string;

  @property({
    type: String,
    hasChanged: () => true
  })
  validators?: Validator[];

  static get styles() {
    return css`
      :host {
        display: flex;
        margin-bottom: var(--md);
        color: var(--text-color);
        align-items: center;
        flex-wrap: wrap;
      }
      atelier-text {
        flex: 0 0 200px;
        margin-bottom: var(--xxs);
      }
      .input {
        margin: var(--xs) 0;
        display: flex;
        flex: 0 1 500px;
      }
      input {
        flex: 1;
        padding: var(--xs) var(--xs) var(--xs) var(--xs);
        font-family: var(--font-secondary);
        font-size: var(--text-m);
        border: none;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
      }
      input::placeholder {
        color: var(--light-grey);
        font-style: italic;
        font-weight: lighter;
      }
      @media (prefers-color-scheme: light) {
        input {
          background: rgba(0, 0, 0, 0.2);
        }
        input::placeholder {
          color: var(--grey);
        }
      }
    `;
  }

  constructor() {
    super();
    // @ts-ignore
    this.internals = this.attachInternals();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.onfocus = () => this.input?.focus();
    this.checkValidity();
  }

  formAssociatedCallback() {
    // console.log("Form associated.");
  }

  update(changedProperties: any) {
    super.update(changedProperties);
    this.checkValidity();
  }

  get input() {
    return this.shadowRoot ? this.shadowRoot.querySelector("input") : undefined;
  }

  get form() {
    return this.internals.form;
  }

  get value(): string {
    return this.input ? this.input.value : "";
  }

  set value(v: string) {
    if (this.input) this.input.value = v;
  }

  checkValidity() {
    this.internals.setValidity({});

    if (!this.validators) {
      return this.internals.checkValidity();
    }
    let isValid = true;

    for (const v of this.validators) {
      if (v.isValid(this.value)) {
        continue;
      }
      this.internals.setValidity({ customError: true }, v.message);
      isValid = false;
      break;
    }

    return isValid && this.internals.checkValidity();
  }

  reportValidity() {
    this.checkValidity();
    return this.internals.reportValidity();
  }

  handleInput() {
    this.internals.setFormValue(this.value);
    this.checkValidity();
  }

  render() {
    return html`
      <atelier-text for="field-${this.name}" tag="label"
        >${this.label}</atelier-text
      >
      <div class="input">
        <input
          @input="${this.handleInput}"
          name="${this.name}"
          id="field-${this.name}"
          type="${this.type}"
          placeholder="${this.placeholder ? this.placeholder : ""}"
        />
      </div>
    `;
  }
}
