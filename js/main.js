const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const cancelButton = document.querySelector('.img-upload__cancel');
const previewImage = document.querySelector('.img-upload__preview img');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result; // Подставляем изображение
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
    };
    reader.readAsDataURL(file);
  }
});

const closeOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

cancelButton.addEventListener('click', closeOverlay);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay();
  }
});

// Элементы управления масштабом
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');

// Начальный масштаб
let scaleValue = 100;

// Функция для обновления масштаба
const updateScale = () => {
  previewImage.style.transform = `scale(${scaleValue / 100})`;
  scaleValueInput.value = `${scaleValue}%`;
};

// Обработчики событий для кнопок
smallerButton.addEventListener('click', () => {
  if (scaleValue > 25) { // Минимальный масштаб — 25%
    scaleValue -= 25;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  if (scaleValue < 100) { // Максимальный масштаб — 100%
    scaleValue += 25;
    updateScale();
  }
});

// Инициализация начального масштаба
updateScale();

// Элементы управления
const effects = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

// Настройки эффектов
const EFFECTS = {
  none: {
    filter: '',
    unit: '',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    hideSlider: true,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    hideSlider: false,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    hideSlider: false,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    hideSlider: false,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    hideSlider: false,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    hideSlider: false,
  },
};

// Инициализация слайдера
noUiSlider.create(effectSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Функция для применения эффекта
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

// Сброс эффекта при смене
effects.forEach((effectInput) => {
  effectInput.addEventListener('change', (event) => {
    const effectName = event.target.value;
    const effectSettings = EFFECTS[effectName];
    applyEffect(effectSettings);
  });
});

// Обновление фильтра при изменении слайдера
effectSlider.noUiSlider.on('update', (values) => {
  const activeEffect = document.querySelector('.effects__radio:checked').value;
  const effectSettings = EFFECTS[activeEffect];
  const value = values[0];
  previewImage.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit})`;
  effectLevelValue.value = value;
});

// Применить настройки по умолчанию
applyEffect(EFFECTS.none);

const hashtagInput = document.querySelector('.text__hashtags'); // Поле ввода хэш-тегов
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;

// Функция валидации хэш-тегов
const validateHashtags = () => {
  const hashtags = hashtagInput.value
    .trim()
    .toLowerCase() // Нечувствительность к регистру
    .split(/\s+/) // Разделение по пробелам
    .filter(Boolean); // Удаление пустых строк

  const errors = [];

  if (hashtags.length > MAX_HASHTAGS) {
    errors.push(`Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов.`);
  }

  hashtags.forEach((tag, index) => {
    if (!/^#[a-zA-Z0-9]+$/.test(tag)) {
      errors.push(`Хэш-тег "${tag}" должен начинаться с "#" и состоять из букв и цифр.`);
    } else if (tag.length > MAX_HASHTAG_LENGTH) {
      errors.push(`Хэш-тег "${tag}" не может быть длиннее ${MAX_HASHTAG_LENGTH} символов.`);
    } else if (tag === '#') {
      errors.push('Хэш-тег не может состоять только из "#".');
    }

    // Проверка на дублирование
    if (hashtags.indexOf(tag) !== index) {
      errors.push(`Хэш-тег "${tag}" используется несколько раз.`);
    }
  });

  return errors;
};

// Обработчик ввода
hashtagInput.addEventListener('input', () => {
  const errors = validateHashtags();

  if (errors.length > 0) {
    hashtagInput.setCustomValidity(errors.join('\n'));
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
});

// Блокировка закрытия формы по Esc
hashtagInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

const commentInput = document.querySelector('.text__description'); // Поле ввода комментария
const MAX_COMMENT_LENGTH = 140;

// Обработчик ввода
commentInput.addEventListener('input', () => {
  const comment = commentInput.value.trim();

  if (comment.length > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(`Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов.`);
  } else {
    commentInput.setCustomValidity('');
  }

  commentInput.reportValidity();
});

// Блокировка закрытия формы по Esc
commentInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

