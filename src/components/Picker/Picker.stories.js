import "../../index";
import members from "./demo-members.json";

export default {
  title: "Form/Picker",
};

export const Picker = () =>
  `<form>
    <atelier-picker label="Label" name="test-name" placeholder="Jean Michel"></atelier-picker>
  </form>`;

setTimeout(() => {
  const picker = document.querySelector("atelier-picker");
  picker.options = members.map((m) => ({
    value: m.name,
    thumbs: [m.avatar],
    title: m.displayName,
    subtitle: m.name,
  }));
  picker.validators = [
    {
      isValid: (value) => value !== undefined && value.trim() !== "",
      message: "Il faut décider !",
    },
  ];
}, 1000);
