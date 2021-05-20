import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Validator } from "../FormTypes";
import FieldElement from "../Field/Field.component";
import { styleMap } from "lit/directives/style-map.js";

type PickerOption = {
  value: string | number;
  thumbs?: string[];
  title: string;
  subtitle?: string;
};

const EMPTY: any[] = [];
const OPTIONS_MAX = 6;

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
    type: Array,
    hasChanged: () => true,
  })
  options: PickerOption[] = [];

  @property({
    type: Array,
    hasChanged: () => true,
  })
  validators?: Validator[];

  static styles = css`
    div.atelier-picker {
      position: relative;
    }
    ul {
      position: absolute;
      display: block;
      background: var(--bg-color-contrast);
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

  get inputShadow(): FieldElement | undefined | null {
    // @ts-ignore
    return this.renderRoot?.activeElement;
  }

  get input(): HTMLInputElement | undefined | null {
    return this.inputShadow?.input;
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
    const clientRect = this.input?.getBoundingClientRect();
    return clientRect ? `${clientRect.left}px` : "0";
  }

  get listwidth() {
    const width = this.input?.getBoundingClientRect().width;
    return width ? `${width}px` : "0";
  }

  get listTop() {
    const clientRect = this.input?.getBoundingClientRect();
    return clientRect ? `${clientRect.bottom}px` : "0";
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
    if (!this.inputShadow) {
      return;
    }
    this.inputShadow.value = this.selected?.title || "";
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
        <atelier-text variant="contrast">${title}</atelier-text>
        <atelier-text variant="low" size="small">${subtitle}</atelier-text>
      </div>
    </li>`;
  }

  render() {
    return html`<div class="atelier-picker">
      <atelier-field
        id="field"
        label="${this.label}"
        name="${this.name}"
        placeholder="${this.placeholder}"
        @field-change="${this.handleChange}"
        @keydown=${this.handleKeyDown}
        @keypress=${this.handleKeyPress}
      ></atelier-field>
      <ul
        style=${styleMap({
          left: this.listOffset,
          width: this.listwidth,
          top: this.listTop,
          visibility: this.isListVisible ? "visible" : "collapse",
        })}
      >
        ${this.filteredOptions.map((o) => this.renderOption(o))}
      </ul>
    </div>`;
  }
}
