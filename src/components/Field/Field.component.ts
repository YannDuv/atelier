import { html, LitElement, css, customElement, property } from "lit-element";

type Validator = {
  isValid: (value: string) => boolean;
  message: string;
};

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

  @property({
    type: String,
    hasChanged: () => true
  })
  validators?: Validator[];

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin-bottom: var(--m);
        color: var(--text-color);
      }
      label {
        flex: 1;
        display: flex;
        margin-bottom: var(--xxs);
      }
      input {
        flex: 1;
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
    console.log("Form associated.");
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
      <label for="field-${this.name}">${this.label}</label>
      <input
        @input="${this.handleInput}"
        name="${this.name}"
        id="field-${this.name}"
        type="${this.type}"
      />
    `;
  }
}
