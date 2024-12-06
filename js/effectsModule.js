import noUiSlider from 'nouislider'; // Импорт noUiSlider (если используется)

const effectsModule = (() => {
  const effects = document.querySelectorAll('.effects__radio');
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');
  const effectSlider = document.querySelector('.effect-level__slider');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const previewImage = document.querySelector('.img-upload__preview img');

  const EFFECTS = {
    none: { filter: '', unit: '', range: { min: 0, max: 100 }, start: 100, step: 1, hideSlider: true },
    chrome: { filter: 'grayscale', unit: '', range: { min: 0, max: 1 }, start: 1, step: 0.1, hideSlider: false },
    sepia: { filter: 'sepia', unit: '', range: { min: 0, max: 1 }, start: 1, step: 0.1, hideSlider: false },
    marvin: { filter: 'invert', unit: '%', range: { min: 0, max: 100 }, start: 100, step: 1, hideSlider: false },
    phobos: { filter: 'blur', unit: 'px', range: { min: 0, max: 3 }, start: 3, step: 0.1, hideSlider: false },
    heat: { filter: 'brightness', unit: '', range: { min: 1, max: 3 }, start: 3, step: 0.1, hideSlider: false },
  };

  const applyEffect = (effect) => {
    if (effect.hideSlider) {
      effectLevelContainer.classList.add('hidden');
      previewImage.style.filter = '';
      effectLevelValue.value = '';
    } else {
      effectLevelContainer.classList.remove('hidden');
      effectSlider.noUiSlider.updateOptions({
        range: effect.range,
        start: effect.start,
        step: effect.step,
      });
      previewImage.style.filter = `${effect.filter}(${effect.start}${effect.unit})`;
      effectLevelValue.value = effect.start;
    }
  };

  const init = () => {
    noUiSlider.create(effectSlider, {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    });

    effects.forEach((effectInput) => {
      effectInput.addEventListener('change', (event) => {
        const effectName = event.target.value;
        const effectSettings = EFFECTS[effectName];
        applyEffect(effectSettings);
      });
    });

    effectSlider.noUiSlider.on('update', (values) => {
      const activeEffect = document.querySelector('.effects__radio:checked').value;
      const effectSettings = EFFECTS[activeEffect];
      const value = values[0];
      previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit})`;
      effectLevelValue.value = value;
    });

    applyEffect(EFFECTS.none);
  };

  return { init };
})();

export default effectsModule;
