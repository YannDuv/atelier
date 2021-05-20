import "./Spinner.component";

export default {
  title: "Spinner",
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
    },
  },
};

const Template = ({ variant }) =>
  `<atelier-spinner variant=${variant}></atelier-spinner>`;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
