export const htmlString = `
<div class="style-container">
  <div class="html-preview">
    <p class="box-title">Resultado</p>
    <div class="preview-container">
      <div class="parent-user">
        <div class="child1-user">
          <div class="grandchild-user">A</div>
          <div class="grandchild-user">B</div>
          <div class="grandchild-user">C</div>
        </div>
        <div class="child2-user">
          <div class="grandchild-user">D</div>
          <div class="grandchild-user">E</div>
          <div class="grandchild-user">F</div>
        </div>
        <div class="child3-user">
          <div class="grandchild-user">G</div>
          <div class="grandchild-user">H</div>
          <div class="grandchild-user">I</div>
        </div>
      </div>
    </div>
  </div>
  <div class="html-preview">
    <p class="box-title">Esperado</p>
    <div class="preview-container">
      <div class="parent-expected">
        <div class="child1-expected">
          <div class="grandchild-expected">A</div>
          <div class="grandchild-expected">B</div>
          <div class="grandchild-expected">C</div>
        </div>
        <div class="child2-expected">
          <div class="grandchild-expected">D</div>
          <div class="grandchild-expected">E</div>
          <div class="grandchild-expected">F</div>
        </div>
        <div class="child3-expected">
          <div class="grandchild-expected">G</div>
          <div class="grandchild-expected">H</div>
          <div class="grandchild-expected">I</div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export const boundingRects = {
  "style-container": [
    { x: 32, y: 428.7166748046875, width: 660, height: 355.2833251953125 },
  ],
  "html-preview": [
    { x: 32, y: 428.7166748046875, width: 330, height: 355.2833251953125 },
    { x: 362, y: 428.7166748046875, width: 330, height: 355.2833251953125 },
  ],
  "box-title": [
    {
      x: 32,
      y: 441.51666259765625,
      width: 57.866668701171875,
      height: 20.48333740234375,
    },
    {
      x: 362,
      y: 441.51666259765625,
      width: 53.69999694824219,
      height: 20.48333740234375,
    },
  ],
  "preview-container": [
    { x: 32, y: 464, width: 330, height: 300 },
    { x: 362, y: 464, width: 330, height: 300 },
  ],
  "parent-user": [{ x: 32, y: 464, width: 300, height: 300 }],
  "child1-user ": [
    {
      x: 273.6499938964844,
      y: 474,
      width: 48.350006103515625,
      height: 280,
      top: 474,
      right: 322,
      bottom: 754,
      left: 273.6499938964844,
    },
  ],
  "child2-user": [
    {
      x: 91.13333129882812,
      y: 474,
      width: 182.51666259765625,
      height: 280,
      top: 474,
      right: 273.6499938964844,
      bottom: 754,
      left: 91.13333129882812,
    },
  ],
  "child3-user": [
    {
      x: 42,
      y: 474,
      width: 49.133331298828125,
      height: 280,
      top: 474,
      right: 91.13333129882812,
      bottom: 754,
      left: 42,
    },
  ],
  "grandchild-user": [
    {
      x: 283.6499938964844,
      y: 500.41668701171875,
      width: 28.350006103515625,
      height: 40.48332214355469,
    },
    {
      x: 283.6499938964844,
      y: 593.75,
      width: 28.350006103515625,
      height: 40.48333740234375,
    },
    {
      x: 283.6499938964844,
      y: 687.0833129882812,
      width: 28.350006103515625,
      height: 40.48333740234375,
    },
    {
      x: 235.25,
      y: 703.5166625976562,
      width: 28.399993896484375,
      height: 40.48333740234375,
    },
    {
      x: 168.10000610351562,
      y: 703.5166625976562,
      width: 27.26666259765625,
      height: 40.48333740234375,
    },
    {
      x: 101.13333129882812,
      y: 703.5166625976562,
      width: 27.066665649414062,
      height: 40.48333740234375,
    },
    { x: 52, y: 484, width: 29.133331298828125, height: 40.48333740234375 },
    {
      x: 52,
      y: 544.4833374023438,
      width: 29.133331298828125,
      height: 40.48332214355469,
    },
    {
      x: 52,
      y: 604.9666748046875,
      width: 29.133331298828125,
      height: 40.48333740234375,
    },
  ],
  "parent-expected": [
    {
      x: 362,
      y: 464,
      width: 300,
      height: 300,
      top: 464,
      right: 662,
      bottom: 764,
      left: 362,
    },
  ],
  "child1-expected": [
    {
      x: 603.6500244140625,
      y: 474,
      width: 48.350006103515625,
      height: 280,
      top: 474,
      right: 652.0000305175781,
      bottom: 754,
      left: 603.6500244140625,
    },
  ],
  "child2-expected": [
    {
      x: 421.1333312988281,
      y: 693.5166625976562,
      width: 182.51666259765625,
      height: 60.48333740234375,
      top: 693.5166625976562,
      right: 603.6499938964844,
      bottom: 754,
      left: 421.1333312988281,
    },
  ],
  "child3-expected": [
    {
      x: 372,
      y: 474,
      width: 49.133331298828125,
      height: 280,
      top: 474,
      right: 421.1333312988281,
      bottom: 754,
      left: 372,
    },
  ],
  "grandchild-expected": [
    {
      x: 613.6500244140625,
      y: 500.41668701171875,
      width: 28.350006103515625,
      height: 40.48332214355469,
    },
    {
      x: 613.6500244140625,
      y: 593.75,
      width: 28.350006103515625,
      height: 40.48333740234375,
    },
    {
      x: 613.6500244140625,
      y: 687.0833129882812,
      width: 28.350006103515625,
      height: 40.48333740234375,
    },
    {
      x: 565.25,
      y: 703.5166625976562,
      width: 28.399993896484375,
      height: 40.48333740234375,
    },
    {
      x: 498.1000061035156,
      y: 703.5166625976562,
      width: 27.26666259765625,
      height: 40.48333740234375,
    },
    {
      x: 431.1333312988281,
      y: 703.5166625976562,
      width: 27.066665649414062,
      height: 40.48333740234375,
    },
    { x: 382, y: 484, width: 29.133331298828125, height: 40.48333740234375 },
    {
      x: 382,
      y: 544.4833374023438,
      width: 29.133331298828125,
      height: 40.48332214355469,
    },
    {
      x: 382,
      y: 604.9666748046875,
      width: 29.133331298828125,
      height: 40.48333740234375,
    },
  ],
};
