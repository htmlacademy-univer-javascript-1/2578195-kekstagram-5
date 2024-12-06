const scaleModule = (() => {
  const smallerButton = document.querySelector('.scale__control--smaller');
  const biggerButton = document.querySelector('.scale__control--bigger');
  const scaleValueInput = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');
  let scaleValue = 100;

  const updateScale = () => {
    previewImage.style.transform = `scale(${scaleValue / 100})`;
    scaleValueInput.value = `${scaleValue}%`;
  };

  const init = () => {
    smallerButton.addEventListener('click', () => {
      if (scaleValue > 25) {
        scaleValue -= 25;
        updateScale();
      }
    });

    biggerButton.addEventListener('click', () => {
      if (scaleValue < 100) {
        scaleValue += 25;
        updateScale();
      }
    });

    updateScale();
  };

  return { init };
})();

export default scaleModule;
