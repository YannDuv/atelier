import "./Spinner.component";

export default {
  title: "Spinner",
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "select",
      },
    },
  },
  component: "atelier-spinner",
};

const Template = ({ variant }: { variant: "primary" | "secondary" }) =>
  `<atelier-spinner variant=${variant}></atelier-spinner>`;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
