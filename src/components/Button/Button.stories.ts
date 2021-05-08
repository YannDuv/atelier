import "./Button.component";

export default {
  title: "Actions/Button",
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["primary", "secondary"],
      },
    },
  },
};

const Template = ({ content, variant }: any) => `<div
  style="display: flex; flex-direction: column;"
>
  <atelier-button variant="${variant}" type="button" style="display: flex;">
    ${content}
  </atelier-button>
</div>`;

export const Primary = Template.bind({});
Primary.args = {
  content: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  content: "Secondary",
  variant: "secondary",
};
