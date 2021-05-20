import "../../index";

export default {
  title: "Form/Rate",
  component: "atelier-spinner",
};

export const Rate = () => `
<form action="/" method="POST">
  <atelier-rate name="test-rate" label="Votre note :"></atelier-rate>
  <button type="submit">SUBMIT</button>
</form>`;
