import "../src/index";

export default {
  title: "Form/Field",
  decorators: [],
  parameters: {}
};

export const TextField = () =>
  '<atelier-field label="Prénom" name="firstName" required></atelier-field>';
