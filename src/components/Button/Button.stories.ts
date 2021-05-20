import "./Button.component";

export default {
  title: "Actions/Button",
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
        labels: {
          primary: "Primary",
          secondary: "Secondary",
        },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    disabled: false,
    label: "Label",
    variant: "primary",
  },
  component: "atelier-button",
};

const Template = ({ label, variant, disabled }: any) => `<div
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
