interface Window {
  Image: any;
}

class ImageMonkeyPatch {
  constructor(w, h) {
    const img = document.createElement('img');
    img.setAttribute('width', w);
    img.setAttribute('height', h);
    return img;
  }
}

window.Image = ImageMonkeyPatch;
