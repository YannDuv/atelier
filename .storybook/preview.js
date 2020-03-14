import { addParameters } from "@storybook/html";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

addParameters({
  backgrounds: [
    { name: "Dark", value: "black", default: true },
    { name: "Light", value: "white" }
  ],
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphone6"
  }
});
