import { html, css, LitElement, customElement, property } from "lit-element";
import { Validator } from "../FormTypes";
import FieldElement from "../Field/Field.component";

type PickerOption = {
  value: string | number;
  thumbs?: string[];
  title: string;
  subtitle?: string;
};

const EMPTY: any[] = [];
const OPTIONS_MAX = 6;

/**
 * `atelier-picker`
 * Ceci est une description
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
@customElement("atelier-picker")
export default class PickerElement extends LitElement {
  static formAssociated = true;
  typed: string = "";
  filteredOptions: PickerOption[] = EMPTY;
  selected?: PickerOption;
  internals: any;
  isListVisible = true;

  @property({ type: String })
  name?: string;

  @property({ type: String })
  label?: string;

  @property({ type: String })
  placeholder?: string;

  @property({
    type: String,
    hasChanged: () => true,
  })
  options: PickerOption[] = [];

  @property({
    type: Object,
    hasChanged: () => true,
  })
  validators?: Validator[];

  static get styles() {
    return css`
      div.atelier-picker {
        position: relative;
      }
      ul {
        position: absolute;
        display: block;
        background: var(--background-color-contrast);
        color: var(--text-color-contrast);
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 1;
      }
      li {
        display: flex;
        transition: background-color 200ms ease;
        padding: var(--xs) var(--md);
        cursor: pointer;
      }
      li:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      li div {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
      }
      li img {
        border-radius: 50%;
        margin-right: var(--md);
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
    this.onfocus = () => this.input?.input?.focus();
    this.checkValidity();
  }

  get input(): FieldElement | undefined | null {
    return this.shadowRoot?.querySelector("atelier-field");
  }

  get form() {
    return this.internals.form;
  }

  get value(): string | number {
    return this.selected ? this.selected.value : "";
  }

  set value(v: string | number) {
    this.selected = { value: v, title: "" + v };
  }

  get listOffset() {
    const left = this.input?.input?.getBoundingClientRect().left;
    return left ? `${left}px` : 0;
  }

  get listwidth() {
    const width = this.input?.input?.getBoundingClientRect().width;
    return width ? `${width}px` : 0;
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

  selectOption(optionValue?: string | number) {
    if (optionValue === undefined) {
      this.selected = undefined;
      this.internals.setFormValue(undefined);
    } else {
      this.typed = "";
      this.selected = this.options.find((o) => o.value === optionValue);
      this.internals.setFormValue(this.value);
    }
    this.checkValidity();
    if (!this.input) {
      return;
    }
    this.input.value = this.selected?.title || "";
    this.filteredOptions = EMPTY;
    this.requestUpdate();
  }

  formAssociatedCallback() {
    // console.log("Form associated.");
  }

  areResultsEqual(options1: PickerOption[], options2: PickerOption[]) {
    return (
      options2.length === options1.length &&
      options2.every((o2) => options1.some((o1) => o1.value === o2.value))
    );
  }

  updated() {
    this.checkValidity();
  }

  handleChange(event: CustomEvent) {
    this.isListVisible = true;
    this.selected = undefined;
    this.typed = event.detail;
    const newResults = this.options
      .filter(
        (o) =>
          RegExp(this.typed, "i").test(o.title) ||
          (o.subtitle && RegExp(this.typed, "i").test(o.subtitle))
      )
      .slice(0, OPTIONS_MAX);
    if (this.areResultsEqual(newResults, this.filteredOptions)) {
      return;
    }
    this.filteredOptions = newResults;
    this.requestUpdate();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (/escape/i.test(event.code)) {
      this.isListVisible = false;
      this.selectOption(undefined);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (/enter/i.test(event.code)) {
      this.selectOption(this.filteredOptions[0].value);
    }
  }

  renderOption({ value, thumbs, title, subtitle }: PickerOption) {
    return html`<li value="${value}" @click="${() => this.selectOption(value)}">
      ${thumbs
        ? html`<picture><img src="${thumbs[0]}" alt="" /></picture>`
        : null}
      <div>
        <atelier-text tag="span">${title}</atelier-text>
        <atelier-text tag="span" variant="low" size="small"
          >${subtitle}</atelier-text
        >
      </div>
    </li>`;
  }

  render() {
    return html`<div class="atelier-picker">
      <atelier-field
        label="${this.label}"
        name="${this.name}"
        placeholder="${this.placeholder}"
        @field-change="${this.handleChange}"
        @keydown=${this.handleKeyDown}
        @keypress=${this.handleKeyPress}
      ></atelier-field>
      <ul
        style="left: ${this.listOffset}; width: ${this
          .listwidth}; visibility: ${this.isListVisible
          ? "visible"
          : "collapse"}"
      >
        ${this.filteredOptions.map((o) => this.renderOption(o))}
      </ul>
    </div>`;
  }
}
