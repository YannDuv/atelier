import "./Button.component";

export default {
  title: "Actions/Button",
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
    disabled: {
      control: {
        type: "boolean",
        default: false,
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
};

const Template = ({ label = "Label", variant, disabled }: any) => `<div
  style="display: flex; flex-direction: column;"
>
  <atelier-button variant="${variant}" ${
  disabled ? "disabled" : ""
} type="button" style="display: flex;">
    <span>${label}</span>
  </atelier-button>
</div>`;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
