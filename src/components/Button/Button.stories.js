import "../../index";

export default {
  title: "Actions/Button",
  decorators: [],
  parameters: {},
};

export const Button = () =>
  `<div style="display: flex; flex-direction: column;">
    <atelier-button type="button" style="display: flex;">Clickez moi</atelier-button>
  </div>`;
