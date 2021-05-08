import "./Text.component";

export default {
  title: "Text",
};

export const Headers = () => `<section>
    <atelier-h1>Header 1</atelier-h1>
    <atelier-h2>Header 2</atelier-h2>
    <atelier-h3>Header 3</atelier-h3>
    <atelier-h4>Header 4</atelier-h4>
</section>`;

        
export const Text = () => `
<section>
    <atelier-h2>Paragraph</atelier-h2>
    <atelier-p>Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.</atelier-p>
    <atelier-h2>Span</atelier-h2>
    <atelier-text>The spectacle before us was indeed sublime.</atelier-text>
    <atelier-h2>Quote</atelier-h2>
    <atelier-quote>The recorded voice scratched in the speaker.</atelier-quote>
</section>`;
