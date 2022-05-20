/* global fxrand, fxpreview */

import p5 from 'p5';
import debounce from 'lodash.debounce';

const fxchoose = (values) => values[Math.floor(fxrand() * values.length)];

window.$fxhashFeatures = {
  'Setting': fxchoose(['A', 'B']),
}
console.table(window.$fxhashFeatures);

new p5((p5) => {
  const frameRate = 30;
  const noiseSeed = (fxrand() * 100_000) >> 0;
  let fxpreviewDone = false;
  let s;

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.frameRate(frameRate);
    p5.randomSeed(noiseSeed);
    p5.noiseSeed(noiseSeed);
    p5._setupSize();
    p5.createCanvas(s, s);
    p5.noLoop();
  };

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    const rw = ~~(s / 3);
    p5.rect(s / 2 - rw / 2, s / 2 - rw / 2, rw, rw);

    if (!fxpreviewDone) {
      fxpreview();
      fxpreviewDone = true;
    }
  };

  p5.windowResized = debounce(() => {
    p5._setupSize();
    p5.resizeCanvas(s, s);
  }, 50);

  p5._setupSize = () => {
    s = Math.min(p5.windowWidth, p5.windowHeight);
  }

}, window.document.body);
