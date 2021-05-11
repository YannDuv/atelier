import { customElement } from "lit/decorators/custom-element";
import { html, LitElement, css } from "lit";

@customElement("atelier-card")
export class CardElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
    div {
      box-shadow: var(--card-boxShadow);
      background: var(--card-background);
      border-radius: var(--card-radius);
      padding: var(--md);
    }
  `;

  render() {
    return html`<div><slot></slot></div>`;
  }
}
