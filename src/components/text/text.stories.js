import "../../index";

export default {
  title: "Text",
  decorators: [],
  parameters: {}
};

export const Headers = () => `
    <section>
        <atelier-text tag="h1">Header 1</atelier-text>
        <atelier-text tag="h2">Header 2</atelier-text>
        <atelier-text tag="h3">Header 3</atelier-text>
        <atelier-text tag="h4">Header 4</atelier-text>
    </section>`;

export const Text = () => `
    <section>
        <atelier-text tag="h2">Paragraph</atelier-text>
        <atelier-text tag="p">Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.</atelier-text>
        <atelier-text tag="h2">Span</atelier-text>
        <atelier-text tag="span">The spectacle before us was indeed sublime.</atelier-text>
        <atelier-text tag="h2">Quote</atelier-text>
        <atelier-text tag="quote">The recorded voice scratched in the speaker.</atelier-text>
    </section>`;
