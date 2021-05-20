import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map";

const TRIANGLE_SIZE = 75;
const SVG_SIZE = 35;
const MAX_Y = (SVG_SIZE * Math.sqrt(3)) / 2;
const CIRCLE_RADIUS = 3;
const STROKE_WIDTH = 1;

@customElement("atelier-spinner")
export class SpinnerElement extends LitElement {
  static get styles() {
    const A = {
      x: CIRCLE_RADIUS + STROKE_WIDTH,
      y: MAX_Y - CIRCLE_RADIUS - STROKE_WIDTH,
    };
    const B = {
      x: SVG_SIZE / 2,
      y: STROKE_WIDTH,
    };
    const C = {
      x: SVG_SIZE - STROKE_WIDTH - CIRCLE_RADIUS,
      y: MAX_Y - CIRCLE_RADIUS - STROKE_WIDTH,
    };

    return css`
      @keyframes rotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes translateA {
        from {
          transform: translate(${A.x}px, ${A.y}px);
        }
        to {
          transform: translate(${B.x}px, ${B.y}px);
        }
      }
      @keyframes translateB {
        from {
          transform: translate(${B.x}px, ${B.y}px);
        }
        to {
          transform: translate(${C.x}px, ${C.y}px);
        }
      }
      @keyframes translateC {
        from {
          transform: translate(${C.x}px, ${C.y}px);
        }
        to {
          transform: translate(${A.x}px, ${A.y}px);
        }
      }
      svg {
        animation: 45s linear infinite running rotate;
      }
      .primary circle {
        stroke: var(--primary);
      }
      .secondary circle {
        stroke: var(--secondary);
      }
      circle {
        animation: 1.5s ease infinite running translateA;
      }
      .a {
        animation-name: translateA;
      }
      .b {
        animation-name: translateB;
      }
      .c {
        animation-name: translateC;
      }
    `;
  }

  @property({ type: String })
  variant = "primary";

  @property({ type: Number })
  size = TRIANGLE_SIZE;

  render() {
    return html`<svg
      class=${classMap({
        primary: this.variant === "primary",
        secondary: this.variant === "secondary",
      })}
      viewBox="0 0 ${SVG_SIZE} ${MAX_Y}"
      width="${this.size}"
      height="${this.size}"
      xmlns="https://www.w3.org/2000/svg"
    >
      <circle
        cx="0"
        cy="0"
        r="${CIRCLE_RADIUS}"
        strokeWidth="${STROKE_WIDTH}"
        fill="transparent"
        class="cercle a"
      />
      <circle
        cx="0"
        cy="0"
        r="${CIRCLE_RADIUS}"
        strokeWidth="${STROKE_WIDTH}"
        fill="transparent"
        class="cercle b"
      />
      <circle
        cx="0"
        cy="0"
        r="${CIRCLE_RADIUS}"
        strokeWidth="${STROKE_WIDTH}"
        fill="transparent"
        class="cercle c"
      />
    </svg>`;
  }
}
