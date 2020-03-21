import { html, property, LitElement, css, customElement } from "lit-element";
import { Validator } from "../FormTypes";

/**
 * `atelier-button`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-rate")
export default class AtelierElement extends LitElement {
  static formAssociated = true;
  internals: any;
  hearts: any[];
  rate?: number;

  @property({
    type: String,
    hasChanged: () => true
  })
  validators?: Validator[];

  @property({ type: String })
  label?: string;

  get form() {
    return this.internals.form;
  }

  get input() {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(".stars")
      : undefined;
  }

  get name() {
    return this.getAttribute("name");
  }

  get value(): number | undefined {
    return this.rate;
  }

  static get styles() {
    return css`
      .rate-field {
        margin-bottom: var(--md);
      }
      .stars {
        display: flex;
        margin: var(--xs) 0;
      }
      button {
        position: relative;
        min-width: 50px;
        background: none;
        border: none;
        outline: none;
        padding: 0 var(--sm) 0 0;
      }
      svg {
        flex: 1;
        display: flex;
        cursor: pointer;
      }
      svg path {
        stroke: var(--primary);
        fill: none;
        fill-opacity: 0;
      }
      svg .pristine {
        stroke: var(--light-grey);
        stroke-opacity: 1;
      }
      svg .selected {
        fill: var(--primary);
        fill-opacity: 1;
        transition: fill-opacity 300ms ease-in;
      }
    `;
  }

  constructor() {
    super();
    this.hearts = [1, 2, 3, 4];
    // @ts-ignore
    this.internals = this.attachInternals();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }
  }

  formAssociatedCallback() {
    // console.log("Form associated.");
  }

  connectedCallback() {
    super.connectedCallback();
    // @ts-ignore
    this.onfocus = () => this.input?.focus();
    this.checkValidity();
  }

  checkValidity() {
    this.internals.setValidity({});

    if (!this.validators) {
      return this.internals.checkValidity();
    }
    let isValid = true;

    for (const v of this.validators) {
      if (v.isValid(this.rate)) {
        continue;
      }
      this.internals.setValidity({ customError: true }, v.message);
      isValid = false;
      break;
    }

    return isValid && this.internals.checkValidity();
  }

  update(changedProperties: any) {
    super.update(changedProperties);
    this.checkValidity();
  }

  reportValidity() {
    this.checkValidity();
    return this.internals.reportValidity();
  }

  changeRate(rate: number) {
    this.rate = rate;
    this.internals.setFormValue(this.rate);
    this.requestUpdate();
  }

  renderHeart(index: number, rate?: number) {
    const classes = [];
    const isPristine = rate === undefined;
    if (isPristine) classes.push("pristine");
    const isSelected = rate !== undefined && index <= rate;
    if (isSelected) classes.push("selected");
    return html`
      <button type="button" @click="${() => this.changeRate(index)}">
        <svg viewBox="0 -28 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            class="${classes.join(" ")}"
            stroke-width="10"
            d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 00256 455.516c7.285 0 14.316-2.641 19.785-7.43 20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0"
          />
        </svg>
      </button>
    `;
  }

  render() {
    return html`
      <div class="rate-field">
        <atelier-text tag="label">${this.label}</atelier-text>
        <div class="stars" tabindex="0">
          ${this.hearts.map(i => this.renderHeart(i, this.rate))}
          <div></div>
        </div>
      </div>
    `;
  }
}
