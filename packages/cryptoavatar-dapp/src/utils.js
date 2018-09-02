function readFileAsDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function readFileAsArrayBuffer(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(Buffer.from(e.target.result));
    };
    reader.readAsArrayBuffer(file);
  });
}

function canvasToBlob(canvas) {
  return new Promise(resolve => {
    canvas.toBlob(resolve);
  });
}

module.exports = {
  readFileAsDataURL,
  readFileAsArrayBuffer,
  canvasToBlob
};
