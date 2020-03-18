import { addParameters } from "@storybook/html";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addParameters({
  backgrounds: [
    { name: "Dark", value: "#1f1f1f", default: true },
    { name: "Light", value: "white" }
  ],
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphone6"
  }
});
