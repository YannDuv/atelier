import "../../index";

export default {
  title: "Form/Field",
  decorators: [],
  parameters: {}
};

export const TextField = () =>
  '<atelier-field label="Prénom" name="firstName" placeholder="Jean Claude, Robert" required></atelier-field>';
